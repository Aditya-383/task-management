import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

  const Sidebar=()=>{

    const navigate = useNavigate(); 
    const [close, setClose] = useState(true);

    

    useEffect(() => {
      const handleResize = () => {
        setClose(window.innerWidth >= 1024);
      }
  
      window.addEventListener('resize', handleResize);

      handleResize();
  
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
    const handlePage = (page) => {
      switch (page) {
        case "home": navigate("/home");
          break;
        case "allprojects": navigate("/allprojects");
          break;
        case "createproject": navigate("/createproject");
          break;
        case "allusers": navigate("/allusers");
          break;
        case "createuser": navigate("/createuser");
          break;
        default:
          localStorage.removeItem('role');
          localStorage.removeItem('token');
          navigate("/");
      }
    }

      const handleClose=()=>{
        setClose(!close)
      }
   


  return (
    <div className="bg-[#acc7df] text-[#1d3557] p-12 shadow-[#acc7df] border-[#acc7df] w-[100vw] lg:w-[300px] rounded-tr-[7px] ">
      <h2 className="text-[24px] font-bold "> Admin Dashboard</h2>
      {close ? (
    <button
      onClick={handleClose}
      className="absolute top-4 right-4 lg:hidden text-[20px] font-bold text-red-900"
    >
      x
    </button>
  ) : (
    <button
      onClick={handleClose}
      className="absolute top-4 right-4 lg:hidden text-[20px] font-bold text-green-950"
    >
      +
    </button>
  )}
      {close && <div className="pt-10  h-auto lg:h-screen">
      <nav className="flex flex-col gap-8 place-items-start">
        <button onClick={() => handlePage("home")} className="flex items-start hover:bg-[#dcecf4] cursor-pointer">  Home
        </button>

        <button onClick={() => handlePage("createproject")} className="flex items-start hover:bg-[#dcecf4] text-[17px]  cursor-pointer"> Create Project
        </button>

        <button onClick={() => handlePage("allprojects")} className="flex items-start hover:bg-[#dcecf4]   cursor-pointer" > ALL Projects
        </button>



           <button onClick={() => handlePage("allusers")} className="flex items-start hover:bg-[#dcecf4]  cursor-pointer"> Get All Users
        </button>

           <button onClick={() => handlePage("createuser")} className="flex items-start hover:bg-[#dcecf4]  cursor-pointer" > Create User
        </button>
        
        <button onClick={() => handlePage("logout")} className="flex items-start gap-2  rounded hover:bg-[#dcecf4]  hover:w-30 cursor-pointer"> Logout
        </button>
      </nav>


      </div>}
    
    </div>
  );
};

export default Sidebar;
