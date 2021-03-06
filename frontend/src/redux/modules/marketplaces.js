import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import { toast } from 'react-toastify';


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

            if (data?.error) {
                return { error: data.error };
            }

            return { success: true, data };
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

            console.log(data)

            return { success: "updated", data };
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const cloneAdverts = createAsyncThunk(
    '/adverts/clone',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/adverts/clone`, param.data);

            const data = res.data?.data;

            if (!data) {
                return {error: 'CLONE_FAILED'};
            }

            return { success: "updated", data };
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const markAsSold = createAsyncThunk(
    '/adverts/mark_as_sold',
    async (param, thunkAPI) => {
        try {
            console.log(1, param.token)
            const res = await axios.post(`/adverts/mark_as_sold`, param.data, {
                headers: {
                    authorization: `Bearer ${param.token}`
                }
            });

            const data = res.data?.data;

            if (!data) {
                toast.error("MARK_AS_SOLD_FAILED");
                return {error: 'MARK_AS_SOLD_FAILED'};
            }

            param.onClose();
            toast.success("?????????? ?????????????? ???????????? ?? ???????????? ????????????????");
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const deactivateProduct = createAsyncThunk(
    '/adverts/deactivateProduct',
    async (param, thunkAPI) => {
        try {
            // console.log(1, param.token)
            // const res = await axios.post(`/adverts/deactivateProduct`, param.data, {
            //     headers: {
            //         authorization: `Bearer ${param.token}`
            //     }
            // });
            //
            // const data = res.data?.data;
            //
            // if (!data) {
            //     toast.error("MARK_AS_SOLD_FAILED");
            //     return {error: 'MARK_AS_SOLD_FAILED'};
            // }

            param.onClose();
            toast.success("?????????? ?????? ?????????????? ??????????????????????????");
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const getSoldStatistics = createAsyncThunk(
    '/adverts/statistics',
    async (param, thunkAPI) => {
        try {
            const res = await axios.get(`/adverts/statistics`, {
                headers: {
                    authorization: `Bearer ${param.token}`
                }
            });

            const data = res.data?.data;

            if (!data) {
                toast.error("GET_SOLD_STATISTICS_FAILED");
                return {error: 'GET_SOLD_STATISTICS_FAILED'};
            }

            return { data };
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)


const initialState = {
    data: null,
    error: null,
    adverts: [],
    soldStatistics: null,
    olx_access_token: localStorage.getItem('olx_access_token'),
    olx_refresh_token: localStorage.getItem('olx_refresh_token'),
    ria_access_token: localStorage.getItem('ria_access_token'),
    ria_user_id: localStorage.getItem('ria_user_id'),
    success: null
};

const slice = createSlice({
    name: 'marketplaces',
    initialState: initialState,
    reducers: {
        // createSession: (state, action) => {
        //     state.olxData = action.payload.data;
        // }
        logOutMarkets: (state, action) => {
            state.olx_access_token = null;
            state.olx_refresh_token = null;
            state.ria_access_token = null;
            state.ria_user_id = null;
            state.sourceCount = null;
            localStorage.removeItem('olx_access_token');
            localStorage.removeItem('olx_refresh_token');
            localStorage.removeItem('ria_access_token');
            localStorage.removeItem('ria_user_id');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createSession.fulfilled, (state, action) => {
            localStorage.setItem('olx_access_token', action.payload.data.access_token);
            localStorage.setItem('olx_refresh_token', action.payload.data.refresh_token);
            state.olx_access_token = action.payload.data.access_token;
            state.olx_refresh_token = action.payload.data.refresh_token;
        })
        builder.addCase(getAdverts.fulfilled, (state, action) => {
            state.adverts = action.payload.data.adverts;
            state.sourceCount = action.payload.data.sourceCount;
        })
        builder.addCase(createRiaSession.fulfilled, (state, action) => {
            const ria_access_token = action.payload?.data?.ria_access_token;
            const ria_user_id = action.payload?.data?.ria_user_id;
            if (ria_access_token && ria_user_id) {
                localStorage.setItem('ria_access_token', ria_access_token);
                localStorage.setItem('ria_user_id', ria_user_id);
                state.ria_access_token = ria_access_token;
                state.ria_user_id = ria_user_id;
            } else {
                state.error = action.payload?.error;
            }
        })
        builder.addCase(getSoldStatistics.fulfilled, (state, action) => {
            state.soldStatistics = action.payload.data
        })
    },
})

export default slice.reducer;
export const { logOutMarkets } = slice.actions;
