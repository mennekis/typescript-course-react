import { useState } from "react";
import "./App.css";
import { Users } from "./lesson14/Users-homework";

export function App() {
   const [show, setShow] = useState(true);
   return (
      <>
         <button onClick={() => setShow(!show)}>Show / Hide User</button>
         {show ? <Users /> : null}
      </>
   );
}

export default App;
