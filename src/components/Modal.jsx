import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap'
import { updatePost } from '../actions'

export const EditPostModal = ({post, dispatch, handleModal, isModalOpen})=>{
    const [titleValue , setTitleValue] = useState(post.title)
    const [bodyValue , setBodyValue] = useState(post.body)
const handleSubmit = async () => {
 await dispatch(updatePost( post.id , {...post, title:titleValue , body:bodyValue}))
 handleModal();
}
    return  post ?<Modal show={isModalOpen} onHide={handleModal}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Post</Modal.Title>
    </Modal.Header>
  
    <Modal.Body>
         <p> Title : <input type='text' value={titleValue} onChange={e=>setTitleValue(e.target.value)}/></p>
      <p> Content : <input type='text' value={bodyValue}  onChange={e=>setBodyValue(e.target.value)}/></p>
    </Modal.Body>
  
    <Modal.Footer>
      <Button onClick={handleModal} variant="secondary">Close</Button>
      <Button onClick={handleSubmit} variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal>: null
}