import React from "react";
import {Avatar, Box, Tooltip, Pagination, Fab} from '@mui/material';
import {CustomCard} from '../utils/cardUser';
import {sendGetAllUsers} from '../../redux/modules/users'
import * as rr from "react-redux";
import * as r from "react";
import config from "../../config/config";
import {Link} from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

function users() {
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();

    r.useEffect(() => {
        if (users.status === 'idle'){
            dispatch(sendGetAllUsers({page: 1}))
        }
    },[dispatch])

    const handleChange = (event, value) => {
        dispatch(sendGetAllUsers({page: value}));
    }

    return (
        <div style={{width: '100%'}}>
            <h1 style={{color: "#a2a2a2"}}>Users</h1>
            {users.user && (users.user.role === 'admin') &&
                <Tooltip title="create user" aria-label="add">
                    <Link to={'/createuser'}>
                        <Fab color="primary" size="small">
                            <AddIcon/>
                        </Fab>
                    </Link>
                </Tooltip>
            }
            {users.users && users.users.length !== 0 &&
                <Box display={'flex'}>
                    {users.users.map(i => (
                        <div key={i.id} >
                            <CustomCard user={i} me={users.user}/>
                        </div>
                    ))}
                </Box>
            }
            {users.count > 10 &&
                <div style={{margin: 20}}>
                    <Pagination count={Math.ceil(users.count/10)} page={users.page} onChange={handleChange} variant="outlined" color="primary" />
                </div>
            }
        </div>
    );
}

export default users;
