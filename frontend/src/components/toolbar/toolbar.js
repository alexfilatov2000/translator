import * as React from 'react';
import {Button, Avatar, ButtonBase} from "@mui/material";
import {styleToolbar} from "../../styles/main";
import {Link} from "react-router-dom"
import {
    Box,
    Fab,
    AppBar,
    Tooltip,
    Toolbar,
    useScrollTrigger,
    Slide
} from "@mui/material";
import {Home, Settings} from "@mui/icons-material"
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import config from "../../config/config";
import {parseToken} from '../../utils/parseToken';
import Lg from './lgSelector'
import {useTranslation} from 'react-i18next'
import {AlertMessage} from "../utils/alert";
import PropTypes from 'prop-types';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
const Tr = useTranslation;

export function ScrollTop(props) {
    const { children } = props;
        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 100,
        });

    const handleClick = (event) => {
        event.view.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function ToolbarMain(props) {
    const {t} = Tr();
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();
    const navigate = rd.useNavigate();
    const decode = parseToken(users.token);

    const register = () => {
        navigate('/register');
    }

    const settings = () => {
        navigate(`/settings`)
    }

    return (
        <div>
            <AppBar style={styleToolbar.toolbar}>
                <Toolbar >
                    <div style={{flexGrow: 7, textAlign: 'left'}}>
                        <Box display={'flex'}>
                            <Tooltip title="home" arrow>
                                <Link to={'/'}>
                                    <Fab color="primary" size="small">
                                        <Home/>
                                    </Fab>
                                </Link>
                            </Tooltip>
                        </Box>
                    </div>
                    {users.token &&
                        <div>
                            <Tooltip title="settings" arrow>
                                <ButtonBase onClick={settings}>
                                    <Fab color="secondary" size="small">
                                        <Settings/>
                                    </Fab>
                                </ButtonBase>
                            </Tooltip>
                        </div>
                    }
                    {!users.token && <Lg/>}
                    {!users.token &&
                        <div>
                            <Link style={styleToolbar.Link} to="/login">{t("sing in")}</Link>
                            <Button
                                style={styleToolbar.button}
                                onClick={register}
                                variant='contained' color='primary'
                            >
                                {t("register")}
                            </Button>
                        </div>
                    }
                    </Toolbar>
                </AppBar>
            <Toolbar />
            <Box display={'block'} style={{width: 250, margin: 15, right: 15, position: "absolute"}}>
                <AlertMessage error={users.error} success={users.success}/>
            </Box>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </div>
    );
}

