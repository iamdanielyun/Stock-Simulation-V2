import { useState, useEffect } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

function RedAlert(props) {
    const [open, setOpen] = useState(false);  
    var { message, marginTop } = props;

    useEffect(() => {
        // Whenever a new message is received, open the alert
        if (message !== '') {
            setOpen(true);
        }
    }, [message]);

    return (
        <Collapse sx={{ marginTop: `${marginTop}%` }} in={open}>
            <Alert
                severity='error'
                variant='filled'
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {message}
            </Alert>
        </Collapse>
    );
}

export default RedAlert;
