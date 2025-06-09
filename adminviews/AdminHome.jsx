import React, {useState} from "react";
import StateMgt from "./StateMgt";
import CityMgt from "./CityMgt";
import ProductCatgMgt from "./ProductCatg";
import VendorMgt from "./VendorMgt";
import "../index.css";
import ShowBills from "./ShowBills";
// import AdminMain from "./AdminMain";
import ReactDOM from "react-dom/client";
// import MainPage from "../MainPage";
import ProductList from "./ProductList";
import CustomerMgt from "./CustomerMgt";
import styles from "./AdminHome.module.css"

function AdminHome()
{
    const[isstateshow,setIsStateShow]=useState(false);
    const[iscityshow,setIsCityShow]=useState(false);
    const[ispcatgshow,setIsPCatgShow]=useState(false);
    const[isvendorshow,setIsVendorShow]=useState(false);
    const[isbillshow,setIsBillShow]=useState(false);
    const[isproductlistshow,setIsProductListShow]=useState(false);
    const[iscustomershow,setIsCustomerShow]=useState(false);
    function togleState(){
        setIsStateShow((isstateshow)=>!isstateshow);
    }

    function togleCity(){
        setIsCityShow((iscityshow)=>!iscityshow);
    }

    function togleProductCatg(){
        setIsPCatgShow((ispcatgshow)=>!ispcatgshow);
    }

    function togleVendor(){
        setIsVendorShow((isvendorshow)=>!isvendorshow);
    }

    function togleBill(){
        setIsBillShow((isbillshow)=>!isbillshow);
    }

    function togleProductList(){
        setIsProductListShow((isproductlistshow)=>!isproductlistshow);
    }

    function togleCustomerList(){
        setIsCustomerShow((iscustomershow)=>!iscustomershow);
    }

    function LogOutButtonClick(){
        const root=ReactDOM.createRoot(document.getElementById("root"));
        // root.render(<MainPage></MainPage>)
    }
    return(
        <div className={styles.container}>
            <h4 className={styles.heading}>Admin Home Page</h4>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={togleState}>State</button>
                <button className={styles.button} onClick={togleCity}>City</button>
                <button className={styles.button} onClick={togleProductCatg}>Product Category</button>
                <button className={styles.button} onClick={togleVendor}>Vendor</button>
                <button className={styles.button} onClick={togleBill}>Bill</button>
                <button className={styles.button} onClick={togleProductList}>Product</button>
                <button className={styles.button} onClick={togleCustomerList}>Customer</button>
                <button className={styles.button} onClick={LogOutButtonClick}>Logout</button>
            </div>

            {isstateshow && <div className={styles.section}><StateMgt /></div>}
            {iscityshow && <div className={styles.section}><CityMgt /></div>}
            {ispcatgshow && <div className={styles.section}><ProductCatgMgt /></div>}
            {isvendorshow && <div className={styles.section}><VendorMgt /></div>}
            {isbillshow && <div className={styles.section}><ShowBills /></div>}
            {isproductlistshow && <div className={styles.section}><ProductList /></div>}
            {iscustomershow && <div className={styles.section}><CustomerMgt /></div>}
        </div>
    );
}export default AdminHome;