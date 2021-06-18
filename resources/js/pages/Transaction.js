import React,{ useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Transaction = () => {
    const history = useHistory()
    const link = 'http://localhost:8000'
    const [ts, setTs] = useState([])
    const [loadTs, setloadTs] = useState(true)


    useEffect(() => {
    //    async function fetchData(){
    //        const req = await axios.get(`${link}/api/transaction`)
    //        setloadTs(false)
    //        setTs(req.data)
    //    }
    //    fetchData()
        axios.get(`${link}/api/transaction`)
            .then(res => {
                setloadTs(false)
                setTs(res.data)
            })
    }, [link])

    return (
        <>
            <div className="container">
                <h1 className="text-center mt-5 mb-2">Transaction History</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a onClick={() => history.push('/')}>Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Transaction</li>
                    </ol>
                </nav>
                {/* end nav */}
                {
                    loadTs ? <div className="text-center">loading...</div> : ''
                }
                {
                    ts.length <= 0 ? <div className="text-center">no transaction found</div> :
                    ts.map((item, i) => {
                        return(
                            <div className="card" key={i}>
                                <div className="card-body p-2">
                                    <h5 className="card-title mb-2">Transaction</h5>
                                    <p className="card-text m-0">{item.created_at}</p>
                                    <p className="card-text m-0">Resi : {item.resi}</p>
                                    {
                                        item.status == 0 ? <small className="text-warning">Pending</small> : ''
                                    }
                                    {
                                        item.status == 1 ? <small className="text-success">Success</small> : ''
                                    }
                                    {
                                        item.status == 2 ? <small className="text-danger">Rejected</small> : ''
                                    }
                                </div>
                                <a className="stretched-link" onClick={() => history.push(`/transaction/${item.id}`)}></a>
                            </div>
                        )
                    })
                }
                
            </div>
        </>
    )
}

export default Transaction
