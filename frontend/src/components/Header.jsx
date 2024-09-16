import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom'
import '../css/Header.css'
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react';

function Header({setTasks,tasks,setIsAuthenticated,isAuthenticated,setTaskTitle}) {

  const [allTasks, setAllTasks] = useState([]);
  const navigate = useNavigate()
  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks); // Update tasks with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };






  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: "true" }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
      navigate("/login")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


   const filterTasks = (filterType) => {
    let filteredTasks = [];

     switch (filterType) {
       case "completed":
        filteredTasks = allTasks.filter((task) => task.status === "completed");
        setTaskTitle("Completed Tasks");
         break;
      case "incomplete":
        filteredTasks = allTasks.filter((task) => task.status === "incomplete");
        setTaskTitle("To Do Tasks");
        break;
       case "archived":
         filteredTasks = allTasks.filter((task) => task.archived === true);
         setTaskTitle("Progress Tasks");
        break;
       case "all":
         filteredTasks = allTasks;
        setTaskTitle("Tasks");
        break;
      default:
         filteredTasks = allTasks;
     }
     setTasks(filteredTasks);
   };





  return (
    <Navbar expand="lg" className={`bg-body-tertiary  ${!isAuthenticated ? "d-none":""}`}>
      <Container>
        <Navbar.Brand href="#home">Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar">
      <Link to="/" className="link">Home</Link>

      
      <NavDropdown title="Filter Tasks" id="basic-nav-dropdown" className="nav-dropdown">
        <NavDropdown.Item onClick={() => filterTasks("all")} className="nav-dropdown-item">All Tasks</NavDropdown.Item>
        <NavDropdown.Item onClick={() => filterTasks("completed")} className="nav-dropdown-item">Completed Tasks</NavDropdown.Item>
        <NavDropdown.Item onClick={() => filterTasks("incomplete")} className="nav-dropdown-item">To Do Tasks</NavDropdown.Item>
        <NavDropdown.Item onClick={() => filterTasks("archived")} className="nav-dropdown-item">Progress Tasks</NavDropdown.Item>
      </NavDropdown>
      <Link to="/profile" className="profile">Profile</Link>
      <Button className='logout-button' onClick={handleLogout}>Logout</Button>
    </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;