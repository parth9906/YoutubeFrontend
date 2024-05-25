import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { resetSnackBar } from '../store/snackBarSlice';

export default function CustomSnackBar() {
    const snackBarData = useSelector(store=>store.snackBar);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        const timerID = setTimeout(() => {
            dispatch(resetSnackBar())
        }, 5000);
        return ()=>{
            clearTimeout(timerID);
        }
    },[snackBarData])
    

    return (
    <React.Fragment>
        <Snackbar
            variant={snackBarData.variant}
            color={snackBarData.color}
            open={snackBarData.open}
            onClose={() => dispatch(resetSnackBar())}
            anchorOrigin={{ vertical: snackBarData.vertical, horizontal: snackBarData.horizontal }}
            startDecorator={<></>}
            endDecorator={
            <Button
                onClick={() => dispatch(resetSnackBar())}
                size="sm"
                variant='soft'
                color={snackBarData.color}
            >
                {snackBarData.dismissButtonText}
            </Button>
            }
        >
            {snackBarData.message}
        </Snackbar>
    </React.Fragment>
  );
}