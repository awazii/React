import React, { useState, useRef } from 'react';
import styles from "../styles/editable.module.css";
const Editable = () => {
    const [editable, seteditable] = useState(null);
    const [title, settitle] = useState("You can change title")
    const  [des, setdes] = useState("You can change description")
    const [newtitle, setnewtitle] = useState(title)
    const  [newdes, setnewdes] = useState(des)
    const  [img, setimg] = useState("https://fr.vidnoz.com/img/image-to-video/poster-1.png")
    const imgref = useRef()
 function edit() {
    seteditable(true)
 }
 function change() {
     seteditable(null)
     settitle(newtitle)
     setdes(newdes)
     console.log(imgref.current?.src)
     setimg(imgref.current?.src ||imgref.current )
 }
 function imagechanger(e) {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(e)=>{
             imgref.current=e.target.result
        }
    }
 }
    return (
        <>
            <div className={`${styles.editablecard}`}>
                <div className={`${styles.imgcontainer}`}>
                    <img ref={imgref} src={img} alt="" />
                </div>
                {!editable ? <h2>{title}</h2> : <input type="text" placeholder={newtitle} onChange={(e)=>{setnewtitle(e.target.value)}} />}
                {!editable ? <p>{des}</p> : <input type="text" placeholder={newdes} onChange={(e)=>{setnewdes(e.target.value)}}/>}
                {!editable?"":<input type="file"   accept="image/*"  onChange={(e)=>{
                        imagechanger(e)
                }} />}
                <div className={`${styles.controls}`}>
                    {editable ? 
                        <>
                            <button onClick={()=>(seteditable(null))} className={`${styles.editablebtn}`}>Cancel</button>
                            <button onClick={change} className={`${styles.editablebtn}`}>Confirm</button>
                        </>
                     : (
                        <button onClick={edit} className={`${styles.editablebtn}`}>Edit</button>
                    )}
                </div>
            </div>
        </>
    )
}
export default Editable;
