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
    firstName : '',
    lastName : '',
    email : '',
    password : ''
};

const RegisterView = ({handleClose,setView}) => {
    const [form,setForm] = useState(INITIAL_FORM);
    const [error,setError] = useState(INITIAL_FORM);
    const {isRegisterUserLoading,registerUser} = useAuth({
        registerSuccessCallback : ()=>{
            setView(AUTH_MODAL_STATES.LOGIN);
        }
    });
    const handleChange =({target})=>setForm((prev)=>({...prev,[target.name] : target.value}));
    const handleSubmit = (e)=>{
        if (e) {
            e.preventDefault();
        }
        registerUser({data : form});

    }
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
                <MoreHorizIcon sx={{color : '#f97b64', fontSize : 55, position : 'relative' , left : -10}} />
                <div className='text-2xl font-semibold -mt-3'>Create an account with us!</div>

            </div>
            <IconButton onClick={handleClose}><Close/></IconButton>
        </div>
        <form onSubmit={handleSubmit} className='mt-12 w-[65%] max-xl:w-[85%] max-lg:w-[90%] max-md:w-[99%] mx-auto'>
            <div className='space-y-4'>
            <div className='w-full grid grid-cols-2 gap-3 max-sm:grid-cols-1'>
                <AuthInput name='firstName' value={form.firstName} onChange={handleChange} required={true} placeholder='First Name'/>
                <AuthInput name='lastName' value={form.lastName} onChange={handleChange} required={true}  placeholder='Last Name'/>
            </div>
            <AuthInput name='email' type='email' value={form.email} onChange={handleChange} required={true} placeholder='Email'/>
            <AuthInput name='password' type='password' value={form.password} onChange={handleChange} required={true} placeholder='Password'/>
            </div>.
            <div className='mt-2'>
                <AuthButton type='submit' title={isRegisterUserLoading?'Loading..':'Sign In'}/>
            </div>
            <div onClick={()=>setView(AUTH_MODAL_STATES.LOGIN)} className='mt-8 text-xl text-center cursor-pointer'>Already have an account? </div>
          
            <GoogleLoginButton handleClose={handleClose} isLogin={false}  type='button' className='mt-6'/>
        </form>
    </div>
  )
}

export default RegisterView