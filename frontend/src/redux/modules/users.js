import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import {parseToken} from "../../utils/parseToken";

export const sendGetUser = createAsyncThunk(
    'users/sendGetUser',
    async (param, thunkAPI) => {
        try {
            if (!param.id) return null;
            const res = await axios.get(`/users/${param.id}`);
            return res.data.user;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendDeleteUser = createAsyncThunk(
    'users/sendDeleteUser',
    async (id) => {
        try {
            await axios.delete(`/users/${id}`);
            return {success: "user deleted"};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendUpdate = createAsyncThunk(
    'users/sendUpdate',
    async (param, thunkAPI) => {
        try {
            const res = await axios.patch(`/users/${param.id}`, param.user);
            param.navigate(`/users/${param.id}`);
            return {success: "updated", user: res.data};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendLogin = createAsyncThunk(
    'users/sendLogin',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/login`, param.user);
            if (!res.data.status) {
                //TODO: сделать нормальный вывод ошибок при логине и регестрации, на беке все ок
                return {error: res.data.error.code};
            } else {
                param.navigate("/")
                localStorage.setItem('token', res.data.token)
                return {
                    token: localStorage.getItem('token'),
                    user: res.data.user,
                    error: null,
                    success: "login"
                };
            }
        } catch (err) {
            console.log(err.response.data.error)
            return {error: err.response.data.error};
        }
    }
)

export const sendRegister = createAsyncThunk(
    'users/sendRegister',
    async (param, thunkAPI) => {
        try {
            await axios.post(`/register`, param.user);
            param.navigate('/login');
            return {error: null, success: "check your email"};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendVerifyEmail = createAsyncThunk(
    'users/sendVerifyEmail',
    async (params, thunkAPI) => {
        try {
            await axios.get(`/verify-email/${params.token}`);
            params.navigate("/login")
            return {success: "email is verified"};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

const initialState = {
    error: null,
    success: null,
    status: 'idle',
    token: localStorage.getItem('token'),
    user: null,
    count: 1,
    page: 1,
};

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            state.success = "logout";
            localStorage.removeItem('token');
        },
        clearMess: (state, action) => {
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendGetUser.fulfilled, (state, action) => {
            const token = parseToken(state.token);
            if (Date.now() >= token.exp * 1000){
                state.user = null;
                state.users = [];
                state.specUser = null;
                state.token = null;
                localStorage.removeItem('token');
            } else {
                state.user = action.payload;
            }
        })
        builder.addCase(sendDeleteUser.fulfilled, (state, action) => {
            state.specUser = null;
            state.users = null;
            state.success = "user deleted";
        })
        builder.addCase(sendUpdate.fulfilled, (state, action) => {
            state.error = action.payload.error;
            state.success = action.payload.success;
            state.user = action.payload.user;
        })
        builder.addCase(sendLogin.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
        builder.addCase(sendRegister.fulfilled, (state, action) => {
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
        builder.addCase(sendVerifyEmail.fulfilled, (state, action) => {
            state.error = action.payload.error;
            state.success = action.payload.success;
        })
    }
})

export default slice.reducer;
export const { logOut, clearMess } = slice.actions;
