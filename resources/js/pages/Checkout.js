import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal, faGooglePay, faShopify, faAmazonPay } from '@fortawesome/free-brands-svg-icons'


const Checkout = () => {
    const history = useHistory()
    const {total} = useContext(CartContext)
    const cartLocal = JSON.parse(localStorage.getItem('cartData')) || [];
    const [cartCheckout] = useState(cartLocal)

    const CartOut = (props) => {
        return ( 
            <div className="card d-flex flex-row h-25 outline-none" style={{width: "100%"}}>
                <img className="card-img-top cart-img-list w-25" src={props.img} alt="Card image cap" />
                <div className="card-body p-2">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{props.name}</h5>
                    </div>
                    <small className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</small>
                    <div className="w-100 d-flex flex-row mt-2 justify-content-end">
                        <span>Rp. {props.price}</span>
                    </div>
                </div>
            </div>
         )
    }

    return (
        <>
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
                            <CartOut key={i} price={item.price} img={`/storage/item_image/${item.img}`} name={item.name} />
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
                        <input type="text" className="form-control" name="name" placeholder="name" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="address" placeholder="address" />
                    </div>
                    <div className="form-group d-flex">
                        <select className="form-control" id="exampleFormControlSelect2">
                            <option>Country</option>
                            <option>Indonesia</option>
                            
                        </select>
                        <select className="form-control" id="exampleFormControlSelect2">
                            <option>Province</option>
                            <option>Bali</option>
                        </select>
                        <select className="form-control" id="exampleFormControlSelect2">
                            <option>City</option>
                            <option>Tabanan</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="phone" placeholder="phone number" />
                    </div>
                </div>
                <div className="w-50 mx-auto d-flex justify-content-center mt-5 mb-5">
                    <button className="btn btn-warning">Continue shipping</button>
                    <a className="d-flex align-items-center ml-3" onClick={() => history.push('/')}>back to cart</a>
                </div>
            </div>
        </>
    )
}

export default Checkout
