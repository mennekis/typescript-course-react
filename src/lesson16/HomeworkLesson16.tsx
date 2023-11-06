import { useState, useEffect } from "react";

// explanations for the useState, useEffect, useContext, and useRef hooks.

function Counter() {
   const [count, setCount] = useState(0);

   const increment = () => {
      setCount(count + 1);
   };

   return (
      <div>
         <p>Count: {count}</p>
         <button onClick={increment}>Increment</button>
      </div>
   );
}

// #Explanation : The useState hook allows you to add state to the functional components.
// In the example, we initialize a state variable count with an initial value of 0.
// The setCount function is used to update the count state when the "Increment" button is clicked.
// useEffect Hook:

function DataFetcher() {
   const [data, setData] = useState(null);

   useEffect(() => {
      fetch("https://api.example.com/data")
         .then((response) => response.json())
         .then((data) => setData(data));
   }, []);

   return (
      <div>
         <p>Data: {data ? data : "Loading..."}</p>
      </div>
   );
}
// Explanation: The useEffect hook enables to perform side effects in our components.
// In this example, we fetch data from an API when the component mounts and store it in the data state.

// # useId Hook:
import { useId } from "react";

function PasswordField() {
   const passwordHintId = useId();
   return (
      <>
         <label>
            Password:
            <input type='password' aria-describedby={passwordHintId} />
         </label>
         <p id={passwordHintId}>
            The password should contain at least 18 characters
         </p>
      </>
   );
}
export default function App() {
   return (
      <>
         <h2>Choose password</h2>
         <PasswordField />
         <h2>Confirm password</h2>
         <PasswordField />
      </>
   );
}
// # useMemo

import { useMemo } from "react";

function FactorialCalculator() {
   const [number, setNumber] = useState(5); // Начальное значение числа
   const factorial = useMemo(() => calculateFactorial(number), [number]);

   function calculateFactorial(n: any): any {
      if (n === 0 || n === 1) return 1;
      return n * calculateFactorial(n - 1);
   }

   return (
      <div>
         <h2>Factorial Calculator</h2>
         <label>
            Enter a number:
            <input
               type='number'
               value={number}
               onChange={(e) => setNumber(parseInt(e.target.value))}
            />
         </label>
         <p>
            Factorial of {number} is: {factorial}
         </p>
      </div>
   );
}

export { FactorialCalculator };

// In this example, we use useMemo to cache the results of the calculateFactorial function.
// We pass the dependency [number] to useMemo, which means that useMemo will recalculate the result only when number changes.

// This improves performance because the factorial is computed only when number changes, and it is reused when it remains unchanged.

// useMemo is particularly useful in situations where computations require significant resources, and you want to avoid recomputing
// them with each component render.
