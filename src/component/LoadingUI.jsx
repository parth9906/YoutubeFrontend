import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector } from 'react-redux';

function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }

const LoadingUI = () => {
    
    useEffect(() => {
        document.body.style.transition = 'overflow 0.5s ease';
        const timerID = setTimeout(()=>{
            document.body.style.overflow = 'hidden';
        },100)
        return () => {
          // Re-enable scrolling when the overlay is unmounted
          clearTimeout(timerID)
          document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className='w-full h-[100vh] fixed bg-[#8080806b] z-50 flex justify-center items-center transition-opacity duration-1000'>
            <GradientCircularProgress/>
        </div>
    )
}

export default LoadingUI
