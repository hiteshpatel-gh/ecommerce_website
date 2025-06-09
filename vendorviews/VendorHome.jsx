import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import VendorLogin from "./VendorLogin";
import Product from "../productviews/Product"; // ✅ Make sure this exists
import styles from "./VendorHome.module.css";

function VendorHome(props) {
  const [vendname, setVendName] = useState("");

  useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem("vsessionauth"));
    if (obj !== undefined && obj !== null) {
      setVendName(obj.vuserfullname);
    } else {
      alert("Vendor Session expired");
    }
  }, []);

  if (!props.data) {
    return <h4>Loading Vendor Info...</h4>;
  }

  const handleAddProductButton = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Product data={props.data.vid} />);
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("vsessionauth");
    alert("Vendor Session Closed");
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<VendorLogin />);
  };

  return (
    <div className={styles.container}>
      <p className={styles.sessionText}>Current Session Running for {vendname}</p>
      <h4 className={styles.heading}>Vendor Home Page</h4>
      <h5 className={styles.vendorInfo}>Vendor Id: {props.data.vid}</h5>
      <h5 className={styles.vendorInfo}>Welcome {props.data.vfname}</h5>
      <img
        src={`http://localhost:9669/vendor/getimage/${props.data.vpicname}`}
        height={100}
        width={100}
        alt="Vendor Pic"
        className={styles.vendorImage}
      />

      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={handleAddProductButton}>Manage Product</button>
        <button className={styles.button} onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
}

export default VendorHome;
