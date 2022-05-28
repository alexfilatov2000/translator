import React, {useEffect, useState} from "react";
import {Box, Button, Typography, Modal, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {useTranslation} from 'react-i18next'
import {useSearchParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createRiaSession, createSession, getAdverts} from "../../redux/modules/marketplaces";
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    } from 'chart.js';

import { Doughnut, Line, Pie } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Tr = useTranslation;

const getDaysArray = function(start, end) {
    const arr = [];
    for(const dt = new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(moment(new Date(dt)).format('L'))
    }
    return arr;
};

function Statistics() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const marketplaces = useSelector(state => state.marketplaces);

    const olx_access_token = !!marketplaces?.olx_access_token
    const ria_access_token = !!marketplaces?.ria_access_token

    const [product, setProduct] = React.useState(false);
    const handleChange = (event) => {
        setProduct(event.target.value);
    };

    console.log({product});

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

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    if (product) console.log(getDaysArray(new Date(product.createdAt), new Date()));

    const lineData = {
        labels: product ? getDaysArray(new Date(product.createdAt), new Date()) : getDaysArray((new Date()).setDate((new Date()).getDate() - 30), new Date()),
        datasets: [
            {
            label: 'Number Of Views',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Number Of Observing',
                data: [3, 1, 0, 0, 0, 0, 0],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Number Of Phone Views',
                data: [11, 4, 2, 1, 0, 0, 0],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
    };

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

                <Box style={{textAlign: 'center'}}>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Select Product</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={product}
                            onChange={handleChange}
                            label="Select Product"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            {marketplaces?.adverts?.map(advert =>
                                <MenuItem value={advert} key={advert.id} >{advert.title}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <Line options={lineOptions} data={lineData} />
                </Box>
            </Box>
        </Box>
    );

}

export default Statistics;
