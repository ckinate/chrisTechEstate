import { useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
 import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js'
import OAuth from '../components/OAuth.jsx';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      //keep all previous values of form data ie username, email and password
      ...formData,
      //[e.target.id]: e.target.value is an object with a dynamic key. e.target.id is used as the key, and e.target.value is used as the value. 
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    //prevent refreshing page when submit occurs
    e.preventDefault();
    try{
        // setLoading(true);
        dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',        
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
       // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message))  
        return;
      }
      //  setLoading(false);
        //  setError(null);
      dispatch(signInSuccess(data));
      navigate('/');
      //console.log(data);
    }
    catch(error){
    //   setLoading(false);
        //   setError(error.message);
        dispatch(signInFailure(data.message)) 
    }
    }
    
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign in</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>        
        <input type='text' placeholder='email' id='email' className='border p-3 rounded-lg' onChange={handleChange}/>
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange}/>
        <button disabled = {loading} className='bg-slate-500 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>
          {/* Sign up */}
          {loading ? 'Loading...' : 'Sign in'}
        </button>
         <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Do not have an account?</p>
        <Link to = {"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
