import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Navbar } from '../components'
import { CartContext } from '../context/CartContext'

const Product = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    
    let { slug } = useParams()

    // dibagian ini biarkan api product di cocokkan dengan slug

    const [tproduct] = useState([{
        name: 'asd1',
        price : 700,
        img : 'https://image.freepik.com/free-vector/white-product-podium-with-green-tropical-palm-leaves-golden-round-arch-green-wall_87521-3023.jpg',
    }])
    
    const {addToCart} = useContext(CartContext)

    return (
        <>
            <Navbar />
            <div className="product-wrapper">
                <div className="product-wrapper-child" style={{backgroundImage: `url(https://image.freepik.com/free-vector/watercolor-nature-background-with-leaves_52683-59449.jpg)`}}></div>
                <div className="product-wrapper-child">
                    <div className="w-100 product-detail">
                        <h1>{}</h1>
                        <h5>asdasd asdasdas sadsadasdsa   asdasdasdas</h5>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <h6>Rp. 123231123</h6>  
                        </div>
                        <button type="button" className="btn btn-primary w-100 my-4" onClick={() => addToCart(tproduct)}>Add to Cart</button>
                        <p>
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container review-wrapper">
                <h1 className="text-center my-5">Customer Review</h1>
                <hr />
                {/* review card */}
                <div className="card mb-3 border-light" style={{maxWidth: '100%'}}>
                    <div className="card-body">
                        <h5 className="card-title">Light card title</h5>
                        <small className="mb-2 d-block">20 mar 2020</small>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a className="float-right">report</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product
