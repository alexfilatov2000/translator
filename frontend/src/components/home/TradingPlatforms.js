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
        redirect_uri: 'https://826f-109-108-69-137.eu.ngrok.io/trading-platform',
        response_type: 'code',
        client_id: '200734',
        client_secret: 'LCd28F8UK3XItznGMccxrroUhvlRejLBuxI2Hbt3av5eLDNU',
        grant_type: 'authorization_code'
    }
    const link_to_get_olx_code = `${olx.auth_url}/?response_type=${olx.response_type}&client_id=${olx.client_id}&scope=${olx.scope}&redirect_uri=${olx.redirect_uri}`


    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const marketplaces = useSelector(state => state.marketplaces);
    const [open, setOpen] = useState(false);
    const openRia = () => setOpen(true);
    const closeRia = () => setOpen(false);
    const [riaApiKey, setRiaApiKey] = useState('');
    const [riaUserId, setRiaUserId] = useState('');
    const [disableRiaForm, setDisableRiaForm] = useState(false);

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

    useEffect(() => {
        if (marketplaces?.ria_access_token){
            setOpen(false);
        }
    }, [marketplaces?.ria_access_token])

    const submitRiaApiKey = async (e) => {
        e.preventDefault();
        setDisableRiaForm(true);
        dispatch(createRiaSession({
            data: {
                ria_access_token: riaApiKey,
                user_id: riaUserId
            }
        }));
    };

    console.log({marketplaces})
    const onChangeRiaApiKey = (e) => setRiaApiKey(e.target.value);
    const onChangeUserId = (e) => setRiaUserId(e.target.value);

    return (
        <Box>
            <Typography variant="h5" component="h1" sx={{m: 2}}>
                {t("Please Select Trading Platform")}
            </Typography>

            <Box>
                <div style={{display: 'inline-block', marginRight: 10}}>
                    <div style={{height: 250}}>
                        <img width="250px"  style={{borderRadius: 25}} src="./olxLogo.png" alt=""/>
                    </div>

                    <Button
                        variant="contained"
                        href={link_to_get_olx_code}
                        disabled={!!marketplaces?.olx_access_token}
                        sx={{m: 2}}
                    >
                        {t("Authorize Via Olx")}
                    </Button>
                </div>


                <div style={{display: 'inline-block', marginLeft: 10}}>
                    <div style={{height: 250}}>
                        <img width="250px" src="./autoriaLogo.png" alt=""/>
                    </div>


                    <Button
                        variant="contained"
                        onClick={openRia}
                        disabled={!!marketplaces?.ria_access_token}
                        sx={{m: 2}}
                    >
                        {t("Authorize Via AutoRia")}
                    </Button>
                </div>


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
                                label="api key"
                                fullWidth
                                placeholder="api key"
                                onChange={onChangeRiaApiKey}
                                disabled={disableRiaForm}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="user id"
                                fullWidth
                                placeholder="user id"
                                onChange={onChangeUserId}
                                style={{marginTop: 20}}
                                disabled={disableRiaForm}
                            />
                            <Button
                                type="submit"
                                variant='contained'
                                color='primary'
                                style={{marginTop: 20, float: "right"}}
                                disabled={disableRiaForm}
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
