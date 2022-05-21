import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from "react-redux";
import * as rr from "react-redux";
import {createSession, getAdverts} from "../../redux/modules/marketplaces";
import {Card, CardActions, CardContent, CardMedia, Button, Typography, Box, ButtonBase} from "@mui/material";
import * as rd from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Tr = useTranslation;

function Home() {
    const users = rr.useSelector(state => state.users);
    const marketplaces = useSelector(state => state.marketplaces);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const olx_access_token = !!marketplaces?.olx_access_token
    const ria_access_token = !!marketplaces?.ria_access_token
    const token = !!users?.token;
    const {t} = Tr();

    useEffect(() => {
        if (olx_access_token && ria_access_token) {
            dispatch(getAdverts({
                data: {
                    olx_access_token: marketplaces?.olx_access_token,
                    ria_access_token: marketplaces?.ria_access_token,
                    ria_user_id: marketplaces?.ria_user_id,
                    olxEnabled: true,
                    autoriaEnabled: true
                }
            }), []);
        } else if (olx_access_token) {
            dispatch(getAdverts({
                data: {
                    olx_access_token: marketplaces?.olx_access_token,
                    olxEnabled: true
                }
            }), []);
        } else if (ria_access_token) {
            dispatch(getAdverts({
                data: {
                    ria_access_token: marketplaces?.ria_access_token,
                    ria_user_id: marketplaces?.ria_user_id,
                    autoriaEnabled: true
                }
            }), []);
        }
    },[dispatch]);

    if (token) {
        return (
            <Box sx={{marginLeft: 30 }}>
                <Typography variant="h4" component="h2">
                    {t("HOME")}
                </Typography>

                {marketplaces?.adverts?.map((advert) =>
                    <Card sx={{ width: 300, display: 'inline-block', float: 'left', margin: 2}} key={advert.id}>
                        <Box style={{position: 'relative'}}>
                            <ButtonBase style={{width:"100%"}} onClick={()=>{window.open(advert.url, "_blank")}}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={advert.image}
                                    alt="green iguana"
                                />

                                <div style={{position: 'absolute', top: 5, right: 5, width: '20%'}}>
                                    <img src={advert.sourceURL} alt="" style={{width: '100%'}}/>
                                </div>
                            </ButtonBase>
                        </Box>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {advert.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{textAlign:"left"}}>
                                current prise: {advert.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{textAlign:"left"}}>
                                {advert.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{textAlign:"left"}}>
                                status: {advert.status}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{textAlign:"left"}}>
                                date: {advert.expireDate}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {/*<Button size="small">Share</Button>*/}
                            <Button onClick={()=>{window.open(advert.url, "_blank")}} size="small" >Learn More</Button>
                        </CardActions>
                    </Card>
                )}

            </Box>
        );
    }

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
