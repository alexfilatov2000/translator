import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from "react-redux";
import * as rr from "react-redux";
import {createSession, getAdverts} from "../../redux/modules/marketplaces";
import moment from 'moment';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Box,
    ButtonBase,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    Autocomplete, TextField
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";

const Tr = useTranslation;


function Home() {
    const users = rr.useSelector(state => state.users);
    const marketplaces = useSelector(state => state.marketplaces);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = React.useState(['OLX', 'AutoRIA']);
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

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    };

    const handleSearch = (event, newValues) => {
        navigate(`#${newValues.id}`);
    };

    if (token) {
        return (
            <Box sx={{marginLeft: 30 }}>
                <Box display={'flex'}>
                    <FormControl style={{width: 150, marginTop: 10, marginLeft: 20, textAlign: "center"}}>
                        <InputLabel id="demo-multiple-name-label">Filter</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={filter}
                            onChange={handleChangeFilter}
                            input={<OutlinedInput label="Filter" />}
                        >
                            { ['OLX', 'AutoRIA'].map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box style={{width: 150, marginTop: 10, marginLeft: 20, textAlign: "center"}}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={marketplaces?.adverts}
                            getOptionLabel={(option) => option.title}
                            onChange={handleSearch}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Find one ..." />}
                        />
                    </Box>
                </Box>

                {marketplaces?.adverts?.filter(el => filter.includes(el.source)).map((advert) =>
                    <a name={advert.id}>
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
                                    Source: {advert.source}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{textAlign:"left"}}>
                                    Prise: {advert.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{textAlign:"left"}}>
                                    status: {advert.status}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{textAlign:"left", color: "green"}}>
                                    Creation Date: {moment(advert.createdAt).format('L')}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={{textAlign:"left", color: "red"}}>
                                    Expiration Date: {moment(advert.expireDate).format('L')}
                                </Typography>
                                <Box style={{backgroundColor: '#e6e4e5', display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "row", lineHeight: 2}}>
                                    <span style={{verticalAlign: "middle", marginRight: 20}}>Statisticts</span>
                                    <span style={{ marginRight: 5}}><RemoveRedEyeOutlinedIcon/>{advert.statistics.advert_views}</span>
                                    <span style={{ marginRight: 5}}><FavoriteBorderOutlinedIcon/>{advert.statistics.users_observing}</span>
                                    <span style={{ marginRight: 5}}><LocalPhoneOutlinedIcon/>{advert.statistics.phone_views}</span>
                                </Box>
                            </CardContent>
                            <CardActions style={{float: "right"}}>
                                <Button onClick={()=>{window.open(advert.url, "_blank")}} size="small" >GO to source</Button>
                            </CardActions>
                        </Card>
                    </a>
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
