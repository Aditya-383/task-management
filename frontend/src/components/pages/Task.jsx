import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Task = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [assignedTo, setAssignedTo] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('Pending');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignedUser, setAssignedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const projectId = location.state.projectId;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const jwt = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/project//projectId/${projectId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const list = response.data.project.assignedUser.map((user) => ({
          value: user._id,
          name: user.name,
        }));

        setAssignedUser(list);
      } catch (error) {
        console.error('Error fetching in users:', error);
       
      } 
    };

    fetchUsers();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      taskName,
      taskDescription,
      assignedTo,
      taskStatus,
      startDate,
      endDate,
      projectId,
    }

    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/task/createTask", taskData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      console.log('Task Created:', response.data)

      setTaskName('');
      setTaskDescription('');
      setAssignedTo('')
      setTaskStatus('Pending')
      setStartDate('')
      setEndDate('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUserChange = (event) => {
    const currentUser = Array.from(event.target.selectedOptions, (option) => option.value);
    setAssignedTo((prevUser) => Array.from(new Set([...prevUser, ...currentUser])));

  }

  return (
    <div className="min-h-screen bg-[#c0d9fc] flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-3xl bg-white p-6 md:p-10 rounded-2xl shadow-md">
        <h2 className="text-2xl md:text-3xl text-[#1d3557] font-[500] mb-6 text-center">Create New Task</h2>

       
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskName" className="block text-[#1d3557] font-[500] ">Task Name</label>
            <input  type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="taskDescription" className="block text-[#1d3557] font-[500] ">Description</label>
            <textarea id="taskDescription" value={taskDescription}  onChange={(e) => setTaskDescription(e.target.value)} requiredrows="4"className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-[#1d3557] font-[500] ">Users</label>
            <select multiple value={assignedTo} onChange={handleUserChange}className="w-full p-2 border  border-blue-300 rounded-lg focus:outline-none"
            >
              {assignedUser.map((user) => (
                <option key={user.value} value={user.value}>{user.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-[#1d3557] font-[500] ">Start Date</label>
              <input type="date"  id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2 border border-[#1d3557] rounded-[30px] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-[#1d3557] font-[500] ">End Date</label>
              <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2 border border-[#1d3557] rounded-[30px] focus:outline-none"  />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button type="submit" className="max-w-48  bg-[#1d3557] hover:bg-[#1d3557] text-white py-2 px-2 rounded-lg font-semibold transition duration-200"
            >
              Create Task
            </button>
           
          </div>
        </form>
        <button onClick={()=>{
            navigate(`/projectDetails`)
          }}     className="max-w-auto py-3 px-6   text-[#1d3557] font-[400] rounded-[30px]      mt-8 cursor-pointer "
          >
            back
          </button>
      </section>
    </div>
  );
};

export default Task;
