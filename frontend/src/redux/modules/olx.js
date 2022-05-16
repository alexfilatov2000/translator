import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import {parseToken} from "../../utils/parseToken";
import {sendGetAllUsers} from "./users";


export const createSession = createAsyncThunk(
    '/olx/session',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/olx/session`, param.data);

            const data = res.data?.data;

            if (!data) {
                return {error: 'OLX_SESSION_FAILED'};
            }

            console.log({data})

            param.navigate('/');

            return { success: "updated", data: data };
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)


const initialState = {
    data: null,
    error: null,
    olx_access_token: localStorage.getItem('olx_access_token'),
    olx_refresh_token: localStorage.getItem('olx_refresh_token'),
};

const slice = createSlice({
    name: 'olx',
    initialState: initialState,
    reducers: {
        // createSession: (state, action) => {
        //     state.olxData = action.payload.data;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(createSession.fulfilled, (state, action) => {
            localStorage.setItem('olx_access_token', action.payload.data.access_token);
            localStorage.setItem('olx_refresh_token', action.payload.data.refresh_token);
            state.olx_access_token = action.payload.data.access_token;
            state.olx_refresh_token = action.payload.data.refresh_token;
        })
    }
})

export default slice.reducer;
export const { logOut, setAvatar, clearMess } = slice.actions;
