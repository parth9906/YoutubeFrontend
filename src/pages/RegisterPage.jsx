import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { textFieldStyle } from '../customStyles/registerPage.style';
import CustomFileInput from '../component/CustomFileInput';
import { REGISTER_PAGE_FIELDS } from '../constants';
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { REGISTER_USER_URL } from '../constants.url';
import { useDispatch, useSelector } from 'react-redux';
import { loader } from '../store/loadingSlice';
import { openSnackBar } from '../store/snackBarSlice';
import { callAPIWithAxios } from '../utils/makeAPICall';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const defaultData = {
        [REGISTER_PAGE_FIELDS.FULL_NAME]:"",
        [REGISTER_PAGE_FIELDS.EMAIL]:"",
        [REGISTER_PAGE_FIELDS.USERNAME]:"",
        [REGISTER_PAGE_FIELDS.PASSWORD]:"",
        [REGISTER_PAGE_FIELDS.AVATAR_IMAGE]:{},
        [REGISTER_PAGE_FIELDS.COVER_IMAGE]:{},
    }

    const defaultErrorMessage = {
        [REGISTER_PAGE_FIELDS.FULL_NAME]:"",
        [REGISTER_PAGE_FIELDS.EMAIL]:"",
        [REGISTER_PAGE_FIELDS.USERNAME]:"",
        [REGISTER_PAGE_FIELDS.PASSWORD]:"",
        [REGISTER_PAGE_FIELDS.AVATAR_IMAGE]:"",
        [REGISTER_PAGE_FIELDS.COVER_IMAGE]:"",
    }
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState(defaultData)
    const [globalErrorMessage, setGlobalErrorMessage] = useState(defaultErrorMessage);
    const [showPassword, setShowPassword] = useState(false)
    const [isValidData, setIsvalidData] = useState(true)
    
    const loading = useSelector(store=> store.loader.loading)
    const goToLoginPage = ()=>{
        navigate('/login', { replace: true })
    }

    const handleRegisterData = (value, key)=>{
        setRegisterData({...registerData,[key]:value});
    }

    const validateData = (key)=>{
        let error = '';
        const value = registerData[key];
        if(!value){
            error = `${key.charAt(0).toUpperCase()}${key.slice(1)} is required.`;
        }
        const tempGlobalErrorObj = {...globalErrorMessage, [key]:error}
        setGlobalErrorMessage(tempGlobalErrorObj)
        const isValid = Object.values(tempGlobalErrorObj)?.filter((item) => item)?.length === 0;
        setIsvalidData(isValid)
    }


    const handleFormSubmit = async(event)=>{
        event.preventDefault();
        
        const formData = new FormData();
        formData.append(REGISTER_PAGE_FIELDS.FULL_NAME, registerData[REGISTER_PAGE_FIELDS.FULL_NAME])
        formData.append(REGISTER_PAGE_FIELDS.EMAIL, registerData[REGISTER_PAGE_FIELDS.EMAIL])
        formData.append(REGISTER_PAGE_FIELDS.USERNAME, registerData[REGISTER_PAGE_FIELDS.USERNAME])
        formData.append(REGISTER_PAGE_FIELDS.PASSWORD, registerData[REGISTER_PAGE_FIELDS.PASSWORD])
        formData.append(REGISTER_PAGE_FIELDS.AVATAR_IMAGE, registerData[REGISTER_PAGE_FIELDS.AVATAR_IMAGE]?.[0])
        formData.append(REGISTER_PAGE_FIELDS.COVER_IMAGE, registerData[REGISTER_PAGE_FIELDS.COVER_IMAGE]?.[0])
        
        dispatch(loader(true))
        const data = await callAPIWithAxios(REGISTER_USER_URL, formData)
        
        if(data?.success){
            dispatch(openSnackBar({message: data?.message, color: 'success'}))
            navigate('/login', { replace: true})
        }else{
            dispatch(openSnackBar({message: data?.message, color: 'danger'}))
        }
        dispatch(loader(false));
    }
    
    
return (
    <div className='w-full flex justify-center items-center' >
        <div className='w-3/4 flex p-12'>
            <div className='w-1/2'>
                <img src="https://res.cloudinary.com/parth-youtubebackend/image/upload/v1715857207/p988xt9j0suj8hlfk0wr.jpg" alt="image" loading="lazy" className='object-cover w-full h-full'/>
            </div>
            <div className='w-1/2 px-16 bg-slate-100 py-16'>
                
                <form onSubmit={handleFormSubmit} className='flex flex-col w-full'>
                    <div className='w-full py-2'>
                        <TextField
                            key={'register-'+REGISTER_PAGE_FIELDS.FULL_NAME}
                            fullWidth
                            error={!!globalErrorMessage[REGISTER_PAGE_FIELDS.FULL_NAME]}
                            helperText={globalErrorMessage[REGISTER_PAGE_FIELDS.FULL_NAME]}
                            label="Full Name"
                            value={registerData?.[REGISTER_PAGE_FIELDS.FULL_NAME]}
                            onChange={(e)=>{handleRegisterData(e.target.value,REGISTER_PAGE_FIELDS.FULL_NAME)}}
                            onBlur={()=>validateData(REGISTER_PAGE_FIELDS.FULL_NAME)}
                        />
                    </div>

                    <div className='w-full py-2'>
                        <TextField
                            key={'register-'+REGISTER_PAGE_FIELDS.EMAIL}
                            fullWidth
                            error={!!globalErrorMessage[REGISTER_PAGE_FIELDS.EMAIL]}
                            helperText={globalErrorMessage[REGISTER_PAGE_FIELDS.EMAIL]}
                            label="Email"
                            value={registerData?.[REGISTER_PAGE_FIELDS.EMAIL]}
                            onChange={(e)=>{handleRegisterData(e.target.value,REGISTER_PAGE_FIELDS.EMAIL)}}
                            onBlur={()=>validateData(REGISTER_PAGE_FIELDS.EMAIL)}
                        />
                    </div>

                    <div className='w-full py-2'>
                        <TextField
                            key={'register-'+REGISTER_PAGE_FIELDS.USERNAME}
                            fullWidth
                            error={!!globalErrorMessage[REGISTER_PAGE_FIELDS.USERNAME]}
                            helperText={globalErrorMessage[REGISTER_PAGE_FIELDS.USERNAME]}
                            label="User Name"
                            value={registerData?.[REGISTER_PAGE_FIELDS.USERNAME]}
                            onChange={(e)=>{handleRegisterData(e.target.value,REGISTER_PAGE_FIELDS.USERNAME)}}
                            onBlur={()=>validateData(REGISTER_PAGE_FIELDS.USERNAME)}
                        />
                    </div>

                    <div className='w-full py-2 relative'>
                        <TextField
                            key={'register-'+REGISTER_PAGE_FIELDS.PASSWORD}
                            fullWidth
                            error={!!globalErrorMessage[REGISTER_PAGE_FIELDS.PASSWORD]}
                            helperText={globalErrorMessage[REGISTER_PAGE_FIELDS.PASSWORD]}
                            type={showPassword?'text':'password'}
                            label="Password"
                            value={registerData?.[REGISTER_PAGE_FIELDS.PASSWORD]}
                            onChange={(e)=>{handleRegisterData(e.target.value,REGISTER_PAGE_FIELDS.PASSWORD)}}
                            onBlur={()=>validateData(REGISTER_PAGE_FIELDS.PASSWORD)}
                            inputProps={{style:{paddingRight:45}}}
                        />
                        <span className='absolute right-4 top-7 cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>{showPassword?<IoIosEyeOff size={20} fill='gray'/> : <IoIosEye size={20} fill='gray'/>}</span>
                    </div>

                    <div className='w-full py-2'>
                        <CustomFileInput
                            accept='.jpg,.jpeg,.png'
                            defaultText='choose avatar image'
                            value={registerData?.[REGISTER_PAGE_FIELDS.AVATAR_IMAGE]}
                            onChange={(e)=>{handleRegisterData(e.target.files,REGISTER_PAGE_FIELDS.AVATAR_IMAGE)}}
                            // helperText="avatar is mandatory."
                        />
                    </div>

                    <div className='w-full py-2'>
                        <CustomFileInput
                            accept='.jpg,.jpeg,.png'
                            defaultText='choose cover image'
                            // helperText="cover is mandatory."
                            value={registerData?.[REGISTER_PAGE_FIELDS.COVER_IMAGE]}
                            onChange={(e)=>{handleRegisterData(e.target.files,REGISTER_PAGE_FIELDS.COVER_IMAGE)}}
                        />
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
                        <span>Register</span>
                    </LoadingButton>
                    </div>
                </form>

                <div className='py-4 text-sm'>
                    <span className='text-green-400'>Already have an account?  </span> <button onClick={goToLoginPage} className='text-sky-700'>Sign in</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default RegisterPage


