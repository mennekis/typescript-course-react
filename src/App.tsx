// import { useId, useState } from "react";
import "./App.css";
import { CustomHookDemo } from "./lesson15/CustomHookDemo";
// import { UseDeferredValueDemo } from "./lesson16/UseDeferredValueDemo";
// import { UseReducerDemo } from "./lesson16/UseReducerDemo";
// import { UseIdDemo } from "./lesson16/UseIdDemo";
// import { RefProblemDemo } from "./lesson16/UseImperativeHandleDemo";
// import { UseImperativeHandleDemo } from "./lesson16/UseImperativeHandleDemo";
// import { UseMemoDemo } from "./lesson15/UseMemoDemo";
// import { UseRefDemo } from "./lesson15/UseRefDemo";
// import { LoginForm } from "./lesson15/UseCallbackDemo";
// import { Users } from "./lesson15/UseContextDemo";
// import { StateProvider } from "./lesson15/StateContext";

// interface IUserForm {
//   email: string;
//   password: string;
// }
import { Users } from "./lesson14/Users-homework";
import { useState } from "react";

export function App() {
   const [show, setShow] = useState(true);

   return (
      <>
         <button onClick={() => setShow(!show)}>Toggle</button>
         {show ? <Users /> : null}
      </>
   );
}

// const Xyz = () => {
//   const id = useId();

//   return <div>{id}</div>;
// };

export default App;
