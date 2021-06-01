import React from 'react'
import { useHistory } from 'react-router-dom'
import Product from '../pages/Product'

const ProductItem = (props) => {
    let history = useHistory()
    return (
        <div>
            <div className="card" style={{width: "16rem"}}>
                <img className="card-img-top item-image" src={`/storage/item_image/${props.img}`} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title text-center">{props.name}</h5>
                    <p className="card-text text-center">{props.desc}</p>
                    <p className="card-text text-center">Rp. {props.price}</p>
                    {/* <p className="card-text"><small className="text-muted"></small></p> */}
                    <a className="stretched-link" onClick={() => history.push(`/product/${props.slug}`)}></a>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
