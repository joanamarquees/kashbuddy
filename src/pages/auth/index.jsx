import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // to change from login to home page
import { Button } from '../../components/button.tsx';

import logo from '../../assets/logo_light.svg'

export const Auth = () => {

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    // Sign in with Google
    const results = await signInWithPopup(auth, provider); // async call
    const authInfo = {
      userId: results.user.uid,
      name: results.user.displayName,
      isAuth: true, // to check that the user is logged in
    }
    localStorage.setItem('auth', JSON.stringify(authInfo)); // because we can't store objects in local storage
    navigate('/home'); // redirect to home page
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="Kashbuddy logo"/>
      <p className="leading-relaxed max-w-80 text-center font-sans font-semibold text-lg text-green-100"> 
        <p> Welcome to Kashbuddy! </p>
        <p> Please login with Google to continue </p>
      </p>
      <Button onClick={signInWithGoogle}>
        Login with Google
      </Button>
      {/* <button className="login-button" onClick={signInWithGoogle}> Login with Google </button> */}
    </div>
  );
};