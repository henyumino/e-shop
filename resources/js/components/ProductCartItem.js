import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../context/CartContext'

const ProductCartItem = (props) => {

    const {incAmount} = useContext(CartContext)
    const key = props.ind

    return (
        <>
            <div className="card d-flex flex-row h-25 outline-none" style={{width: "100%"}}>
                <img className="card-img-top cart-img-list w-25" src={props.img} alt="Card image cap" />
                <div className="card-body p-2">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{props.name}</h5>
                        <span>Rp {props.price}</span>
                    </div>
                    <small className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</small>
                    <div className="w-100 d-flex flex-row mt-2">
                        <div className="">
                            <button className="btn rounded-pill">
                                <FontAwesomeIcon icon={faMinus} /> 
                            </button>
                            <span className="mx-2">{props.amount}</span>
                            <button className="btn rounded-pill" onClick={() => incAmount(key)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCartItem
