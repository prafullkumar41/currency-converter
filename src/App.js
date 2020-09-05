import React, {useEffect, useState} from 'react';
import './App.css';
import Currency from './component/currency.component';
import Chart from './component/chart.component'


function App() {

  const [currency, setCurrency] = useState([])
  const [fromCurrency, setfromCurrency] = useState()
  const [toCurrency, settoCurrency] = useState()
  const [amount, setAmount] = useState(10)
  const [amtinfromCurrency, setamtfromCurrency] = useState(true)
  const [exchangeRate, setexchangeRate] = useState()

  let toAmount, fromAmount

  if (amtinfromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  }else{
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch('https://api.ratesapi.io/api/latest')
    .then(resp => resp.json())
    .then(curr => {
        setCurrency([curr.base, ...Object.keys(curr.rates)])
        setfromCurrency(curr.base)
        settoCurrency(Object.keys(curr.rates)[0])
        setexchangeRate(curr.rates[Object.keys(curr.rates)[0]])
    })
  },[])

  useEffect(() => {
    if(fromCurrency !== undefined &&
      toCurrency !== undefined &&
      fromCurrency === toCurrency){
        setexchangeRate(1);
        return;
      }

    if (fromCurrency != null && toCurrency){

      fetch(`https://api.ratesapi.io/api/latest?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(resp => resp.json())
      .then(data => setexchangeRate(data.rates[toCurrency]))
    }

  },[fromCurrency,toCurrency])

  function handleFromAmtChange(event) {
    setAmount(event.target.value)
    setamtfromCurrency(true)
  }

  function handleToAmtChange(event) {
    setAmount(event.target.value)
    setamtfromCurrency(false)
  }


  return (
  <div> 
    <h1><b>CURRENCY CONVERTER</b></h1>
    <Currency currency={currency} 
        select={fromCurrency}
        onchangeCurrency={event => setfromCurrency(event.target.value) }
        amount = {fromAmount}
        onchangeAmount={handleFromAmtChange}
        />
    <br/>
    <Currency currency={currency} 
        select={toCurrency}
        onchangeCurrency={event => settoCurrency(event.target.value) }
        amount = {toAmount}
        onchangeAmount={handleToAmtChange}

        />
     <br/>
     <br/>
     <h3>Exchange Rate: {exchangeRate}</h3>
     <Chart currency={fromCurrency} rate={exchangeRate}/>   
  </div> 
  );
}

export default App;
