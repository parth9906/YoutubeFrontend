import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomFileInput from './CustomFileInput';
import { TextField } from '@mui/material';
import { VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { callAPIWithAxios } from '../utils/makeAPICall';
import { UPLOAD_VIDEO_URL } from '../constants.url';
import { loader } from '../store/loadingSlice';
import { openSnackBar } from '../store/snackBarSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    px: 4,
    py: 8,
  };
  

const UploadVideo = () => {
    const defaultVideoData = {
        [VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.TITLE]: "",
        [VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.DESCRIPTION]: "",
        [VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.VIDEO_FILE]: {},
        [VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.THUMBNAIL_IMAGE]: {},
    }
    const [open, setOpen] = useState(false);
    const [videoInfo, setVideoInfo] = useState(defaultVideoData)
    const [error,setError] = useState("");
    const loading = useSelector(store=>store.loader.loading)
    const accessToken = useSelector(store=> store?.user?.accessToken)
    const headers = {
        Authorization: "Bearer " + accessToken,
    }
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleVideoInfo = (value,field) => {
        setVideoInfo({...videoInfo, [field]:value});
    }


    const validateData = ()=>{
        for(const field in videoInfo){
            if(field === VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.TITLE || field === VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.DESCRIPTION){
                if(videoInfo[field] === ''){
                    
                    return false;
                }
            }else{
                if(videoInfo[field]?.length === 0){
                    return false;
                }
            }
        }
        return true;
    }
    
    const handleVideoUpload = async(event) => {
        event.preventDefault();
        setError("");
        if(validateData() === false){
            setError("All fields are mandatory. Please fill all the fields.")
            return;
        }
        
        const formData = new FormData();
        formData.append(VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.TITLE, videoInfo[VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.TITLE])
        formData.append(VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.DESCRIPTION, videoInfo[VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.DESCRIPTION])
        formData.append(VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.VIDEO_FILE, videoInfo[VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.VIDEO_FILE]?.[0])
        formData.append(VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.THUMBNAIL_IMAGE, videoInfo[VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.THUMBNAIL_IMAGE]?.[0])
        try {
            dispatch(loader(true))
            const response = await callAPIWithAxios(UPLOAD_VIDEO_URL, formData, headers);
            if(response?.success){
                dispatch(openSnackBar({message: response?.message, color: "success"}))
            }else{
                dispatch(openSnackBar({message: response?.message, color: "danger"}))
            }
        } catch (error) {
            dispatch(openSnackBar({message: error?.message, color: "danger"}))
        } finally{
            dispatch(loader(false))
            handleClose();
        }
    }
    return (
      <div>
        <Button 
            component="label"
            role={undefined}
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handleOpen}
        >upload Video
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style} className='flex items-center flex-col'>
            <div className='py-4 text-2xl font-bold'>
                Upload video
            </div>
            {
                error && <div className='text-sm text-red-600'>{error}</div>
            }
            <form onSubmit={handleVideoUpload} className='w-3/5'>
                <div className='py-2'>
                    <CustomFileInput
                        value={videoInfo[VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.VIDEO_FILE]}
                        onChange={(e)=> handleVideoInfo(e.target.files,VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.VIDEO_FILE)}
                        defaultText="choose a video to upload"
                        accept='video/*'
                    />
                </div>
                <div className='py-2'>
                    <CustomFileInput
                        value={videoInfo[VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.THUMBNAIL_IMAGE]}
                        onChange={(e)=> handleVideoInfo(e.target.files,VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.THUMBNAIL_IMAGE)}
                        defaultText="choose a thumbnail to upload"
                        accept='.jpg,.jpeg,.png'
                    />
                </div>
                <div className='py-2'>
                    <TextField
                        fullWidth
                        key={'register-'+VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.TITLE}
                        label="Title"
                        value={videoInfo?.[VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.TITLE]}
                        onChange={(e)=>{handleVideoInfo(e.target.value,VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.TITLE)}}
                    />
                </div>
                <div className='py-2'>
                    <TextField
                        fullWidth
                        key={'register-'+VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.DESCRIPTION}
                        label="Description"
                        value={videoInfo?.[VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.DESCRIPTION]}
                        onChange={(e)=>{handleVideoInfo(e.target.value,VIDEO_INFO_FIELDS_FOR_UPLOADING_VIDEO.DESCRIPTION)}}
                    />
                </div>
                <div className='w-full pt-8'>
                    <LoadingButton
                        type='submit'
                        onClick={()=>{}}
                        loading={loading}
                        // endIcon={}
                        // loadingPosition="end"
                        variant="contained"
                        sx={{width:'100%', height: "50px"}}
                    >
                        <span>upload</span>
                    </LoadingButton>
                    </div>
            </form>
        </Box>
        </Modal>
      </div>
    );
  }

export default UploadVideo
