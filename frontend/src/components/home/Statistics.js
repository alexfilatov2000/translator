import React, {useEffect, useState} from "react";
import {Box, Button, Typography, Modal, TextField} from '@mui/material';
import {useTranslation} from 'react-i18next'
import {useSearchParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createRiaSession, createSession, getAdverts} from "../../redux/modules/marketplaces";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const Tr = useTranslation;

function Statistics() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const marketplaces = useSelector(state => state.marketplaces);

    const olx_access_token = !!marketplaces?.olx_access_token
    const ria_access_token = !!marketplaces?.ria_access_token

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

    const {t} = Tr();

    console.log(marketplaces);

    const sourceData = {
        labels: [ 'OLX', 'AutoRIA'],
        datasets: [
            {
                label: 'number of ads',
                data: [marketplaces?.sourceCount?.OLX, marketplaces?.sourceCount?.AutoRIA],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const viewsData = {
        labels: marketplaces?.adverts?.map(el => `${el?.title} (${el.source})`),
        datasets: [
            {
                label: 'number of views',
                data: marketplaces?.adverts?.map(el => el.statistics?.advert_views),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const observingData = {
        labels: marketplaces?.adverts?.map(el => `${el?.title} (${el.source})`),
        datasets: [
            {
                label: 'number of observing',
                data: marketplaces?.adverts?.map(el => el.statistics?.users_observing),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const phoneViewsData = {
        labels: marketplaces?.adverts?.map(el => `${el?.title} (${el.source})`),
        datasets: [
            {
                label: 'number of views',
                data: marketplaces?.adverts?.map(el => el.statistics?.phone_views),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    console.log(observingData);

    return (
        <Box sx={{marginLeft: 30 }}>
            <Typography variant="h5" component="h1" sx={{m: 2}}>
                {t("Statistics")}
            </Typography>
            <Box>
                <Box style={{display: 'inline-block', width: '25%'}}>
                    <Typography variant="body1" sx={{m: 2}}>
                        {t("Number Of Ads")}
                    </Typography>
                    <Doughnut data={sourceData} />
                </Box>

                <Box style={{display: 'inline-block', width: '25%'}}>
                    <Typography variant="body1" sx={{m: 2}}>
                        {t("Number Of Views")}
                    </Typography>
                    <Pie data={viewsData} />
                </Box>

                <Box style={{display: 'inline-block', width: '25%'}}>
                    <Typography variant="body1" sx={{m: 2}}>
                        {t("Number Of Observing")}
                    </Typography>
                    <Pie data={observingData} />
                </Box>

                <Box style={{display: 'inline-block', width: '25%'}}>
                    <Typography variant="body1" sx={{m: 2}}>
                        {t("Number Of Phone Views")}
                    </Typography>
                    <Pie data={phoneViewsData} />
                </Box>
            </Box>
        </Box>
    );

}

export default Statistics;
