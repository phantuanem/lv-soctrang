import React, { useContext, useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, Link } from 'react-router-dom';
import logo3 from '../../assets/logo/logo3.png';
import { Cart3, PersonFill, Search, CardHeading } from 'react-bootstrap-icons';
import axios from 'axios'
import { UserContext } from '../../context/userContext';

const Nav = (props) => {
    const { user } = useContext(UserContext)
    const [categorys, setCategorys] = useState([])
    const [sum_item_cart, setSumItemCart] = useState(0)

    useEffect(() => {
        getAllCategory()
        if(user?.ND_id){
            getSumItemCart()
        }
    }, [user.ND_id])

    const getAllCategory = async () => {
        try {
            const response = await axios.get('/api/categorys')
            setCategorys(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getSumItemCart = async () => {
        try {
            const response = await axios.get('/api/cart/sum', {
                params: {
                    ND_id: user.ND_id
                }
            })
            setSumItemCart(response.data)
        }catch(e){
            console.error(e)
        }
    }

    return (
        <div>
            <nav className=" navbar navbar-expand-lg navbar-light bg-light fixed-sm-top">
                <div className=" container">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo3} style={{ width: '4.5rem', height: '3rem' }}></img>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ flexGrow: '1' }}>
                            <li className="nav-item dropdown ms-3 me-3">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Danh sách sản phẩm
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {
                                        categorys && categorys.map(category => (
                                            <li key={category.DMSP_id}>
                                                <Link to={`/products/${category.DMSP_id}`} className="dropdown-item">{category.DMSP_ten}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>
                            <li className='nav-item ms-4 me-4' style={{ flexGrow: '1' }}>
                                <form className="d-flex form-search ">
                                    <input className="form-control me-2 pt-2 pb-2" style={{ flexGrow: '1' }} type="search" placeholder="Tìm kiếm sản phẩm" aria-label="Search" />
                                    <Search />
                                </form>
                            </li>

                            <li className="nav-item ms-3 me-3">
                                <NavLink className="nav-link btn nav-item-cart" to="/cart" > <Cart3 className='fs-5' /><span>{sum_item_cart}</span> </NavLink>
                            </li>
                            <li className='nav-item '>
                                <NavLink className="nav-link btn" to="/blog"><CardHeading className='fs-5' /></NavLink>
                            </li>
                            {
                                user.ND_id ? <li className="nav-item">
                                    <NavLink className="nav-link btn" to="/account" ><PersonFill className='fs-4 me-1' /></NavLink>
                                </li> :
                                    <li className='nav-item'>
                                        <NavLink className="nav-link btn btn-login" to="/login">Đăng nhập</NavLink>
                                    </li>
                            }

                        </ul>



                    </div>
                </div >
            </nav >
        </div >
    );
}

export default Nav;