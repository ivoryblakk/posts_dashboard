import React from 'react';
import { CommentsComponent } from './Comments';
import {deletePost} from '../actions'

export const PostComponent = ({post,comments, dispatch, users}) =>{
   const userDetails= users.find(user=> post.userId === user.id)
    return post ?<><div className="card " >
           <div class="card-body">
         <h5 class="card-title" >{post.title } {post.id}</h5> 
          <button onClick={()=>console.log('test')}>Edit </button>
          <button onClick={ ()=>(dispatch(deletePost(post.id)))}>Remove Post </button>
          <span> By user {users && userDetails?.username}</span>
          <p> {post.body}</p>
          <CommentsComponent comments={comments} />
          </div>
       
    </div></>: null
}