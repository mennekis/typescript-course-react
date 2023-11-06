import React, { useState } from "react";

interface FormData {
   firstName: string;
   lastName: string;
   email: string;
   birthDate: string;
}

const UserForm: React.FC = () => {
   const [formData, setFormData] = useState<FormData>({
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
   });
   const [errors, setErrors] = useState<Record<string, string>>({});

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const validateForm = () => {
      const newErrors: Record<string, string> = {};
      if (formData.firstName.trim() === "") {
         newErrors.firstName = "First name is required";
      }
      if (formData.lastName.trim() === "") {
         newErrors.lastName = "Last name is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
         setFormData({
            firstName: "",
            lastName: "",
            email: "",
            birthDate: "",
         });
         setErrors({});
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div>
            <label>First Name:</label>
            <input
               type='text'
               name='firstName'
               value={formData.firstName}
               onChange={handleInputChange}
            />
            {errors.firstName && <p className='error'>{errors.firstName}</p>}
         </div>

         <div>
            <label>Last Name:</label>
            <input
               type='text'
               name='lastName'
               value={formData.lastName}
               onChange={handleInputChange}
            />
            {errors.lastName && <p className='error'>{errors.lastName}</p>}
         </div>

         <div>
            <button type='submit'>Submit</button>
         </div>
      </form>
   );
};

export default UserForm;
