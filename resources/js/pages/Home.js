import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, ProductItem } from '../components'
import {CartContext} from '../context/CartContext'


const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    let history = useHistory()
    const {products} = useContext(CartContext)
    return (
        <>
            <Navbar />
            <div className="slider-wrapper">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img className="d-block w-100" src="https://image.freepik.com/free-vector/watercolor-nature-background-with-leaves_52683-59449.jpg" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100" src="https://image.freepik.com/free-photo/open-book-smiley-cup_23-2148917235.jpg" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100" src="https://image.freepik.com/free-photo/open-notebook-laptop-arrangement_23-2148898328.jpg" alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>

            {/* card group */}
            <h1 className="text-center mt-3 mb-3">New Product</h1>
            <div className="container">
                <div className="row">
                    {
                        products.map((product, idx) => (
                            <ProductItem key={idx} name={product.name} price={product.price} img={product.img} />
                        ))
                    }
                   
                </div>
            </div>
            <div id="footer">
                
            </div>
            {/* wrapper */}
        </>
    )
}

export default Home;

