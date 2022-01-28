import axios from 'axios'



export const fetchComments = () => {
    return (dispatch)=>{
        dispatch({type:'isFetching', payload: true})
        axios.get( 'https://jsonplaceholder.typicode.com/comments').then(response=>{
            dispatch({
                type:'comments',
                payload: response.data
            })
            dispatch({type:'isFetching', payload: false})
            console.log('response: ',response)
           }).catch(err=>{
               console.log(err)
           })
    } 
 
}

export const fetchUsers = () => {
    return (dispatch)=>{
        dispatch({type:'isFetching', payload: true})
        axios.get( 'https://jsonplaceholder.typicode.com/users').then(response=>{
            dispatch({
                type:'users',
                payload: response.data
            })
            dispatch({type:'isFetching', payload: false})
            console.log('users: ',response)
           }).catch(err=>{
               console.log(err)
           })
    } 
 
}

export const fetchPosts = () => {
    return (dispatch)=>{
        dispatch({type:'isFetching', payload: true})
        axios.get( 'https://jsonplaceholder.typicode.com/posts').then(response=>{
            dispatch({
                type:'posts',
                payload: response.data
            })
            dispatch({type:'isFetching', payload: false})
            console.log('users: ',response)
           }).catch(err=>{
               console.log(err)
           })
    } 
 
}

export const deletePost = ( postId) => {
    return (dispatch)=>{
        axios.delete( `https://jsonplaceholder.typicode.com/posts/${postId}`).then(response=>{
            dispatch({
                type:'delete/post',
                payload: postId
            })
            console.log('postId: ',postId)
            console.log('delete: ',response)
           }).catch(err=>{
               console.log(err)
           })
    } 
}

export const updatePost = (postId ,content) => {
    return (dispatch)=>{
        axios.put( `https://jsonplaceholder.typicode.com/posts/${postId}`).then(response=>{
            dispatch({
                type:'update/post',
                payload: content
            })
           }).catch(err=>{
               console.log(err)
           })
    } 
}