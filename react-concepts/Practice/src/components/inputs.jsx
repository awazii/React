import React from 'react'
import { useState } from 'react'
const Inputs = () => {
    const [details, setdetails] = useState({})
    function updateinput(e) {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }
    function displayinput() {
        alert(`Your name is ${details.name} 
                Your Age is ${details.age}
               Your martail status is ${details.married?"Married":"Single"}
                Your Email is ${details.email}
               Your password is ${details.password}
               Your Phone Number is ${details.number}
            `)
    }
    return (
        <div className='inputs'>
            <h2>Fill the Inputs</h2>
            <div className='inputscontainer'>
                <input type="text" name="name" placeholder='Enter your name' value={details?.name} onChange={updateinput} />
                 <input type="number" name="age" value={details?.age} onChange={(e) => {
                    e.target.value = e.target.value.slice(0, 2)
                    updateinput(e)
                }} placeholder='Enter your Age' />
                <label > <input style={{width:"30px"}} type="checkbox"  
                checked={details?.married } name="married" onChange={(e)=>{ setdetails({...details, married: e.target.checked })}
} />Are you married?</label>
                <input type="email" name="email" placeholder='Enter your email' value={details?.email} onChange={updateinput} />
                <input type="password" name="password" value={details?.password} placeholder='Enter your password' onChange={updateinput} />
                <input type="number" value={details?.number} name="number" placeholder='Enter your Number' onChange={updateinput} />

            </div>
            <button className='submitbtn' onClick={displayinput}>Submit</button>
        </div>
    )
}

export default Inputs
