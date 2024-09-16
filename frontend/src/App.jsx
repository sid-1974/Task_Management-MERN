import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState([]);
  const [taskTitle,setTaskTitle] = useState("Tasks")

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        console.log("USER IS NOT AUTHENTICATED");
        setIsAuthenticated(false);
        setUser({});
      }
    };
    handleGetUser();
  }, [isAuthenticated]);

  return (
    <Router>
      <Header
        setTasks={setTasks}
        tasks={tasks}
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        setTaskTitle={setTaskTitle}
        TaskTitle={taskTitle}

      />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} tasks={tasks} setTasks={setTasks} taskTitle={taskTitle}  />} />
        <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/profile" element={<Profile user={user} isAuthenticated={isAuthenticated}/>} />
      </Routes>
    </Router>
  );
}

export default App;
