import React, { useState ,createContext, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'

export const ItemContext = createContext()

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const ItemProvider = (props) => {
    const link = 'http://localhost:8000'
    const [errorItem, setErrorItem] = useState([])
    const [itemDash, setitemDash] = useState([])
    const [editData, setEditData] = useState([])
    const [resForm, setresForm] = useState(false)
    // const [itemSingle, setItemSingle] = useState([])

    const submitItem = (itemData,image) => {
        axios.defaults.withCredentials = true
        axios.get(`${link}/sanctum/csrf-cookie`)
            .then(res => {
                let formData = new FormData()
                formData.append('name', itemData.name)
                formData.append('price', itemData.price)
                formData.append('desc', itemData.desc)
                formData.append('image', image)
                axios.post(`${link}/api/item`, formData)
                    .then(res => {
                        if(res.data.success){
                            setErrorItem([])
                            $('#addProductModal').modal('hide')
                            setresForm(true)
                        }
                        else{
                            setresForm(false)
                            setErrorItem(res.data.errors)
                        }
                        getItem()
                    })
                    .catch(err => console.log(err))
            })
    }

    const editItem = (editParam) => {
        axios.defaults.withCredentials = true
        axios.get(`${link}/sanctum/csrf-cookie`)
            .then(res => {
                axios.get(`${link}/api/item/${editParam}`)
                    .then(res => {
                        setEditData(res.data)
                    })
                    .catch(err => console.log(err))
            })
    }

    const getItem = () => {
        axios.get(`${link}/api/item`)
            .then(res => setitemDash(res.data))
            .catch(err => console.log(err))
    }

    const deleteItem = (id) => {
        axios.get(`${link}/sanctum/csrf-cookie`)
            .then(res => {
                axios.delete(`${link}/api/item/${id}`)
                    .then(res => {
                        getItem()
                    })
                    .catch(err => console.log(err))
            })
    }

    const updateItem = (updateData, updateImage) => {
        axios.get(`${link}/sanctum/csrf-cookie`)
            .then(res => {
                let formData = new FormData()
                formData.append('name', updateData.name)
                formData.append('price', updateData.price)
                formData.append('desc', updateData.desc)
                formData.append('image', updateImage)
                axios.post(`${link}/api/item/${updateData.id_item}`, formData)
                    .then(res => {
                        if(res.data.success){
                            resetError()
                            $('#editProductModal').modal('hide')
                        }
                        else{
                            setErrorItem(res.data.errors)
                        }
                        getItem()
                    })
                    .catch(err => console.log(err))
            })
    }

    // const showSingle = (slug) => {
    //     axios.get(`${link}/api/item/${slug}`)
    //         .then(res => setItemSingle(res.data))
    //         .catch(err => console.log(err))
    // }

    const resetError = () => {
        setErrorItem([])
    } 

    useEffect(() => {
        getItem()
    }, [])

    return (
        <ItemContext.Provider value={{submitItem,errorItem,itemDash,deleteItem,editItem,editData,updateItem,resetError,resForm}}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemProvider
