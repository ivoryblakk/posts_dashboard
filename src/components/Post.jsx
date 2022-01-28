import React from 'react';
import { CommentsComponent } from './Comments';
import { deletePost } from '../actions'

export const PostComponent = ({ post, comments, dispatch, users }) => {
    const userDetails = users.find(user => post.userId === user.id)
    return post ? <><div className="card"  >
        <div className="card-body">
        <div class="row ">
            <div className=' col-lg-9 col-md-8  col-sm-6 card-title'>
                <h5 className="" >{post.title} {post.id}</h5>
            </div>
            <div className='col-lg-3  col-md-4  col-sm-6'>
            <div className="" > <button className="btn btn-primary" onClick={() => console.log('test')}>Edit </button> &nbsp;
                    <button className="btn btn-danger" onClick={() => (dispatch(deletePost(post.id)))}>Remove Post </button> </div>
            </div>
            </div>
            <p> Author: {users && userDetails?.username}</p>
            <p> {post.body}</p>
            <CommentsComponent comments={comments} />
        </div>

    </div></> : null
}