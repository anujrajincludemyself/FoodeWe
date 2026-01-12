import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      const data = await res.json();

      if (data.orderData && data.orderData.order_data) {
        setOrderData(data.orderData.order_data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const handlePayment = (orderTotal, orderDate) => {
    // Placeholder for payment integration
    alert(`Processing payment of ₹${orderTotal}/- for order dated ${orderDate}\n\nPayment gateway integration coming soon!`);
    // Here you would integrate with payment gateway like Razorpay, Stripe, etc.
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div style={{ background: "linear-gradient(to bottom, #f9fafb 0%, #e5e7eb 100%)", minHeight: "100vh" }}>
      <Navbar />

      <style>
        {`
          .orders-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }
          
          .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            margin-top: 2rem;
          }
          
          .empty-state h4 {
            color: #6b7280;
            font-weight: 600;
          }
          
          .order-section {
            margin-bottom: 3rem;
          }
          
          .order-date-header {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          }
          
          .order-date-header h5 {
            margin: 0;
            color: #1f2937;
            font-weight: 700;
            font-size: 1.25rem;
          }
          
          .order-date-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
          }
          
          .order-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .order-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
          }
          
          .order-card-img {
            height: 180px;
            object-fit: cover;
            width: 100%;
            transition: transform 0.3s ease;
          }
          
          .order-card:hover .order-card-img {
            transform: scale(1.05);
          }
          
          .order-card-body {
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }
          
          .order-card-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 0.75rem;
          }
          
          .order-details {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
          }
          
          .order-detail-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.375rem 0.75rem;
            background: #f3f4f6;
            border-radius: 8px;
            font-size: 0.875rem;
            color: #374151;
            font-weight: 500;
          }
          
          .order-price {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-top: auto;
          }
          
          .payment-section {
            margin-top: 2rem;
            padding: 1.5rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
          }
          
          .total-amount {
            display: flex;
            flex-direction: column;
          }
          
          .total-label {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .total-price {
            font-size: 2rem;
            font-weight: 800;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .pay-button {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border: none;
            color: white;
            font-weight: 700;
            padding: 1rem 3rem;
            border-radius: 12px;
            font-size: 1.125rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
          }
          
          .pay-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(16, 185, 129, 0.5);
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
          }
          
          .pay-button:active {
            transform: translateY(-1px);
          }
          
          @media (max-width: 768px) {
            .order-date-header h5 {
              font-size: 1rem;
            }
            
            .order-card-img {
              height: 150px;
            }
            
            .payment-section {
              flex-direction: column;
              align-items: stretch;
            }
            
            .pay-button {
              width: 100%;
              justify-content: center;
            }
          }
        `}
      </style>

      <div className="orders-container">
        {orderData.length === 0 && (
          <div className="empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="#d1d5db"
              className="bi bi-cart-x mx-auto mb-3"
              viewBox="0 0 16 16"
            >
              <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
            <h4>No Orders Found</h4>
            <p className="text-muted">You haven't placed any orders yet.</p>
          </div>
        )}

        {orderData
          .slice(0)
          .reverse()
          .map((order, index) => {
            const orderTotal = order.slice(1).reduce((total, item) => total + item.price, 0);

            return (
              <div key={index} className="order-section">
                {/* Order Date Header */}
                <div className="order-date-header">
                  <div className="order-date-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="white"
                      className="bi bi-calendar-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                    </svg>
                  </div>
                  <h5>{order[0].Order_date}</h5>
                </div>

                <div className="row g-4">
                  {order.slice(1).map((item, idx) => (
                    <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
                      <div className="order-card">
                        <div style={{ overflow: "hidden" }}>
                          <img
                            src={item.img}
                            className="order-card-img"
                            alt={item.name}
                          />
                        </div>
                        <div className="order-card-body">
                          <h5 className="order-card-title">{item.name}</h5>

                          <div className="order-details">
                            <span className="order-detail-badge">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                fill="currentColor"
                                className="bi bi-box me-1"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                              </svg>
                              Qty: {item.qty}
                            </span>
                            <span className="order-detail-badge">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                fill="currentColor"
                                className="bi bi-rulers me-1"
                                viewBox="0 0 16 16"
                              >
                                <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1z" />
                              </svg>
                              Size: {item.size}
                            </span>
                          </div>

                          <div className="order-price">
                            ₹{item.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Section */}
                <div className="payment-section">
                  <div className="total-amount">
                    <span className="total-label">Order Total</span>
                    <span className="total-price">
                      ₹{orderTotal}/-
                    </span>
                  </div>

                  <button
                    className="pay-button"
                    onClick={() => handlePayment(orderTotal, order[0].Order_date)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-credit-card"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                      <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                    </svg>
                    Click to Pay
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <Footer />
    </div>
  );
}
