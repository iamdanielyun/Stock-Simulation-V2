import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

function GreenAlert() {
    const [open, setOpen] = useState(true);

    return (
        <Collapse sx={{marginTop: "5%"}} in={open}>
            <Alert
                severity='success'
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
                Success!
            </Alert>
      </Collapse>
    )
}   

export default GreenAlert;