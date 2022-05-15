import { styled, alpha } from '@mui/material/styles';
import {InputBase} from '@mui/material';

export const CustomInput = styled(InputBase)(({ theme }) => ({
    width: '100%',
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        // color: "#a2a2a2",
        borderRadius: 4,
        position: 'relative',
        backgroundColor: "rgba(255,255,255,0)",
        border: '1px solid #a2a2a2',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));


export const styleAuth = {
    Title: {
        color: "#a2a2a2"
    },
    Div: {
        width: '320px',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
    },
    Button: {
        width: '100%',
        height: '40px',
        marginBottom: 10,
        marginTop: 0,
    },
    TextField: {
        width: '100%',
        marginBottom: '10px',
        color: "#a2a2a2",
    },
    TextareaAutosize: {
        color: "#a2a2a2",
        background: "rgba(255,255,255,0)",
        width: '98%',
        margin: "auto",
        marginBottom: '5px',
        minHeight: 80,
        maxWidth: "98%"
    },
    Form: {
        display: "grid",
        gridRowGap: 8
    }
};

export const styleToolbar = {
    toolbar: {
        background: '#ffffff',
        boxShadow: '0 0 4px 1px yellow, 0 0 0px #333',
        borderBottom: "0.1px solid #a2a2a2",
    },
    button: {
        marginRight: '20px',
        fontSize: '15px',
    },
    Avatar: {
        boxShadow: '0 0 0 0px black, 0 0 2px #333',
        '&:hover': {
            boxShadow: '0 0 0 0px black, 0 0 5px #333',
        }
    },
    Link: {
        color: "#cbac4a",
        font: 'italic small-caps bold 15px',
        padding: '10px',
        marginRight: '20px',
        textAlign: 'left',
        textDecoration: 'none',
        '&:hover':{
            color: '#a22929'
        }
    },
}

export const stylesCart = {
    root: {
        marginLeft: '20px',
        marginRight: '20px',
        boxShadow: "2px 3px 10px black, 0 0 10px #a2a2a2 inset",
        background: 'rgba(0,30,60,0)',
        border: "1px solid #a2a2a2",
        borderRadius: 10
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        width: "100%",
        height: "100%",
        textTransform: "none"
    },
    text: {
        color: "#a2a2a2",
        textAlign: "justify",
        lineHeight: "25px",
        outline: 0,
        fontSize: 18,
        textOverflow: 'ellipsis',
    },
    textBlue: {
        fontFamily: "'Shadows Into Light', cursive",
        color: "rgb(51, 153, 255)",
        textAlign: "justify",
        lineHeight: "25px",
        outline: 0,
        fontSize: 18,
        textOverflow: 'ellipsis',
        margin: 0,
    },
    cardActions: {
        width: '100%',
        margin: "auto",
        // marginLeft: 3,
        // marginRight: 3,
        border: "1px solid rgb(51, 153, 255)",
        boxShadow: "2px 3px 10px black, 0 0 10px rgb(51, 153, 255) inset",
        borderRadius: 10
    },
    titleText: {
        color: "#a2a2a2",
        fontSize: 25,
        fontFamily: "blud"
    },
    up: {
        margin: "auto",
        width: "300px",
        // borderRight: "0.1px solid yellow",
        borderLeft: "2px solid yellow",
        height: 40
    },
    menu: {
        color: "#a2a2a2",
        background: "rgba(0,0,0,0)",
        maxHeight: 20 * 4.5,
        // border: "0.1px solid yellow",
        boxShadow: "2px 3px 10px black, 0 0 10px rgb(51, 153, 255) inset",
        // width: 100,
    }
};
