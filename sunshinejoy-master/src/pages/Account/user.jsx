import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { editUserAPI } from "../../api/auth.api";
import AccountLayout from "../../components/Account/AccountLayout";
import useAppStore from "../../hooks/useAppStore";
import { isLoggedinUser, APP_AUTH_KEY } from "../../hooks/useAuth";
const InputField = (props) => {
  const {
    id,
    name,
    placeholder,
    type,
    value,
    label,
    onChangeHandler,
    editMode,
  } = props;

  return (
    <div className="font-poppins">
      <label htmlFor={id} className="text-primary text-sm font-semibold">
        {label}
      </label>
      <div>
        <input
          name={name}
          type={type}
          onChange={onChangeHandler}
          id={id}
          disabled={!editMode}
          placeholder={placeholder}
          value={value}
          className="py-[8px] disabled:bg-white w-[94%] border-b-2"
        />
      </div>
    </div>
  );
};
const  INITIAL_FORM = {
  firstName : "",
  lastName : "",
  email : "",
  address : "",
}

const UserPage = () => {
  const user = useAppStore(state=>state.user);
  const setUser = useAppStore(state=>state.setUser);

  const [userForm, setUserForm] = useState(INITIAL_FORM);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  useEffect(()=>{
    setUserForm(user);
  }, [user]);

  const handleChange = (e) => {
    setUserForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    setError("");
  };
  const {isLoading : userUpdaeLoading,mutate : userUpdateCall} = useMutation(editUserAPI, {
    onSuccess : (data)=>{
      const authData = isLoggedinUser()
      localStorage.setItem(APP_AUTH_KEY, JSON.stringify({user : data.user,token : authData.token}));
      toast.success('User has been updated successfully!');
      setUser(data?.user);
    setEditMode(false);
    },
    onError : (error)=>{
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  })
  // const router = useRouter()
  const handleSubmit = () => {
    userUpdateCall({
      data : userForm
    });
  };
  const navigate = useNavigate();
  return (
    <AccountLayout user={user}>
      <div className="p-3 font-poppins lg:p-4">
        <div className="text-2xl font-semibold flex gap-4 items-center"><MdArrowBack onClick={()=>navigate('/account')} className="hidden max-md:block"/>USER DETAILS</div>
        {editMode && (
          <div className="text-green-600 text-sm mt-1">
            You are in Edit Mode, You can change any field and save the changes.
          </div>
        )}
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        <div className="mt-5 space-y-7 lg:space-y-0">
          <div className="w-full">
            <div className="text-gray-700 font-poppins">LOGIN DETAILS</div>
            <div className="mt-6 space-y-5 w-full">
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4">
              <InputField
                value={userForm.firstName}
                editMode={editMode}
                onChangeHandler={handleChange}
                name="firstName"
                label="First Name"
                type="text"
                placeholder="Edit Your First Name"
              />
              <InputField
                value={userForm?.lastName}
                editMode={editMode}
                onChangeHandler={handleChange}
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Edit Your Last Name "
              />
              </div>
              <InputField
                value={userForm?.address}
                editMode={editMode}
                onChangeHandler={handleChange}
                name="address"
                label="Address"
                type="text"
                placeholder="Edit Your Primary Address "
              />
            </div>
          </div>
          
        </div>
        <div className="flex space-x-3 mt-8">
          {!editMode && (
            <div
              className="p-2 bg-primary text-white w-fit rounded-md cursor-pointer"
              onClick={() => setEditMode(true)}
            >
              Edit Information
            </div>
          )}
          {editMode && (
            <button
            disabled={userUpdaeLoading}
              className="p-2 bg-primary disabled:opacity-30 cursor-pointer text-white w-fit rounded-md"
              onClick={handleSubmit}
            >
              {userUpdaeLoading?'Loading...':'Save'}
            </button>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default UserPage;
