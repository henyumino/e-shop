import React,{ useContext } from 'react'

const Login = () => {
    let history = useHistory()
    
    return (
        <div className="container-fluid tinggi-100">
            <div className="h-100 d-flex justify-content-center align-items-center flex-column">
                <form className="border p-4 rounded">
                    <h3 className="text-center mb-3">Admin login</h3>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" onClick={() => history.push('/admin/dashboard')}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
