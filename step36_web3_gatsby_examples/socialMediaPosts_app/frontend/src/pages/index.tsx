import React, { useEffect, useState, useRef } from "react"
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from 'web3-utils'
import socialMedia from '../abis/SocialMedia.json'

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


export default function Home() {

  const [user, setUser] = useState<null | string>(null)
  const [web3, setWeb3] = useState<undefined | Web3>()
  const [contract, setContract] = useState<Contract>()
  const [allPosts, setAllPosts] = useState<posts[]>([])

  const postText = useRef<any>(null);
  const commentText = useRef<any>([])

  // Event listeners of web3 
  window.ethereum.on('connect', (connectInfo: any) => {
    console.log("connectInfo", connectInfo)
  });

  window.ethereum.on('accountsChanged', function (accounts: any) {

    console.log(accounts)
    setUser(accounts[0])

  })

  window.ethereum.on('disconnect', (error: any) => {
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
    setAllPosts((posts: any) => [...posts, { post: postTx.events.postCreated.returnValues, comments: [] }])

    postText.current.value = null
  }

  const createComment = async (postId: number) => {

    commentText.current[postId].focus()

    const postTx = await contract!.methods.createComment(commentText.current[postId].value, postId).send({ from: user })

    setAllPosts((posts: any) => posts.map((val: any) => {

      if (val.post.id === postId) {
        return { ...val, comments: [...val.comments, postTx.events.commentCreated.returnValues] }
      }
      else {
        return val
      }
    }))

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

          commentBuffer.push(fetchComments)
        }


      }

      data.push({ post: fetchPosts, comments: commentBuffer })


    }

    setAllPosts(data)



  }


  return <div>

    <h1>Social Media App</h1>

    <input type='text' ref={postText} />
    <button onClick={() => createPost()}>post</button>

    {
      allPosts &&
      <div>

        <h2>POSTS</h2>
        {allPosts.map((val: any) => {

          return <div key={val.post.id}>
            {val.post.id} ) {val.post.text}
            <div>Posted by:{val.post.postedBy}</div>

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
              <input ref={(ref: any) => commentText.current[val.post.id] = ref} /> <button onClick={() => createComment(val.post.id)}>comment</button>
            </div>

            <br />
            <br />

          </div>



        })}
      </div>
    }

  </div>
}
