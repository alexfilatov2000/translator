import * as React from 'react';
import {
    Button,
    Avatar,
    ButtonBase,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {styleToolbar} from "../../styles/main";
import {Link} from "react-router-dom"
import {
    Box,
    Fab,
    AppBar,
    Tooltip,
    Toolbar,
    useScrollTrigger,
    Slide,
} from "@mui/material";
import {AttachMoney} from '@mui/icons-material';
import {Home, Settings, DisplaySettings} from "@mui/icons-material"
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

const drawerWidth = 240;

export default function ToolbarMain(props) {
    const { window } = props;
    const {t} = Tr();
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();
    const navigate = rd.useNavigate();
    const decode = parseToken(users.token);
    const container = window !== undefined ? () => window().document.body : undefined;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const register = () => {
        navigate('/register');
    }

    const settings = () => {
        navigate(`/settings`)
    }

    const home = () => {
        navigate(`/`)
    }

    const tradingPlatforms = () => {
        navigate(`/trading-platform`)
    }

    const statistics = () => {
        navigate(`/statistics`)
    }

    // const olx = () => {
    //     navigate(`/`)
    // }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {[{
                    text: 'HOME',
                    func: home
                }, {
                     text: 'Statistics',
                     func: statistics
                }, {
                    text: 'Trading Platforms',
                    func: tradingPlatforms
                },
                ]
                    .map(({text, func}) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={func}>
                            <ListItemIcon>
                                <AttachMoney/>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[{text: 'Settings', func: settings}].map(({text, func}) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={func}>
                            <ListItemIcon>
                                <DisplaySettings/>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );


    return (
        <div>
            <AppBar style={styleToolbar.toolbar}>
                <Toolbar >
                    <Box display={'flex'} style={{flexGrow: 7}}> </Box>
                    {users.token &&
                        <Box display={'flex'}>
                            <Tooltip title="home" arrow>
                                <Link to={'/'}>
                                    <Fab color="primary" size="small">
                                        <Home/>
                                    </Fab>
                                </Link>
                            </Tooltip>
                        </Box>
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
            {users.token &&
                <div>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: {sm: 'block', md: 'none'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: {xs: 'none', md: 'block'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </div>
            }
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

