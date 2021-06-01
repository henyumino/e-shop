import React,{ useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
    const { register, regisErr } = useContext(AuthContext)
    

    const [crd, setCrd] = useState({
        name : '',
        email : '',
        password : '',
        password_confirmation : ''
    })

    const handleChange = ({target}) => {
        setCrd({...crd, [target.name] : target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        register(crd);
    }

    // useEffect(() => {
        
    // })

    return (
        <>
            <div className="form-group">
                <input type="name" name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" onChange={handleChange} value={crd.name} />
            </div>
            <div className="mb-3 text-danger">{regisErr.name}</div>
            <div className="form-group">
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} value={crd.email} />
            </div>
            <div className="mb-3 text-danger">{regisErr.email}</div>
            <div className="form-group">
                <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleChange} value={crd.password} />
            </div>
            <div className="mb-3 text-danger">{regisErr.password}</div>
            <div className="form-group">
                <input type="password" name="password_confirmation" className="form-control" id="exampleInputPassword1" placeholder="re-enter Password" onChange={handleChange} value={crd.password_confirmation} />
            </div>
            <div className="mb-3 text-danger">{regisErr.password_confirmation}</div>
            <button type="submit" className="btn btn-primary w-100" onClick={onSubmit}>Register</button>
        </>
    )
}

export default Register
