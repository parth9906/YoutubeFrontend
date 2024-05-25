import Avatar from '@mui/material/Avatar';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomInputWIthEditAndSendIcon from '../component/CustomInputWIthEditAndSendIcon';
import { setUser } from '../store/userSlice';
import { callAPIWithAxios } from '../utils/makeAPICall';
import { useNavigate } from 'react-router-dom';
import UploadVideo from '../component/UploadVideo';
import { GET_USER_VIDEO_URL, LOGIN_USER_URL } from '../constants.url';
import { openSnackBar } from '../store/snackBarSlice';
import VideoCard from '../component/VideoCard';

const UserPage = () => {
    const user = useSelector(store =>store.user.user);
    let channelName = user?.username
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [videos, setVideos] = useState([]);
    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    },[user])
    const accessToken = useSelector(store => store.user.accessToken);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
    }

    const [description, setDescription] = useState(user?.description)
    const updateUserDescription = async()=>{
        // call an api to update description
        // const response = await callAPIWithAxios(LOGIN_USER_URL, {description}, headers)
        // console.log(response)
    }
    useEffect(()=>{
        (async()=>{
            try {
                const response = await callAPIWithAxios(GET_USER_VIDEO_URL + '/' + channelName, {}, headers)
                if(response?.success){
                    setVideos(response?.data);
                }else{
                    dispatch(openSnackBar({message: response?.message, color: 'danger'}))
                }
            } catch (error) {
                dispatch(openSnackBar({message: error?.message, color: 'danger'}))
            }
        })();
    },[])
    console.log("videos", videos);

  return (
    <div>
        <div className='w-full' name='user details div'>
            <div className='w-full h-52 bg-gradient-to-r from-purple-500 to-pink-500'>
               {
                user?.coverImage && 
                    <img src={user?.coverImage} alt="user coverImg" className='w-full h-52 object-cover'/>
               }
            </div>
            <div className='relative w-full flex '>
                <div className='border-2 rounded-full p-1 max-w-fit absolute -top-[30%] lg:-top-[50%] left-[4%] bg-gradient-to-r from-cyan-400  via-blue-700 to-red-500'>
                    <Avatar
                        alt={user?.fullName}
                        src={user?.avatar}
                        sx={{ width: {md:160, xs:100}, height: {md:160, xs:100} }}
                    />
                </div>
                <div className='px-8 py-4 w-full bg-slate-100 flex justify-end'>
                    <div className='w-5/6 lg:w-9/12 xl:w-5/6  h-full'>
                        <h1 className='font-bold text-3xl'>{user?.fullName}</h1>
                        <div className='py-2 flex gap-3 text-lg'>
                            <div>{user?.username}</div>
                            <div>79.1K subscribers</div>
                            <div>179 videos</div>
                        </div>
                        
                        <div className='w-1/2'>
                            <CustomInputWIthEditAndSendIcon
                                value={description}
                                onChange={(e)=>{setDescription(e.targer.value)}}
                                palceholder="description."
                                submit={updateUserDescription}
                            />
                        </div>
                        <div className='py-4'>
                            <UploadVideo />
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='py-4 px-8 flex flex-wrap items-center justify-start'>
               {
                videos?.map((video)=>{
                    return(
                        <div key={video?._id + video?.video?._id}
                            className='px-4 py-5'
                        >
                            <VideoCard video={video} />
                        </div>
                    )
                })
               }
            </div>

        </div>
    </div>
  )
}

export default UserPage

