import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from 'react-router-dom'
import { Home, Register, Login, Dashboard, Product, Checkout } from '../pages'
import CartProvider from '../context/CartContext'

const NotFound = () => {
    return <div>404 not found</div>
}

const MainApp = () => {
    return (
        <CartProvider>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/admin/login" exact>
                        <Login />
                    </Route>
                    <Route path="/admin/dashboard" exact>
                        <Dashboard />
                    </Route>
                    <Route path="/product/:slug" exact>
                        <Product />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>        
        </CartProvider>
    )
}

export default MainApp

if (document.getElementById('mainapp')) {
    ReactDOM.render(<MainApp />, document.getElementById('mainapp'));
}