import { createSlice } from "@reduxjs/toolkit";

const users = [
  {
    id: 1,
    name: "Pakiza",
    email: "pakiza@example.com",
    password: "123456"
  },
  {
    id: 2,
    name: "Student",
    email: "student@example.com",
    password: "123456"
  }
];

const savedUser = localStorage.getItem("skilltrackUser");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  error: null
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;

      const user = users.find(
        (user) =>
          user.email === email &&
          user.password === password
      );

      if (!user) {
        state.error = "Invalid email or password";
        return;
      }

      state.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      state.error = null;

      localStorage.setItem(
        "skilltrackUser",
        JSON.stringify(state.user)
      );
    },

    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("skilltrackUser");
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;