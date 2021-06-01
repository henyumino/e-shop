import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ProductCartItem,Login,Register } from '../components'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    let history = useHistory()
    const [showForm, setShowForm] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const {cart, total} = useContext(CartContext)
    const {logout,user} = useContext(AuthContext)
    const [itemTotal, setItemTotal] = useState(0)
    const loggedIn = localStorage.getItem('loggedIn')

    useEffect(() => {
        setItemTotal(cart.length)
    })

    const CompItemTotal = props => {
        return <span>{props.itemTotal}</span>
    }

    const Empty = () => {
        return (
            <div className="d-flex justify-content-center align-items-center h-75">
                <div>Looks like there’s nothing in your cart yet.</div>
            </div> 
        )
    }

    const LogReg = () => {
        return (
            <div className={`login-wrapper justify-content-center align-items-center ${showForm ? 'show' : 'hide' }`}>
                <div className="login-box rounded d-flex flex-column justify-content-center align-items-center">
                    <div className="mb-4">
                        <a className={`m-4 link-def ${showRegister ? 'link-def' : 'aktif'}`} onClick={() => setShowRegister(false)}>login</a>
                        <a className={`m-4 link-def ${showRegister ? 'aktif' : 'link-def'}`} onClick={() => setShowRegister(true)}>register</a>
                    </div>
                    <form className={showRegister ? 'hide' : 'show'}>
                        <Login />
                    </form>
                    <form className={showRegister ? 'show' : 'hide'}>
                        <Register />
                    </form>
                </div>
            </div>
        )
    }

    const UserMenu = () => {
        return (
            <div className="dropdown-menu dash-user-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Setting</a>
                <a className="dropdown-item" onClick={() => logout()}>Log Out</a>
            </div>
        )
    }

    const CartItem = () => {
        return (
            <>
                <div className="cart-item-list d-flex flex-column pr-2">
                    { 
                        cart.map((item,i) => <ProductCartItem key={i} 
                                                            name={item.name} 
                                                            price={item.price} 
                                                            desc={item.desc}
                                                            img={item.img} 
                                                            amount={item.amount} 
                                                            ind={i} />)
                    }
                </div>
                <div className="checkout-section">
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
                    <div className="d-flex justify-content-center flex-column align-items-center">
                        <button className="btn btn-warning mt-3 w-100" onClick={() => history.push('/checkout') }>Checkout</button>
                        <a className="mt-1" onClick={() => setShowCart(false)}>Continue Shopping</a>
                    </div>
                </div>
            </>
        )
    }

    const DropDownUser = () =>{
        return (
            <li className="nav-item d-flex align-items-center dropdown">
                <FontAwesomeIcon icon={faUser} className="nav-icon dropdown-toggle" data-toggle="dropdown" />
                <div className="dropdown-menu dash-user-menu" aria-labelledby="navbarDropdownMenuLink">
                    {
                        user.role == 1 ? 
                        <a className="dropdown-item" onClick={() => history.push('/admin/dashboard')}>Dashboard</a>
                        :
                        ''
                    }
                    <a className="dropdown-item" onClick={() => history.push('/profile')}>Profile</a>
                    <a className="dropdown-item" onClick={() => logout()}>Log Out</a>
                </div>
            </li>
        )
    }

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
                   
                   {
                       (cart.length <= 0) ?
                        <Empty />
                        :
                        <CartItem />
                   }
                </div>
            </div>
            {/* end cart */}
            {
                loggedIn ? '' : <LogReg />
            }
            
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" onClick={() => history.push('/')}>Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {loggedIn ? 
                            <DropDownUser />
                        :
                            <li className="nav-item">
                                <FontAwesomeIcon icon={faUser} className="nav-icon" onClick={() => {showForm === true ? setShowForm(false) : setShowForm(true)} }/>
                            </li>
                        }
                        <li className="nav-item position-relative">
                            <span className="badge badge-success nav-badge rounded-pill">
                                {
                                   itemTotal <= 0 ? "" : <CompItemTotal itemTotal={itemTotal} />
                                }
                            </span>
                            <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" onClick={() => { showCart === true ? setShowCart(false) : setShowCart(true) }} />
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
