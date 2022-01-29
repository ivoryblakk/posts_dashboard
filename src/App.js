import './App.css';
import React, { Component } from 'react';
import { fetchComments, fetchUsers, fetchPosts } from './actions'
import { connect } from 'react-redux';
import Pagination from 'react-responsive-pagination';
import { PostComponent } from './components/Post';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      isModalOpen: false,
      post: null
    }
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    window.addEventListener('beforeunload', this.componentCleanup);

    if (!!JSON.parse(sessionStorage.getItem("posts")) && !!JSON.parse(sessionStorage.getItem("comments"))) {
      dispatch({ type: 'isFetching', payload: true })
      await dispatch({ type: 'users/rehydrate' });
      await dispatch({ type: 'posts/rehydrate' })
      await dispatch({ type: 'comments/rehydrate' })
      dispatch({ type: 'isFetching', payload: false })
    }
    else {
      await dispatch(fetchUsers());
      await dispatch(fetchPosts());
      await dispatch(fetchComments());

    }
  }
  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  setCurrentPage = (page) => {
    this.setState({ currentPage: page })
  }

  componentCleanup = () => {
    const { posts, comments, users } = this.props;

    sessionStorage.setItem("users", JSON.stringify(users))
    sessionStorage.setItem("posts", JSON.stringify(posts))
    sessionStorage.setItem("comments", JSON.stringify(comments))
  }

  setModal =(post)=>{
    const {isModalOpen} = this.state
    if(post){
      this.setState({ post:post , isModalOpen :!isModalOpen })
    } else{
      this.setState({ isModalOpen :!isModalOpen })
    }
  }


  render() {
    const { isFetching, dispatch, posts, users, comments } = this.props;
    const { currentPage } = this.state
    const totalPages = this.props.posts.length % 10 === 0 ? this.props.posts.length / 10 : this.props.posts.length / 10 + 1
    const currentPagePost = posts.filter((post, index) => {
      if (currentPage === 1) {
        return index < currentPage + 9
      }
      return index > (currentPage - 1) * 10 - 1 && index < (currentPage - 1) * 10 + 10
    })

    return (
      <div className="App">
        {isFetching ? (<div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>) :
          <div className="container" style={{ paddingTop: 50 }}>
            <div className="row justify-content-center">
              <div className="col-10 align-self-center">
                <div className="d-flex flex-column ">
                  {posts && currentPagePost.map((post) => post && <div style={{ paddingBottom: 20 }} key={post.id}><PostComponent post={post} comments={comments.filter(comment => comment.postId === post.id)} users={users} dispatch={dispatch} handleModal={this.setModal} /> </div>)}
                  <Pagination
                    current={currentPage}
                    total={Math.floor(totalPages)}
                    onPageChange={this.setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts, isFetching, users, comments } = state
  return { posts, isFetching, users, comments }
}


export default connect(mapStateToProps)(App);
