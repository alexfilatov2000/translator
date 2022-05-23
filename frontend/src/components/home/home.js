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
    Autocomplete, TextField, Dialog, DialogTitle
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import CardProduct from "./card"

const Tr = useTranslation;

export default function Home() {
    const users = rr.useSelector(state => state.users);
    const marketplaces = useSelector(state => state.marketplaces);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filter, setFilter] = React.useState(['OLX', 'AutoRIA']);
    const olx_access_token = !!marketplaces?.olx_access_token
    const ria_access_token = !!marketplaces?.ria_access_token
    const token = !!users?.token;
    const {t} = Tr();

    const [open, setOpen] = React.useState(false);
    const [searchProduct, setSearchProduct] = React.useState(null);

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
        setOpen(true);
        setSearchProduct(newValues);
    };

    const handleClose = () => {
        setOpen(false);
        setSearchProduct(null);

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
                            value={null}
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
                        <CardProduct key={advert.id} advert={advert}/>
                    </a>
                )}
                {searchProduct &&
                    <Dialog onClose={handleClose} open={open}>
                        <DialogTitle>
                            Product
                        </DialogTitle>
                        <CardProduct advert={searchProduct}/>
                    </Dialog>
                }
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