import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import VendorLogin from "./VendorLogin";
import styles from "./VendorReg.module.css"

const VendorReg = () => {
  const [vuserid, setVUserId] = useState();
  const [vuserpass, setVUserPass] = useState();
  const [vendorname, setVendorName] = useState();
  const [vaddress, setVAddress] = useState();
  const [vcontact, setVContact] = useState();
  const [vemail, setVEmail] = useState();
  const [vpicname, setVPicName] = useState();
  const [vid, setVId] = useState();
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");

  const handleVUserIdText = (evt) => {
    setVUserId(evt.target.value);
  };
  const handleVUserPassText = (evt) => {
    setVUserPass(evt.target.value);
  };
  const handleVendorNameText = (evt) => {
    setVendorName(evt.target.value);
  };
  const handleVAddressText = (evt) => {
    setVAddress(evt.target.value);
  };
  const handleVContactText = (evt) => {
    setVContact(evt.target.value);
  };
  const handleVEmailText = (evt) => {
    setVEmail(evt.target.value);
  };
  const handleVidText = (evt) => {
    setVId(evt.target.value);
  };
  useEffect(() => {
    axios
      .get("http://localhost:9669/vendor/getvendorcount/")
      .then((res) => {
        setVId(res.data.length + 1);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  const handleRegisterButton = () => {
    var obj = {
      VUserId: vuserid,
      VUserPass: vuserpass,
      VendorName: vendorname,
      VAddress: vaddress,
      VContact: vcontact,
      VEmail: vemail,
      VPicName: vpicname,
      Vid: vid,
      Status: "Inactive",
    };
    axios
      .post("http://localhost:9669/vendor/register/", obj)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  //browse and save image code
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);
    const response = await fetch(
      "http://localhost:9669/vendor/savevendorimage",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response) {
      if (response.statusText == "ok") {
        setStatus("File Uploaded SuccessFully");
      } else {
        setStatus("Failed to Upload file");
      }
    }
  };
  const handleFileChange = (evt) => {
    const img = {
      preview: URL.createObjectURL(evt.target.files[0]),
      data: evt.target.files[0],
    };
    setImage(img);
    setVPicName(evt.target.value[0].name);
  };
  const handleLoginButton = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<VendorLogin />);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h2 className={styles.formTitle}>Vendor Registration</h2>
        <table className={styles.formTable}>
          <tbody>
            <tr>
              <td className={styles.formLabel}>Vendor Id</td>
              <td>{vid}</td>
            </tr>
            <tr>
              <td className={styles.formLabel}>User Id</td>
              <td><input type="text" onChange={handleVUserIdText} className={styles.formInput} /></td>
            </tr>
            <tr>
              <td className={styles.formLabel}>Password</td>
              <td><input type="password" onChange={handleVUserPassText} className={styles.formInput} /></td>
            </tr>
            <tr>
              <td className={styles.formLabel}>Vendor Name</td>
              <td><input type="text" onChange={handleVendorNameText} className={styles.formInput} /></td>
            </tr>
            <tr>
              <td className={styles.formLabel}>Address</td>
              <td><input type="text" onChange={handleVAddressText} className={styles.formInput} /></td>
            </tr>
            <tr>
              <td className={styles.formLabel}>Contact</td>
              <td><input type="number" onChange={handleVContactText} className={styles.formInput} /></td>
            </tr>
            <tr>
              <td className={styles.formLabel}>Email</td>
              <td><input type="email" onChange={handleVEmailText} className={styles.formInput} /></td>
            </tr>
            <tr>
              <td className={styles.formLabel}>Select Photo</td>
              <td>
                <input type="file" onChange={handleFileChange} />
                <br />
                <img src={image.preview} height="100" alt="Preview" className={styles.formImage} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button type="submit" onClick={handleSubmit} className={styles.formButton}>
                  Upload Photo
                </button>
              </td>
            </tr>
          
            <tr>
              <td>
                <button type="submit" onClick={handleRegisterButton} className={styles.formButton}>
                  Register
                </button>
              </td>

                
              <td>
                <button type="submit" onClick={handleLoginButton} className={styles.formButton}>
                  Login
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
  
  );
};

export default VendorReg;