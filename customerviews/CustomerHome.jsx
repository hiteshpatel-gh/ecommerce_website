import React, { useEffect, useState } from "react";
import ProductList from "../productviews/ProductList";
import BillByID from "./BillByID";
import ReactDOM from "react-dom/client";
import CustomerLogin from "./CustomerLogin";
import styles from "./CustomerHome.module.css"

function CustomerHome(props){
  const [custname, setCustName] = useState();
  const [isshowplist, setIsShowPlist] = useState(false);
  const [isshowbill, setIsShowBill] = useState(false);
  useEffect(() => {
    var obj = JSON.parse(sessionStorage.getItem("sessionauth"));
    if (obj != undefined && obj != null) {
      //alert(obj.username)     
      setCustName(obj.userfullname);
    } else {
      alert("session expires");
    }
  });
  const handleShoppingButton = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    alert("cid=" + props.data.cid);
    var cid = props.data.cid;
    root.render(<ProductList data={cid}></ProductList>);
  };
  const handleShowBills = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    var cid = props.data.cid;
    root.render(<BillByID data={cid}></BillByID>);
  };
  const handleLogOut = () => {
    sessionStorage.removeItem("sessionauth");
    alert("Customer Session Closed");
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<CustomerLogin />);
  };
  function togleShoping() {
    setIsShowPlist((isshowplist) => !isshowplist);
  }
  function togleBill() {
    setIsShowBill((isshowbill) => !isshowbill);
  }
  return (
<div className={styles.customerHomeContainer}>
  <div className={styles.customerCard}>
    <p>Current Session Running For {custname}</p>
    <p>Customer Id: {props.data.cid}</p>
    <h4>CUSTOMER HOME PAGE</h4>
    <h6>Welcome {props.data.cfname}</h6>
    <img
      src={"http://localhost:9669/customer/getimage/" + props.data.cpicname}
      className={styles.customerImage}
      alt="customer-pic"
    />
    <button type="submit" onClick={togleShoping} className={styles.customerButton}>
      Shopping
    </button>
    <button type="submit" onClick={togleBill} className={styles.customerButton}>
      Show Bill
    </button>
    <button type="submit" onClick={handleLogOut} className={styles.customerButton}>
      Logout
    </button>
  </div>

  {isshowplist && (
    <div className={styles.productWrapper}>
      <ProductList data={props.data.cid} />
    </div>
  )}
  {isshowbill && (
    <div className={styles.billWrapper}>
      <BillByID data={props.data.cid} />
    </div>
  )}

  <h4 className={styles.customerMarquee}>
    <marquee> created by hitesh patel </marquee>
  </h4>
</div>

  );
};
export default CustomerHome;