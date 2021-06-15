import React, { useState ,createContext, useEffect } from 'react'

export const CartContext = createContext()

const CartProvider = (props) => {
    const cartLocal = JSON.parse(localStorage.getItem('cartData')) || [];
    const [cart, setCart] = useState(cartLocal)
    const [total, setTotal] = useState(0)

    const addToCart = (product) => {
        let p_id = product[0].item_id
        if(cart.length <= 0){
            Object.assign(...product, {amount:1},{d_price: product[0].price})
            setCart([...cart,...product])
        }else{
            cart.forEach(el => {
                if(p_id == el.item_id){
                    let index = cart.findIndex(x => x.item_id == p_id)
                    incAmount(index) 
                }
            });
        }

        let cl = cart.findIndex(e => e.item_id === p_id)
        if(cl == -1){
            Object.assign(...product, {amount:1},{d_price: product[0].price})
            setCart([...cart,...product])
        }
        
    }

    const incAmount = (i) => {
        const oldCart = [...cart];
        let newCart = { ...oldCart[i] };
        newCart.amount++;
        newCart.price = newCart.amount * newCart.d_price
        oldCart[i] = newCart;
        setCart(oldCart)
    }

    const decAmount = (i) => {
        const oldCart = [...cart];
        let newCart = { ...oldCart[i] };
        
        if(!(newCart.amount <= 1)){
            newCart.amount--;
            if(!(newCart.price <= newCart.d_price)){
                newCart.price-=newCart.d_price
            }
        }
        oldCart[i] = newCart;
        setCart(oldCart)
    }

    const deleteItem = (index) => {
        const oldCart = [...cart]
        // const i = index
        const newCart = oldCart.filter((item, i) => index !== i)
        // memfilter array object (array yang akan difilter, index array) => index yang akan dihapus
        setCart(newCart)
    }
    
    const subTotal = () => {
        const newCart = [...cart]
        const res = newCart.reduce((total, a) => total + a.price, 0)
        setTotal(res)
    }

    const setLocalStorage = () => {
        const cartData = [...cart]
        window.localStorage.setItem('cartData', JSON.stringify(cartData));
    }

    const resetCart = () => {
        setCart([])
        localStorage.removeItem("cartData")
    }

    useEffect(() => {
       subTotal()
       setLocalStorage()
    })
    

    return (
        <CartContext.Provider value={{addToCart,cart,incAmount,decAmount,deleteItem,total,resetCart}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
