import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../Context/authContext/AuthContextProvider'
import Sidebar, { SidebarItems } from '../Component/Sidebar';

// icons-------------------------------
import { MdDashboard } from "react-icons/md";
import { IoFolderSharp } from "react-icons/io5";
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {  
  return (
    <>
      <section className='flex'>
        <Sidebar>
          <NavLink to={"profile"}>
          <SidebarItems icons={<MdDashboard size={20}/>} text="Dashboard" active/></NavLink>
          <NavLink to={"folders"} >
          <SidebarItems icons={<IoFolderSharp size={20}/>} text="Folders"/></NavLink>
        </Sidebar>
          <div className='container p-2 bg-gray-100'>
            <Outlet/>
          </div>
          <div>

          </div>
      </section>      
    </>
  )
}

export default Dashboard