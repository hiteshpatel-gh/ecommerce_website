import React,{useEffect,useState} from 'react'
import axios from 'axios'
import styles from "./Product.module.css"

function Product(props)
{
    const [pid,setPId]=useState()
    const [pname,setPName]=useState()
    const [pprice,setPPrice]=useState()
    const [oprice,setOPrice]=useState()
    const [ppicname,setPPicName]=useState()
    const [pcatgid,setPCatgId]=useState()
    const [pcatglist,setPCatgList]=useState([])
    const [image,setImage]=useState({preview:"",data:""})
    const [status,setStatus]=useState()
    const [plist,setPList]=useState([])
    var cname=""
    var catgname=""

    var vendorid=props.data==undefined?0:props.data

    const handlePIdText=(e)=>{
        setPId(e.target.value)
    }
    const handlePNameText=(e)=>{
        setPName(e.target.value)
    }
    const handlePPriceText=(e)=>{
        setPPrice(e.target.value)
    }
    const handleOPriceText=(e)=>{
        setOPrice(e.target.value)
    }
    const handlePCatgSelect=(e)=>{
        setPCatgId(e.target.value)
    } 
    
    useEffect(()=>{
        var vendorid=props.data==undefined?0:props.data
        alert("Vid="+vendorid)
        axios.get('http://localhost:9669/product/getmaxpid').then(res=>{
            setPId(res.data.length+1)
        }).catch(err=>{
            alert(err)
        })
        axios.get("http://localhost:9669/productcatg/show").then(res=>{
            setPCatgList(res.data)
        }).catch(err=>{
            alert(err)
        })
    },[])

    const handleSaveButton=()=>{

        var obj={
            pid:pid,
            pname:pname,
            pprice:pprice,
            oprice:oprice,
            ppicname:ppicname,
            pcatgid:pcatgid,
            vid:vendorid,
            status:"Active"
        }
        axios.post("http://localhost:9669/product/saveproduct/",obj).then(res=>{
            alert("Product Saved")
        }).catch(err=>{
            alert(err)
        })
    }

    const handleShowButton=()=>{
        axios.get("http://localhost:9669/product/showproductbyvendor/"+vendorid).then(res=>{
            setPList(res.data)
        }).catch(err=>{
            alert(err)
        })
    }

    //browse and save image code
    const handleSubmit = async(e)=>{
        e.preventDefault()
        let formData=new FormData()
        formData.append('file',image.data)
        const response=await fetch("http://localhost:9669/product/saveproductimage",{
            method:"POST",
            body:formData
        })
        if(response){
            if(response.statusText==='ok')
            {
                setStatus("File Uploaded Successfully")
            }
            else{
                setStatus("Failed to Upload File")
            }
        }
    }

    const handleFileChange=(e)=>{
        const img={
            preview:URL.createObjectURL(e.target.files[0]),
            data:e.target.files[0]
        }
        setImage(img)
        setPPicName(e.target.files[0].name)
    }

    const handleNewButton=()=>{
        axios.get("http://localhost:9669/product/getmaxpid").then(res=>{
            setPId(res.data.length+1)
            setPName("")
            setPCatgId("")
            setPPrice("")
            setOPrice("")
            setPPicName("")
            setImage("")
        }).catch(err=>{
            alert(err)
        })
    }

    return(


      <div className={styles.vendorContainer}>
      <p className={styles.listTitle}>Vendor Id {vendorid}</p>
      <h2 className={styles.formTitle}>PRODUCT FORM</h2>
    
      <div className={styles.productForm}>
        <table className={styles.productFormTable}>
          <tbody>
            <tr>
              <td>Product Id</td>
              <td>{pid}</td>
            </tr>
            <tr>
              <td>Product Name</td>
              <td><input type="text" onChange={handlePNameText} value={pname} className={styles.formInput} /></td>
            </tr>
            <tr>
              <td>Price</td>
              <td><input type="number" onChange={handlePPriceText} value={pprice} className={styles.formInput} /></td>
            </tr>
            <tr>
              <td>Offer Price</td>
              <td><input type="number" onChange={handleOPriceText} value={oprice} className={styles.formInput} /></td>
            </tr>
            <tr>
              <td>Select Photo</td>
              <td>
                <input type="file" onChange={handleFileChange} />
                <img src={image.preview} width={100} height={100} alt="" className={styles.previewImage} />
              </td>
            </tr>
            <tr>
              <td>Upload Photo</td>
              <td><button className={styles.vendorButton} onClick={handleSubmit}>Upload</button></td>
            </tr>
            <tr>
              <td>Category</td>
              <td>
                <select onClick={handlePCatgSelect} className={styles.formInput}>
                  {pcatglist.map(item => (
                    <option key={item.PCatgId} value={item.PCatgId}>{item.PCatgName}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <button className={styles.vendorButton} onClick={handleNewButton}>New</button>
                <button className={styles.vendorButton} onClick={handleSaveButton}>Save</button>
                <button className={styles.vendorButton} onClick={handleShowButton}>Show</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
      <h2 className={styles.listTitle}>PRODUCT LIST</h2>
    
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>SNO</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Offer Price</th>
            <th>Category Name</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {plist.map((item, index) => {
            let cname = "";
            pcatglist.forEach(citem => {
              if (item.pcatgid === citem.PCatgId) cname = citem.PCatgName;
            });
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.pid}</td>
                <td>{item.pname}</td>
                <td>{item.pprice}</td>
                <td>{item.oprice}</td>
                <td>{cname}</td>
                <td>
                  <img src={`http://localhost:9669/product/getproductimage/${item.ppicname}`} alt="Product" className={styles.productImage} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    
    )
}

export default Product;