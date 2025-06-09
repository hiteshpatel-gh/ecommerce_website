import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import Bill from "../customerviews/Bill";
import styles from "./ProductList.module.css"

function ProductList(props) {
    const [itemcount, setItemCount] = useState(0);
    const [selitems, setSelItems] = useState([]);
    const [pcatglist, setPCatgList] = useState([]);
    const [plist, setPList] = useState([]);
    const [vlist, setVList] = useState([]);

    var cname = "";

    useEffect(() => {
        axios.get("http://localhost:9669/product/showproduct").then((res) => {
            setPList(res.data);
        }).catch((err) => {
            alert(err);
        });
        axios.get("http://localhost:9669/productcatg/show").then((res) => {
            setPCatgList(res.data);
        }).catch((err) => {
            alert(err);
        });
        //get Vender
        axios.get("http://localhost:9669/vendor/getvendorcount").then((res) => {
            setVList(res.data);
        }).catch((err) => {
            alert(err);
        });
    }, []);

    const handleActiveButton = (evt) => {
        var pid = parseInt(evt);
        var status = "Active";
        axios.put("http://localhost:9669/product/updateproductstatus/" + pid + "/" + status).then((res) => {
            alert("Product Status Updated");
        }).catch((err) => {
            alert(err);
        });
    }
    const handleInactiveButton = (evt) => {
        var pid = parseInt(evt);
        var status = "Inactive";
        axios.put("http://localhost:9669/product/updateproductstatus/" + pid + "/" + status).then((res) => {
            alert("Product Status Updated");
        }).catch((err) => {
            alert(err);
        });
    }
    const handleCheckOutButton = () => {
        alert("Hello")
        if (selitems.length <= 0) {
            alert("Please Buy Some Product");
        }
        else {
            const root = ReactDOM.createRoot(document.getElementById("root"));
            var ccid = props.data;
            var obj = {
                selitems: selitems,
                cid: ccid
            };
            root.render(<Bill date={obj}></Bill>)
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
    const handleSearchByVendor = (evt) => {
        if (evt.target.value > 0) {
            axios.get("http://localhost:9669/product/showproductbyvendor/" + evt.target.value).then((res) => {
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
        <div className={styles.searchSection}>
          <div>
            Search By Category:
            <select className={styles.searchSelect} onClick={handleSearch}>
              <option value="0">All</option>
              {pcatglist.map((pcatgitem) => (
                <option key={pcatgitem.pcatgid} value={pcatgitem.pcatgid}>
                  {pcatgitem.pcatgname}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            Search By Vendor:
            <select className={styles.searchSelect} onClick={handleSearchByVendor}>
              <option value="0">All</option>
              {vlist.map((vitem) => (
                <option key={vitem.Vid} value={vitem.Vid}>
                  {vitem.VendorName}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <p className={styles.productHeading}>Product List</p>
  
        <div className={styles.productGrid}>
          {plist.map((item) => {
            const category = pcatglist.find((citem) => citem.pcatgid === item.pcatgid);
            cname = category ? category.pcatgname : 'Unknown';
  
            return (
              <div key={item.pid} className={styles.productCard}>
                <img
                  src={`http://localhost:9669/product/getproductimage/${item.ppicname}`}
                  alt={item.pname}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <h5>{item.pname}</h5>
                  <p>₹{item.oprice} <s>₹{item.pprice}</s></p>
                  {/* <p>{cname}</p> */}
                  <p>Status: {item.status}</p>
                </div>
                <button className={styles.active} onClick={() => handleActiveButton(item.pid)}>
                  Active
                </button>
                <button className={styles.inactive} onClick={() => handleInactiveButton(item.pid)}>
                  Inactive
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
} export default ProductList;