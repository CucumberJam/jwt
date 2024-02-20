import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from "./itemService";

const initialState = {
    items: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


// Create item:
export const create =
    createAsyncThunk(
        'items/create',
        async(itemData, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.refreshToken;
            return await ItemService.create(itemData, token);
        }catch (error) {
            errorHandler(error, thunkAPI);
        }
    });

// Get user items:
export const getAll = createAsyncThunk(
    'items/getall',
    async(_, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.refreshToken;
            return await ItemService.getAll(token);
        }catch (error) {
            errorHandler(error, thunkAPI);
        }
    }
);

// Delete user's item:
export const remove = createAsyncThunk(
    'items/delete',
    async(itemId, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.refreshToken;
            return await ItemService.remove(itemId, token);
        }catch (error) {
            errorHandler(error, thunkAPI);
        }
    }
);

export const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.pending, state => pending(state))
            .addCase(create.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items.push(action.payload);
            })
            .addCase(create.rejected, (state, action) => rejected(state, action))
            .addCase(getAll.pending, state => pending(state))
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => rejected(state, action))
            .addCase(remove.pending, state => pending(state))
            .addCase(remove.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = state.items.filter(item => item._id !== action.payload.id);
            })
            .addCase(remove.rejected, (state, action) => rejected(state, action))
    }
});

const errorHandler = (error, thunkAPI) => {
    const message = (error.response &&
            error.response.data &&
            error.response.data.message)
        || error.message
        || error.toString();

    return thunkAPI.rejectWithValue(message);
}
const pending = (state) => {
    state.isLoading = true;
}
const rejected = (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
}
export default itemSlice.reducer;
export const {reset} = itemSlice.actions;
