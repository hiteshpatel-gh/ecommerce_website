import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CustomertMgt.module.css"

const CustomerMgt = () => {
  const [customerlist, setCustomerList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9669/customer/getcustomercount")
      .then((res) => {
        setCustomerList(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  const handleActiveButton = (cid) => {
    var email = "";
    axios
      .get("http://localhost:9669/customer/getcustomerdetails/" + cid)
      .then((res) => {
        email = res.data.CEmail;
        alert("Customer Email = " + email);
        var newstatus = "Active";
        axios
          .put(
            "http://localhost:9669/customer/customermanage/" +
              cid +
              "/" +
              newstatus
          )
          .then((res) => {
            alert(res.data);
            var mailto = email;
            var subject = "Login Activation";
            var message =
              "Your Id is successfully activated by Admin.Now you can Login.";
            axios
              .post(
                "http://localhost:9669/emailactivation/sendmails/" +
                  mailto +
                  "/" +
                  subject +
                  "/" +
                  message
              )
              .then((res) => {
                alert(res.data);
              })
              .catch((err) => {
                alert(err);
              });
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleInactiveButton = (cid) => {
    var email = "";
    axios
      .get("http://localhost:9669/customer/getcustomerdetails/" + cid)
      .then((res) => {
        email = res.data.CEmail;
        alert("Customer Email:" + email);

        var newstatus = "Inactive";
        axios
          .put(
            "http://localhost:9669/customer/customermanage/" +
              cid +
              "/" +
              newstatus
          )
          .then((res) => {
            alert(res.data);
            var mailto = email;
            var subject = "Logim Deactivation";
            var message =
              "your ID is Successfully Deactivated By Admin now you can not Login";

            axios
              .post(
                "http://localhost:9669/emailactivation/sendemails/" +
                  mailto +
                  "/" +
                  subject +
                  "/" +
                  message
              )
              .then((res) => {
                alert(res.data);
              })
              .catch((err) => {
                alert(err);
              });
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className={styles.container}>
    <h4 className={styles.heading}>Customer List</h4>
    <div className={styles.myDiv1}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customerlist.map((item) => (
            <tr key={item.Cid}>
              <td>{item.Cid}</td>
              <td>{item.CustomerName}</td>
              <td
                className={
                  item.Status === "Active"
                    ? styles.statusEnabled
                    : styles.statusDisabled
                }
              >
                {item.Status}
              </td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleActiveButton(item.Cid)}
                >
                  Active
                </button>
              </td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleInactiveButton(item.Cid)}
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
};

export default CustomerMgt;