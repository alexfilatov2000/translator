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

function daysInMonth(month) {
    if (month === -1){
        month = new Date().getMonth();
    }
    const year = new Date().getFullYear()
    return new Date(year, month, 0).getDate();
}

function getDaysInThisYear() {
    const jan = daysInMonth(1);
    const feb = daysInMonth(2);
    const maa = daysInMonth(3);
    const apr = daysInMonth(4);
    const mei = daysInMonth(5);
    const jul = daysInMonth(6);
    const jun = daysInMonth(7);
    const aug = daysInMonth(8);
    const sep = daysInMonth(9);
    const okt = daysInMonth(10);
    const nov = daysInMonth(11);
    const dec = daysInMonth(12);
    return  jan + feb + maa + apr + mei + jul + jun + aug + sep + okt + nov + dec;
}

function Statistics() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const marketplaces = useSelector(state => state.marketplaces);

    const olx_access_token = !!marketplaces?.olx_access_token
    const ria_access_token = !!marketplaces?.ria_access_token

    const [product, setProduct] = React.useState(false);

    function getRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    const [days, setDays] = React.useState(6);

    const changeDays = (d, p) => {
        let tmp1 = [];
        let tmp2 = [];
        let tmp3 = [];
        for (let i = 0; i <= d; i++){
            if (p){
                let dateOfProduct = new Date(p.createdAt)
                let date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
                console.log({dateOfProduct, date})
                if (date >= dateOfProduct){
                    let to = d-i;
                    tmp1.push(getRandom(to, to*2));
                    tmp2.push(getRandom(to/5, to/2));
                    tmp3.push(getRandom(to/5, to/2));
                }
                else {
                    tmp1.unshift(0);
                    tmp2.unshift(0);
                    tmp3.unshift(0);
                }
            }
            else {
                let to = d-i;
                tmp1.push(getRandom(to, to*2))
                tmp2.push(getRandom(to/5, to/2))
                tmp3.push(getRandom(to/5, to/2))
            }
        }
        return {tmp1, tmp2, tmp3}
    }

    const daysData = changeDays(days, product);
    const [dataViews, setDataViews] = React.useState(daysData.tmp1);
    const [dataObserving, setDataObserving] = React.useState(daysData.tmp2);
    const [dataViewsPhone, setDataViewsPhone] = React.useState(daysData.tmp3);

    const handleChange = (event) => {
        setProduct(event.target.value);
        const {tmp1, tmp2, tmp3} = changeDays(days, event.target.value);
        setDataViews(tmp1)
        setDataObserving(tmp2)
        setDataViewsPhone(tmp3)
    };

    const handleChangeDays = (event) => {
        setDays(event.target.value);
        const d = event.target.value
        const {tmp1, tmp2, tmp3} = changeDays(d, product)
        console.log({tmp1, tmp2, tmp3})
        setDataViews(tmp1)
        setDataObserving(tmp2)
        setDataViewsPhone(tmp3)
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
        labels: getDaysArray((new Date()).setDate((new Date()).getDate() - days), new Date()),
        datasets: [
            {
            label: 'Number Of Views',
                data: dataViews,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Number Of Observing',
                data: dataObserving,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Number Of Phone Views',
                data: dataViewsPhone,
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
                    <Box display={'flex'} style={{marginTop: 40}}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 130 }}>
                            <InputLabel>Select Product</InputLabel>
                            <Select
                                value={product}
                                onChange={handleChange}
                                label="Select Product"
                                style={{width:"100%"}}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>

                                {marketplaces?.adverts?.map(advert =>
                                    <MenuItem value={advert} key={advert.id} >{advert.title}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 130 }}>
                            <InputLabel>Select time</InputLabel>
                            <Select
                                value={days}
                                onChange={handleChangeDays}
                                lable="Select time"
                            >
                                <MenuItem value={6}>
                                    <em>week</em>
                                </MenuItem>
                                <MenuItem value={daysInMonth(-1)}>
                                    <em>month</em>
                                </MenuItem>
                                <MenuItem value={365}>
                                    <em>year</em>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Line options={lineOptions} data={lineData} />
                </Box>
            </Box>
        </Box>
    );

}

export default Statistics;
