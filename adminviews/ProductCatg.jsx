import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProductCatg.module.css"

function ProductCatg() {
  const [pcatgid, setPCatgId] = useState();
  const [pcatgname, setPCatgName] = useState();

  const handlePCatgName = (evt) => {
    setPCatgName(evt.target.value);
  };
  useEffect(() => {
    axios
      .get("http://localhost:9669/productcatg/show")
      .then((res) => {
        setPCatgId(res.data.length + 1); //this code will get product category ID Automatically
      })
      .catch((err) => {
        alert(err);
      });
  });
  const handleSaveButton = () => {
    var obj = {
      PCatgId: pcatgid,
      PCatgName: pcatgname,
    };
    axios
      .post("http://localhost:9669/productcatg/save", obj)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return ( // adjust this path to match your actual CSS module file name

    <div className={styles.container}>
      <center>
        <h4 className={styles.heading}>Manage Product Category</h4>
        <div className={styles.myDiv1}>
          <table className={styles.table}>
            <tr>
              <td>Product Category Id</td>
              <td>{pcatgid}</td>
            </tr>
            <tr>
              <td>Product Category Name</td>
              <td>
                <input
                  type="text"
                  onChange={handlePCatgName}
                  className={styles.formControl}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button
                  type="submit"
                  onClick={handleSaveButton}
                  className={styles.button}
                >
                  Save
                </button>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </div>
    
  );
}
export default ProductCatg;
