import React from "react";
import {sendVerifyEmail} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Navigate} from "react-router-dom";
import * as r from "react";
import {styleAuth} from "../../styles/main";

function verify() {
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const navigate = rd.useNavigate();
    const { token } = rd.useParams();

    r.useEffect(() => {
        if (users.status === 'idle'){
            dispatch(sendVerifyEmail({token, navigate}))
        }
    },[dispatch])

    const ok = (
        <div>
            <h2 style={styleAuth.Title}>Verify account</h2>
        </div>
    );

    return (
        <div>
            {users.error && <Navigate to="/404" />}
            {!users.error && ok}
        </div>
    )
}

export default verify;
