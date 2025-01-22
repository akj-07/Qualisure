import React, {useEffect, useRef, useState} from 'react'
import Navbar from './Navbar'
import { MdCancel } from "react-icons/md";
import { FaCheck } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';
import { storage } from '../Firebase/Firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";
import { database } from '../Firebase/Firebase';


const Landing = () => {

  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isAlert, setIsAlert] = useState("");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('')


  const inputRef = useRef(null);

  const navi = useNavigate();

  

// file validation------------------------------------------------------------------------
  const isValidFileType = (file) => {
    // List of allowed file extensions
    const allowedExtensions = ['.pdf', '.docx', '.txt', '.jpeg', '.jpg', '.png', '.doc'];
    // Get the file extension
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    // Check if the file extension is in the allowedExtensions list
    return allowedExtensions.includes(extension);
  };

  

  const handleChange = (e) =>{
    const file = e.target.files[0]
    if (file && isValidFileType(file)) {
      setFiles(file);
    }
    else{
      alert("Invalid file type. Please select a file with .pdf, .docx, or .txt extension.")
    }
  }




  const handleDrop =(e)=>{
    e.preventDefault();
    const file = e.dataTransfer.files
    if (file && isValidFileType(file[0])) {
      setFiles(file);
    }
    else{
      alert("Invalid file type. Please select a file with .pdf, .docx, or .txt extension.")
    }
        
  }
  const handleDragOver =(e)=>{
    e.preventDefault();
    
  }
  
  const handleClick = (e) =>{
    e.preventDefault();
    if (files.name !== undefined) {
      setLoading(true)
      const imgRef = ref(storage, `${files.name}`);
      uploadBytes(imgRef, files).then(()=>{
        alert("file uploaded");
        navi("/result");
      }).catch((err)=>{
        console.log(err)
      })
      setLoading(false)
    }
    else{
      setLoading(true)
      const imgRef = ref(storage, `${files[0].name}`);
      uploadBytes(imgRef, files[0]).then(()=>{
        alert("file uploaded");
        navi("/result");
      }).catch((err)=>{
        console.log(err)
      })
      setLoading(false)
    }    
  }

  // const handleClick = (e) =>{
  //   e.preventDefault();
  // }




  return (
    <>
    <Navbar/>
    <main className="relative mx-auto -mt-[6.50rem] overflow-hidden h-screen pt-[5.75rem]">
        <img alt='landing_bg' src="./assets/62620.jpg" className="absolute h-screen -top-[1rem] -ml-[120rem] max-w-none w-[200rem] -z-10 sm:-ml-[100.5rem] left-1/3"/>

        {isOffline?
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Holy smokes!</strong>
          <span className="block sm:inline">{isAlert}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>: null
        }

        <section className="relative w-full max-w-container px-4 sm:px-6 lg:px-8 h-[35rem] sm:h-[28em] mt-[10rem] flex flex-col items-center">
        {loading?
        <div>
          Loading...................
        </div>:null
        }
          <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            Welcome to Qualisure
          </h1>
          <h2 className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
            At Qualisure, we understand the importance of flawless documents in making a lasting impression. Whether it's a business proposal, academic paper, or any other document, our Document Quality Check services are designed to elevate your content to the highest standards.
          </h2>
          <br />
          <div className="md:w-1/3 w-1/2">    
          {/* <progress value={progress} max="100"/> */}
          {!files?        
            <div className="flex items-center justify-center w-full shadow-xl">
                <label htmlFor='dropzone-file' onDrop={handleDrop} onDragOver={handleDragOver}  className="flex flex-col items-center justify-center w-full border-2 border-cyan-600 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">'txt', 'pdf', 'png', 'jpg', 'jpeg',
                          'doc', 'docx'</p>
                    </div>
                    <input id="dropzone-file" type="file" accept=".pdf,.docx,.txt,.jpeg,.jpg,.png,.doc" ref={inputRef} hidden  onChange={handleChange} />
                    {url && <a href={url} target="_blank" rel="noopener noreferrer">View File</a>}
                </label>
            </div>:
            <div className='flex flex-col items-center justify-around w-full h-[150px] border-2 border-cyan-600 border-dashed shadow-xl bg-[#f2e8cf] p-4 rounded-lg'>
              <p className='font-medium text-lg'>{files.name ? files.name : files[0].name}</p>
              <div className='flex w-full justify-between gap-2'>
                <button className=" bg-[#bc4749] w-full rounded-md mt-2 p-2 font-semibold text-lg shadow-md" onClick={()=>setFiles(null)}>Cancel</button>
                <button className=" bg-[#386641] w-full text-white rounded-md mt-2 p-2 font-semibold text-lg shadow-md" onClick={handleClick}>Submit</button>                
              </div>
            </div>
          }
            
            
          </div>
        </section>

       
        
      </main>
    </>
  )
}

export default Landing