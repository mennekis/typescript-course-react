import React, { useCallback } from "react";
import usersData from "../users-data";
import { TUser } from "../users-data";

interface IUserProps {
  data: {
    firstName: string;
    lastName: string;
  };
}

const User = (props: IUserProps) => {
  const { data } = props;

  // TODO: add delete button to each of the user
  // TODO: implement logic to delete user

  // TODO: add a Like button to each of the user
  // TODO: add a state to keep liked state - is user liked or not (true/false) - useState, default value false
  // TODO: implement logic to like user - click on the like button should change state of the user (liked/not liked
  // TODO: display hart icon if user is liked (💝)

  return (
    <li>
      <span>
        {data.firstName} {data.lastName}
      </span>
    </li>
  );
};

export function Users() {
  const [users, setUsers] = React.useState<TUser[]>(usersData);

  const handleDelete = (user: TUser) => {
    console.log("deleting", user);
    // TODO: implement function to delete user
    // TODO: create new list of users without deleted user
    // TODO: call setUsers with new list of users
  };
  console.log(handleDelete, setUsers);

  // TODO: pass handleDelete to User component

  // TODO: Add "Move Up" and "Move Down" buttons to each of the user
  // TODO: Implement functions to move user up/down the list
  // TODO: Make sure you create new list of users, do not mutate existing list
  // TODO: Call setUsers with new list of users
  // TODO: Pass handleMoveUp and handleMoveDown to User component as props

  return (
    <ul>
      {users.map((user) => (
        <User data={user} key={user.id} />
      ))}
    </ul>
  );
}

export default Users;
