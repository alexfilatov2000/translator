import React from "react";
import {Button, Typography} from "@mui/material";
import {styleAuth, CustomInput} from "../../styles/main"
import {sendLogin, sendUpdate} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {useTranslation} from 'react-i18next'
import {Link} from "react-router-dom";
const Tr = useTranslation;

export default function ResetPassword() {
    const {t} = Tr();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const { token } = rd.useParams();

    const [password, setPassword] = r.useState('');
    const navigate = rd.useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {password};
        dispatch(sendUpdate({token, navigate, user: User}));
    };

    const onChangePassword = (e) => setPassword(e.target.value);

    return (
        <div style={styleAuth.Div}>
            <h2 style={styleAuth.Title}>{t('Відновлення пароля')}</h2>
            <form onSubmit={handleSubmit} style={styleAuth.Form}>
                <CustomInput onChange={onChangePassword} required placeholder={t('password')} type='password'/>
                <Button style={styleAuth.Button} type="submit" variant='contained' color='primary'>{t("Далі")}</Button>
            </form>
        </div>
    )
}