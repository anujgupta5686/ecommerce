import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      {/* <Header /> */}
      <div className="flex w-full h-[90%] md:h-[91%] lg:h-[92%]">
        <Sidebar />
        <div className="bg-gray-200 w-full md:p-2 xl:p-4 h-[100%] overflow-scroll scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
