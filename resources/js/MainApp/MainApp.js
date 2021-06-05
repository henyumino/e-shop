import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import { Home, Register, Login, Dashboard, Product, Checkout, Profile } from '../pages'
import CartProvider from '../context/CartContext'
import AuthProvider from '../context/AuthContext'
import ItemProvider from '../context/ItemContext'


const NotFound = () => {
    return <div>404 not found</div>
}

const ProtectedRoute = (props) => {
    const [loggedIn] = useState(localStorage.getItem("token") || "")
    const {component: Component,...rest} = props
    return (
        loggedIn ? <Route {...rest} component={Component} /> : <Redirect push to="/" />
    )
}


const MainApp = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <ItemProvider>
                    <Router>
                        <Switch>
                            <Route path="/" component={Home} exact />

                            {/* protected route admin */}
                            
                            <Route path="/admin/dashboard" component={Dashboard}  exact />
                        
                            {/* end admin route */}
                            
                            <ProtectedRoute path='/profile' component={Profile} exact />

                            <Route path="/product/:slug" component={Product} exact />

                            <ProtectedRoute path="/checkout" component={Checkout} exact />
                                
                            <Route component={NotFound} exact />
                        
                        </Switch>
                    </Router>
                </ItemProvider>
            </CartProvider>
        </AuthProvider>
    )
}

export default MainApp

if (document.getElementById('mainapp')) {
    ReactDOM.render(<MainApp />, document.getElementById('mainapp'));
}