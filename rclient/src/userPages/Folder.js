import React from 'react';
import { PiFolderSimpleFill } from "react-icons/pi";
import { FiFileText } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { FaFileImage } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom"

const Folder = () => {
  return (
    <>
      <section className='bg-slate-100 h-full overflow-y-auto overflow-x-hidden p-3 rounded-md shadow-lg'>
        <nav className="flex mb-3" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center text-gray-700">
              <Link href="#" className="inline-flex items-center gap-2 text-sm font-medium hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <IoHome/>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <div className="flex items-center text-gray-700">
                <FaChevronRight/>
                <Link href="#" className="ms-1 text-sm font-medium  hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Projects</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center text-gray-700">
                <FaChevronRight/>
                <span className="ms-1 text-sm font-medium md:ms-2 dark:text-gray-400">Image</span>
              </div>
            </li>
          </ol>
        </nav>
        <hr />
        <div className='mt-3 columns-5'>
          <div className='flex flex-col justify-center items-center'>
            <PiFolderSimpleFill className='text-7xl'/>
            <p>Folder 1</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <FiFileText className='text-7xl'/>
            <p>text.txt</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <FaFilePdf className='text-7xl'/>
            <p>pdf2.pdf</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <FaFileImage className='text-7xl'/>
            <p>img.jpeg</p>
          </div>
        </div>
        
      </section>
    </>
  )
}

export default Folder