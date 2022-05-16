import React from "react";
import {Button} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {sendLogin} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {useTranslation} from 'react-i18next'
const Tr = useTranslation;

function Login() {
    const {t} = Tr();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);

    const [email, setEmail] = r.useState('');
    const [password, setPassword] = r.useState('');
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {email, password};
        dispatch(sendLogin({user: User, navigate: navigate}));
    };

    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>{t('sing in')}</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomInput onChange={onChangeEmail} required placeholder={t('email')} type='email'/>
                <CustomInput onChange={onChangePassword} required placeholder={t('password')} type='password'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>{t("Go")}</Button>
            </form>
        </div>
    )
}

export default Login;
