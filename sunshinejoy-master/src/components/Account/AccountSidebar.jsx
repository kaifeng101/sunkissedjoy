import React from 'react'
import {TiUser} from 'react-icons/ti';
import {MdArrowForwardIos} from 'react-icons/md';
import {FaPrescription} from 'react-icons/fa';
import {GoPackage} from 'react-icons/go'
import {AiOutlineHome, AiOutlineFileDone, AiTwotoneStar} from 'react-icons/ai'
import {BsBag} from 'react-icons/bs';
import {RiLogoutCircleLine, RiLockPasswordLine, RiDraftFill} from 'react-icons/ri';
import {FaFirstdraft} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../../hooks/useAppStore';
import { APP_AUTH_KEY } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const MenuItem = (props)=>{
    const {title,link,icon, onClick} = props;
    return (
        <div onClick={onClick} className='flex cursor-pointer  justify-between max-2xl:px-2 items-center'>
        <div className='flex p-2 items-center space-x-4 lg:px-3'>
            <div className='p-3 border-2 rounded-full flex items-center justify-center bg-gray-100'>{icon}</div>
            <div className=' text-lg max-2xl:text-base'>{title}</div>
        </div>
        <div>
        <MdArrowForwardIos className='text-gray-500' size={18}/>
        </div>
        
    </div>
    );
}

const AccountSidebar = () => {
    const user = useAppStore(state=>state.user);
    const setIsLoggedin = useAppStore(state=>state.setIsLoggedin);
    const setUser = useAppStore(state=>state.setUser);
    const navigate = useNavigate();

    const handleLogout = ()=>{
        setIsLoggedin(false);
        localStorage.removeItem(APP_AUTH_KEY);
        navigate('/')
        setUser(null);
        toast.success('Logged out successfully')
    }
    
    
    const router = useNavigate();
  return (
    <div className='bg-white rounded-md w-full'>
        <div className='bg-white flex space-x-5 font-poppins py-3 px-4 rounded-md'>
            <div className='h-[60px] flex items-center bg-primary bg-opacity-20 justify-center w-[60px]  rounded-full'>
                <TiUser size={40} className='text-primary'/>
            </div>
            <div>
                <div className='font-semibold font-poppins text-2xl lg:text-xl'>{`${user?.firstName} ${user?.lastName}`}</div>
                <div className='text-sm text-gray-400 mt-[2px] lg:mt-1'>{user?.email}</div>
                {/* <div className='text-sm mt-[1px] text-gray-400'>{user.}</div> */}
            </div>
        </div>
        <div className='mt-2 p-3 lg:p-2 bg-white space-y-4'>
              <MenuItem onClick={()=>router('/account/user')} title={'Account Information'} icon={<TiUser size={24} className='text-gray-500'/>}/>
              <hr />
              <MenuItem onClick={()=>router('/account/drafts')} title={'Saved Drafts'} icon={<RiDraftFill size={24} className='text-gray-500'/>}/>
              <hr />
              <MenuItem onClick={()=>router('/account/mygifts')} title={'My Orders'} icon={<AiTwotoneStar className='text-gray-600' size={22}/>}/>
              <hr />
              {/* <MenuItem onClick={()=>router('/account/myprescriptions')} title={'My Prescriptions'} icon={<AiOutlineFileDone className='text-gray-600' size={22}/>}/>
              <hr />
              <MenuItem onClick={()=>router('/account/myaddress')} title={'My Address'} icon={<AiOutlineHome className='text-gray-600' size={22}/>}/>
              <hr />
              <MenuItem onClick={()=>router('/account/saveditems')} title={'Saved Items'} icon={<BsBag className='text-gray-600' size={22}/>}/>
              <hr />
              <MenuItem onClick={()=>router('/account/security')} title={'Security'} icon={<RiLockPasswordLine className='text-gray-600' size={22}/>}/>
              <hr /> */}
              <MenuItem onClick={handleLogout} title={'Logout'} icon={<RiLogoutCircleLine className='text-gray-600' size={22}/>}/>
              
            </div>

    </div>
  )
}

export default AccountSidebar
