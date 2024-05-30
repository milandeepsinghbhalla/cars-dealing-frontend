import { createSlice } from '@reduxjs/toolkit'


const userDataSlice = createSlice({
    name: 'userData',
    initialState: { 
      firstName: 'Guest',
      lastName: '',
      email: '',
      role: 'customer'
     },
    reducers: {
      // increment: (state) => { state.count += 1; },
      // decrement: (state) => { state.count -= 1; },
      loginUser: (state,action)=>{
        console.log('action:- ',action)
          state.firstName = action.payload.userData.firstName;
          state.lastName = action.payload.userData.lastName;
          state.email = action.payload.userData.email;
          state.role = action.payload.userData.role;
          return state;

      },
      logoutUser: (state)=>{
          state = { 
              firstName: 'Guest',
              lastName: '',
              email: '',
              role: 'customer'
          }
          return state;
      }
    },
  });

  export const {loginUser,logoutUser} =  userDataSlice.actions

  export default userDataSlice.reducer;
  