import React, {useEffect, useState} from 'react';
import './PlanScreen.css'
import db from '../firebase'
import {useSelector } from 'react-redux';
import {selectUser } from '../features/userSlice'
import { loadStripe } from '@stripe/stripe-js'



function PlanScreen() {
  const [products, setProducts] = useState([]);
  const  pub_key = "pk_test_51J6aCTGOTMn4jBODvk6Wcv52Ze86p1OdlbcBkeFUmnhjVeKlmRAJMC07h1dmC6Le2B5N8cfnG7AUCuh03502IJnl00BJjPvfZ4"  
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
 

  const loadCheckout = async (priceId) => {
    const docRef = await db
    .collection("customers")
    .doc(user.uid)
    .collection('checkout_sessions')
    .add({
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    docRef.onSnapshot(async(snap) => {
      const {error, sessionId} = snap.data();

      if (error){
        // show customer alert with error message
        alert(`An error has occurred: ${error.message}`);
      }

      if (sessionId) {
        // sessions exists --> redirect to checkout
        const stripe = await loadStripe(pub_key);
        stripe.redirectToCheckout({ sessionId});
      }
    })
  }
  
  useEffect(() => {
    db.collection('customers')
    .doc(user.uid)
    .collection('subscriptions')
    .get()
    .then (querySnapshot => {
      querySnapshot.forEach(async subscription => {
        setSubscription({
          role: subscription.data().role,
          current_period_start: subscription.data().current_period_start.seconds,
          current_period_end: subscription.data().current_period_end.seconds,
        })
        localStorage.setItem('subscription', subscription.data().role)
      });
    })

    
  },[user.uid]);
  
  useEffect(() => {
    db.collection('products')
    .where('active', '==', true)
    .get()
    .then((querySnapshot) => {
      const products ={};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await productDoc.ref.collection('prices').get();
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products)
    });
  },[]);

 
  return (
    <div className="planScreen">
      {subscription && 
      <p>Renewal Data: {new Date(subscription?.current_period_end * 1000)
        .toLocaleDateString()}</p>
      }
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
        return(
          <div key = {productId} className= {`${isCurrentPackage && 'planScreen__plan--disabled'} planScreen__plan`}>
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick= {() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
              {!isCurrentPackage ? 'Subscribe' : 'Current Package'}
            </button>
          </div>
        )
      })}
    </div>
  );
}

export default PlanScreen