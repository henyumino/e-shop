import React, { useState ,createContext } from 'react'

export const CartContext = createContext()

const CartProvider = (props) => {
    const [cart, setCart] = useState([])
    const [products] = useState([
        {
            name: 'asd1',
            price : 700,
            img : 'https://image.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg',
            
        },
        {
            name: 'asd2',
            price : 800,
            img : 'https://image.freepik.com/free-vector/realistic-white-product-podium-with-white-picture-frames-green-tropical-palm-leaves-isolated-white_87521-3041.jpg',
        },
        {
            name: 'asd3',
            price : 900,
            img : 'https://image.freepik.com/free-vector/3d-trendy-easter-greeting-with-3d-product-podium-spring-flower-cloud-easter-egg-bunny_87521-2979.jpg',
        }
    ])

    const addToCart = (product) => {
        Object.assign(...product, {amount:1})
        setCart([...cart,...product])
    }

     const incAmount = (i) => {
        const oldCart = [...cart];
        let newCart = { ...oldCart[i] };
        newCart.amount++;
        oldCart[i] = newCart;
        setCart(oldCart) // sudah fix

        //selesain kan problem cart increase semua item di cart
    }

    return (
        <CartContext.Provider value={{products,addToCart,cart,incAmount}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
