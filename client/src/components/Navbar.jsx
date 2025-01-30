import React from 'react'
import { Link } from "react-router-dom";
import logo from "../../public/logo iiitm 1.png"
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin , FaFacebook} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  return (
    <nav className=" w-full flex flex-col gap-4 pt-4">
        <div className='flex items-center justify-between px-12 w-full'>
          <div className="">
            <h1 className='font-extrabold text-3xl heading'>ALUMNI NEXUS</h1>
            <p className='pl-8'>a digital hub for</p>
            <p className='pl-16'>ALUMNI Networking...</p>
          </div>
          <div className='-px-56'>
            <img src={logo} alt="" />
          </div>
          <div className='flex gap-2 justify-center'>
            <p>Lets Connect</p>
            <div className='flex justify-center items-center gap-2'>
            <FaInstagram />
            <FaLinkedin/>
            <FaFacebook/>
            </div>
          </div>
        </div>
      {/* <h1 className="text-xl font-bold">ALUMNI NEXUS</h1> */}
      <div className=" bg-[#00016A] text-white p-4 flex gap-8 w-full justify-left items-center px-16">
        <GiHamburgerMenu/>
        <Link to="/" className="hover:underline font-semibold">Home</Link>
        <Link to="/events" className="hover:underline font-semibold">Events</Link>
        <Link to="/about" className="hover:underline font-semibold">About</Link>
        <Link to="/updates" className="hover:underline font-semibold">Updates</Link>
        <Link to="/newsletter" className="hover:underline font-semibold">Newsletter</Link>
      </div>
    </nav>
  )
}

export default Navbar
