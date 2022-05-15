import React, {useEffect} from "react";
import {Box, Button, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next'
// import {useParams} from "react-router-dom";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
const Tr = useTranslation;


function Home() {
    let [searchParams, setSearchParams] = useSearchParams()

    const code = searchParams.get("code")



    const x = async () => {
        const data = {
            grant_type: "authorization_code",
            client_id: "200734",
            client_secret: "LCd28F8UK3XItznGMccxrroUhvlRejLBuxI2Hbt3av5eLDNU",
            scope: "v2 read write",
            code: code,
            redirect_uri: "https://7de1-109-108-90-166.eu.ngrok.io",
        }

        const response = await fetch('https://www.olx.ua/api/open/oauth/token', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': '*/*',
                'Host': 'www.olx.ua',
                // "Access-Control-Allow-Origin": 'https://7de1-109-108-90-166.eu.ngrok.io',
                // "Access-Control-Allow-Headers": "https://7de1-109-108-90-166.eu.ngrok.io"
            },
            body: JSON.stringify(data)
        })


        console.log(response);
        // const res = await axios.post('https://www.olx.ua/api/open/oauth/token', {
        //     grant_type: "authorization_code",
        //     client_id: "200734",
        //     client_secret: "LCd28F8UK3XItznGMccxrroUhvlRejLBuxI2Hbt3av5eLDNU",
        //     scope: "v2 read write",
        //     code: code,
        //     redirect_uri: "https://7de1-109-108-90-166.eu.ngrok.io",
        //
        // }, {
        //     headers: {
        //         "Access-Control-Allow-Origin": "*"
        //     }
        // })

        // console.log(res);
        // return res;
    }

    if (code) x();
    //
    // alert(term)

    const {t} = Tr();
    const link = 'https://www.olx.ua/oauth/authorize/?response_type=code&client_id=200734&scope=read%20write%20v2&redirect_uri=https://7de1-109-108-90-166.eu.ngrok.io'

    return (
        <Box>
            <Typography variant="h4" component="h2">
                {t("HOME")}
            </Typography>

            <Button
                variant="contained"
                href={link}
            >
                Authorize via olx
            </Button>
        </Box>
    );

}

export default Home;
