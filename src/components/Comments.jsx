import React, { useState } from 'react';

export const CommentsComponent = ({ comments }) => {
    const [openComments, setOpenComments] = useState(false)

    const showComments = () => setOpenComments(!openComments)

    return <div>
        <button className={"btn btn-link"} onClick={showComments}>{ openComments?'Hide Comments' :' Read Comments . . .' }</button>
        {openComments && 
        comments.map(comment => <div className='border border-info rounded p-2 m-2' key={comment.id}> <h6> {comment.email} </h6> <p>{comment.body}</p> </div>)}

    </div> 
   
}