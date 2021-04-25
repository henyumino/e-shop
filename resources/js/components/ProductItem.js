import React from 'react'
import { useHistory } from 'react-router-dom'
import Product from '../pages/Product'

const ProductItem = (props) => {
    let history = useHistory()
    return (
        <div>
            <div className="card" style={{width: "16rem"}}>
                <img className="card-img-top" src={props.img} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    <a className="stretched-link" onClick={() => history.push(`/product/${props.name}`)}></a>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
