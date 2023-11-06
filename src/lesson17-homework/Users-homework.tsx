import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   RootState,
   likeUser,
   deleteUser,
   fetchUsers,
   AppDispatch,
   setGenderFilter,
   setEyeColorFilter,
   setAgeFilter,
   selectFilteredUsers,
} from "./store";

interface User {
   id: number;
   firstName: string;
   lastName: string;
   liked: boolean;
   gender: string;
   eyeColor: string;
   age: number;
}

interface IUserProps {
   // TOOD: feel free to update this interface
   data: User;
}

const User: React.FC<IUserProps> = ({ data }) => {
   const dispatch: AppDispatch = useDispatch();

   const handleLike = () => {
      dispatch(likeUser(data.id));
   };
   const handleDelete = () => {
      dispatch(deleteUser(data.id));
   };
   // TODO: use db.json file to store data, use json-server to implement api
   // TODO: use redux-toolkit to implement state to fetch and update users, with redux thunk for async actions
   // TODO: use redux slice to generate actions and reducers, create selectors to implement all the logic.
   // TODO: do not use useState to store data locally, use redux store instead
   // TODO: do not filter data locally, use redux selectors instead
   // TODO: use nested selectors to filter data
   // TODO: move all data-related logic (filtering) to redux store

   // TODO: add logic to like user(s)
   // TODO: add logic to delete user(s)
   // TODO: add logic to filter users
   // TODO: do not focus on styling

   return (
      <li>
         <p>
            {data.firstName} {data.lastName}
         </p>
         <p>Liked: {data.liked ? "Yes" : "No"}</p>
         <button onClick={handleLike}>Like</button>
         <button onClick={handleDelete}>Delete</button>
      </li>
   );
};

export function Users() {
   const dispatch = useDispatch();

 
   const genderFilter = useSelector(
      (state: RootState) => state.users.genderFilter
   );
   const eyeColorFilter = useSelector(
      (state: RootState) => state.users.eyeColorFilter
   );
   const ageFilter = useSelector((state: RootState) => state.users.ageFilter);

   
   const handleGenderFilterChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      dispatch(setGenderFilter(event.target.value));
   };

   const handleEyeColorFilterChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      dispatch(setEyeColorFilter(event.target.value));
   };

   const handleAgeFilterChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      dispatch(setAgeFilter(event.target.value));
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const resultAction = await dispatch(fetchUsers());
            if (fetchUsers.fulfilled.match(resultAction)) {
               console.log("Users fetched:", resultAction.payload);
            } else if (fetchUsers.rejected.match(resultAction)) {
               console.error("Failed to fetch users:", resultAction.error);
            }
         } catch (error) {
            console.error("An error occurred:", error);
         }
      };

      fetchData();
   }, [dispatch]);
   const filteredUsers = useSelector(selectFilteredUsers);

   return (
      <>
         <form>
            <fieldset className='filter'>
               <legend>Filter by gender</legend>

               <label>
                  <input
                     type='radio'
                     name='gender'
                     value='female'
                     checked={genderFilter === "female"}
                     onChange={handleGenderFilterChange}
                  />{" "}
                  Gender - Female
               </label>

               <label>
                  <input
                     type='radio'
                     name='gender'
                     value='male'
                     checked={genderFilter === "male"}
                     onChange={handleGenderFilterChange}
                  />{" "}
                  Gender - Male
               </label>

               <label>
                  <input
                     type='radio'
                     name='gender'
                     value='all'
                     checked={genderFilter === "all"}
                     onChange={handleGenderFilterChange}
                  />{" "}
                  Gender - All
               </label>
            </fieldset>

            <fieldset className='filter'>
               <legend>Filter by eye color</legend>

               <label>
                  <input
                     type='radio'
                     name='eyeColor'
                     value='green'
                     checked={eyeColorFilter === "green"}
                     onChange={handleEyeColorFilterChange}
                  />
                  Eye Color - Green
               </label>

               <label>
                  <input
                     type='radio'
                     name='eyeColor'
                     value='brown'
                     checked={eyeColorFilter === "brown"}
                     onChange={handleEyeColorFilterChange}
                  />
                  Eye Color - Brown
               </label>

               <label>
                  <input
                     type='radio'
                     name='eyeColor'
                     value='gray'
                     checked={eyeColorFilter === "gray"}
                     onChange={handleEyeColorFilterChange}
                  />
                  Eye Color - Gray
               </label>
               <label>
                  <input
                     type='radio'
                     name='eyeColor'
                     value='blue'
                     checked={eyeColorFilter === "blue"}
                     onChange={handleEyeColorFilterChange}
                  />
                  Eye Color - Blue
               </label>

               <label>
                  <input
                     type='radio'
                     name='eyeColor'
                     value='amber'
                     checked={eyeColorFilter === "amber"}
                     onChange={handleEyeColorFilterChange}
                  />
                  Eye Color - Amber
               </label>

               <label>
                  <input
                     type='radio'
                     name='eyeColor'
                     value='all'
                     checked={eyeColorFilter === "all"}
                     onChange={handleEyeColorFilterChange}
                  />
                  Eye Color - All
               </label>
            </fieldset>

            <fieldset className='filter'>
               <legend>Filter by age</legend>

               <label>
                  <input
                     type='radio'
                     name='age'
                     value='less20'
                     checked={ageFilter === "less20"}
                     onChange={handleAgeFilterChange}
                  />
                  Age - Less than 20
               </label>

               <label>
                  <input
                     type='radio'
                     name='age'
                     value='20to40'
                     checked={ageFilter === "20to40"}
                     onChange={handleAgeFilterChange}
                  />
                  Age - From 20 to 40
               </label>

               <label>
                  <input
                     type='radio'
                     name='age'
                     value='more40'
                     checked={ageFilter === "more40"}
                     onChange={handleAgeFilterChange}
                  />
                  Age - More than 40
               </label>

               <label>
                  <input
                     type='radio'
                     name='age'
                     value='all'
                     checked={ageFilter === "all"}
                     onChange={handleAgeFilterChange}
                  />
                  Age - all
               </label>
            </fieldset>
         </form>
         <div>
            {filteredUsers.map((user) => (
               <User data={user} key={user.id} />
            ))}
         </div>
      </>
   );
}

export default Users;
