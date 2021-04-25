import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
    let history = useHistory()
    const initialSection = {
        home: 'hide',
        product: 'hide',
        asd : 'hide'
    }
    const [section, setSection] = useState(initialSection);

    useEffect(() => {
        setSection({...initialSection, home: 'show'})
    }, [])

    return (
        <div className="dash-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand dash-logo">Dashboard</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline mr-auto">
                        <input className="form-control dash-searchbar" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item d-flex align-items-center dropdown">
                            <FontAwesomeIcon icon={faUser} className="nav-icon dropdown-toggle" data-toggle="dropdown" />
                            <div className="dropdown-menu dash-user-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Setting</a>
                                <a className="dropdown-item" onClick={() => history.push('/')}>Log Out</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="dash-section-wrap">
                <div className="sidebar">
                    <div className="sidebar-nav-item" onClick={() => setSection({...initialSection, home: 'show'})}>Home</div>
                    <div className="sidebar-nav-item" onClick={() => setSection({...initialSection, product: 'show'})}>Product</div>
                    <div className="sidebar-nav-item" onClick={() => setSection({...initialSection, asd: 'show'})}>Asd</div>
                </div>
                <div className="main-section">
                    <div className={'child-section '+section.home}>home</div>
                    <div className={'child-section '+section.product}>
                        <div className="container-fluid">
                            <h1>Product</h1>
                            <button type="button" className="btn btn-primary mx-2 my-2 float-right" data-toggle="modal" data-target="#addProductModal">Add Product</button>
                            <div class="modal fade" id="addProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="form-group">
                                                <label for="formGroupExampleInput">Example label</label>
                                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" />
                                            </div>
                                            <div class="form-group">
                                                <label for="formGroupExampleInput2">Another label</label>
                                                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleFormControlFile1">Example file input</label>
                                                <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Submit</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Produk</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>lorem ipsum asdasd sadasdasa asdasdasda asdasd</td>
                                        <td>Otto</td>
                                        <td align="center">
                                            <button type="button" className="btn btn-secondary mx-2">Edit</button>
                                            <button type="button" className="btn btn-danger mx-2">Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>lorem ipsum asdasd sadasdasa asdasdasda asdasd</td>
                                        <td>Otto</td>
                                        <td align="center">
                                            <button type="button" className="btn btn-secondary mx-2">Edit</button>
                                            <button type="button" className="btn btn-danger mx-2">Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>lorem ipsum asdasd sadasdasa asdasdasda asdasd</td>
                                        <td>Otto</td>
                                        <td align="center">
                                            <button type="button" className="btn btn-secondary mx-2">Edit</button>
                                            <button type="button" className="btn btn-danger mx-2">Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>lorem ipsum asdasd sadasdasa asdasdasda asdasd</td>
                                        <td>Otto</td>
                                        <td align="center">
                                            <button type="button" className="btn btn-secondary mx-2">Edit</button>
                                            <button type="button" className="btn btn-danger mx-2">Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>lorem ipsum asdasd sadasdasa asdasdasda asdasd</td>
                                        <td>Otto</td>
                                        <td align="center">
                                            <button type="button" className="btn btn-secondary mx-2">Edit</button>
                                            <button type="button" className="btn btn-danger mx-2">Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>lorem ipsum asdasd sadasdasa asdasdasda asdasd</td>
                                        <td>Otto</td>
                                        <td align="center">
                                            <button type="button" className="btn btn-secondary mx-2">Edit</button>
                                            <button type="button" className="btn btn-danger mx-2">Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>lorem ipsum asdasd sadasdasa asdasdasda asdasd</td>
                                        <td>Otto</td>
                                        <td align="center">
                                            <button type="button" className="btn btn-secondary mx-2">Edit</button>
                                            <button type="button" className="btn btn-danger mx-2">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={'child-section '+section.asd}>asd</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
