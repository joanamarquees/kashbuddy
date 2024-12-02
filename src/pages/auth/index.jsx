import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // to change from login to home page

import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useGetUserInfo } from '../../hooks/useGetUserInfo'

import { Button } from '../../components/ui/Button.jsx';

import logo from '../../assets/logo_light.svg';

export const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { isAuth } = useGetUserInfo();
  
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      const authData = {
        userId: result.user.uid,
        name: result.user.displayName,
        isAuth: true,
      };
      localStorage.setItem('auth', JSON.stringify(authData));
      navigate('/home')
      
    } catch (error) {
      setError(error.message);
    }
  };
  
  if(isAuth) navigate('/home');

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-8'>
      <img src={logo} className='w-64 md:w-96' alt='Kashbuddy logo' />
      <div className='leading-relaxed max-w-80 text-center font-sans font-semibold text-lg text-green-100'>
        <p>Welcome to Kashbuddy!</p>
        <p>Please login with Google to continue</p>
      </div>
      <Button className='login-button' onClick={signInWithGoogle}>
        Login with Google
      </Button>
      {error && <p className='text-red-400 text-sm'>{error}</p>}
    </div>
  );
};
