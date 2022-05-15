import React, {useEffect, useState} from "react";
import {Box, Button, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next'
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as rr from "react-redux";
import {sendLogin} from "../../redux/modules/users";
import {createSession} from "../../redux/modules/olx";

const Tr = useTranslation;


function Home() {
    const olx = {
        auth_url: 'https://www.olx.ua/oauth/authorize',
        access_token_url: 'https://www.olx.ua/api/open/oauth/token',
        scope: 'v2 read write',
        redirect_uri: 'https://7de1-109-108-90-166.eu.ngrok.io',
        response_type: 'code',
        client_id: '200734',
        client_secret: 'LCd28F8UK3XItznGMccxrroUhvlRejLBuxI2Hbt3av5eLDNU',
        grant_type: 'authorization_code'
    }
    const link_to_get_olx_code = `${olx.auth_url}/?response_type=${olx.response_type}&client_id=${olx.client_id}&scope=${olx.scope}&redirect_uri=${olx.redirect_uri}`


    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const olxData = useSelector(state => state.olx);

    console.log(olxData)

    const {t} = Tr();
    const code = searchParams.get("code")

    useEffect(() => {
        if (code) {
            dispatch(createSession({
                data: {
                    ...olx,
                    code
                }
            }), []);
        }
    },[dispatch])

    return (
        <Box>
            <Typography variant="h4" component="h2">
                {t("HOME")}
            </Typography>

            <Button
                variant="contained"
                href={link_to_get_olx_code}
            >
                Authorize via olx
            </Button>
        </Box>
    );

}

export default Home;
