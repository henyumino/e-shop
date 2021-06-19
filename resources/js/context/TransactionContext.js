import React, { useState ,createContext, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'

export const TransContext = createContext()

const TransactionProvider = (props) => {
    const link = 'http://localhost:8000'
    const [alltrans, setalltrans] = useState([])
    const [resiErr, setresiErr] = useState([])
    const [resT, setresT] = useState([])
    const [stsErr, setstsErr] = useState([])

    const inputResi = (id, resi) => {
        axios.post(`${link}/api/resi/${id}`, {resi: resi})
            .then(res => {
                if(res.data.success){
                    setresiErr('')
                    $('#inputResi').modal('hide')
                    // resT untuk merefresh trans tab
                    setresT(0)
                }
                else{
                    setresiErr(res.data.errors)
                }
                
            })
    }

    const inputStatus = (id, status) => {
        axios.post(`${link}/api/status/${id}`, {status: status})
            .then(res => {
                if(res.data.success){
                    setstsErr('')
                    $('#inputStatus').modal('hide')
                    // resT untuk merefresh trans tab
                    setresT(0)
                }
                else{
                    setstsErr(res.data.errors)
                }
                
            })
    }

    useEffect(() => {
        axios.get(`${link}/api/transaction/all`)
            .then(res => {
                setalltrans(res.data)
                setresT(1)
            })
            .catch(err => console.log(err))
    }, [link,resT])
    
    return (
        <TransContext.Provider value={{ alltrans,
                                        inputResi,
                                        resiErr,
                                        inputStatus,
                                        stsErr}}>
            {props.children}
        </TransContext.Provider>
    )
}

export default TransactionProvider
