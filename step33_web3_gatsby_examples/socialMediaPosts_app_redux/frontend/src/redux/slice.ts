import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PostType= {
    id: string
    postedBy: string
    text: string
  }

  export type CommentType = {
    id: string,
    postId: string
    text: string
    postedBy: string
  }

  export type Post ={
    post: PostType
    comments: CommentType[]
  }
  
export type SocialMediaType = {
    count: number,
    posts: Post[]
}

export type StateType = {
    posts: null | SocialMediaType
}

const initialState: StateType = {
    posts: null
}

const SocialMediaSlice = createSlice({
    name: "mediaslice",
    initialState,
    reducers: {
        setPost: (state, { payload }: PayloadAction<SocialMediaType>) => {              
            state.posts = payload                      
        },        
        addPost: (state, { payload }: PayloadAction<Post>) => {
            if (state.posts) {
                state.posts.count += 1;
                const arr = [...state.posts.posts]          
                arr.push(payload)                               
                state.posts = { ...state.posts, posts: arr }                
            }            
        },
        addComment: (state, { payload }: PayloadAction<CommentType>) => {
            if (state.posts) {                
                const arr = state.posts.posts                   
                arr.map(item => item.post.id === payload.postId ? item.comments.push(payload) : null)
                state.posts = { ...state.posts, posts: arr }                
            }            
        },                            
    },
});

export default SocialMediaSlice.reducer
export const { setPost, addPost, addComment } = SocialMediaSlice.actions