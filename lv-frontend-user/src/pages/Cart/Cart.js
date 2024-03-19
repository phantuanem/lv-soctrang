import Nav from "../../components/Navigation/Nav";
import Footer from "../../components/Footer/Footer";
import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import './Cart.scss';
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { notification } from 'antd';
const key = 'updatable';

const Cart = (props) => {
    const [api, contextHolder] = notification.useNotification();
    const { user } = useContext(UserContext)
    const [products, setProducts] = useState([])
    const [sum_price, setSumPrice] = useState(0)

    useEffect(() => {
        if (user?.ND_id) {
            getItemCart()
        }
    }, [user.ND_id])

    const getItemCart = async () => {
        try {
            const response = await axios.get('/api/cart/items', {
                params: {
                    ND_id: user.ND_id
                }
            })
            setProducts(response.data)
            var sum = 0
            response.data.forEach(item => {
                sum += (item.discount ? (item.G_giaBanDau - item.G_giaBanDau):item.G_giaBanDau) * item.soLuong
            })
            setSumPrice(sum)
        } catch (e) {
            console.error(e)
        }
    }

    const removeItem = async (item_id) => {
        try {
            const response = await axios.delete('/api/cart/item', {
                params: {
                    SPGH_id: item_id
                }
            })
            if (response.data) {
                api.open({
                    key,
                    message: 'Xóa sản phẩm thành công'
                });
                setProducts(products.filter(item => item.SPGH_id !== item_id))
            } else {
                api.open({
                    key,
                    message: 'Xóa sản phẩm không thành công'
                });
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="cart-background my-4" >
            {/* <Nav /> */}


            <div className="container p-4" style={{ backgroundColor: '#ffffff', }}>
                <h3>Giỏ hàng</h3>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col"></th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Đơn giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thành tiền</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products && products.map((item, idx) => (
                                    <tr key={item.SP_id}>
                                        <td style={{ verticalAlign: 'middle' }}>{idx + 1}</td>
                                        <td scope="row" style={{ verticalAlign: 'middle' }}>
                                            <img src={item.image} className="img-fluid img-product" />
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>{item.SP_ten}</td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            <div>
                                                {
                                                    item.discount && <del>
                                                        {item.G_giaBanDau.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                    </del>
                                                }
                                                <p className="card-text item-price">{item.discount ? (item.G_giaBanDau - item.discount.KM_mucGiamGia).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : item.G_giaBanDau.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                            </div>
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>{item.soLuong}</td>
                                        <td style={{ verticalAlign: 'middle' }}>{((item.discount ? (item.G_giaBanDau - item.discount.KM_mucGiamGia):item.G_giaBanDau) * item.soLuong).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            <button className="btn btn-delete" onClick={() => removeItem(item.SPGH_id)}>Xóa</button>
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan={3}> <NavLink to="/" className="btn-tieptucmuahang"><ArrowLeft /> Tiếp tục mua hàng</NavLink></td>
                                <td colSpan={3}><button className="btn btn-"></button></td>
                            </tr>
                        </tbody>

                    </table>
                    <div className="text-end">
                        <button className="btn btn-payment" style={{ width: '220px' }}>Thanh toán</button>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <p className="border border-1 border-secondary p-2">Tổng thanh toán</p>
                        <p className="border border-1 border-secondary p-2">{sum_price}</p>
                    </div>
                </div>

            </div>
            {contextHolder}
            {/* <Footer /> */}
        </div>
    );
}
export default Cart;