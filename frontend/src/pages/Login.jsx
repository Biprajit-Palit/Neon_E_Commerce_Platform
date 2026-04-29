import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const NeonLogo = () => (
  <svg width="80" height="28" viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lng" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6C5CE7"/>
        <stop offset="100%" stopColor="#00B894"/>
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#lng)" y="2"/>
    <line x1="9" y1="10" x2="9" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="23" y1="10" x2="23" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    <line x1="9" y1="10" x2="23" y2="26" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
    <text x="40" y="24" fontFamily="'Cormorant Garamond', serif" fontSize="22" fontWeight="500" fill="url(#lng)">Neon</text>
  </svg>
);

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-purple-400 transition-colors placeholder-gray-400'

  return (
    <div className='flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-5'>
      <div className='mb-2'>
        <NeonLogo />
      </div>

      <div className='text-center'>
        <h2 className='text-2xl font-semibold text-gray-800'>{currentState === 'Login' ? 'Welcome back' : 'Create your account'}</h2>
        <p className='text-sm text-gray-400 mt-1'>{currentState === 'Login' ? 'Sign in to your Neon account' : 'Join Neon — fashion redefined'}</p>
      </div>

      <form onSubmit={onSubmitHandler} className='w-full flex flex-col gap-4 mt-2'>
        {currentState !== 'Login' && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className={inputClass}
            placeholder='Full name'
            required
          />
        )}
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className={inputClass} placeholder='Email address' required />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className={inputClass} placeholder='Password' required />

        <div className='flex justify-between text-xs text-gray-400 mt-1'>
          <p className='cursor-pointer hover:text-purple-500 transition-colors'>Forgot password?</p>
          {currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-purple-500 transition-colors'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-purple-500 transition-colors'>Already have an account?</p>
          }
        </div>

        <button
          type='submit'
          className='w-full text-white py-3 rounded-xl text-sm font-medium tracking-widest mt-2 transition-opacity hover:opacity-90'
          style={{ background: 'linear-gradient(135deg,#6C5CE7,#00B894)' }}
        >
          {currentState === 'Login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </button>
      </form>
    </div>
  )
}

export default Login