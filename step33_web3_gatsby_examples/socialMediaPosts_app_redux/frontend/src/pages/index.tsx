import React, { useEffect, useState, useRef } from "react"
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from 'web3-utils'
import socialMedia from '../abis/SocialMedia.json'
import { useDispatch, useSelector} from 'react-redux';
import { setPost, addPost, addComment } from '../redux/slice';
import { RootStateType } from "../redux/store";
import { useStyles } from "../style/Style";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface posts {
  post: {
    id: string
    postedBy: string
    text: string
  }
  comments: comment[]
}

type comment = {
  id: string,
  postId: string
  text: string
  postedBy: string
}

const isBrowser = () => typeof window !== "undefined"


export default function Home() {

  const classes = useStyles();
  const [user, setUser] = useState<null | string>(null)
  const [web3, setWeb3] = useState<undefined | Web3>()
  const [contract, setContract] = useState<Contract>()
  const [allPosts, setAllPosts] = useState<posts[]>([])

  const postText = useRef<any>(null);
  const commentText = useRef<any>([])

  const dispatch = useDispatch();
  const data = useSelector((state: RootStateType) => { return state.posts?.posts})
  
  // Event listeners of web3 
  isBrowser() && window.ethereum.on('connect', (connectInfo: any) => {
    console.log("connectInfo", connectInfo)
  });

  isBrowser() && window.ethereum.on('accountsChanged', function (accounts: any) {
    console.log(accounts)
    setUser(accounts[0])

  })

  isBrowser() && window.ethereum.on('disconnect', (error: any) => {
    console.log("Metamask Disconnected")
    alert(`${error}`)
  });


  // function that loads and sets up web3
  const loadWeb3 = async () => {

    if (Web3.givenProvider) {
      const web3 = new Web3(Web3.givenProvider);
      await Web3.givenProvider.enable();
      const addresses = await web3.eth.getAccounts();
      setUser(addresses[0])
      console.log("addresss = ", addresses);
      setWeb3(web3)
    }
    else {
      console.log("Error in loading web3");
    }
  }


  // initialize web3 on page load
  useEffect(() => {
    const web3Init = async () => await loadWeb3()
    web3Init()
  }, [])

  useEffect(()=>{
    setAllPosts(data || [])
  },[data])

  // fetch contract once the web3 has been initialized
  useEffect(() => {
    if (web3) {
      const fetchContract = async () => {
        const networkId = await web3.eth.net.getId()
        const abi = socialMedia.abi as AbiItem | AbiItem[]
        const networkInfo = socialMedia.networks as any
        const networkData = networkInfo[networkId]

        if (networkData) {
          const smartContract = new web3.eth.Contract(abi, networkData.address)
          setContract(smartContract)
        }
        else {
          alert('Social Media contract not deployed to this network')
        }
      }
      fetchContract()
    }
  }, [web3])

  // get posts once the contract has been fetched 
  useEffect(() => {
    if (contract) {
      const getPosts = async () => await fetchPosts()
      getPosts()
    }
  }, [contract])

  const createPost = async () => {
    const postTx = await contract!.methods.createPost(postText.current.value).send({ from: user })    
    const newPost = postTx.events.postCreated.returnValues
    dispatch(addPost({post:{id: newPost.id, postedBy: newPost.postedBy, text: newPost.text},comments:[]}))
    postText.current.value = null
  }

  const createComment = async (postId: number) => {
    commentText.current[postId].focus()
    const postTx = await contract!.methods.createComment(commentText.current[postId].value, postId).send({ from: user })
    const newComment = postTx.events.commentCreated.returnValues        
    dispatch(addComment({id: newComment.id, postedBy: newComment.postedBy, text: newComment.text, postId: newComment.postId}))
    commentText.current[postId].value = null
  }


  const fetchPosts = async () => {

    const count = await contract!.methods.postCount().call()
    let data = [];

    for (let i = 1; i <= count; i++) {

      const fetchPosts = await contract!.methods.posts(i).call()
      const commentCount = await contract!.methods.commentCount(i).call()
      let commentBuffer = []
      if (commentCount > 0) {
        for (let j = 1; j <= commentCount; j++) {
          const fetchComments = await contract!.methods.comments(i, j).call()
          commentBuffer.push({id: fetchComments.id, postId: fetchComments.postId , text: fetchComments.text, postedBy: fetchComments.postedBy })
        }
      }
      data.push({ post: {id: fetchPosts.id, postedBy: fetchPosts.postedBy, text: fetchPosts.text}, comments: commentBuffer })
    }
    dispatch(setPost({count:data.length, posts:data}))
  }


  return <div>
    <Grid container spacing={3}>
        <Grid item xs={12}>
         
          <div style={{margin:'auto', width:'30%'}}>
          <h1>Social Media App</h1>
          </div>
          <div style={{margin:'auto', width:'70%'}}>
          <input type='text' ref={postText} 
          className={classes.userInput} /> 
          
          <button onClick={() => createPost()}
          className={classes.btnStyle2}
          > post</button>
          </div>
         
        </Grid>
        <Grid item xs={1}/>
        <Grid item xs={10}>        
    {
      allPosts &&
      <div>

        <h2>POSTS</h2>
        {allPosts.map((val: any) => {

          return <div key={val.post.id} className={classes.obox}>            
            <div className={classes.ibox}>
            <Box fontSize={16}>
  

            {val.post.id} ) {val.post.text}
            <div>Posted by:{val.post.postedBy}</div>
            </Box>
            </div>
            <hr />
            <br />
            
            <div>
              {val.comments && val.comments.map((comment: any) => {
                return (<div key={comment.id} style={{ textIndent: 40 }}>
                  {comment.id} ) {comment.text}
                  <div>Commented by: {comment.postedBy}</div>

                  <br />
                </div>
                )
              })}
            </div>

            <div style={{ textIndent: 40 }}>
              <input ref={(ref: any) => commentText.current[val.post.id] = ref} 
              className={classes.userInput} /> 
              
              <button onClick={() => createComment(val.post.id)}
              className ={classes.btnStyle1}
              >comment</button>
            </div>           
            <br />
            <br />
          </div>
          
        })}
      </div>
    }
    
    </Grid>
    <Grid item xs={1}/>
    </Grid>
  </div>
}
