import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import  {FaCarSide, FaClipboardList} from 'react-icons/fa';
import  {AiOutlineAreaChart}from 'react-icons/ai';
import {BsFillPersonLinesFill} from 'react-icons/bs';

import { BellIcon } from "@heroicons/react/24/outline";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();
    function logout() {
      localStorage.removeItem("token")
      router.push("/login")
    }
  return (
    <div ref={ref} className=" fixed w-56 h-full bg-white shadow-sm w-1/4">
      <div className="flex justify-center mt-6 mb-14">
      <p className="text-gray-700 text-3xl mb-16 font-bold">Navitrack</p>
      </div>
      <div className="flex flex-col">
        <Link href="/MapPage">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/dashboard"
                ? "bg-brand bg-darkBrand"
                : "text-dark hover:bg-brand hover:text-dark"
            }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link href="/notifs">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/notifs"
                ? "bg-brand bg-darkBrand"
                : "text-dark hover:bg-brand hover:text-dark"
            }`}
          >
            <div className="mr-2">
              <BellIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Notifications</p>
            </div>
          </div>
        </Link>
        <Link href="/vehicles">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/vehicles"
                ? "bg-brand bg-darkBrand"
                : "text-dark hover:bg-brand hover:text-dark"
            }`}
          >
            <div className="mr-2">
              <FaCarSide className="h-5 w-5" />
            </div>
            <div>
              <p>List of vehicles</p>
            </div>
          </div>
        </Link>
        <Link href="/chauffeurs">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/chauffeurs"
                ? "bg-brand bg-darkBrand"
                : "text-dark hover:bg-brand hover:text-dark"
            }`}
          >
            <div className="mr-2">
              <BsFillPersonLinesFill className="h-5 w-5" />
            </div>
            <div>
              <p>List of drivers</p>
            </div>
          </div>
        </Link>
        <Link href="/missions">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/missions"
                ? "bg-brand bg-darkBrand"
                : "text-dark hover:bg-brand hover:text-dark"
            }`}
          >
            <div className="mr-2">
              <FaClipboardList className="h-5 w-5" />
            </div>
            <div>
              <p>List of missions</p>
            </div>
          </div>
        </Link>

        <Link href="/Chart">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/Chart"
                ? "bg-brand bg-darkBrand"
                : "text-dark hover:bg-brand hover:text-dark"
            }`}
          >
            <div className="mr-2">
              <AiOutlineAreaChart className="h-5 w-5" />
            </div>
            <div>
              <p>score </p>
            </div>
          </div>
        </Link>

        <Link href="/MapPage">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/Chart"
                ? "bg-brand bg-darkBrand"
                : "text-dark hover:bg-brand hover:text-dark"
            }`}
          >
            <div className="mr-2">
              <AiOutlineAreaChart className="h-5 w-5" />
            </div>
            <div>
              <p>maps </p>
            </div>
          </div>
        </Link>
        <Link href="/login">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/login"
                ? "bg-brand bg-darkBrand"
                : "text-dark hover:bg-brand hover:text-dark"
            }`}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p><button onClick={logout}>Log out</button></p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
