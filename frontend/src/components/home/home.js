import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from "react-redux";
import * as rr from "react-redux";
import {createRiaSession, createSession, getAdverts, cloneAdverts, markAsSold} from "../../redux/modules/marketplaces";
import moment from 'moment';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
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
    Autocomplete,
    TextField,
    Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";

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


function Home() {
    const users = rr.useSelector(state => state.users);
    const marketplaces = useSelector(state => state.marketplaces);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [advertForClone, setAdvertForClone] = useState({});
    const [advertForSold, setAdvertForSold] = useState({});

    const openAdvertForm = (e, advert) => {
        setAdvertForClone(advert)
        return setOpen(true);
    }
    const closeAdvertForm = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [numberOfAdverts, setNumberOfAdverts] = React.useState(1);
    const [openCompleteDialog, setOpenCompleteDialog] = useState(false);
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
    const onChangeNumberOfAdverts = (e) => setNumberOfAdverts(e.target.value);

    const hundred = [...Array(100).keys()].map(foo => foo + 1);

    const handleMarkAsSold = (e) => {
        e.preventDefault();
        dispatch(markAsSold({
            data: {
                advert: advertForSold,
                cnt: numberOfAdverts
            },
            onClose: handleCloseCompleteDialog
        }));
    }

    console.log({marketplaces})

    const handleOpenCompleteDialog = (e, advert) => {
        setAdvertForSold(advert)
        setOpenCompleteDialog(true);
    };

    const handleCloseCompleteDialog = () => {
        setOpenCompleteDialog(false);
    };

    const completeDialog = (
        <Dialog
            open={openCompleteDialog}
            onClose={handleCloseCompleteDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to mark the product as sold?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This action affects the general statistics which cannot be changed.
                    <br/>
                    Please select how many products did you sell.
                </DialogContentText>
            </DialogContent>

            <Box textAlign={"center"}>
                <InputLabel id="demo-simple-select-standard-label">Number Of Products</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={numberOfAdverts}
                    onChange={onChangeNumberOfAdverts}
                    label="Age"
                    sx={{width: '50%'}}
                >
                    {hundred.map(el =>
                        <MenuItem key={el} value={el}>{el}</MenuItem>
                    )}
                </Select>
            </Box>
            <DialogActions>
                <Button onClick={handleCloseCompleteDialog}>Cancel</Button>
                <Button onClick={handleMarkAsSold} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )

    if (token) {
        return (
            <Box sx={{marginLeft: 30 }}>
                <Box display={'flex'} >
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
                    <a name={advert.id} key={advert.id}>
                        <Card sx={{ width: 320, display: 'inline-block', float: 'left', margin: 2}}>
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
                                    Prise: {advert.price} {advert.currency}
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
                                <Box style={{backgroundColor: '#e6e4e5', display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "row", lineHeight: 2, marginTop: 5}}>
                                    <span style={{verticalAlign: "middle", marginRight: 20}}>Statisticts</span>
                                    <span style={{ marginRight: 5}}><RemoveRedEyeOutlinedIcon/>{advert.statistics.advert_views}</span>
                                    <span style={{ marginRight: 5}}><FavoriteBorderOutlinedIcon/>{advert.statistics.users_observing}</span>
                                    <span style={{ marginRight: 5}}><LocalPhoneOutlinedIcon/>{advert.statistics.phone_views}</span>
                                </Box>
                            </CardContent>

                            <Box>
                                <CardActions>
                                    <Button
                                        style={{float: "left", color: 'green'}}
                                        size="small"
                                        onClick={(e) => handleOpenCompleteDialog(e, advert)}
                                    >
                                        <CheckCircleOutlineRoundedIcon/>
                                    </Button>
                                    {completeDialog}

                                    <Button
                                        style={{float: "left", color: 'red'}}
                                        size="small"
                                        onClick={(e) => openAdvertForm(e, advert)}
                                    >
                                        <DeleteOutlineRoundedIcon/>
                                    </Button>

                                    <Button style={{float: "right", color: 'grey'}} onClick={()=>{window.open(advert.url, "_blank")}} size="small" >GO to source</Button>
                                </CardActions>
                            </Box>
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
