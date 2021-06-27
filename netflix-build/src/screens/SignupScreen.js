import React, { useRef } from 'react';
import './SignupScreen.css'
import { auth } from '../firebase'

function SignUpScreen() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).then((user) => {
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  const SignIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).then((user) => {
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  return (
    <div className="signupScreen">
      <h1>Sign In</h1>
      <form >
        <input ref= {emailRef} type="email" placeholder="Email"/>
        <input ref= {passwordRef} type="password" placeholder="Password"/>
        <button type="submit" onClick={SignIn}>Sign In</button>
        <h4>
          <span className="signupScreen__gray">New to Netflix? </span>
          <span className="signupScreen__link" onClick={register}>Sign up Now.</span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;