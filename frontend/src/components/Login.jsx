import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Login({ isAuthenticated, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state
  
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
  
      // Clear input fields and update authentication state
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      toast.success(response.data.message);
    } catch (error) {
      // Enhanced error handling with more details
      console.error("Login error:", error); // Log the full error for debugging
      if (error.response) {
        // Handle known error responses from the server
        console.error("Response error data:", error.response.data); // Log response data
        toast.error(error.response.data.message || "An error occurred with the server.");
      } else if (error.request) {
        // Handle cases where no response was received from the server
        console.error("No response received:", error.request); // Log request details
        toast.error("No response received from the server. Please try again later.");
      } else {
        // Handle errors related to setting up the request
        console.error("Request setup error:", error.message); // Log setup error message
        toast.error("Error setting up the request. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center overflow-y-hidden"
      style={{ minHeight: "800px" }}
    >
      <Form onSubmit={handleLogin} className="w-100">
        <h3 className="text-center">LOGIN</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="text-center">
          <Form.Label>
            Not Registered?{" "}
            <Link to="/register" className="text-decoration-none">
              REGISTER NOW
            </Link>
          </Form.Label>
        </Form.Group>

        <Button
          variant="warning"
          type="submit"
          className="w-100 text-light fw-bold fs-5"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
