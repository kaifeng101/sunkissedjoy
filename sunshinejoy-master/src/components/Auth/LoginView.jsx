import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Close } from '@mui/icons-material';
import {BsThreeDots} from 'react-icons/bs';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

import {AiFillGoogleCircle} from 'react-icons/ai';
import { IconButton } from '@mui/material';
import { AUTH_MODAL_STATES } from './AuthModal';
import useAuth from '../../hooks/useAuth';
import GoogleLoginButton from './GoogleLoginButton';



const INITIAL_FORM = {
    email : '',
    password : ''
}

const LoginView = ({setView,handleClose}) => {
    const [form,setForm] = useState(INITIAL_FORM);
    const handleChange =({target})=>setForm((prev)=>({...prev,[target.name] : target.value}));
    const [error,setError] = useState(INITIAL_FORM);
    const {loginUser,isLoginUserLoading} = useAuth({
        loginSuccessCallback : ()=>{
            handleClose();
        },
    })
    const handleSubmit = (e)=>{
        if (e) {
            e.preventDefault();
        }
        loginUser({data : form});
    }
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
                <MoreHorizIcon sx={{color : '#f97b64', fontSize : 55, position : 'relative' , left : -10}} />
                <div className='text-2xl font-semibold -mt-3'>Login</div>
            </div>
            <IconButton onClick={handleClose}><Close/></IconButton>
        </div>
        <form onSubmit={handleSubmit} className='mt-12 w-[60%] max-lg:w-[80%] max-md:w-[85%] max-sm:w-[90%] max-xs:w-[97%]  max-xl:w-[75%] mx-auto'>
            <div className='space-y-4'>
            <AuthInput name='email' required={true}  type='email' onChange={handleChange} value={form.email} error={error.email} placeholder='Email'/>
            <AuthInput name='password'  type='password' required={true} onChange={handleChange} error={form.password} value={form.password} placeholder='Password'/>
            </div>.
            <div className='mt-2'>
                <AuthButton type='submit' disabled={isLoginUserLoading} title={isLoginUserLoading?'Loading..':'Sign In'}/>
            </div>
            <div onClick={()=>setView(AUTH_MODAL_STATES.REGISTER)} className='mt-10 text-xl text-center cursor-pointer max-sm:text-lg'>Create Account </div>
            <div onClick={()=>setView(AUTH_MODAL_STATES.FORGOT_PASSWORD)} className='mt-4 text-xl text-center cursor-pointer max-sm:text-lg'>Forgot Password? </div>
            <GoogleLoginButton handleClose={handleClose} isLogin={true} type='button' className='mt-6'/>
        </form>
    </div>
  )
}

export default LoginView