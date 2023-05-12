import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    isLoading: false,
    error: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        //start user login process
        loginStart: (state) => {
            state.isLoading = true
        },
        //if login succeeds
        loginSuccess: (state, action) =>{
            state.isLoading = false
            state.currentUser= action.payload
        },

        loginFailed: (state) =>{
            state.isLoading = false
            state.error = true
        },
        //when user logs out, return initial state
        logout: (state) =>{
            return initialState
        },
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logout
} = userSlice.actions

export default userSlice.reducer