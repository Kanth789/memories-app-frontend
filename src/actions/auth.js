import {
    AUTH
  } from "../constants/actionTypes";
import * as api from "../api/index";


export const signin = (formdata,naviagte)=> async(dispatch) =>{
    try{
        const {data} = await api.signIn(formdata)
        dispatch({type:AUTH,data})
        naviagte('/')
    }
    catch(err){
        console.log(err)
    }
}

export const signup = (formdata,naviagte)=> async(dispatch) =>{
    try{
        const {data} = await api.signUp(formdata)
        dispatch({type:AUTH,data})
        naviagte('/')
    }
    catch(err){
        console.log(err)
    }
}