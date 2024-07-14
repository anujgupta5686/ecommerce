import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { persistor } from "@/Redux/store";
import logo from "../../assets/logo.svg";
import { Button } from "../ui/button";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { CgMenuGridR } from "react-icons/cg";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Header = () => {
  const tokenData = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const [token, setToken] = useState(tokenData);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    persistor.purge();
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const tokenExists = localStorage.getItem("token");
    setToken(tokenExists);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleLogout]);

  return (
    <div className=" bg-white sticky top-0 z-50 flex flex-col md:flex-row justify-between px-5 lg:px-12 items-center h-[72px] py-2 md:py-5">
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
        <Link to="/">
          <img src={logo} height={100} width={100} loading="lazy" alt="Logo" />
        </Link>
        {windowWidth <= 768 && (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="p-1 text-2xl md:hidden">
                <RxHamburgerMenu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-1 w-[250px]">
              <div className="flex flex-col justify-between h-full pr-2 mt-10">
                <div className="flex flex-col items-start mb-4">
                  <div className="flex items-center bg-white rounded-md px-2 py-1 w-full max-w-lg mb-4 border">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="bg-transparent outline-none text-black placeholder-gray-500 px-2 py-1 w-full"
                    />
                    <button className="ml-2 text-blue-900 flex items-center gap-2">
                      <IoSearch className="text-blue-900" />
                      <span className="hidden sm:inline">Search</span>
                    </button>
                  </div>
                  {token ? (
                    <>
                      <Link
                        to="/shipping-cart"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center p-3 text-sm font-medium text-center rounded-full">
                          <FaShoppingCart className="text-blue-300" />
                          <div className="ml-2">Shopping Cart</div>
                        </div>
                      </Link>
                      <Link to="/my-account" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center p-3 text-sm font-medium text-center rounded-full">
                          <Avatar>
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="ml-2">
                            <p className="text-neutral-100">Anuj Kumar Gupta</p>
                            <p className="text-neutral-400 text-sm">Admin</p>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full p-3 text-sm font-medium text-center rounded-full"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button size="sm" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsOpen(false)}>
                        <Button size="sm" variant="outline" className="w-full">
                          Signup
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      {/* Search Bar Section for larger screens */}
      <div className="hidden md:flex flex-grow justify-center mt-3 md:mt-0">
        <div className="flex items-center bg-white rounded-md px-2 py-1 w-full max-w-lg border">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none text-black placeholder-gray-500 px-2 py-1 w-full"
          />
          <button className="ml-2 text-blue-900 flex items-center gap-2">
            <IoSearch className="text-blue-900" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 mt-3 md:mt-0">
        {token ? (
          <>
            <Link to={"/shipping-cart"}>
              <button className="relative inline-flex items-center p-3 text-sm font-medium text-center rounded-full">
                <FaShoppingCart className="text-blue-300" />
                <div className="absolute inline-flex items-center justify-center text-xs font-bold text-black bg-blue-300 rounded-full right-0 top-2 md:top-3">
                  12
                </div>
              </button>
            </Link>

            <div className="profile lg:px-1 shadow-lg border border-blue-300 rounded-full flex items-center my-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-4 justify-start items-center sm:p-1 cursor-pointer">
                    <span>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </span>

                    <div className="hidden md:flex flex-col">
                      <div className="text-neutral-100 text-sm lg:text-base font-medium min-w-[150px] xl:min-w-[180px]">
                        <p>Anuj Kumar Gupta</p>
                      </div>
                      <div className="text-neutral-400 text-sm lg:text-base font-normal capitalize">
                        <p>Admin</p>
                      </div>
                    </div>

                    <span className="hidden md:block">
                      <IoMdArrowDropdown className="text-xl text-blue-300" />
                    </span>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="mt-1 border mr-1 min-w-[150px] md:min-w-[200px] xl:min-w-[250px]">
                  <DropdownMenuItem onClick={() => navigate("/my-account")}>
                    <DropdownMenuLabel className="font-semibold cursor-pointer">
                      My Account
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <DropdownMenuLabel className="font-semibold cursor-pointer">
                      Log out
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" variant="outline">
                Signup
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
