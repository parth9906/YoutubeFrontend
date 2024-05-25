import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VideoPlayer from '../component/VideoPlayer';

const WatchPage = () => {
    const dispatch = useDispatch();
    const currentVideo = useSelector(store=>store?.video?.currentVideo)
    
    if(!currentVideo){
        return <div className='bg-slate-500'>loading.....</div>
    }
    return (
        <div className='px-24 py-10'>
            <VideoPlayer
                src={currentVideo?.videoFile}
            />
        </div>
    )
}

export default WatchPage
