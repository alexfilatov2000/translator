import React from "react";
import {Button, Typography} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {sendLogin, sendUpdateVerify} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {useTranslation} from 'react-i18next'
import {Link} from "react-router-dom";
const Tr = useTranslation;

export default function UpdateVerify() {
    const {t} = Tr();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);

    const [email, setEmail] = r.useState('');
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(sendUpdateVerify({email}));
    };

    const onChangeEmail = (e) => setEmail(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>{t('Update verify')}</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomInput onChange={onChangeEmail} required placeholder={t('email')} type='email'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>{t("Далі")}</Button>
            </form>
            <p style={{textDecoration:"none", color:"#a2a2a2"}}>
                {t('We will send link to email')}
            </p>
        </div>
    )
}