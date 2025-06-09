import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import cart from "./cart.png"
import Bill from "../customerviews/Bill"
import styles from "./ProductList.module.css"

function ProductList(props) 
{
    const [itemcount, setItemCount] = useState(0);
    const [selitems, setSelItmes] = useState([]);
    const [pcatglist, setPCatgList] = useState([]);
    const [plist, setPList] = useState([]);

    var cname = "";

    useEffect(() => {
        // console.log(props.data)
        axios.get("http://localhost:9669/product/showproduct").then((res) => {
            setPList(res.data)
        }).catch((err) => {
            alert(err);
        });
        axios.get("http://localhost:9669/productcatg/show").then((res) => {
            // console.log(res.data)
            setPCatgList(res.data);
        }).catch((err) => {
            alert(err);
        });
    }, []);

    const handleBuyButton = (evt) => {
        var pid = parseInt(evt);
        var status = "";
        axios.get("http://localhost:9669/product/showproductstatus/" + pid).then((res) => {
            status = res.data.status;
            if (status == "Active") {
                setItemCount(itemcount + 1);
                plist.map((item) => {
                    if (item.pid == evt) {
                        selitems.push(item);
                    }
                })
            } else {
                alert("Product Out of Stock");
            }
        }).catch((err) => {
            alert(err);
        });
    }

    const handleCheckOutButton = () => {
        //alert("Hello")
        if (selitems.length <= 0) {
            alert("Please Buy Some Product");
        }
        else {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            var ccid = props.data;
            // var ccid = 1;

            var obj = {
                selitems: selitems,
                cid: ccid
            };
            root.render(<Bill data={obj}></Bill>)
        }
    }
    const handleSearch = (evt) => {
        if (evt.target.value > 0) {
            axios.get("http://localhost:9669/product/showproductbycatgid/" + evt.target.value).then((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);
            });
        } else {
            axios.get("http://localhost:9669/product/showproduct").then((res) => {
                setPList(res.data);
            }).catch((err) => {
                alert(err);
            });
        }
    }
    return (
        
        <div className={styles.productPage}>
        <h6 className={styles.customerId}>Customer Id - {props.data}</h6>
      
        <div className={styles.cartSection}>
          <img src={cart} height="50" width="50" alt="cart-icon" />
          <label className={styles.cartLabel}>{itemcount}</label>
          <button type="submit" onClick={handleCheckOutButton} className={styles.checkoutButton}>
            CheckOut
          </button>
        </div>
      
        <div className={styles.searchSection}>
          <label>Search By Category</label>
          <select onClick={handleSearch} className={styles.searchDropdown}>
            <option value="0">All</option>
            {pcatglist.map((pcatgitem) => (
              <option key={pcatgitem.PCatgId} value={pcatgitem.PCatgId}>{pcatgitem.PCatgName}</option>
            ))}
          </select>
        </div>
      
        <p className={styles.productHeading}>Product List</p>
      
        <div className={styles.productGrid}>
          {plist.map((item) => {
            const cname = pcatglist.find(c => c.PCatgId === item.pcatgid)?.PCatgName;
            return (
              <div key={item.pid} className={styles.productCard}>
                <img
                  src={`http://localhost:9669/product/getproductimage/${item.ppicname}`}
                  alt={item.pname}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h5>{item.pname}</h5>
                  <p><b>Price:</b> ₹{item.pprice}</p>
                  <p><b>Offer:</b> ₹{item.oprice}</p>
                  <p><b>Category:</b> {cname}</p>
                  <button className={styles.buyButton} onClick={() => handleBuyButton(item.pid)}>
                    Buy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      
    );
}

export default ProductList;