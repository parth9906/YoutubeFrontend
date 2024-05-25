import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { LOGIN_PAGE_FIELDS } from '../constants';
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { LOGIN_USER_URL } from '../constants.url';
import { useDispatch, useSelector } from 'react-redux';
import { loader } from '../store/loadingSlice';
import { openSnackBar } from '../store/snackBarSlice';
import { useNavigate } from 'react-router-dom';
import { callAPIWithAxios } from '../utils/makeAPICall';
import { setAccessToken, setRefreshToken, setUser } from '../store/userSlice';

const LoginPage = () => {
    const defaultData = {
        [LOGIN_PAGE_FIELDS.EMAIL]:"",
        [LOGIN_PAGE_FIELDS.PASSWORD]:"",
    }
    
    const defaultErrorMessage = {
        [LOGIN_PAGE_FIELDS.EMAIL]:"",
        [LOGIN_PAGE_FIELDS.PASSWORD]:""
    }
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const [loginData, setloginData] = useState(defaultData)
    const [globalErrorMessage, setGlobalErrorMessage] = useState(defaultErrorMessage);
    const [showPassword, setShowPassword] = useState(false)
    const [isValidData, setIsvalidData] = useState(true)
    const loading = useSelector(store=> store.loader.loading)
    
    const goToRegisterPage = ()=>{
        navigate('/register', { replace: true })
    }

    const handleloginData = (value, key)=>{
        setloginData({...loginData,[key]:value});
    }

    const validateData = (key)=>{
        let error = '';
        const value = loginData[key];
        if(!value){
            error = `${key.charAt(0).toUpperCase()}${key.slice(1)} is required.`;
        }
        const tempGlobalErrorObj = {...globalErrorMessage, [key]:error}
        setGlobalErrorMessage(tempGlobalErrorObj)
        const isValid = Object.values(tempGlobalErrorObj)?.filter((item) => item)?.length === 0;
        setIsvalidData(isValid)
    }

    const handleNavigation = ()=>{
        navigate('/',{replace: true});
    }


    const handleFormSubmit = async(event)=>{
        event.preventDefault();  
        try {
            dispatch(loader(true))
            const data = await callAPIWithAxios(LOGIN_USER_URL , loginData,{});
            if(data?.success){
                dispatch(setUser(data?.data?.user));
                dispatch(setAccessToken(data?.data?.accessToken));
                dispatch(setRefreshToken(data?.data?.refreshToken));
                dispatch(openSnackBar({message: data?.message, color: 'success'}))
                handleNavigation();
            }else{
                dispatch(openSnackBar({message: data?.message, color: 'danger'}))
            }
        } catch (error) {
            console.log("An error occured during login:: ", error)
        }
        finally{
            dispatch(loader(false));
        }
        
            
        

    }



  
    
    
return (
    <div className='w-full flex justify-center items-center' >
        <div className='w-3/4 flex p-12'>
            <div className='w-1/2'>
                <img src="https://res.cloudinary.com/parth-youtubebackend/image/upload/v1715857207/p988xt9j0suj8hlfk0wr.jpg" alt="image" loading="lazy" className='object-cover w-full h-full'/>
            </div>
            <div className='w-1/2 px-16 bg-slate-100 py-36'>
                
                <form onSubmit={(event)=>handleFormSubmit(event)} className='flex flex-col w-full'>
                    <div className='w-full py-2'>
                        <TextField
                            fullWidth
                            name='email'
                            key={'login-'+ LOGIN_PAGE_FIELDS.EMAIL}
                            error={!!globalErrorMessage[LOGIN_PAGE_FIELDS.EMAIL]}
                            helperText={globalErrorMessage[LOGIN_PAGE_FIELDS.EMAIL]}
                            label="Email"
                            value={loginData?.[LOGIN_PAGE_FIELDS.EMAIL]}
                            onChange={(e)=>{handleloginData(e.target.value,LOGIN_PAGE_FIELDS.EMAIL)}}
                            onBlur={()=>validateData(LOGIN_PAGE_FIELDS.EMAIL)}
                            
                        />
                    </div>

                    <div className='w-full py-2 relative'>
                        <TextField
                            fullWidth
                            name="password"
                            key={'login-'+ LOGIN_PAGE_FIELDS.PASSWORD}
                            error={!!globalErrorMessage[LOGIN_PAGE_FIELDS.PASSWORD]}
                            helperText={globalErrorMessage[LOGIN_PAGE_FIELDS.PASSWORD]}
                            type={showPassword?'text':'password'}
                            label="Password"
                            value={loginData?.[LOGIN_PAGE_FIELDS.PASSWORD]}
                            onChange={(e)=>{handleloginData(e.target.value,LOGIN_PAGE_FIELDS.PASSWORD)}}
                            onBlur={()=>validateData(LOGIN_PAGE_FIELDS.PASSWORD)}
                            inputProps={{style:{paddingRight:45}}}
                            InputLabelProps={{ shrink: true}} 
                        />
                        <span className='absolute right-4 top-7 cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>{showPassword?<IoIosEyeOff size={20} fill='gray'/> : <IoIosEye size={20} fill='gray'/>}</span>
                    </div>

                    <div className='w-full pt-8'>
                    <LoadingButton
                        type='submit'
                        onClick={()=>{}}
                        disabled={!isValidData}
                        loading={loading}
                        // endIcon={}
                        // loadingPosition="end"
                        variant="contained"
                        sx={{width:'100%', height: "50px"}}
                    >
                        <span>Login</span>
                    </LoadingButton>
                    </div>
                </form>

                <div className='py-4 text-sm'>
                    <span className='text-green-400'>Don't have an account?  </span> <button onClick={goToRegisterPage} className='text-sky-700'>Register</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default LoginPage


