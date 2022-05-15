import * as React from 'react';
import Box from '@mui/material/Box';
import {Alert, AlertTitle} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import * as r from "react";
import {clearMess} from "../../redux/modules/users";
import * as rr from "react-redux";

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export function AlertMessage(props){
    let errors = props.error
    const success = props.success

    if (success){
        return (
            <TransitionAlerts
                text={success}
                severity={"success"}
            />
        )
    }
    else if (errors){
        const arr = Object.entries(errors);
        return (arr.map(i=>(
                <TransitionAlerts
                    title={i[0]}
                    text={i[1]}
                    severity={"error"}
                />
            ))
        )
    }
    else {
        return (<div> </div>)
    }
}

export function TransitionAlerts(props) {
    const [open, setOpen] = React.useState(true);
    const dispatch = rr.useDispatch();

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function off(){
        setOpen(false);
        await sleep(500)
        dispatch(clearMess());
    }

    r.useEffect(() => {
        const timer = setTimeout( off, 6 * 1000 );
        return () => clearTimeout(timer);
    },[])

    return (
        <Box sx={{ width: '100%' }} style={{overflow: 'hidden'}}>
            <Slide in={open} direction="left">
                <Alert
                    severity={props.severity}
                    // variant="outlined"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={off}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {props.title && <AlertTitle>{props.title}</AlertTitle>}
                    {props.text}
                </Alert>
            </Slide>
        </Box>
    );
}
