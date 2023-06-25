import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKED,
  UPDATE,
} from "../constants/actionTypes";

export const reducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
    case LIKED:
          return posts.map((eachItem) =>
            eachItem._id === action.payload._id ? action.payload : eachItem
          );
    case DELETE:
      return posts.filter((eachItem) => eachItem._id !== action.payload);
      default:
      return posts;
  }
};
