import React from 'react';
import styles from './HomePage.module.css';
import Customer from './Images/Customer.jpg';
import Vendor from './Images/Vendor2.jpeg';
import Admin from './Images/Admin4.avif';
import ReactDOM from 'react-dom/client';
import CustomerLogin from './customerviews/CustomerLogin';
import VendorLogin from './vendorviews/VendorLogin';
import AdminLogin from './adminviews/AdminLogin';

const HomePage = () => {
  const handleCardClick = (type) => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    if (type === 'customer') {
      root.render(<CustomerLogin />);
    } else if (type === 'vendor') {
      root.render(<VendorLogin />);
    } else if (type === 'admin') {
      root.render(<AdminLogin />);
    }
  };

  return (
    <div className={styles.homepage}>
      {/* Hero Section */}
      <header className={styles.heroSection}>
        <div className={styles.heroContent}>
          {/* <h1>Welcome to Our Online Store</h1>
          <p>Find amazing deals on the best products!</p> */}
        </div>
      </header>

      {/* Featured Products Section */}
      <section className={styles.featuredProducts}>
        <div className={styles.productCards}>
          <div
            className={styles.productCard}
            onClick={() => handleCardClick('customer')}
            style={{ cursor: 'pointer' }}
          >
            <img src={Customer} alt="Customer" />
            <h3>Customer</h3>
          </div>
          <div
            className={styles.productCard}
            onClick={() => handleCardClick('admin')}
            style={{ cursor: 'pointer' }}
          >
            <img src={Admin} alt="Admin" />
            <h3>Admin</h3>
          </div>
          <div
            className={styles.productCard}
            onClick={() => handleCardClick('vendor')}
            style={{ cursor: 'pointer' }}
          >
            <img src={Vendor} alt="Vendor" />
            <h3>Vendor</h3>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Your eCommerce Site | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
