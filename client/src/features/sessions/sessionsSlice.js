import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// GET
export const fetchSessions = createAsyncThunk(
  "sessions/fetchSessions",
  async () => {
    const response = await api.get("/sessions");
    return response.data;
  }
);

// POST
export const addSession = createAsyncThunk(
  "sessions/addSession",
  async (session) => {
    const response = await api.post("/sessions", session);
    return response.data;
  }
);

// PUT
export const updateSession = createAsyncThunk(
  "sessions/updateSession",
  async ({ id, session }) => {
    const response = await api.put(`/sessions/${id}`, session);
    return response.data;
  }
);

// DELETE
export const deleteSession = createAsyncThunk(
  "sessions/deleteSession",
  async (id) => {
    await api.delete(`/sessions/${id}`);
    return id;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchSessions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })

      .addCase(fetchSessions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ADD
      .addCase(addSession.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(addSession.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateSession.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (session) => session._id === action.payload._id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(updateSession.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (session) => session._id !== action.payload
        );
      })

      .addCase(deleteSession.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export default sessionsSlice.reducer;