import React,{ useContext,useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
    const { login, loginErr } = useContext(AuthContext)
    const [crd, setCrd] = useState({
        email : '',
        password : ''
    })

    const handleChange = ({target}) => {
        setCrd({...crd, [target.name] : target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        login(crd);
    }
    return (
        <>
            <div className="form-group">
                <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={crd.email} onChange={handleChange} />
            </div>
            <div className="text-danger mb-3">{loginErr.email}</div>
            <div className="form-group">
                <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password" value={crd.password} onChange={handleChange} />
            </div>
            <div className="text-danger mb-3">{loginErr.password}</div>
            <div className="text-danger mb-3">{loginErr.message}</div>
            <button type="submit" className="btn btn-primary w-100" onClick={onSubmit}>Login</button>
        </>
    )
}

export default Login
