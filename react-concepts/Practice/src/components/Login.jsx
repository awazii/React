import React ,{useContext} from 'react'
import { auth } from "../App"
const Login = () => {
    const setauth = useContext(auth)
    function login() {
   if (setauth.user==="Awazii logged in !") {
        alert("User is already logged in!")
        return;
    }
  setauth.setuser("logging in !!!")
           setTimeout(() => {
               setauth.authvalue.login()
           }, 3000);
}
  function logout() {
    if (setauth.user==="No user logged in yet!") {
        alert("No user is logged in !")
        return;
    }
           setauth.setuser("logging out !!!")
           setTimeout(() => {
               setauth.authvalue.logout()
           }, 3000);
  }
  return (
    <div>
      <h1>Login Page</h1>
      <h1 className="Title">{setauth.user}</h1>
        <button onClick={login} className='bg-blue-500 p-2 mb-2 rounded-md text-white'>Log in</button>
        <button className='border p-2 rounded-md ml-5' onClick={logout}>Log out</button>
    </div>
  )
}

export default Login
