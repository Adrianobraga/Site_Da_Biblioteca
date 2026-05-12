import React from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
import ContentArea from "./ContentArea";

function Index() {

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-100">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <ContentArea />
          </div>
        </div>
      );
}

export default Index
