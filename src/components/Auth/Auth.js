import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import LockIcon from "@mui/icons-material/Lock";
import useStyles from "./styles";
import InputField from "./InputField";
import { GoogleLogin } from "react-google-login";
import Icon from './icon'
import {gapi} from 'gapi-script'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {  signin, signup } from "../../actions/auth";


const initalState = {
  firstName:"",
  lastName:"",
  email:"",
  password:'',
  confirmPassword:''
}

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formdata,setData] = useState(initalState)
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onClickSwitch = () => {
    setData(initalState)
    setIsSignUp(!isSignUp);
    setShowPassword(!showPassword)
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignUp){
      dispatch(signup(formdata,navigate))
    }else{
      dispatch(signin(formdata,navigate))
    }
  };
  const googleAuthSuccess = async (res)=>{
    const result = res?.profileObj
    const token = res?.tokenId
    try{
      dispatch({type:'AUTH',data:{result,token}})
      navigate('/')
    }
    catch(err){
      console.log(err)
    }
  }
  const handleChange = (e) => {
    setData({...formdata,[e.target.name]:e.target.value})
  };
  const googleAuthFailure = (error)=>{
    console.log("Google Sign In Failed")
  }
  const clientId="42122916395-9eh5plecuuf8brqu90ebb2asosar9rml.apps.googleusercontent.com"
  useEffect(()=>{gapi.load("client:auth2",()=>{
    gapi.auth2.init({clientId:clientId})
  })},[])
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <InputField
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />

                <InputField
                  name="lastName"
                  label="last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <InputField
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <InputField
              name="password"
              label="Password"
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              type={showPassword ? "text" : "password"}
            />
            {isSignUp && (
              <InputField
                name="confirmPassword"
                label="Confrim Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId = {clientId}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >Google Sign In</Button>
            )}
            onSuccess={googleAuthSuccess}
            onFailure={googleAuthFailure}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={onClickSwitch}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Dont't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
