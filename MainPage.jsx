import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import AdminLogin from "./adminviews/AdminLogin";
import AdminReg from "./adminviews/AdminReg";
import AdminMain from "./adminviews/AdminMain";
import AdminHome from "./adminviews/AdminHome";
import CustomerMain from "./customerviews/CustomerMain";
import CustomerLogin from "./customerviews/CustomerLogin";
import CustomerReg from "./customerviews/CustomerReg";
import VendorLogin from "./vendorviews/VendorLogin";
import VendorReg from "./vendorviews/VendorReg";
import VendorMain from "./vendorviews/VendorMain";
import ProductList from "./productviews/ProductList";
import HomePage from "./HomePage";  // Import the HomePage component
import styles from "./MainPage.module.css";

const MainPage = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showRegDropdown, setShowRegDropdown] = useState(false);

  return (
    <div className={styles.app}>
      <Router>
        <nav className={styles.navbar}>
          <Link to="/" className={styles.navLogo}>WEBION</Link>
          <ul className={styles.navItems}>
            <li><Link to="/" className={styles.navLink}>HOME</Link></li>
            <li><Link to="/products" className={styles.navLink}>PRODUCTS</Link></li>
            
            <li
              className={styles.dropdown}
              onMouseEnter={() => setShowLoginDropdown(true)}
              onMouseLeave={() => setShowLoginDropdown(false)}
            >
              <span className={styles.navLink}>LOGIN</span>
              {showLoginDropdown && (
                <div className={styles.dropdownContent}>
                  <Link to="/adminmain/adminlogin" className={styles.dropdownItem}>Admin Login</Link>
                  <Link to="/customermain/customerlogin" className={styles.dropdownItem}>Customer Login</Link>
                  <Link to="/vendormain/vendorlogin" className={styles.dropdownItem}>Vendor Login</Link>
                </div>
              )}
            </li>

            <li
              className={styles.dropdown}
              onMouseEnter={() => setShowRegDropdown(true)}
              onMouseLeave={() => setShowRegDropdown(false)}
            >
              <span className={styles.navLink}>REGISTRATION</span>
              {showRegDropdown && (
                <div className={styles.dropdownContent}>
                  <Link to="/adminmain/adminreg" className={styles.dropdownItem}>Admin Reg</Link>
                  <Link to="/customermain/customerreg" className={styles.dropdownItem}>Customer Reg</Link>
                  <Link to="/vendormain/vendorreg" className={styles.dropdownItem}>Vendor Reg</Link>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />

          {/* Admin Routes */}
          <Route path="/adminmain" element={<AdminMain />}>
            <Route path="adminlogin" element={<AdminHome />} />
            <Route path="adminreg" element={<AdminReg />} />
          </Route>

          {/* Customer Routes */}
          <Route path="/customermain" element={<CustomerMain />}>
            <Route path="customerlogin" element={<CustomerLogin />} />
            <Route path="customerreg" element={<CustomerReg />} />
          </Route>

          {/* Vendor Routes */}
          <Route path="/vendormain" element={<VendorMain />}>
            <Route path="vendorlogin" element={<VendorLogin />} />
            <Route path="vendorreg" element={<VendorReg />} />
          </Route>

          {/* Products Route */}
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MainPage;
