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

            console.log({data})

            if (!data) {
                return {error: 'OLX_SESSION_FAILED'};
            }

            param.navigate('/trading-platform');

            return { success: "updated", data: data };
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const createRiaSession = createAsyncThunk(
    '/autoria/session',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/autoria/session`, param.data);

            const data = res.data?.data;

            if (!data) {
                return {error: 'AUTORIA_SESSION_FAILED'};
            }

            return { success: "updated", data: data };
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const getAdverts = createAsyncThunk(
    '/adverts',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/adverts`, param.data);

            const data = res.data?.data;

            if (!data) {
                return {error: 'OLX_ADVERTS_FAILED'};
            }

            return { success: "updated", data: data };
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)



const initialState = {
    data: null,
    error: null,
    adverts: [],
    olx_access_token: localStorage.getItem('olx_access_token'),
    olx_refresh_token: localStorage.getItem('olx_refresh_token'),
    ria_access_token: localStorage.getItem('ria_refresh_token'),
};

const slice = createSlice({
    name: 'marketplaces',
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
        builder.addCase(getAdverts.fulfilled, (state, action) => {
            state.adverts = action.payload.data;
        })
        builder.addCase(createRiaSession.fulfilled, (state, action) => {
            localStorage.setItem('ria_access_token', action.payload.data.access_token);
            state.ria_access_token = action.payload.data.access_token;
        })
    },
})

export default slice.reducer;
export const { logOut, setAvatar, clearMess } = slice.actions;
