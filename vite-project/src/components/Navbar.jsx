import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import supabase from "../supabase-clients";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <nav className="w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1
        className="text-lg font-bold cursor-pointer hover:text-gray-300"
        onClick={() => navigate("/")}
      >
        TODO
      </h1>
      <button onClick={handleSignOut} className="hover:text-gray-300">
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
