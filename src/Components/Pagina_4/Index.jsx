import React, { useState } from "react";
import Header from "../Home/Header";
import Sidebar from "../Home/SideBar";


const Agendado = () => {
 
  return (
    <>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex h-screen">
          <Sidebar />
          <main
            className="flex-1 bg-gray-50 p-4 overflow-y-auto"
            style={{ backgroundColor: "#f4e1d2" }}
          >
          </main>
        </div>
      </div>

     
    </>
  );
};

export default Agendado;
