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

        following:(state,action) =>{
            //if current user has the other users id in their following, then remove that id
            if(state.currentUser.userData.following.includes(action.payload)){
                state.currentUser.userData.following.splice(
                    state.currentUser.userData.following.findIndex(
                        (followingId) => followingId === action.payload
                    )
                )
            //otherwise push into the array of ids
            }else{
                state.currentUser.userData.following.push(action.payload)
            }
        }
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logout,
    following
} = userSlice.actions

export default userSlice.reducer