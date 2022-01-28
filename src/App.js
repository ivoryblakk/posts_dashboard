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
      currentPage: 1
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
    // console.log('posts', posts)
    console.log('totalPages', Math.floor(totalPages))
    console.log('currentPage', currentPage)
    // console.log('users',users)
    // console.log('comments',comments)
    return (
      <div className="App">
        {isFetching ? (<div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>) :
          <div class="container" style={{ paddingTop: 50 }}>
            <div class="row ">
              <div class="col align-self-center">
                <div className="d-flex flex-column justify-content-center">

                  {posts && currentPagePost.map((post) => post && <div  style={{paddingBottom:20}}key={post.id}><PostComponent post={post} comments={comments.filter(comment => comment.postId === post.id)} users={users} dispatch={dispatch} /> </div>)}

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
