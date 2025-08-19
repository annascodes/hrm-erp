import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    pendingLeaves: []
}

const userSlice = createSlice(
    {
        name: 'user',
       initialState,
        reducers: {
            signIn : (state, action)=>{
                state.currentUser = action.payload;
            },
            logout: (state)=>{
                state.currentUser = null;
            },
            SetPendingLeaves: (state, action)=>{
                state.pendingLeaves = action.payload;
            }
            
        }
        
    }
)

export const {signIn, logout, SetPendingLeaves} = userSlice.actions
// export default userSlice.reducer
export const userReducer = userSlice.reducer;
