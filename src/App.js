import { useEffect, useState } from "react";

export default function App() {
  const[num1,setNum1] = useState("EUR");
  const[num2,setNum2] = useState("USD");
  const [inputValue,setInputValue] = useState(0);
  const [output,setOutput] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  useEffect(function(){
    async function fetchCurrencyDetails(){
      setIsLoading(true);
      if(inputValue){
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${inputValue}&from=${num1}&to=${num2}`)
      const data = await res.json();
      setOutput(data.rates[num2]);
      setIsLoading(false);
      }
  }
    if(num1===num2) return setOutput(inputValue);
    fetchCurrencyDetails();
    if(!inputValue)
      setOutput(0);
  },[inputValue,num1,num2])


  return (
    <div>
      <input onChange={(e)=>setInputValue(e.target.value)} type="text" />
      
      <select value={num1} onChange={e => setNum1(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={num2} onChange={e => setNum2(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output} {num2}</p>

    </div>
  );
}
