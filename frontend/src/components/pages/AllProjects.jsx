import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../adminSideBar";
import { useNavigate } from "react-router-dom";
import { MdClear } from "react-icons/md";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProject, setFilteredProject] = useState();
  const [search, setSearch] = useState();
  const [flag, setFlag] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [createdDate, setCreatedDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const jwt = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/project/allProjects", {
            headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

          setProjects(response.data.project);
         setFilteredProject(response.data.project);
      } catch (error) {
        console.error("Error in projects", error);
      }
    };

    fetchProjects();
  }, [flag]);

  const handleSubmit = (projectId) => {
        navigate(`/projectDetails/${projectId}`);
  }

  const handleDelete = async (projectId) => {
    try {
      const jwt = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/project/delete/${projectId}`, {
           headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
          setFlag(!flag);
    } catch (err) {
      console.log("error:", err.message);
    }
  }

  const handleUpdate = (projectId) => {
    navigate(`/updateProject`,
       { state: { projectId } });
  }

  const handleInput = (e) => {
      setSearch(e.target.value);
  }

  const filterProject = (text) => {
    text = text.trim();
    if (!text) {
      setFilteredProject(projects);
          setFilterActive(false);
      return;
    }

    const filtered = projects.filter((project) =>
      project.projectTitle?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProject(filtered);
    setFilterActive(true);
  }

  const handleSearch = () => {
    filterProject(search);
  }

  const handleClearFilter = () => {
    setFilteredProject(projects);
    setFilterActive(false);
  }

  const handleCreatedDate = (e) => {
    const date = e.target.value;
    const filtered = projects.filter((project) => {
      const projectDate = new Date(project.startDate).toISOString().split("T")[0];
      return projectDate === date;
    });

    setFilteredProject(filtered);
    setFilterActive(true);
  }

  const handleEndDate = (e) => {
    const date = e.target.value;
    const filtered = projects.filter((project) => {
      const projectDate = new Date(project.endDate).toISOString().split("T")[0];
      return projectDate === date;
    });

    setFilteredProject(filtered);
    setFilterActive(true);
  }

  return (
    <div className="flex  flex-col lg:flex-row h-screen    w-full bg-white  ">
      <Sidebar />

      <div className="flex-1 px-4 sm:px-6 max-w-screen    lg:px-12 py-6  ">
            <h1 className="text-center text-3xl md:text-4xl font-bold text-[#1d3557] ">

          All Projects
        </h1>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3    gap-4 py-4  ">
         
          <div className="flex   border-indigo-900 rounded-[30px] bg-white shadow-sm py-0 items-center">
            <input  type="text" value={search}  onChange={handleInput} placeholder="Search by project name" className=" w-full outline-none   text-[12px] focus:ring-0 text-gray-700 px-2" />
            <button onClick={handleSearch} className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white py-3.5 px-4 outline-none rounded-lg text-sm" >
              Search
            </button>
          </div>

        
          <div className="flex flex-col">
            <input    type="date" value={createdDate} onChange={handleCreatedDate}  className="border border-[#1d3557] rounded px-2 py-1    text-[12px] w-full"
            />
            <label className="text-[#1d3557] text-sm font-[500]  ">Created Date</label>
          </div>

       
          <div className="flex flex-col">
            <input  type="date" value={endDate}  onChange={handleEndDate} className="border border-[#1d3557] rounded   px-2 py-1 text-[12px] w-full" />
            <label className="text-[#1d3557] font-[500] text-[14px] ">End Date</label>
          </div>


          {filterActive && (
            <div className="flex items-end">
              <button    onClick={handleClearFilter}     className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm  flex items-center justify-center gap-2"
              > <MdClear className="text-lg" />
                Clear
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {filteredProject && filteredProject.map((project) => (
            <div key={project._id} className="bg-white rounded-[30px] h-auto shadow-lg p-4   border border-pink-200">
              <h2 className="text-xl font-semibold text-pink-700 pb-2 underline">     {project.projectTitle}
              </h2>
                 <p className="text-[#80a6db] pb-3">{project.description}</p>

              <h3 className="font-medium text-[#1d3557] pb-1">Assigned Users:</h3>
              <div className="mb-4 pb-5">
                <select className="w-full bg-white border border-[#1d3557] rounded p-2 text-sm">
                  <option disabled>List of assigned users</option>
                  {project.assignedUser.length > 0 ? (  project.assignedUser.map((user) => (
                      <option key={user._id}>{user.name}</option>
                    ))
                  ) : (
                   <></>
                  )}
                </select>
              </div>

              <p>Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(project.endDate).toLocaleDateString()}</p>


              <div className="flex flex-col sm:flex-row text-[#1d3557] sm:justify-between sm:items-center gap-2 pt-4 text-sm font-[500] ">
                <button   onClick={() => handleSubmit(project._id)}  className="text-blue-600 cursor-pointer hover:text-blue-800 transition-transform hover:scale-105"
                >
                  View Details
                </button>
                <button   onClick={() => handleDelete(project._id)}   className="text-green-600 cursor-pointer hover:text-green-800 transition-transform hover:scale-105"
                >
                  Delete
                </button>
                <button    onClick={() => handleUpdate(project._id)}    className="text-amber-600 cursor-pointer hover:text-amber-800 transition-transform hover:scale-105"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
