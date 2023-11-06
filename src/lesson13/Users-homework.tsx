import usersData from "../users-data";
import { TUser } from "../users-data";
import HairColorIcon, {
   Header,
   UserBirthdate,
   UserColorHair,
   UserGender,
   UserInfo,
   UserItem,
   UserList,
   UserName,
   UserPhone,
} from "./Users-homework.styled";

interface IUserProps {
   data: TUser;
}
const hairColorMap: { [key: string]: string } = {
   Blond: "#F8D96C",
   Brown: "#0B0B0B",
   Black: "#000",
   Chestnut: "#FF5733",
   Auburn: "#91302B",
};
// TODO: Update User component to display user's name, Gender, Hair color, Birth dat and phone number
// TODO: Style this component using styled-components
// TODO: Use Users-homework.jpg or Users-homework.fig as a reference
// TODO: Add a component to display user's hair color as a colored circle HairColorIcon
// TODO: Add a color prop to HairColorIcon, so it can be used to display different colors
// TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

const User = (props: IUserProps) => {
   const { data } = props;
   const hairColor = hairColorMap[data.hair.color] || "red";
   return (
      <UserItem>
         <UserInfo>
            <UserName>
               {data.firstName} {data.lastName}
            </UserName>
            <UserGender>{data.gender}</UserGender>
            <UserColorHair>
               <HairColorIcon color={hairColor} />
            </UserColorHair>
            <UserBirthdate>{data.birthDate}</UserBirthdate>
            <UserPhone>{data.phone}</UserPhone>
         </UserInfo>
      </UserItem>
   );
};
export function Users() {
   // TOOD: update this component to display a header and a list of users
   // User Name | Gender | Hair Color | Birth date | Phone number
   // TODO: Style this component using styled-components
   // TODO: Use Users-homework.jpg or Users-homework.fig as a reference
   // TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

   return (
      <UserList>
         <Header>
            <div style={{ flex: 1 }}>User Name</div>
            <div style={{ flex: 1 }}>Gender</div>
            <div style={{ flex: 1 }}>Hair Color</div>
            <div style={{ flex: 1 }}>Birth date</div>
            <div style={{ flex: 1 }}>Phone number</div>
         </Header>
         {usersData.map((user) => (
            <User key={user.id} data={user} />
         ))}
      </UserList>
   );
}

export default Users;
