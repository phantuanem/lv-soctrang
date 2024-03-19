import React, { useState, useEffect, useContext } from "react";
import "./ProductDetail.scss";
import { CaretRightFill } from "react-bootstrap-icons";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { notification } from 'antd';
import { UserContext } from "../../context/userContext";


const ProductDetail = (props) => {
    const location = useLocation()
    const { user } = useContext(UserContext)
    const { id } = useParams()
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([])
    const key = 'updatable';
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        getProduct();
    }, [location])
    const getProduct = async () => {
        try {
            const response = await axios.get('/api/product', {
                params: { SP_id: id }
            })
            setProduct(response.data.product)
            setProducts(response.data.relate_products)
        } catch (e) {
            console.error(e)
        }
    }

    const addToCard = async () => {
        try {
            const response = await axios.post('/api/cart/add', { SP_id: id, ND_id: user.ND_id })
            if (response.data) {
                api.open({
                    key,
                    message: 'Thêm sản phẩm thành công'
                });
            } else {
                api.open({
                    key,
                    message: 'Thêm sản phẩm thất bại'
                });
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <div className="container-fluid productdetail-background">
                {/* <Nav /> */}
                <div className="container productdetail-container my-4 px-4">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-9 item-left p-4">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-6">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <img src={product?.images ? product.images[0].HA_URL : ''} alt="Hình ảnh sản phẩm" style={{ width: '100%' }} />
                                        </div>
                                        <div className="d-flex mt-4  list-product col-md-12" style={{ height: '100px', overflow: 'hidden', width: '100%', overflowX: 'scroll' }}>
                                            {
                                                product?.images && product.images.map(image => (
                                                    <img key={image.HA_id} src={image.HA_URL} style={{ height: '100%' }} className="me-2 img-fluid" />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6">
                                    <h3 className="product-titlle">{product.SP_ten}</h3>
                                    {
                                        product.discount && product?.SP_gia && <del>
                                            {product.SP_gia.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                        </del>
                                    }
                                    <h4 className="product-price">{product?.SP_gia ? (product.discount ? (product.SP_gia - product.discount.KM_mucGiamGia) : product.SP_gia).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : 0}</h4>
                                    <div className="input-group ega-qty-control">
                                        <div className="input-group-addon">-</div>
                                        <input type="text" className="text-center form-control" name="quantity" maxLength={4} id="exampleInputAmount" value={1} />
                                        <div className="input-group-addon">+</div>
                                    </div>
                                    <button className="btn btn-add-cart my-3" onClick={addToCard}>Thêm vào giỏ hàng</button>
                                    <div className="product-description ">
                                        <div className="d-flex"><CaretRightFill style={{ color: '#FF4D00' }} className="mt-2" /><h4 className="product-description-title">Mô tả sản phẩm</h4></div>


                                        <div>
                                            {product.SP_moTa}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="">
                                    <h3 className="box-comment-title">Bình luận</h3>
                                    <div className="box-comment-body d-flex flex-column">
                                        <textarea placeholder="Mời bạn để lại bình luận" className="d-block p-3">

                                        </textarea>

                                        <div className="text-end">
                                            <button className="btn btn-comment mt-3" >Tải bình luận</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3 item-right d-sm-none d-md-block">
                            <div className="item-right_child ms-4 p-2 row">
                                <h4 style={{ fontSize: '20px', textAlign: 'center', textTransform: 'uppercase' }} className="p-2">Sản phẩm liên quan</h4>
                                {
                                    products && products.map(product => (
                                        <div className="col-sm-12 d-flex flex-column align-items-center my-4" key={product.SP_id}  >
                                            <Link to={`/product/${product.SP_id}`} style={{ textDecoration: 'none' }} className="d-flex flex-column align-items-center">

                                                <img src={product.image} alt="..." style={{ width: '100%' }} />
                                                <p style={{ fontSize: '18px', marginBottom: 0 }} className="" >{product.SP_ten}</p>
                                                <p className="pb-0">Trọng lượng: {product.SP_trongLuong} {product.SP_donViTinh}</p>
                                                <div>
                                                    {
                                                        product.discount && <del>
                                                            {product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                        </del>
                                                    }
                                                    <p className="card-text product-price">{product.discount ? (product.price - product.discount.KM_mucGiamGia).toLocaleString('vi', { style: 'currency', currency: 'VND' }) : product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                }



                            </div>
                        </div>
                    </div>
                </div>
                {contextHolder}
            </div>
        </div>
    );
}
export default ProductDetail;