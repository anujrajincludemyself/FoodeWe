/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./ContextReducer";
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar(props) {
    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userEmail')
        // Trigger auth state update
        window.dispatchEvent(new Event('authChange'));
        navigate("/login")
    }

    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();

    return (
        <div>
            <style>
                {`
                    .modern-navbar {
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                        border-bottom: 1px solid rgba(229, 231, 235, 0.8);
                        position: fixed;
                        top: 0;
                        width: 100%;
                        z-index: 1000;
                        transition: all 0.3s ease;
                    }
                    
                    .navbar-spacer {
                        height: 70px;
                    }
                    
                    .navbar-brand-modern {
                        font-size: 1.75rem;
                        font-weight: 800;
                        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        letter-spacing: -0.5px;
                        transition: all 0.3s ease;
                    }
                    
                    .navbar-brand-modern:hover {
                        transform: scale(1.05);
                    }
                    
                    .nav-link-modern {
                        color: #374151 !important;
                        font-weight: 600;
                        font-size: 1rem;
                        padding: 0.5rem 1rem !important;
                        margin: 0 0.25rem;
                        border-radius: 8px;
                        transition: all 0.2s ease;
                    }
                    
                    .nav-link-modern:hover {
                        background: #f3f4f6;
                        color: #10b981 !important;
                    }
                    
                    .nav-link-modern.active {
                        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                        color: white !important;
                    }
                    
                    .btn-modern-primary {
                        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                        border: none;
                        color: white;
                        font-weight: 600;
                        padding: 0.5rem 1.5rem;
                        border-radius: 8px;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                        margin: 0 0.25rem;
                    }
                    
                    .btn-modern-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
                        background: linear-gradient(135deg, #059669 0%, #047857 100%);
                        color: white;
                    }
                    
                    .btn-modern-outline {
                        border: 2px solid #10b981;
                        background: transparent;
                        color: #10b981;
                        font-weight: 600;
                        padding: 0.5rem 1.5rem;
                        border-radius: 8px;
                        transition: all 0.3s ease;
                        margin: 0 0.25rem;
                    }
                    
                    .btn-modern-outline:hover {
                        background: #10b981;
                        color: white;
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
                    }
                    
                    .cart-btn-modern {
                        background: white;
                        border: 2px solid #e5e7eb;
                        color: #374151;
                        font-weight: 600;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        transition: all 0.3s ease;
                        margin: 0 0.25rem;
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    
                    .cart-btn-modern:hover {
                        border-color: #10b981;
                        color: #10b981;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
                    }
                    
                    .navbar-toggler-modern {
                        border: 2px solid #e5e7eb;
                        padding: 0.5rem;
                        border-radius: 8px;
                    }
                    
                    .navbar-toggler-modern:focus {
                        box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.25);
                    }
                    
                    @media (max-width: 991px) {
                        .nav-link-modern {
                            margin: 0.25rem 0;
                        }
                        
                        .btn-modern-primary,
                        .btn-modern-outline,
                        .cart-btn-modern {
                            margin: 0.25rem 0;
                            width: 100%;
                            justify-content: center;
                        }
                    }
                `}
            </style>

            <nav className="navbar navbar-expand-lg modern-navbar">
                <div className="container-fluid px-4">
                    <Link className="navbar-brand navbar-brand-modern" to="/">
                        GoFood
                    </Link>

                    <button
                        className="navbar-toggler navbar-toggler-modern"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link nav-link-modern active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            {localStorage.getItem("token") && (
                                <li className="nav-item">
                                    <Link className="nav-link nav-link-modern" aria-current="page" to="/myorder">
                                        My Orders
                                    </Link>
                                </li>
                            )}
                        </ul>

                        {!localStorage.getItem("token") ? (
                            <div className="d-flex flex-column flex-lg-row">
                                <Link className="btn btn-modern-outline" to="/login">
                                    Login
                                </Link>
                                <Link className="btn btn-modern-primary" to="/signup">
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="d-flex flex-column flex-lg-row align-items-lg-center">
                                <button className="btn cart-btn-modern" onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length}>
                                        <ShoppingCartIcon style={{ color: 'currentColor' }} />
                                    </Badge>
                                    <span>Cart</span>
                                </button>

                                {cartView && (
                                    <Modal onClose={() => setCartView(false)}>
                                        <Cart></Cart>
                                    </Modal>
                                )}

                                <button onClick={handleLogout} className="btn btn-modern-primary">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className="navbar-spacer"></div>
        </div>
    )
}