import React, {useEffect} from "react";
import { Box, Typography, Button, Avatar } from '@mui/material';
import * as rr from "react-redux";
import {useTranslation} from 'react-i18next'
import {logOut, sendGetUser} from "../../redux/modules/users";
import {parseToken} from '../../utils/parseToken';
import * as rd from "react-router-dom";
import Lg from "../toolbar/lgSelector"
import {logOutMarkets} from "../../redux/modules/marketplaces";

const Tr = useTranslation;

const styles = {
    personalInformation: {
        width: 400,
        // minWidth: '400px',
        margin: 'auto',
        marginTop: 40,
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
    base: {
        width: '100%',
        textTransform: 'none',
        marginBottom: '10px',
        display: 'flex'
    },
    baseAvatar: {
        width: 100,
        height: 100,
        borderRadius: '100px',
        margin: '30px',
    },
    type: {
        flex: 1,
        padding: 15,
        textAlign: 'left',
    },
    value: {
        flex: 3,
        textAlign: 'left',
        font: '1.2em "Fira Sans", sans-serif',
    },
    img: {
        width: '200px',
        height: '200px',
        boxShadow: '0 0 0 0px black, 0 0 4px #333',
    },
    text: {
        // color: '#a2a2a2',
    }
}

export default function Settings() {
    const {t} = Tr();
    const dispatch = rr.useDispatch();
    const navigate = rd.useNavigate();
    const users = rr.useSelector(state => state.users);
    const decode = parseToken(users.token);

    const handleLogOut = () => {
        dispatch(logOut())
        dispatch(logOutMarkets())
        navigate('/');
    }

    useEffect(()=>{
        if (decode.id){
            dispatch(sendGetUser({id: decode.id}))
        }
    }, [])

    return (
        <Box>
            <div style={styles.personalInformation}>
                <Box display={'flex'}>
                    <div>
                        <h2 style={styles.text}>Language</h2>
                        <div style={{margin: 10}}>
                            <Lg/>
                        </div>
                    </div>
                    <Avatar
                        // src={"../../../public/avatar.png"}
                        sx={styles.baseAvatar}
                    />
                </Box>
                
                <h2 style={styles.text}>Personal information</h2>
                <Button style={styles.base} variant='outlined'>
                    <div style={styles.type}>email</div>
                    <div style={styles.value}>{users.user?.email}</div>
                </Button>
                <Button style={styles.base} variant='outlined'>
                    <div style={styles.type}>password</div>
                    <div style={styles.value}>
                        <div>********</div>
                    </div>
                </Button>
                <Button style={{marginRight:20, marginBottom:10}} onClick={handleLogOut} variant='outlined' color='secondary'>
                    LOG OUT
                </Button>
                {/*<Button onClick={handleOpenDialog} style={{marginBottom:10}} variant='contained' color='secondary'>*/}
                {/*    <DeleteIcon fontSize='small'/>*/}
                {/*    delete*/}
                {/*</Button>*/}
            </div>
        </Box>
    );

}