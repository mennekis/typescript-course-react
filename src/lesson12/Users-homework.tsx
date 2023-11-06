import React, { useState } from "react";
import usersData from "../users-data";
import { TUser } from "../users-data";

interface IUserProps {
   data: {
      id: number;
      firstName: string;
      lastName: string;
   };
   onDelete: (id: number) => void;
   onLike: (id: number) => void;
   onMoveUp: (id: number) => void;
   onMoveDown: (id: number) => void;
}

const User = (props: IUserProps) => {
   const { data, onDelete, onLike, onMoveUp, onMoveDown } = props;
   const [liked, setLiked] = useState(false);
   const handleDelete = () => {
      onDelete(data.id);
   };

   const handleLike = () => {
      setLiked(!liked);
      onLike(data.id);
   };
   const handleMoveUp = () => {
      onMoveUp(data.id);
   };
   const handleMoveDown = () => {
      onMoveDown(data.id);
   };

   // TODO: add delete button to each of the user
   // TODO: implement logic to delete user

   // TODO: add a Like button to each of the user
   // TODO: add a state to keep liked state - is user liked or not (true/false) - useState, default value false
   // TODO: implement logic to like user - click on the like button should change state of the user (liked/not liked
   // TODO: display hart icon if user is liked (💝)

   return (
      <li key={data.id}>
         <span>
            {data.firstName} {data.lastName}
         </span>
         <button onClick={handleDelete}>Delete</button>
         <button onClick={handleLike}>{liked ? "💝" : "Like"}</button>
         <button onClick={handleMoveUp}>MoveUp</button>
         <button onClick={handleMoveDown}>MoveDown</button>
      </li>
   );
};
export function Users() {
   const [users, setUsers] = React.useState<TUser[]>(usersData);

   const handleDelete = (id: number) => {
      console.log("deleting id", id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      // TODO: implement function to delete user
      // TODO: create new list of users without deleted user
      // TODO: call setUsers with new list of users
   };
   const handleLike = (id: number) => {
      console.log("liking user with id", id);
   };
   const handleMoveUp = (id: number) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex > 0) {
         const newUsers = [...users];
         const currentUser = newUsers[userIndex];
         newUsers[userIndex] = newUsers[userIndex - 1];
         newUsers[userIndex - 1] = currentUser;

         setUsers(newUsers);
      }
   };
   const handleMoveDown = (id: number) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex < users.length - 1) {
         const newUsers = [...users];
         const currentUser = newUsers[userIndex];
         newUsers[userIndex] = newUsers[userIndex + 1];
         newUsers[userIndex + 1] = currentUser;
         setUsers(newUsers);
      }
   };
   // TODO: pass handleDelete to User component

   // TODO: Add "Move Up" and "Move Down" buttons to each of the user
   // TODO: Implement functions to move user up/down the list
   // TODO: Make sure you create new list of users, do not mutate existing list
   // TODO: Call setUsers with new list of users
   // TODO: Pass handleMoveUp and handleMoveDown to User component as props

   return (
      <ul>
         {users.map((user) => (
            <User
               data={user}
               key={user.id}
               onDelete={handleDelete}
               onLike={handleLike}
               onMoveUp={() => handleMoveUp(user.id)}
               onMoveDown={() => handleMoveDown(user.id)}
            ></User>
         ))}
      </ul>
   );
}

export default Users;
