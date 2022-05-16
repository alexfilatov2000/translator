import React from "react";
import { Box, Typography, Button } from '@mui/material';
import * as rr from "react-redux";
import {useTranslation} from 'react-i18next'
import {logOut} from "../../redux/modules/users";
import * as rd from "react-router-dom";

const Tr = useTranslation;


export default function Settings() {
    const {t} = Tr();
    const dispatch = rr.useDispatch();
    const navigate = rd.useNavigate();

    const log_out = () => {
        dispatch(logOut())
        navigate('/');
    }

    return (
        <Box>
            <Typography variant="h4" component="h2">
                {t("Settings")}
            </Typography>
            <div style={{margin: "auto", marginTop: 50, width:400}}>
                <Button onClick={log_out} variant={'outlined'} fullWidth>
                    {t("Log out")}
                </Button>
            </div>

        </Box>
    );

}