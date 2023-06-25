import * as api from "../api/index";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKED,
  UPDATE,
} from "../constants/actionTypes";

export const getPosts = () => async (disptach) => {
  try {
    const { data } = await api.fetchPost();
    disptach({ type: FETCH_ALL, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (disptach) => {
  try {
    await api.deletPost(id);
    disptach({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const likedPost = (id) => async (disptach) => {
  try {
    const { data } = await api.likedPost(id);
    disptach({ type: LIKED, payload: data });
  } catch (err) {
    console.log(err);
  }
};
