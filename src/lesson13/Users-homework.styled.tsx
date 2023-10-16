import styled from "styled-components";

export const Container = styled.div`
   display: flex;
   backround-color: white;
`;
interface HairColorIconProps {
   color: string;
}

const HairColorCircle = styled.div<HairColorIconProps>`
   width: 20px;
   height: 20px;
   border-radius: 50%;
   background-color: ${(props) => props.color};
`;

export const UserList = styled.ul`
   list-style: none;
   padding: 54px;
   background-color: white;
   color: #333;
   font-family: Roboto;
   font-size: 16px;
   font-style: normal;
   font-weight: 500;
   line-height: normal;
`;

export const UserItem = styled.li`
   display: flex;
   align-items: center;
   margin-bottom: 10px;
   align-self: center;
`;

export const UserInfo = styled.div`
   display: flex;
   flex-direction: raw;
   justify-content: space-between;
   width: 100vw;
`;

export const UserName = styled.div`
   flex: 1;
`;

export const UserGender = styled.div`
   flex: 1;
`;
export const UserColorHair = styled.div`
blond = #F8D96C;
   flex: 1;
`;
export const UserBirthdate = styled.div`
   flex: 1;
`;
export const UserPhone = styled.div`
   flex: 1;
`;

export const Header = styled.div`
   display: flex;
   align-items: center;
   color: #6f767e;
   font-weight: bolder;
   margin-bottom: 19px;
`;

const HairColorIcon = ({ color }: HairColorIconProps) => {
   return <HairColorCircle color={color}></HairColorCircle>;
};

export default HairColorIcon;
