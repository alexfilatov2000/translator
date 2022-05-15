import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../utils/axios";
import {parseToken} from "../../utils/parseToken";
import {sendGetAllUsers} from "./users";


export const createSession = createAsyncThunk(
    '/olx/session',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`/olx/session`, param.data);
            return { success: "updated", data: res.data };
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)


const initialState = {
    data: null,
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
            state.data = action.payload.data;
        })
    }
})

export default slice.reducer;
export const { logOut, setAvatar, clearMess } = slice.actions;
