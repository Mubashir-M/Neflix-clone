import React, { useEffect, useState } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice'
import db from './firebase'



function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [subscription, SetSubscription] = useState(null)

  useEffect(() => {
    const unsubscribe =  auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );

        db.collection('customers')
        .doc(userAuth.uid)
        .collection('subscriptions')
        .get()
        .then (querySnapshot => {
          querySnapshot.forEach(async subscription => {
            localStorage.setItem('subscription', subscription.data().role)
            SetSubscription(subscription.data().role)
          });
        })

      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  },[dispatch, subscription]);


  
  return (
    <div className="app">
     
      <Router>
        {!user ? <LoginScreen/> : (
          <Switch>
            <Route path ="/profile">
              <ProfileScreen/>
            </Route>
            <Route path="/">
              <HomeScreen/>
            </Route>
          </Switch>
        )}
    </Router>
    </div>
  );
}

export default App;
