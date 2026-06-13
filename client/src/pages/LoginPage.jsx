import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);


  const{login}=useContext(AuthContext)


  const onSubmitHadler=(event)=>{
    event.preventDefault();

    if(currState==='Sign up' && !isDataSubmitted){
      setIsDataSubmitted(true)
      return;
    }

    login(currState==="Sign up" ? 'signup' : 'login' , {fullName, email, password,
      bio})
  }

  return (
    <div
      className='min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-50 flex items-center
      justify-evenly max-sm:flex-col'
    >

      {/* Left */}
      <img
        src={assets.logo_big}
        alt=""
        className='w-[min(30vw,250px)]'
      />

      {/* Right */}
      <form onSubmit={onSubmitHadler}
         className='border-2 bg-white text-slate-700 border-sky-200 p-6 flex
        flex-col gap-6 rounded-lg shadow-lg'>

        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && 
          <img onClick={()=>setIsDataSubmitted(false)}
            src={assets.arrow_icon}
            alt=""
            className='w-5 cursor-pointer'
          />
          }
        </h2>
        {currState==="Sign up" && !isDataSubmitted &&  (
          <input onChange={(e)=>setFullName(e.target.value)} value={fullName} 
           type="text"  className='p-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400'
          placeholder="Full Name" required/>
        )}
        {!isDataSubmitted && (
          <>

          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' required className='p-2
          border border-sky-200 rounded-md focus:outline-none focus:ring-2
          focus:ring-sky-400'/>

          <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' placeholder='Password' required className='p-2
          border border-sky-200 rounded-md focus:outline-none focus:ring-2
          focus:ring-sky-400'/>
          </>
        )}

        {currState==="Sign up" && isDataSubmitted && (
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-sky-200 rounded-md
          focus:outline-none focus:ring-2 focus:ring-sky-400' placeholder='provide a short bio... 'required></textarea>
        )
        }
        <button type='submit' className='py-3 bg-gradient-to-r from-sky-400 to-sky-500
        text-white rounded-md cursor-pointer hover:from-sky-500 hover:to-sky-600'>
          {currState=== "Sign up" ? "Create Account" : "Login Now"}
        </button>
        <div className='flex items-center gap-2 text-sm text-slate-500
        '>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className='flex flex-col gap-2'>
          {currState=== "Sign up" ? (
            <p className='text-sm text-slate-500'>Already have an account? <span onClick={()=>{setCurrState("Login");setIsDataSubmitted(false)}} className='font-medium text-sky-600 cursor-pointer'>Login here</span></p>
            ): (
              <p className='text-sm text-gray-600'>Create a account <span onClick={()=>setCurrState("Sign up")}className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>
            )}

        </div>
        

      </form>

    </div>
  )
}

export default LoginPage