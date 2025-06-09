import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./VendorMgt.module.css"

function VendorMgt() {
  const [vendorlist, setVendorList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9669/vendor/getvendorcount")
      .then((res) => {
        setVendorList(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  const handleActivebutton = (vid) => {
    var newstatus = "Active";
    axios
      .put("http://localhost:9669/vendor/vendormanage/" + vid + "/" + newstatus)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleInactiveButton = (vid) => {
    var newstatus = "Inactive";
    axios
      .put("http://localhost:9669/vendor/vendormanage/" + vid + "/" + newstatus)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className={styles.container}>
    <h4 className={styles.heading}>Vendor List</h4>
    <div className={styles.myDiv1}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Vid</th>
            <th>Vendor Name</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vendorlist.map((item) => (
            <tr key={item.Vid}>
              <td>{item.Vid}</td>
              <td>{item.VendorName}</td>
              <td className={
                item.Status.toLowerCase() === 'enabled'
                  ? styles.statusEnabled
                  : styles.statusDisabled
              }>
                {item.Status}
              </td>
              <td>
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => handleActivebutton(item.Vid)}
                >
                  Active
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => handleInactiveButton(item.Vid)}
                >
                  Inactive
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
export default VendorMgt;