import './App.css';
import React, {Component} from 'react';
import {fetchComments, fetchUsers, fetchPosts} from './actions'
import { connect } from 'react-redux';
import Pagination from 'react-responsive-pagination';

class App extends Component  {
  constructor(props){
    super(props);
    this.state ={ 
      posts: this.props.posts,
      users: this.props.users,
      comments: this.props.comments,
      currentPage:1,
      totalPages: this.props.posts.length%10 === 0? this.props.posts.length/10 :this.props.posts.length/10 +1
    }
  }

  componentDidMount(){
    const { dispatch } = this.props;  
    dispatch(fetchPosts());
    dispatch(fetchComments());
    dispatch(fetchUsers());
  }

  setCurrentPage=(page)=>{
    this.setState({currentPage:page})
  }


render(){
  const { isFetching }= this.props;
  const { currentPage, totalPages, posts, users, comments} = this.state
  const currentPagePost =  posts.filter( (post, index) =>{
    if(currentPage === 1 ){
      return index < currentPage+9
    }
    if(currentPage >= 2 ){
      return  index > (currentPage-1)*10 -1 && index < ( currentPage-1)*10+10
    }
    return false

     
   // return index >= currentPageStatus -1 &&  index < (currentPageStatus+ 9)
  })
  console.log('posts',posts)
  console.log('totalPages',totalPages)
  console.log('currentPage',currentPage)
  console.log('users',users)
  console.log('comments',comments)
  return (
    <div className="App">
      {isFetching? (<span>Loading ...</span>):
      <header className="App-header">
       
      {posts &&  currentPagePost.map((post)=> {
        let commentsOnPost = comments && comments.filter(comment=> comment.postId === post.id)
         console.log('commentsOnPost', commentsOnPost)
        // .map((commentor)=> 
        //   <div> {commentor.email} <br/> {commentor.body}</div>
        //  ))
        return <div> 
          <h2>{post.title } {post.id}</h2>
          <span> By user {users && users.find(user=> post.userId === user.id).username}</span>
          <p> {post.body}</p>
        Comments:
{commentsOnPost.map(comment => <div> { comment.email} <br/> { comment.body} </div>)}

           </div>

          

      })}

    { posts.length &&   <Pagination
      current={currentPage}
      total={totalPages}
      onPageChange={this.setCurrentPage}
    />}
      </header>}
    </div>
  );
}
}

function mapStateToProps(state) {
  const { posts, isFetching, users, comments } = state
  return { posts, isFetching,users, comments }
}


export default connect(mapStateToProps)(App);
