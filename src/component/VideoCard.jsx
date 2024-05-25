import React from 'react'
import Avatar from '@mui/material/Avatar';
import { setCurrentVideo } from '../store/currentVideoSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCloudinaryPublicKey } from '../utils/getCloudinaryPublicKey';

const VideoCard = ({video}) => {
    // const videos = {
    //     "_id": "6648d49453aaeef65a701f0f",
    //     "username": "harsh_takhi",
    //     "fullName": "Harsh takhi",
    //     "avatar": "https://res.cloudinary.com/parth-youtubebackend/image/upload/v1716049040/yevstoqrwaubtx4vpp8l.jpg",
    //     "video": {
    //         "_id": "664e192d902966f828655c62",
    //         "videoFile": "https://res.cloudinary.com/parth-youtubebackend/video/upload/v1716394284/ft5uewpemwniwan9uagr.mp4",
    //         "thumbnail": "https://res.cloudinary.com/parth-youtubebackend/image/upload/v1716394282/eonpd14992q4emukcqge.jpg",
    //         "title": "asdfghjk",
    //         "description": "sdfghjk",
    //         "duration": 29.568,
    //         "views": 0,
    //         "createdAt": "2024-05-22T16:11:25.778Z"
    //     }
    // }

    const dispatch = useDispatch();
    const navgate = useNavigate();


    

    const backgroundImageStyle = {
        backgroundImage: "url('" + video?.video?.thumbnail + "')",
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      };

    const calculateTime = ()=>{
        const uploadDateObj = new Date(video?.video?.createdAt);
        const currentDate = new Date();
        const differenceInMilliseconds = currentDate - uploadDateObj;
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        if(differenceInMinutes ===0){
            return differenceInSeconds + ' seconds'
        }
        const differenceInHours= Math.floor(differenceInMinutes / 60);
        if(differenceInHours ===0){
            return differenceInMinutes + ' Minuts'
        }
        const differenceInDays = Math.floor(differenceInHours / 24);
        if(differenceInDays ===0){
            return differenceInHours + ' hours'
        }
        const differenceInMonths = Math.floor(differenceInDays / 30);
        if(differenceInMonths ===0){
            return differenceInDays + ' days'
        }
        const years = Math.floor(differenceInDays / 365);
        if(years === 0){
            return differenceInMonths + 'months'
        }
        return years + ' years'
        
    }

    const calculateDuration = () => {
        let duration = Math.round(video?.video?.duration);

        const seconds = duration % 60
        duration = Math.floor(duration / 60);
        const minuts = duration % 60;
        duration = Math.floor(duration / 60);
        const hours = duration % 24;
        duration = Math.floor(duration / 24);
        const days = duration;

        let durationString = ""
        if(seconds>0 || minuts || hours || days){
            durationString = "" + (seconds < 10 ? "0" + seconds : seconds) 
        }
        if(minuts>0 || hours || days){
            durationString = (minuts < 10 ? '0' + minuts : minuts) + ":" + durationString 
        }else{
            durationString = "00:" + durationString 
        }
        if(hours>0 || days){
            durationString = (days && (hours < 10) ? '0' + hours : hours) + ":" + durationString 
        }
        if(days>0){
            durationString = days + ":" + durationString 
        }
        return durationString
    }

    const handleVideoPlay = ()=>{
        dispatch(setCurrentVideo(video?.video))
        navgate('/watch/'+ getCloudinaryPublicKey(video?.video?.videoFile))
    }

    return (
        <div onClick={handleVideoPlay} className='p-3 border border-gray-400 rounded-lg cursor-pointer'>
            <div style={backgroundImageStyle} className='aspect-video w-96 bg-no-repeat bg-slate-800 rounded-t-lg relative'>
                <div className='absolute bottom-2 right-2 bg-gray-950 px-2 py-1 rounded-lg text-gray-200'>{calculateDuration()}</div>
            </div>
            <div className='flex pt-2'>
                <div className='w-16'>
                    <Avatar alt={video?.fullName} src={video?.avatar} />
                </div>
                <div>
                    <div className='font-semibold text-lg truncate'>{video?.video?.title}</div>
                    <div >
                        <div className='font-medium text-gray-500 text-sm'>{video?.fullName}</div>
                        <div className='text-gray-600 text-sm'><span>{video?.video?.views} views</span>  &nbsp;&nbsp;&bull;&nbsp;<span>{calculateTime()}</span> ago</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
