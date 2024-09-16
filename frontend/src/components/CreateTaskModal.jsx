import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const CreateTaskModal = ({
  showCreateModal,
  handleCreateModalClose,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(""); // New state for due date

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/task/post",
        { title, description, dueDate }, // Include dueDate in the request
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
      setTitle("");
      setDescription("");
      setDueDate(""); // Clear due date after creation
      handleCreateModalClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task.");
    }
  };

  return (
    <Modal show={showCreateModal} onHide={handleCreateModalClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-dark">Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={3}>
          <div>
            <label className="form-label text-dark">Title</label>
            <input
              type="text"
              className="form-control "
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label text-dark">Description</label>
            <input
              type="text"
              className="form-control "
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label text-dark">Due Date</label>
            <input
              type="date"
              className="form-control "
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCreateModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateTask}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
