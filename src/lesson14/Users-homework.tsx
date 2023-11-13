import React, { useEffect, useState } from "react";
import { TUser } from "../users-data";

interface IUserProps {
   data: TUser;
}
interface IFormData {
   id: number;
   position: number;
   firstName: string;
   lastName: string;
   hairColor: string;
   birthDate: string;
   isFemale: boolean;
   email: string;
}

// # Users list and form with api

// 1. Update User list component to fetch data from api
// 2. Add loading state to User list component (show loading message while list is loading)
// 3. Add buttons to move user up/down the list, store position in db json (add position field to each of the users)
// 4. Add form component to create new user shown as modal. Show form on click on the button "Add new user"
// 5. Form to create user needs to have the following inputs
//    1. User first name (text input)
//    2. User last name (text input)
//    3. User hair color (select input)
//    4. User birthDate (datetime input)
//    5. User is female (checkbox input)
//    6. User email (email input)
// 6. Add form validation to the form component
//    1. User first name is required
//    2. User last name is required
//    3. User email is required and should be valid email
//    4. User birthDate is required and should be valid date
// 7. Form submit button of the form component should be disabled if form is invalid
// 8. Show error message for invalid fields

const User = (props: IUserProps) => {
   const { data } = props;

   return (
      <li key={data.id}>
         <div>
            {data.firstName} {data.lastName}
            <div>{data.age}</div>
            <div>{data.gender}</div>
            <div>{data.phone}</div>
            <img src={data.image} />
         </div>
      </li>
   );
};

export function Users() {
   const [users, setUsers] = useState<TUser[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [showCreateUserForm, setShowCreateUserForm] = useState<boolean>(false);
   const [formData, setFormData] = useState<IFormData>({
      id: 0,
      position: 0,
      firstName: "",
      lastName: "",
      hairColor: "",
      birthDate: "",
      isFemale: false,
      email: "",
   });
   const [errors, setErrors] = useState<Partial<IFormData>>({});

   const fetchUsers = () => {
      fetch("http://localhost:3000/users")
         .then((resp) => resp.json())
         .then((data: TUser[]) => {
            console.log(data);
            setUsers(data);
            setLoading(false);
         })
         .catch((error) => {
            console.error("Error fetching user data: ", error);
            setLoading(false);
         });
   };

   useEffect(() => {
      fetchUsers();
   }, []);

   const openCreateUserForm = () => {
      setShowCreateUserForm(true);
   };
   const closeCreateUserForm = () => {
      setShowCreateUserForm(false);
      // Clear form data and errors when the form is closed
      setFormData({
         id: 0,
         position: 0,
         firstName: "",
         lastName: "",
         hairColor: "",
         birthDate: "",
         isFemale: false,
         email: "",
      });
      setErrors({});
   };

   const validateForm = () => {
      const newErrors: Partial<IFormData> = {};

      if (!formData.firstName.trim()) {
         newErrors.firstName = "First name is required";
      }

      if (!formData.lastName.trim()) {
         newErrors.lastName = "Last name is required";
      }

      if (
         !formData.email.trim() ||
         !formData.email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)
      ) {
         newErrors.email = "Invalid email address";
      }

      if (!formData.birthDate.trim() || isNaN(Date.parse(formData.birthDate))) {
         newErrors.birthDate = "Invalid birth date";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
   };

   const handleFormSubmit = () => {
      if (validateForm()) {
         // Handle the form submission, for example, send data to the API
         // You can add the logic to send the new user data to the server here
         // After successful submission, close the form
         const newUser: IFormData = { ...formData };
         fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
         })
            .then((resp) => resp.json())
            .then((data: TUser) => {
               console.log("User created:", data);

               // Закрытие формы и обновление списка пользователей
               closeCreateUserForm();
               fetchUsers();
            })
            .catch((error) => {
               console.error("Error creating user: ", error);
            });
      }
   };

   return (
      <div>
         <button onClick={openCreateUserForm}>Add new user</button>
         {loading ? (
            <p>Loading...</p>
         ) : (
            <ul>
               {users.map((user) => (
                  <User data={user} key={user.id} />
               ))}
            </ul>
         )}
         {showCreateUserForm && (
            <div>
               <h2>Create New User</h2>
               <form>
                  <label>First Name:</label>
                  <input
                     type='text'
                     name='firstName'
                     value={formData.firstName}
                     onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                     }
                  />
                  {errors.firstName && (
                     <p className='error'>{errors.firstName}</p>
                  )}

                  <label>Last Name:</label>
                  <input
                     type='text'
                     name='lastName'
                     value={formData.lastName}
                     onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                     }
                  />
                  {errors.lastName && (
                     <p className='error'>{errors.lastName}</p>
                  )}

                  <label>Hair Color:</label>
                  <input
                     type='text'
                     name='hairColor'
                     value={formData.hairColor}
                     onChange={(e) =>
                        setFormData({ ...formData, hairColor: e.target.value })
                     }
                  />

                  <label>Birth Date:</label>
                  <input
                     type='date'
                     name='birthDate'
                     value={formData.birthDate}
                     onChange={(e) =>
                        setFormData({ ...formData, birthDate: e.target.value })
                     }
                  />
                  {errors.birthDate && (
                     <p className='error'>{errors.birthDate}</p>
                  )}

                  <label>Is Female:</label>
                  <input
                     type='checkbox'
                     name='isFemale'
                     checked={formData.isFemale}
                     onChange={(e) =>
                        setFormData({ ...formData, isFemale: e.target.checked })
                     }
                  />

                  <label>Email:</label>
                  <input
                     type='email'
                     name='email'
                     value={formData.email}
                     onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                     }
                  />
                  {errors.email && <p className='error'>{errors.email}</p>}
               </form>

               <button onClick={handleFormSubmit} disabled={!validateForm()}>
                  Submit
               </button>
               <button onClick={closeCreateUserForm}>Cancel</button>
            </div>
         )}
      </div>
   );
}
export default Users;
