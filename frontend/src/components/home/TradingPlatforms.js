import React, {useEffect, useState} from "react";
import {Box, Button, Typography, Modal, TextField} from '@mui/material';
import {useTranslation} from 'react-i18next'
import {useSearchParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createRiaSession, createSession} from "../../redux/modules/marketplaces";

const Tr = useTranslation;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function TradingPlatforms() {
    const olx = {
        auth_url: 'https://www.olx.ua/oauth/authorize',
        access_token_url: 'https://www.olx.ua/api/open/oauth/token',
        scope: 'v2 read write',
        redirect_uri: 'https://7de1-109-108-90-166.eu.ngrok.io/trading-platform',
        response_type: 'code',
        client_id: '200734',
        client_secret: 'LCd28F8UK3XItznGMccxrroUhvlRejLBuxI2Hbt3av5eLDNU',
        grant_type: 'authorization_code'
    }
    const link_to_get_olx_code = `${olx.auth_url}/?response_type=${olx.response_type}&client_id=${olx.client_id}&scope=${olx.scope}&redirect_uri=${olx.redirect_uri}`


    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const olxSession = useSelector(state => state.marketplaces);
    const [open, setOpen] = useState(false);
    const openRia = () => setOpen(true);
    const closeRia = () => setOpen(false);
    const [riaApiKey, setRiaApiKey] = useState('');
    const [riaUserId, setRiaUserId] = useState('');

    const {t} = Tr();
    const code = searchParams.get("code")

    useEffect(() => {
        if (code) {
            dispatch(createSession({
                data: {
                    ...olx,
                    code
                },
                navigate
            }), []);
        }
    },[dispatch]);

    const submitRiaApiKey = async (e) => {
        e.preventDefault();
        dispatch(createRiaSession({
            data: {
                ria_access_token: riaApiKey,
                user_id: riaUserId
            }
        }));
    };

    const onChangeRiaApiKey = (e) => setRiaApiKey(e.target.value);
    const onChangeUserId = (e) => setRiaUserId(e.target.value);

    return (
        <Box>
            <Typography variant="h5" component="h1" sx={{m: 2}}>
                {t("Please Select Trading Platform")}
            </Typography>

            <Box>
                <Button
                    variant="contained"
                    href={link_to_get_olx_code}
                    // color={ olxSession?.olx_access_token ? "primary" : "secondary"}
                    disabled={!!olxSession?.olx_access_token}
                    sx={{m: 2}}
                >
                    Authorize via olx
                </Button>

                <Button
                    variant="contained"
                    onClick={openRia}
                    // href={link_to_get_olx_code}
                    // // color={ olxSession?.olx_access_token ? "primary" : "secondary"}
                    // disabled={!!olxSession?.olx_access_token}
                    sx={{m: 2}}
                >
                    Authorize via autoria
                </Button>

                <Modal
                    open={open}
                    onClose={closeRia}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Please provide your "api key" and "user id"
                        </Typography>

                        <br/>

                        <form onSubmit={submitRiaApiKey}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                fullWidth
                                placeholder="api key"
                                onChange={onChangeRiaApiKey}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                fullWidth
                                placeholder="user id"
                                onChange={onChangeUserId}
                                style={{marginTop: 20}}
                            />
                            <Button
                                type="submit"
                                variant='contained'
                                color='primary'
                                style={{marginTop: 20, float: "right"}}
                            >
                                {t("Submit")}
                            </Button>
                        </form>
                    </Box>
                </Modal>
            </Box>

        </Box>
    );

}

export default TradingPlatforms;
