import React, { useState } from 'react';

export const CommentsComponent = ({ comments }) => {
    const [openComments, setOpenComments] = useState(false)

    const showComments = () => setOpenComments(!openComments)

    return <div>
        <button className={"btn btn-link"} onClick={showComments}>{ openComments?'Hide Comments . . .' :' Read Comments . . .' }</button>
        {openComments && 
        comments.map(comment => <div key={comment.id}> {comment.email} <br /> {comment.body} </div>)}

    </div> 
   
}