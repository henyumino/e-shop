import React, { useState ,createContext, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'

export const TransContext = createContext()

const TransactionProvider = (props) => {
    const link = 'http://localhost:8000'
    const [alltrans, setalltrans] = useState([])

    const inputResi = (id, resi) => {
        axios.post(`${link}/api/resi/${id}`, {resi: resi})
            .then(res => console.log(res))
    }

    useEffect(() => {
        axios.get(`${link}/api/transaction/all`)
            .then(res => {
                setalltrans(res.data)
            })
            .catch(err => console.log(err))
    }, [link])
    
    return (
        <TransContext.Provider value={{alltrans,inputResi}}>
            {props.children}
        </TransContext.Provider>
    )
}

export default TransactionProvider
