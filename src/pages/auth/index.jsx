import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // to change from login to home page

import { auth, provider } from '../../config/firebase-config';
import { signInWithRedirect } from 'firebase/auth';

import { Button } from '../../components/Button.jsx';

import logo from '../../assets/logo_light.svg'

export const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
    
  const signInWithGoogle = async () => {
    // Sign in with Google
    try {
      var results = await signInWithRedirect(auth, provider); // async call
    } catch (error) {
      setError(error.message);
      return;
    }
    
    const authInfo = {
      userId: results.user.uid,
      name: results.user.displayName,
      isAuth: true, // to check that the user is logged in
    }
    localStorage.setItem('auth', JSON.stringify(authInfo)); // because we can't store objects in local storage
    
    navigate('/home');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} className="w-64 md:w-96" alt="Kashbuddy logo"/>
      <div className="leading-relaxed max-w-80 text-center font-sans font-semibold text-lg text-green-100"> 
        <p> Welcome to Kashbuddy! </p>
        <p> Please login with Google to continue </p>
      </div>
      <Button className="loetError(error.message);gin-button" onClick={signInWithGoogle}>
        Login with Google
      </Button>
      <p className="text-indigo-400 text-sm">{error}</p>

      {/* TODO: once logged in, if the user has no accounts, then redirect to accounts page */}
      {/* {accounts.length >= 1 ?
        navigate('/home') // redirect to accounts page
        : navigate('/accounts') // redirect to accounts page
      } */}

    </div>
  );
};