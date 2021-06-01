import React, { useState ,createContext, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

const AuthProvider = (props) => {
    const link = 'http://localhost:8000'

    const [token, setToken] = useState(localStorage.getItem('token') || [])
    const [loggedIn, setloggedIn] = useState(false)
    const [regisErr, setRegisErr] = useState([])
    const [loginErr, setLoginErr] = useState([])
    const [user, setUser] = useState([])

    const login = (crd) => {
        axios.defaults.withCredentials = true
        axios.get(`${link}/sanctum/csrf-cookie`).then(res => {
            axios.post(`${link}/api/login`, crd).then(res => {
                if(res.data.success){
                    localStorage.setItem('loggedIn', 'true')
                    localStorage.setItem('token', res.data.token)
                    
                    setToken(res.data.token)
                    setloggedIn(true)
                    
                    if(res.data.user.role == 1){
                        window.location = "/admin/dashboard"
                    }
                    else{
                        window.location = "/"
                    }
                    
                }
                else{
                    setLoginErr(res.data)
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const register = (crd) => {
        axios.defaults.withCredentials = true
        axios.get(`${link}/sanctum/csrf-cookie`).then(res => {
            axios.post(`${link}/api/register`, crd).then(res => {
                if(res.data.success){
                    localStorage.setItem('loggedIn', 'true')
                    localStorage.setItem('token', res.data.token)
                    
                    setToken(res.data.token)
                    setloggedIn(true)
                    
                    window.location = "/"
                    
                }
                else{
                    setRegisErr(res.data)
                }
            })


        }).catch(err => {
            console.log(err)
        })
    }

    const logout = () => {
        axios.post(`${link}/api/logout`, token)
            .then(res => {
                localStorage.removeItem("loggedIn")
                localStorage.removeItem("token")
                localStorage.removeItem("cartData")
                window.location = '/'
            })
    }

     const getUser = () => {
        if(token.length != 0){
            axios.get(`http://localhost:8000/api/user`, {headers: {'Authorization': 'Bearer '+token}})
                .then(res => {
                    setUser(res.data)
                })
                .catch(e => console.log(e))
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <AuthContext.Provider value={{login,register,logout,regisErr,loginErr,user}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
