import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../adminSideBar";

const CreateProject = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedUser, setAssignedUser] = useState([])
  const [selected, setSelected] = useState(false);
  const [userName, setUserName] = useState("")
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  console.log("assignedUser", assignedUser)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwt = localStorage.getItem("token")
        console.log("jwt", jwt);
        const response = await axios.get(
          "http://localhost:5000/api/user/getAllUser/",
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        )

        const list = response.data.map((user) => ({
          value: user._id, name: `${user.name}`,
        }))
        console.log("response", list)
        setUsers(list)
      } catch (error) {
        console.error("error", error)
      }
    }

    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/project/createProject",
        {
          projectTitle,
            description,
            assignedUser,
           startDate,
            endDate,
          },
         {
          headers: { Authorization: `Bearer ${token}` },
         }
      );

      setProjectTitle("");
       setDescription("");
       setAssignedUser([]);
       setUserName("");
      setStartDate("");
      setEndDate("");

        console.log("response", response);
      alert("Project created!");
    } catch (error) {
      alert("project creation failed!")
      console.error("error:", error);
    }
  }

  const handleUserChange = (event) => {
    setSelected(true);

        const currentUser = Array.from(event.target.selectedOptions,(option) => option.value  );
      const currentUserNames = Array.from( event.target.selectedOptions,(option) => option.text );

      setUserName(currentUserNames);
    setAssignedUser((prevUser) => {
      const updatedUser = [...prevUser, ...currentUser];
      return Array.from(new Set(updatedUser));
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-10 ">
      <Sidebar />

<div className="p-4 w-full pt-10">

      <div className=" max-w-4xl mx-auto p-6  bg-white shadow-md shadow-[#1d3557] mt-10 rounded-[15px]">
        <h2 className="text-[32px] md:text-[44px] text-[#1d3557] text-center font-[500]">
          Create New Project
        </h2>
        <div className="border-2 border-[#1d3557] "></div>

        <form onSubmit={handleSubmit} className="grid ">
          <div>
            <label htmlFor="projectTitle"  className="text-[#1d3557] block font-[500]"
            >
              Project Name
            </label>
            <input type="text"  value={projectTitle}  onChange={(e) => setProjectTitle(e.target.value)}  placeholder="Project name...."
              className="w-full p-4 text-[#1d3557] border border-[#1d3557] rounded"
              required
            />
          </div>

          <div>
            <label  htmlFor="projectDescription"   className="text-[#1d3557] block font-[500]"
            >
              Project Description
            </label>
            <textarea  value={description}   name="projectDescription"   placeholder="Project Description...." onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 text-[#1d3557] border   border-[#1d3557] rounded"
            />
          </div>

          <div>
            <label className="text-[#1d3557] block font-[500]">
              Users List
            </label>
            <select  multiple={true}  value={assignedUser}   onChange={handleUserChange}  className="mt-2 border p-2 rounded w-full h-40 overflow-y-auto"
            >
              {users.map((user) => (
                <option key={user.value}  value={user.value} className="bg-white text-black hover:bg-purple-400 cursor-pointer py-1"
                >
                  {user.name}
                </option>
              ))}
            </select>
            {selected && (
              <p className="text-blue-600 text-[11px] pt-1">
                {/* {userName.join(", ")} selected */}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label  htmlFor="startDate"  className="block text-[18px] font-medium text-[#1d3557]"
              >
                Start Date
              </label>
              <input  type="date"  id="startDate"  value={startDate}  onChange={(e) => setStartDate(e.target.value)}  className="w-full p-4 border border-blue-300 rounded-[15px] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-[18px] font-medium text-[#1d3557]"
              >
                End Date
              </label>
              <input type="date"    id="endDate"     value={endDate}     onChange={(e) => setEndDate(e.target.value)}  className="w-full p-4 border border-blue-300 rounded-[15px] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center pt-5">
            <button  type="submit"       className="text-white bg-[#1d3557] cursor-pointer px-6 py-2 rounded-full w-full sm:w-auto text-center hover:bg-[#16304d] transition"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
</div>
    </div>
  );
};

export default CreateProject;
