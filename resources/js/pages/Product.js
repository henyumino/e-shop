import React, { useContext, useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Navbar } from '../components'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import { ItemContext } from '../context/ItemContext'
import axios from 'axios'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const Product = () => {
    
    let { slug } = useParams()

    const link = 'http://localhost:8000'

    // dibagian ini biarkan api product di cocokkan dengan slug
    
    const {addToCart} = useContext(CartContext)
    // const {showSingle,itemSingle} = useContext(ItemContext)
    const [item, setItem] = useState([])
    const [cart, setCart] = useState([{
        item_id : '',
        name : '',
        desc : '',
        price : '',
        img : ''
    }])

    const [isLoading, setisLoading] = useState(true)


    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'E Shop - '+slug
        return () => {
            document.title = 'E Shop'
        }
    }, [])

    useEffect(() => {
        setCart([{...cart,item_id: item.id, name: item.name, desc: item.description , price: item.price, img: item.item_image}])
    }, [item])

    useEffect(() => {
        getProduct()
    }, [slug])

    const getProduct = () => {
        axios.get(`${link}/api/item/${slug}`)
            .then(res => {
                setItem(res.data)
                setisLoading(false)
            })
            .catch(err => console.log(err))
    }


    //form review

    const {user} = useContext(AuthContext)
    const [rForm, setrForm] = useState(false)

    useEffect(() => {
        if(user != ""){
            setrForm(true)
        }
        else{
            setrForm(false)
        }
    }, [user])

    const [rData, setrData] = useState([])
    const [rErr, setrErr] = useState([])

    const handleChange = ({target}) => {
        setrData(target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        const data = { item_id : item.id, body : rData, user_id : user.id}

        axios.get(`${link}/sanctum/csrf-cookie`)
            .then(res => {
                axios.post(`${link}/api/review`, data)
                    .then(res => {
                        if(res.data){
                            getProduct()
                            setrData('')
                        }
                        else{
                            setrErr(res.data.errors)
                            console.log(res.data.errors);
                            // fitur validasi tolong dibuat
                        }
                    }).catch(err => console.log(err))
            })
    }

    if(isLoading)
    {
        return <div>loading ...</div>
    }

    if(item == "")
    {
        return <Redirect to='/notfound' />
    }

    return (
        <> 
            <Navbar />
            {/* modal */}
            <div className="modal fade" id="addToCartModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Notification</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        item added successfully
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* end of modal */}
            <div className="product-wrapper">
        
                <div className="product-wrapper-child" style={{backgroundImage: `url(/storage/item_image/${item.item_image})`}}></div> 
                
                <div className="product-wrapper-child">
                    <div className="w-100 product-detail">
                        <h1>{item.name}</h1>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <h6>Rp. {item.price}</h6>  
                        </div>
                        <button type="button" className="btn btn-primary w-100 my-4" data-toggle="modal" data-target="#addToCartModal" onClick={() => addToCart(cart)}>Add to Cart</button>
                        <p>
                            {item.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="container review-wrapper">
                <h1 className="text-center my-5">Customer Review</h1>
                {
                    rForm ?  
                    <div className="form-group d-flex flex-column">
                        <label>Review</label>
                        <textarea className="form-control" name="review" id="reviewInput" rows="2" onChange={handleChange} value={rData} />
                        <div className="d-flex flex-column align-items-end w-100 mt-2">
                            <button className="btn btn-primary" onClick={onSubmit}>submit</button>
                        </div>
                    </div>
                    : 
                    
                    ""
                }
                <hr />
                {/* review card */}
                {
                    item.reviews.map((rev, index) => {
                        return (
                            <div key={index} className="card mb-3 border-light" style={{maxWidth: '100%'}}>
                                <div className="card-body">
                                    <h5 className="card-title">{rev.user.name}</h5>
                                    <small className="mb-2 d-block">{rev.updated_at}</small>
                                    <p className="card-text">{rev.body}</p>
                                        <a className="float-right">report</a>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </>
    )
}

export default Product
