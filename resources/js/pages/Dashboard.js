import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/AuthContext'
import { ItemContext } from '../context/ItemContext'
import { TransContext } from '../context/TransactionContext'

const Dashboard = () => {
    let history = useHistory()
    const initialSection = {
        home: 'hide',
        product: 'hide',
        transaction : 'hide'
    }
    const [section, setSection] = useState(initialSection)
    const token = localStorage.getItem('token')
    const {logout,user} = useContext(AuthContext)
    const {alltrans, inputResi} = useContext(TransContext)
    const {submitItem,errorItem,itemDash,deleteItem, editItem, editData, updateItem, resetError, resForm} = useContext(ItemContext)
    // submit state
    const [itemData, setItemData] = useState({
        name : '',
        price : '',
        desc : '',
    })
    const [image, setImage] = useState([])
    // delete state
    const [delId, setdelId] = useState('')
    // edit state
    

    const handleChange = ({target}) => {
        setItemData({...itemData, [target.name] : target.value})
    }

    const handleFile = (e) => {
        setImage(e.target.files[0])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        submitItem(itemData,image)
    }

    useEffect(() => {
        if(resForm == true){
            resetForm()
        }
    }, [resForm])

    const confDelete = () => {
        deleteItem(delId)  
    }

    const showEditModal = (editId) => {
        
        editItem(editId)
    }

    // handle edit

    const [editForm, setEditForm] = useState({
        id_item : '',
        name : '',
        price : '',
        desc : '',
    })

    const [editImage, setEditImage] = useState([])

    const handleEditChange = ({target}) => {
        setEditForm({...editForm, [target.name] : target.value})
    }

    const handleEditFile = (e) => {
        setEditImage(e.target.files[0])
    }
    
    const onSubmitEdit = (e) => {
        e.preventDefault()
        updateItem(editForm, editImage)
       
    }

    const resetForm = () => {
        setEditImage([])
        resetError()
        setItemData({ 
            name : '',
            price : '',
            desc : '',
        })
        setImage()
        setResi('')
    }

    useEffect(() => {
        // component did mount
        setSection({...initialSection, home: 'show'})
        
    }, [])
    
    useEffect(() => {
        //component did update
        setEditForm({...editForm, id_item : editData.id , name : editData.name, price : editData.price, desc: editData.description})
    }, [editData])

    const [resi, setResi] = useState([])
    const [resiId, setResiId] = useState([])

    const handleResi = ({target}) => {
        setResi(target.value)
    }

    const submitResi = () => {
        inputResi(resiId ,resi);
    }

    const TransTab = () => {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">ID Transaksi</th>
                        <th scope="col">Status</th>
                        <th scope="col">Resi</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                {
                    alltrans.map((item, i) => {
                        return (
                            <tbody key={i}>
                                <tr >
                                    <th scope="col">{i+1}</th>
                                    <td>{item.id}</td>
                                    <td>
                                    {
                                        item.status == 0 ? <small className="text-warning">Pending</small> : ''
                                    }
                                    {
                                        item.status == 1 ? <small className="text-success">Success</small> : ''
                                    }
                                    {
                                        item.status == 2 ? <small className="text-danger">Rejected</small> : ''
                                    }
                                    </td>
                                    <td>{item.resi}</td>
                                    <td>
                                        <button className="btn btn-primary mr-2" data-toggle="modal" data-target="#inputResi" onClick={() => setResiId(item.id)}>Input Resi</button>
                                        <button className="btn btn-secondary" data-toggle="modal" data-target="#inputStatus">Change Status</button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
        )
    }

    if(token == null){
        if(user.role == 0){
            console.log('redirect')
            return (
                <Redirect push to='/' />
            )
        }
        return (
            <Redirect push to='/' />
        )
    }
    else{
        if(user.role == 0){
            return (
                <Redirect push to='/' />
            )
        }
    }

    return (
        <>
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Confirmation</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    Are you sure delete this item?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={confDelete}>Delete</button>
                </div>
                </div>
            </div>
        </div>
        {/* end of modal box */}
        
        <div className="dash-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand dash-logo">Dashboard</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline mr-auto">
                        <input className="form-control dash-searchbar" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item d-flex align-items-center dropdown">
                            <FontAwesomeIcon icon={faUser} className="nav-icon dropdown-toggle" data-toggle="dropdown" />
                            {user.name}
                            <div className="dropdown-menu dash-user-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Setting</a>
                                <a className="dropdown-item" onClick={() => logout()}>Log Out</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="dash-section-wrap">
                <div className="sidebar">
                    <div className="sidebar-nav-item" onClick={() => setSection({...initialSection, home: 'show'})}>Home</div>
                    <div className="sidebar-nav-item" onClick={() => setSection({...initialSection, product: 'show'})}>Product</div>
                    <div className="sidebar-nav-item" onClick={() => setSection({...initialSection, transaction: 'show'})}>Transaction</div>
                </div>
                <div className="main-section">
                    <div className={'child-section '+section.home}>
                        <h1>Home</h1>
                        <Link to='/'>Home</Link>
                    </div>
                    <div className={'child-section '+section.product}>
                        <div className="container-fluid">
                            <h1>Product</h1>
                            <button type="button" className="btn btn-primary mx-2 my-2 float-right" data-toggle="modal" data-target="#addProductModal">Add Product</button>
                            {/* form */}
                            <div className="modal fade" id="addProductModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={resetError}>
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="formGroupExampleInput">Item Name</label>
                                                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Item Name" name="name" value={itemData.name} onChange={handleChange} />
                                                </div>
                                                <small className="form-text text-danger mb-2">{ errorItem ? errorItem.name : ''}</small>
                                                <div className="form-group">
                                                    <label htmlFor="formGroupExampleInput2">Price</label>
                                                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Price" name="price" value={itemData.price} onChange={handleChange} />
                                                </div>
                                                <small className="form-text text-danger mb-2">{errorItem ? errorItem.price : ''}</small>
                                                <div className="form-group">
                                                <label htmlFor="formGroupExampleInput3">Description</label>
                                                    <textarea className="form-control" aria-label="With textarea" name="desc" value={itemData.desc} onChange={handleChange}></textarea>
                                                </div>
                                                <small className="form-text text-danger mb-2">{errorItem ? errorItem.desc : ''}</small>
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlFile1">Upload Image</label>
                                                    <input type="file" className="form-control-file" id="exampleFormControlFile1" name="image" onChange={handleFile}/>
                                                </div>
                                                <small className="form-text text-danger mb-2">{errorItem ? errorItem.image : ''}</small>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={resetError}>Close</button>
                                            <button type="button" className="btn btn-primary" onClick={onSubmit}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end form */}
                            {/* edit Modal */}
                            <div className="modal fade" id="editProductModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Edit item</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={resetForm}>
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="formGroupExampleInput">Item Name</label>
                                                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Item Name" name="name" value={editForm.name || ""} onChange={handleEditChange} />
                                                </div>
                                                <small className="form-text text-danger mb-2">{errorItem ? errorItem.name : ''}</small>
                                                <div className="form-group">
                                                    <label htmlFor="formGroupExampleInput2">Price</label>
                                                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Price" name="price" value={editForm.price || ""} onChange={handleEditChange} />
                                                </div>
                                                <small className="form-text text-danger mb-2">{errorItem ? errorItem.price : ''}</small>
                                                <div className="form-group">
                                                <label htmlFor="formGroupExampleInput3">Description</label>
                                                    <textarea className="form-control" aria-label="With textarea" name="desc" value={editForm.desc || ""} onChange={handleEditChange}></textarea>
                                                </div>
                                                <small className="form-text text-danger mb-2">{errorItem ? errorItem.desc : ''}</small>
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlFile1">Upload Image</label>
                                                    <input type="file" className="form-control-file" id="exampleFormControlFile1" name="image" onChange={handleEditFile}/>
                                                </div>
                                                <small className="form-text text-danger mb-2">{errorItem ? errorItem.image : ''}</small>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={resetForm}>Close</button>
                                            <button type="button" className="btn btn-primary" onClick={onSubmitEdit}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end of edit modal */}
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Produk</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        itemDash.map((item, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <th scope="row">{idx+1}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td align="center">
                                                        <button type="button" className="btn btn-secondary mx-2" data-toggle="modal" data-target="#editProductModal" onClick={() => showEditModal(item.id)}>Edit</button>
                                                        <button type="button" className="btn btn-danger mx-2" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => setdelId(item.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )                                            
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={'child-section '+section.transaction}>
                        {/* modal resi */}
                        <div className="modal fade" id="inputResi" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Input Resi</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={resetForm}>
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="formGroupExampleInput">No Resi</label>
                                                <input type="text" className="form-control" placeholder="No Resi" name="resi" value={resi} onChange={handleResi} />
                                            </div>
                                            <small className="form-text text-danger mb-2"></small>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={resetForm}>Close</button>
                                        <button type="button" className="btn btn-primary" onClick={submitResi}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end modal resi */}
                        
                        {/* status modal */}
                        <div className="modal fade" id="inputStatus" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Input Status</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={resetForm}>
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <select className="custom-select">
                                                <option defaultValue value="">Status</option>
                                                <option value="0">Pending</option>
                                                <option value="1">Accepted</option>
                                                <option value="2">Rejected</option>
                                            </select>
                                            <small className="form-text text-danger mb-2"></small>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={resetForm}>Close</button>
                                        <button type="button" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end status modal */}
                       
                        <h1 className="mb-2">Transaction</h1>
                        {
                            alltrans.length <= 0 ? <div>loading ...</div> : <TransTab />
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard
