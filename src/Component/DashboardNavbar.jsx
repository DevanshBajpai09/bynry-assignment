"use client";

import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button"

import { useNavigate } from "react-router-dom";

const DashboardNavbar = ({ onSearch }) => {
  const navigate = useNavigate();



  return (
    <div className="flex items-center justify-between py-4 px-10 bg-white shadow-2xl ">
      {/* Logo */}
      <a href="/signup" className="flex items-center font-bold text-3xl  text-black">
        Creating<span className="text-blue-500">User</span>
      </a>

      {/* Search Bar */}
      
      

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <Button onClick={() => navigate('/')} className="flex cursor-pointer items-center gap-2 bg-black text-white rounded-none px-5 py-2 transition-all">
          Logout <IoIosArrowForward />
        </Button>
        <Button onClick={() => navigate('/component/admin')} className="flex cursor-pointer items-center gap-2 bg-black text-white rounded-none px-5 py-2 transition-all">
          Admin <IoIosArrowForward />
        </Button>
      </div>
      
    </div>
  );
};

export default DashboardNavbar;
