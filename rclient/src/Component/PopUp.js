import React, { useState } from 'react';
import { FaInfoCircle } from "react-icons/fa";
import { useUserAuth } from '../Context/authContext/AuthContextProvider';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const PopUp = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    

    const { resetPassword} = useUserAuth();

    const navi = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await resetPassword(email);
            setSuccess(true)
            console.log(success)
        } catch (err) {
            setError(err.messages);
            console.log(error)
        }
    }
  return (
    <>
        <div className="absolute w-full h-full bg-black bg-opacity-50 backdrop-blur-sm top-0 left-0 flex justify-center items-center">
            <div className="bg-slate-50 w-2/4 rounded-lg p-6 shadow-xl">
                <h1 className="mb-2 text-lg font-bold">Enter Password Reset Email</h1>
                {/* alert box---------------------------------- */}
                {
                    error?
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong class="font-bold">Holy smokes!</strong>
                        <span class="block sm:inline">{error}</span>
                        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>:
                    success ? <div class="bg-sky-100 border-l-4 border-sky-500 text-sky-700 p-4" role="alert">
                                <p class="font-bold flex items-center gap-2"><FaInfoCircle/> Note</p>
                                <p className="ml-6">Password reset link has been send to your email</p>
                            </div> : null
                }                
                

                <form className="space-y-4 md:space-y-6 mt-3" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder="name@company.com"
                        required/>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:shadow-lg hover:scale-[1.02]">Submit</button>
                </form> 
            </div>   
            <button onClick={(e)=>{
                navi("/login");
            }}
            className="absolute right-[40px] top-[40px] text-3xl text-white"
            >
                <IoMdCloseCircleOutline/>
            </button>         
        </div>
    </>
  )
}

export default PopUp