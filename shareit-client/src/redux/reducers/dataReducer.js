import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  ADD_POST,
  SET_POST,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialState, action) {
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        let temp = state.post.comments;
        state.post = action.payload;
        state.post.comments = temp;
      }
      return {
        ...state,
      };
    case DELETE_POST:
      index = state.posts.findIndex((post) => post.postId === action.payload);
      state.posts.splice(index, 1);
      return {
        ...state,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SUBMIT_COMMENT:
      index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      let updatedPosts = JSON.parse(JSON.stringify(state.posts));

      // Updates comment count main page
      updatedPosts[index].commentCount += 1;
      return {
        ...state,
        posts: updatedPosts,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
          // Update comment count on opened post
          commentCount: state.post.commentCount + 1,
        },
      };
    default:
      return state;
  }
}
