import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import $ from 'jquery'

const Detail = () => {
    let history = useHistory()
    let { id } = useParams()
    const link = 'http://localhost:8000'
    const [tdata, settdata] = useState([])
    const [loadItem, setloadItem] = useState([])
    const [loadData, setloadData] = useState(true)

    useEffect(() => {
        axios.get(`${link}/api/detail/${id}`)
            .then(res => {
                if(res.data.found){
                    settdata(res.data.req)
                    setloadItem(res.data.item)
                    // console.log(res.data.req);
                    setloadData(false)
                }
                else{
                    $('#tModal').modal('show')
                    history.push('/transaction')
                }
            })
    }, [id])

    const DetailData = () => {
        return(
            <>
                <div className="w-100">Status : 
                    {tdata.status  == 0 ? ' pending' : ''}
                    {tdata.status  == 1 ? ' accepted' : ''}
                    {tdata.status  == 2 ? ' rejected' : ''}
                </div>
                <div className="w-100">Nama : asd</div>
                <div className="w-100">Address : {tdata.address}</div>
                <div className="w-100">State : Indonesia, bali, tabanan</div>
                <div className="w-100"> Item :
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">No</th>
                            <th scope="col">Item</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Price</th>
                            </tr>
                        </thead>
                        {
                        loadItem.map((item, i) => {
                            return(
                                    <tbody key={i}>
                                        <tr>
                                            <th scope="row">{i+1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    </tbody>
                            )
                        })
                        }
                        
                    </table>
                </div>
                <div className="w-100">Total : {tdata.total}</div>
                <div className="w-100">Contact : {tdata.phone_number}</div>
                <div className="w-100">Resi : {tdata.resi}</div>
            </>
        )
    }

    return (
        <>
            <div className="modal fade" id="tModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Notification</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Transaction Not Found
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h1 className="text-center mt-5 mb-2">Transaction Detail</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a onClick={() => history.push('/')}>Home</a></li>
                        <li className="breadcrumb-item"><a onClick={() => history.push('/transaction')}>Transaction</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Transaction Detail</li>
                    </ol>
                </nav>
                {/* end nav */}
                {
                    loadData ? <div className="text-center">loading...</div>
                    :
                    <DetailData /> 
                    
                }
                
                

            </div>
        </>
    )
}

export default Detail
