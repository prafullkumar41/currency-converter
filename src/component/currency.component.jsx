import React from 'react'

function Currency(props) {
    const {
        currency,
        select,
        onchangeCurrency,
        amount,
        onchangeAmount
    } = props
    return (
        <div>
            <input type='number' className='currency' onChange={onchangeAmount} value={amount}></input>
                <select value={select} onChange={onchangeCurrency} className='select' >
                    {
                        currency.map(curr => (
                        <option key={curr} value={curr}>{curr}</option>
                        ))
                    }
                </select>
        </div>
    )
}


export default Currency;