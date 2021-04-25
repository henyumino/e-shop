import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faArrowLeft, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { ProductCartItem } from '../components'
import { CartContext } from '../context/CartContext'

const Navbar = (props) => {
    let history = useHistory()
    const [showForm, setShowForm] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const {cart} = useContext(CartContext)

    return (
        <>
            {/* cart */}
            <div className={`cart-wrapper ${ showCart ? 'show' : 'hide' }`} onClick={() => setShowCart(false)}>
                <div className="cart-item-wrapper" onClick={(e) => e.stopPropagation()}>
                    <div className="cart-title d-flex align-items-center justify-content-between">
                        <div className="px-3 py-3" onClick={() => setShowCart(false)}>
                            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                        </div>
                        <h3>Your Cart</h3>
                        <div className="px-3"></div>
                    </div>
                    <div className="cart-item-list d-flex flex-column pr-2">
                        {
                            cart.map((item,i) => <ProductCartItem key={i} 
                                                                name={item.name} 
                                                                price={item.price} 
                                                                img={item.img} 
                                                                amount={item.amount} 
                                                                ind={i} />)
                        }
                    </div>
                </div>
            </div>
            {/* end cart */}
            <div className={`login-wrapper justify-content-center align-items-center ${showForm ? 'show' : 'hide' }`}>
                <div className="login-box rounded d-flex flex-column justify-content-center align-items-center">
                    <div className="mb-4">
                        <a className={`m-4 link-def ${showRegister ? 'link-def' : 'aktif'}`} onClick={() => setShowRegister(false)}>login</a>
                        <a className={`m-4 link-def ${showRegister ? 'aktif' : 'link-def'}`} onClick={() => setShowRegister(true)}>register</a>
                    </div>
                    <form className={showRegister ? 'hide' : 'show'}>
                        <div className="form-group">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <form className={showRegister ? 'show' : 'hide'}>
                        <div className="form-group">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="re-enter Password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" onClick={() => history.push('/')}>Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <FontAwesomeIcon icon={faUser} className="nav-icon" onClick={() => {showForm === true ? setShowForm(false) : setShowForm(true)} }/>
                        </li>
                        <li className="nav-item position-relative">
                            <span className="badge badge-success nav-badge rounded-pill"></span>
                            <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" onClick={() => { showCart === true ? setShowCart(false) : setShowCart(true) }} />
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
