import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal, faGooglePay, faShopify, faAmazonPay } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
import $ from 'jquery'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Checkout = () => {
    const history = useHistory()
    const link = 'http://localhost:8000'
    const {total,resetCart} = useContext(CartContext)
    const cartLocal = JSON.parse(localStorage.getItem('cartData')) || [];
    const [cartCheckout] = useState(cartLocal)
    const [addInfo, setAddInfo] = useState({
        name : '',
        address : '',
        country : '',
        province : '',
        city : '',
        phone_number : '',
    })
    const [errorForm, setErrorForm] = useState([])

    const handleChange = ({target}) => {
        setAddInfo({...addInfo, [target.name] : target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newAdd = {...addInfo, item : cartLocal, total : total}
        axios.get(`${link}/sanctum/csrf-cookie`)
            .then(res => {
                axios.post(`${link}/api/checkout`, newAdd)
                    .then(res => {
                        if(res.data.success){
                            $('#transModal').modal('show')
                            $('#transModal').on('hidden.bs.modal', function () {
                                history.push('/')
                            });
                            resetCart()
                        }
                        else{
                            setErrorForm(res.data.errors)
                        }
                    })
            })
    }

    const CartOut = (props) => {
        return ( 
            <div className="card d-flex flex-row h-25 outline-none" style={{width: "100%"}}>
                <img className="card-img-top cart-img-list w-25" src={props.img} alt="Card image cap" />
                <div className="card-body p-2">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{props.name}</h5>
                    </div>
                    <small className="card-text">{props.desc}</small>
                    <div className="w-100 d-flex flex-row mt-2 justify-content-end">
                        <span>Rp. {props.price}</span>
                    </div>
                </div>
            </div>
         )
    }

    if(cartLocal.length <= 0){
        history.push('/')
    }

    return (
        <>
            <div className="modal fade" id="transModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Notification</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Transaction Success
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h1 className="text-center mt-5 mb-2">Check out</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a onClick={() => history.push('/')}>Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                    </ol>
                </nav>
                <div className="checkout-item-list mx-auto">
                    {
                        cartCheckout.map((item,i) => 
                            <CartOut key={i} price={item.price} img={`/storage/item_image/${item.img}`} name={item.name} desc={item.desc} />
                        )
                    }
                </div>
                <div className="w-50 mx-auto">
                    <div className="d-flex justify-content-between">
                        <span>sub total </span>
                        <span>Rp.{total}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>tax</span>
                        <span>-</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <span>total </span>
                        <span>Rp.{total}</span>
                    </div>
                </div>
                <h5 className="title-payment text-center mx-auto mt-5">Express checkout</h5>
                <div className="icon-wrapper-checkout d-flex justify-content-center mt-4">
                    <FontAwesomeIcon icon={faPaypal} size="2x" className="icon-checkout" />
                    <FontAwesomeIcon icon={faGooglePay} size="2x" className="icon-checkout" />
                    <FontAwesomeIcon icon={faShopify} size="2x" className="icon-checkout" />
                    <FontAwesomeIcon icon={faAmazonPay} size="2x" className="icon-checkout" />
                </div>
                <div className="form-shipping">
                    <h6 className="text-center mb-3">Address Information</h6>
                    <div className="form-group">
                        <input type="text" className="form-control" name="name" placeholder="name" onChange={handleChange} />
                    </div>
                    <small className="form-text text-danger mb-3">{errorForm ? errorForm.name : ''}</small>
                    <div className="form-group">
                        <input type="text" className="form-control" name="address" placeholder="address" onChange={handleChange} />
                    </div>
                    <small className="form-text text-danger mb-3">{errorForm ? errorForm.address : ''}</small>
                    <div className="form-group d-flex">
                        <select className="form-control" name="country" onChange={handleChange}>
                            <option value="">Country</option>
                            <option value="indonesia">Indonesia</option>
                        </select>
                        <select className="form-control" name="province" onChange={handleChange}>
                            <option value="">Province</option>
                            <option value="bali">Bali</option>
                        </select>
                        <select className="form-control" name="city" onChange={handleChange}>
                            <option value="">City</option>
                            <option value="tabanan">Tabanan</option>
                        </select>
                    </div>
                    <small className="form-text text-danger mb-3">{errorForm ? errorForm.country : ''}</small>
                    <small className="form-text text-danger mb-3">{errorForm ? errorForm.province : ''}</small>
                    <small className="form-text text-danger mb-3">{errorForm ? errorForm.city : ''}</small>
                    <div className="form-group">
                        <input type="text" className="form-control" name="phone_number" placeholder="phone number" onChange={handleChange} />
                    </div>
                    <small className="form-text text-danger mb-3">{errorForm ? errorForm.phone_number : ''}</small>
                </div>
                <div className="w-50 mx-auto d-flex justify-content-center mt-5 mb-5">
                    <button className="btn btn-warning" onClick={onSubmit}>Continue shipping</button>
                    <a className="d-flex align-items-center ml-3" onClick={() => history.push('/')}>back to cart</a>
                </div>
            </div>
        </>
    )
}

export default Checkout
