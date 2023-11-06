import {
   configureStore,
   createSlice,
   createAsyncThunk,
} from "@reduxjs/toolkit";

interface User {
   id: number;
   firstName: string;
   lastName: string;
   liked: boolean;
   gender: string;
   eyeColor: string;
   age: number;
}

interface AppState {
   users: User[];
   genderFilter: string;
   eyeColorFilter: string; 
   ageFilter: string; 
}

const initialState: AppState = {
   users: [],
   genderFilter: "all", 
   eyeColorFilter: "all", 
   ageFilter: "all",
};

export const fetchUsers = createAsyncThunk<User[]>(
   "users/fetchUsers",
   async () => {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
         throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data as User[];
   }
);
export const likeUser = createAsyncThunk<User, number>(
   "users/likeUser",
   async (userId) => {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ liked: true }),
      });
      if (!response.ok) {
         throw new Error("Failed to update user");
      }
      return (await response.json()) as User;
   }
);

export const usersSlice = createSlice({
   name: "users",
   initialState,
   reducers: {
      likeUser: (state, action) => {
         const user = state.users.find((user) => user.id === action.payload);
         if (user) {
            user.liked = !user.liked;
         }
      },
      deleteUser: (state, action) => {
         state.users = state.users.filter((user) => user.id !== action.payload);
      },
      setGenderFilter: (state, action) => {
         state.genderFilter = action.payload;
      },
      setEyeColorFilter: (state, action) => {
         state.eyeColorFilter = action.payload;
      },
      setAgeFilter: (state, action) => {
         state.ageFilter = action.payload;
      },
   },
});

export const selectFilteredUsers = (state: RootState) => {
   const { users, genderFilter, eyeColorFilter, ageFilter } = state.users;

   let filteredUsers = users;
   if (genderFilter !== "all") {
      filteredUsers = filteredUsers.filter(
         (user) => user.gender === genderFilter
      );
   }

   if (eyeColorFilter !== "all") {
      filteredUsers = filteredUsers.filter(
         (user) => user.eyeColor === eyeColorFilter
      );
   }

   if (ageFilter !== "all") {
      filteredUsers = filteredUsers.filter((user) => {
         if (ageFilter === "less20") {
            return user.age < 20;
         } else if (ageFilter === "20to40") {
            return user.age >= 20 && user.age <= 40;
         } else if (ageFilter === "more40") {
            return user.age > 40;
         }
         return true;
      });
   }

   return filteredUsers;
};

export const { deleteUser, setGenderFilter, setEyeColorFilter, setAgeFilter } =
   usersSlice.actions;

const store = configureStore({
   reducer: {
      users: usersSlice.reducer,
   },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
