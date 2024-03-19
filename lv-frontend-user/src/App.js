import './App.scss';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import HomePage from './pages/HomePage/HomePage';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Products from './pages/Products/Products';
import Account from './pages/Account/Account';
import Nav from './components/Navigation/Nav';
import Footer from './components/Footer/Footer';
import Blog from './pages/Blog/Blog';
import FormInfoCustomer from './pages/Account/components/FormInfo'
import FormAddress from './pages/Account/components/FormAddress';
import FormOrder from './pages/Account/components/FormOrder';
import { UserContext } from './context/userContext';

function App() {
	const { authLogin } = useContext(UserContext)
	useEffect(() => {
		authLogin()
	}, [])
	return (
		<BrowserRouter>
			<div className='app-container' style={{ backgroundColor: '#f1f1f1' }}>
				<Nav />
				<Routes>
					<Route path="/blog" element={<Blog />} exact />
					<Route path="/cart" element={<Cart />} exact />
					<Route path="/account" element={<Account />} exact>
						<Route path="" element={<FormInfoCustomer />} exact />
						<Route path="address" element={<FormAddress />} exact />
						<Route path="order" element={<FormOrder />} exact />
					</Route>
					<Route path="/login" element={<Login />} exact />
					<Route path="/register" element={<Register />} exact />
					<Route path="/product/:id" element={<ProductDetail />} exact />
					<Route path="/products/:id" element={<Products />} exact />
					<Route path="/" element={<HomePage />} exact />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
