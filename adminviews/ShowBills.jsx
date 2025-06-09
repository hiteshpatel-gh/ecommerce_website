
import React,{useState,useEffect} from "react";
import axios from 'axios'
import styles from "./ShowBills.module.css"

function ShowBills()
{
    const [custlist,setCustList]=useState([])
    const [billdetailslist,setBillDetailsList]=useState([])
    const [plist,setPList]=useState([])
    const [prevbillid,setprevbillid]=useState(0)
    var pname=""
    var oprice=0;
    var total=0;
    var picname=""
    var prbid=0;
    var k=true;
    //const [count,setCount]=useState(0)
    var count=0;

    useEffect(()=>{
        //get customer from db
        axios.get("http://localhost:9669/customer/getcustomerlist").then(res=>{
            setCustList(res.data)
        }).catch(err=>{
            alert(err)
        })

        //get product details from db
        axios.get("http://localhost:9669/product/showproduct").then(res=>{
            setPList(res.data)
        }).catch(err=>{
            alert(err)
        })

        //get total amount from db
        axios.get("http://localhost:9669/paymentdetails/showpaymentdetails").then(res=>{
            //setPList(res.data)
        }).catch(err=>{
            alert(err)
        })
    },[])


    const handleCustomerSelect=(e)=>{
        //alert(e.target.value)
        axios.get("http://localhost:9669/bill/billshow/"+e.target.value).then(res=>{
            setBillDetailsList(res.data)
            setprevbillid(res.data[0].billid)
            prbid=res.data[0].billid
            //alert(prbid)
            alert("First Bill Id "+res.data[0].billid+" k="+k)
        }).catch(err=>{
            alert(err)
        })
    }

    return(
        <div className={styles.container}>
        <p className={styles.heading}>Bill List Admin View</p>
  
        <table className={styles.selectorTable}>
          <tbody>
            <tr>
              <td>Customer</td>
              <td>
                <select className={styles.selectBox} onClick={handleCustomerSelect}>
                  {custlist.map(item => (
                    <option key={item.Cid} value={item.Cid}>
                      {item.CustomerName + " " + item.Cid}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
  
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Bill Id</th>
              <th>Customer Id</th>
              <th>Bill date</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Product Image</th>
            </tr>
          </thead>
          <tbody>
            {billdetailslist.map((bitem, index) => {
              plist.forEach(pitem => {
                if (bitem.pid === pitem.pid) {
                  if (bitem.billid !== prbid) {
                    prbid = bitem.billid;
                    total = 0;
                    k = true;
                  } else {
                    k = false;
                  }
                  pname = pitem.pname;
                  oprice = pitem.oprice;
                  total += parseInt(pitem.oprice);
                  picname = pitem.ppicname;
                }
              });
  
              return (
                <tr key={index} className={styles.tableRow}>
                  <td>{bitem.billid}</td>
                  <td>{bitem.cid}</td>
                  <td>{bitem.billdate}</td>
                  <td>{pname}</td>
                  <td>{oprice}</td>
                  <td>
                    <img
                      className={styles.productImage}
                      src={`http://localhost:9669/product/getproductimage/${picname}`}
                      alt="product"
                    />
                    <p className={styles.totalBox}>{k ? "" : total}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
}

export default ShowBills;

