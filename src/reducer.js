
const initialState = {
    posts: [
    ],
    users:[],
    comments:[],
    isFetching:false
  }

export default function appReducer(state = initialState, action) {
    switch (action.type) {
      case 'isFetching': 
      return{ ...state,
        isFetching: action.payload
      }
      case 'posts': 
        return{ ...state,
          posts: action.payload
        }
      case 'comments': 
        return{ ...state,
          comments: action.payload
        }
      case 'users': 
        return{ ...state,
          users: action.payload
        }
    
      default:
        return state
    }
  }