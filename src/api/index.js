import axios from 'axios'

const url = "http://localhost:5000"
const API = axios.create({baseURL:url})

API.interceptors.request.use((req)=>{
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req
})

export const fetchPost = () => API.get('/posts')
export const createPost = (newPost) =>API.post('/posts',newPost)
export const updatePost = (id,updatedPost) => API.put(`/posts/${id}`,updatedPost)
export const deletPost = (id)=>API.delete(`/posts/${id}`)
export const likedPost = (id)=>API.put(`/posts/${id}/likedPost`)

export const signIn = (formdata)=>API.post('/user/signin',formdata) 

export const signUp = (formdata) => {
    return API.post('/user/signup',formdata);
  };