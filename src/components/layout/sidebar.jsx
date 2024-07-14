import { useEffect, useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { CgMenuGridR } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { useSelector } from "react-redux";
// import {
//   Dashboard,
//   FiUserPlus,
//   BsCollection,
//   MdOutlineMessage,
// } from "react-icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userDataIni = user?.data?.user?.role;
  const localData = localStorage.getItem("token");
  console.log("localData::", localData);

  const pathName = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth > 768 ? (
        <div
          className={`border-t flex border-r flex-col justify-between h-[90vh] lg:h-[92vh]`}
          style={{
            width: isSidebarOpen ? "280px" : "70px",
            transition: "all 0.3s ease-in-out ",
            overflowX: "hidden",
          }}
        >
          {/* <div className="options mt-8">
            {[1, 2, 3].map((val) => (
              <div
                key={val.id}
                className={`flex justify-start items-center gap-2 my-2 cursor-pointer ${
                  pathName.pathname.includes(val.redirect)
                    ? "bg-blue-900 border-r-4 border-primary"
                    : ""
                } ml-3 px-2 pl-3 rounded-l-3xl`}
                onClick={() => navigate(val.redirect)}
              >
                <span
                  className={`text-lg text-white xl:text-xl py-3 ${
                    pathName.pathname.includes(val.redirect)
                      ? "filter-primary"
                      : ""
                  }`}
                >
                  {val.icon}
                </span>
                {isSidebarOpen && (
                  <div
                    className={`text-sm text-white xl:text-md 2xl:text-lg font-medium inline-flex flex-nowrap whitespace-nowrap ${
                      pathName.pathname.includes(val.redirect)
                        ? "font-semibold"
                        : "text-stone-900 hover:text-primary"
                    }`}
                  >
                    {val.label}
                  </div>
                )}
              </div>
            ))}
          </div> */}
          <div
            className="action pl-5"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            {isSidebarOpen ? (
              <AiOutlineMenuFold className="text-lg xl:text-2xl hover:text-gray-600 mb-6 cursor-pointer" />
            ) : (
              <AiOutlineMenuUnfold className="text-lg xl:text-2xl hover:text-gray-600 mb-6 cursor-pointer" />
            )}
          </div>
        </div>
      ) : (
        // mobile
        <div className="flex">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="fixed bottom-3 left-5 z-50 p-1 text-2xl"
              >
                <CgMenuGridR />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-1 w-[250px]">
              <div className="flex flex-col justify-between h-full pr-2">
                {/* <div className="options m-1 mt-8">
                  {[1, 2, 3].map((val) => (
                    <div
                      key={val.id}
                      className="flex justify-start items-center gap-2 my-2 cursor-pointer"
                      onClick={() => {
                        navigate(val.redirect);
                        setIsOpen(false);
                      }}
                    >
                      {pathName.pathname.includes(val.redirect) ? (
                        <div className="h-12 w-1 rounded-tr-xl rounded-br-xl bg-primary" />
                      ) : (
                        <div className="h-12 w-2" />
                      )}
                      <span
                        className={`text-lg xl:text-xl pl-1 ${
                          pathName.pathname.includes(val.redirect)
                            ? "text-primary shadow-white shadow-md bg-gray-100"
                            : ""
                        }`}
                      >
                        {val.icon}
                      </span>
                      <div
                        className={` text-sm xl:text-md 2xl:text-lg font-[500]  leading-normal ${
                          pathName.pathname.includes(val.redirect)
                            ? "text-primary shadow-md shadow-white"
                            : "text-stone-900"
                        }`}
                      >
                        {val.label}
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
};

export default Sidebar;
