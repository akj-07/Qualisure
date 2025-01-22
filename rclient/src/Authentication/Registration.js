import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../Context/authContext/AuthContextProvider';
import { FcGoogle } from "react-icons/fc";
import { database } from '../Firebase/Firebase';
import { ref, set } from 'firebase/database';

const Registration = () => {

  // const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")

  const { signUp, googleSignIn } = useUserAuth();

  const navi = useNavigate();


  const handleSubmit = async (event) =>{
    event.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill all the fields");
    }
    if(password === confirmPassword){
      try {
        const userCredentials = await signUp(email, password);
        const user = userCredentials.user;

        // Set user data in RealTime Database
        const uid = user.uid;
        set(ref(database, 'users/' + uid), {
          userName:"",
          email: email,
          profile_picture : "",
          phoneNumber : ""
        });
        setError(null);
        navi("/home");
      } catch (err) {
        setError(err.message);
      }
    }
    else{
      setError("Password doesn't match");
    }
  }

  const handleGoogle = async (e)=>{
    e.preventDefault();
    try {
      const userCredentials = await googleSignIn();
      const user = userCredentials.user;

        // Set user data in RealTime Database
        const uid = user.uid;
        set(ref(database, 'users/' + uid), {
          userName: user.displayName,
          email: user.email,
          profile_picture : user.photoURL,
          phoneNumber: user.phoneNumber
        });
        setError(null);
        console.log(user)
      navi("/home");
    } catch (err) {
      setError(err.message);
    }
  }
  

  return (
  <>
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-full h-20" src="./assets/logo-no-background.png" alt="logo"/>  
          </Link>
          <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Create and account
                  </h1>
                  {error && 
                    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                      <p className="font-bold">Error</p>
                      <p>{error}</p>
                    </div>
                  }

                  <div className="w-full font-medium rounded-lg text-base px-5 text-center flex justify-around items-center">
                        <p>Signin with</p>
                        <button onClick={handleGoogle}  className="flex gap-2 bg-blue-400 px-4 py-2 rounded-md focus:ring-4 focus:outline-none focus:ring-blue-100 hover:shadow-lg hover:scale-[1.02]">
                          <FcGoogle className="text-2xl"/> 
                          <p>Google</p>
                        </button>                        
                    </div>
                    <hr />


                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                          <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e)=>{
                            setEmail(e.target.value);
                          }}
                          placeholder="name@company.com" required/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e)=>{
                            setPassword(e.target.value);
                          }}
                          required/>
                      </div>
                      <div>
                          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                          <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e)=>{
                            setConfirmPassword(e.target.value)
                          }}
                           required/>
                      </div>
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-blue-600 hover:underline dark:text-blue-500" to={'#'}>Terms and Conditions</Link></label>
                          </div>
                      </div>
                      <button type="submit" 
                      className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:shadow-lg hover:scale-[1.02]">Create an account</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account? 
                          <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  </>
)}

export default Registration