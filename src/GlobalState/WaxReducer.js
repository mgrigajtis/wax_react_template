import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    isLogged: false,
    balance: 0
};

const wax = createSlice({
    name: 'wax',
    initialState,
    reducers: {
        setPlayerData: (state, action) => (action.payload),
        setPlayerLogout: (state, action) => initialState,
        setPlayerBalance: (state, action) => ({...state, balance: action.payload})
    }
});

export const { setPlayerData, setPlayerLogout, setPlayerBalance } = wax.actions;
export default wax.reducer;
