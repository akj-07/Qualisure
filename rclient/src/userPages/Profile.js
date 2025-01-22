import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { useUserAuth } from '../Context/authContext/AuthContextProvider';
import {useNavigate } from "react-router-dom";
import { updateProfile } from 'firebase/auth';
import { ref, set, update } from 'firebase/database';
import { database } from '../Firebase/Firebase';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [error, setError] = useState("");
  const { user } = useUserAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileData, setProfileData] = useState({
    fullName : "",
    email:"",
    photoUrl: ""
  })

  const navigate = useNavigate();

  let name, value;
  const handleChange = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setProfileData({...profileData, [name]:value})
  }

  useEffect(() => {
    if (!user) {
      console.error("no user")
    }else{
      setProfileData({
        fullName : `${user.displayName}`,
        email:`${user.email}`,
        phoneNumber:`${profileData.phoneNumber}` 
      })
    }

    if (alertMsg || error) {
      const timer = setTimeout(() => {
        setAlertMsg("");
        setError("");
      }, 3000);  // Clear message/error after 3 seconds

      // Clean up the timer
      return () => clearTimeout(timer);
    }
    
  }, [user,alertMsg,error]);   


  const handleUpdate = async (e) =>{
    e.preventDefault();
    if (user.displayName === profileData.fullName && user.phoneNumber === phoneNumber && user.email === profileData.email) {
      setError("Already up to date");
    }
    else if (user) {
      updateProfile(user, {displayName:profileData.fullName})
        .then(() => {          
          setAlertMsg("Profile updated successfully");
        })
        .catch((error) => {
          setError(error.message);
        });
        setPhoneNumber(phoneNumber);

        const uid = user.uid;
        update(ref(database, 'users/' + uid), {
          userName: profileData.fullName,
          phoneNumber : phoneNumber
        }).then(() => {          
          setAlertMsg("Profile updated successfully");
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError("No user is currently signed in");
    }
    setEditable(false);
  }
  
  
  



  
  
  return (
    <>
      <section className='bg-slate-100 p-3 rounded-md shadow-lg'>  
        <div className='flex justify-between'>

        {error &&
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md absolute top-2 left-1/2" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>}
          {alertMsg && 
            <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 rounded shadow-md absolute top-2 left-1/2" role="alert">
              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
              <p>{alertMsg}</p>
            </div>
          }
        
          <h1 className='text-xl font-bold p-2'>User Details</h1>      
          <button className='text-lg' onClick={()=>setEditable((prev)=>!prev)}><FaEdit/></button>
        </div>
        <form method='POST' onSubmit={handleUpdate}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">                
                <div>
                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                    <input 
                    type="text" 
                    id="fullName" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-300" 
                    placeholder="Full Name" 
                    name="fullName"
                    disabled={editable? false : true}
                    value={profileData.fullName}
                    onChange={handleChange}
                    required />
                </div>
                <div className='w-full row-span-2 flex justify-center items-center'>
                  <img className='rounded-full w-[150px]' src={user.photoURL} alt="profile_photo" />
                  {editable ?
                  <button className=''>Change Photo</button>
                  :
                  null
                  }
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <PhoneInput
                    country={'in'}
                    value={phoneNumber} 
                    onChange={setPhoneNumber} 
                    disabled={editable? false : true}                    
                    required />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input 
                type="email" 
                id="email" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-300" 
                placeholder="Email"
                name="email"
                disabled={editable? false : true}
                value={profileData.email}
                onChange={handleChange}
                required />
            </div> 
            <div>
              <button className="bg-transparent text-xs hover:bg-[#caf0f8] text-[#03045e] py-2 px-4 border border-[#0077b6] hover:border-transparent rounded mb-3" onClick={()=>{navigate("/reset")}}>Change Password</button>
            </div>
            {editable ?
            <button type="submit" 
            className="text-white right-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:cursor-not-allowed"
            // disabled={editable? false : true}
            >Update</button>:null}
        </form>
      </section>
    </>
  )
}

export default Profile