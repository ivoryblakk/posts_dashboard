
const initialState = {
  posts: [
  ],
  users: [],
  comments: [],
  isFetching: false
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'isFetching':
      return {
        ...state,
        isFetching: action.payload
      }
    case 'posts':
      return {
        ...state,
        posts: action.payload
      }
    case 'posts/rehydrate':
      return {
        ...state,
        posts: JSON.parse(sessionStorage.getItem("posts"))
      }
    case 'comments/rehydrate':
      return {
        ...state,
        comments: JSON.parse(sessionStorage.getItem("comments"))
      }

    case 'users/rehydrate':
      return {
        ...state,
        users: JSON.parse(sessionStorage.getItem("users"))
      }
    case 'comments':
      return {
        ...state,
        comments: action.payload
      }
    case 'users':
      return {
        ...state,
        users: action.payload
      }
    case 'delete/post':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        comments: state.comments.filter(comment => comment.postId !== action.payload),
      }

    default:
      return state
  }
}