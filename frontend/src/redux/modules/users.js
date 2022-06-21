import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import {parseToken} from "../../utils/parseToken";
import { toast } from 'react-toastify';

export const sendGetUser = createAsyncThunk(
    'users/sendGetUser',
    async (param, thunkAPI) => {
        try {
            if (!param.id) return null;
            const res = await axios.get(`/users/${param.id}`);
            return res.data.user;
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendDeleteUser = createAsyncThunk(
    'users/sendDeleteUser',
    async (id) => {
        try {
            await axios.delete(`/users/${id}`);
            toast.success("user deleted");
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendUpdate = createAsyncThunk(
    'users/sendUpdate',
    async (param, thunkAPI) => {
        try {
            const res = await axios.patch(`/users/${param.token}`, param.user);
            toast.success("Дані оновленно");
            param.navigate("/login");
            return {user: res.data};
        } catch (err) {
            toast.success(err.response.data.error);
        }
    }
)

export const sendUpdateVerify = createAsyncThunk(
    'users/sendUpdateVerify',
    async (param, thunkAPI) => {
        try {
            await axios.post(`/update-verify`, param);
            toast.success("Посилання надіслано на вказаний email");
        } catch (err) {
            toast.success(err.response.data.error);
        }
    }
)

export const sendLogin = createAsyncThunk(
    'users/sendLogin',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/login`, param.user);
            console.log(res);
            if (res?.data?.status) {
                console.log(121);
                param.navigate("/trading-platform")
                localStorage.setItem('token', res.data.token)
                toast.success("Авторизація пройшла успішно");
                return {
                    token: localStorage.getItem('token'),
                    user: res.data.user,
                    error: null,
                };
            } else {
                const codes = {
                    TOO_SHORT: 'Пароль занадто короткий'
                }

                if (res.data.error.code === 'FORMAT_ERROR') {
                    toast.error(codes[res.data.error.fields.password]);
                }
            }
        } catch (err) {
            console.log(err.response.data.error)
            toast.error(err.response.data.error);
        }
    }
)

export const sendRegister = createAsyncThunk(
    'users/sendRegister',
    async (param, thunkAPI) => {
        try {
            await axios.post(`/register`, param.user);
            param.navigate('/login');
            toast.success("Перевірте ваш email");
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }
)

export const sendVerifyEmail = createAsyncThunk(
    'users/sendVerifyEmail',
    async (params, thunkAPI) => {
        try {
            await axios.get(`/verify-email/${params.token}`);
            params.navigate("/login")
            toast.success("email підтверджено");
        } catch (err) {
            toast.error(err.response.data.error);
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
            toast.success("Ви успішно виведені із системи");
            localStorage.removeItem('token');
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
        })
        builder.addCase(sendUpdate.fulfilled, (state, action) => {
            state.user = action.payload.user;
        })
        builder.addCase(sendLogin.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        builder.addCase(sendRegister.fulfilled, (state, action) => {

        })
        builder.addCase(sendVerifyEmail.fulfilled, (state, action) => {

        })
        builder.addCase(sendUpdateVerify.fulfilled, (state, action) => {

        })
    }
})

export default slice.reducer;
export const { logOut } = slice.actions;
