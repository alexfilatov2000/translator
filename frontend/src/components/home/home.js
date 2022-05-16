import React, {useEffect, useState} from "react";
import {Box, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next'
import {useSelector} from "react-redux";

const Tr = useTranslation;

function Home() {

    const {t} = Tr();

    // const olxSession = useSelector(state => state.olx);
    // const olx_access_token =

    return (
        <Box>
            <Typography variant="h4" component="h2">
                {t("HOME")}
            </Typography>
            <Typography variant="h6" component="h2">
                {t("Please login to add trading platform")}
            </Typography>
        </Box>
    );

}

export default Home;
