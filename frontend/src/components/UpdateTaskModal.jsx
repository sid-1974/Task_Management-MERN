import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const UpdateTaskModal = ({
  showUpdateModal,
  handleUpdateModalClose,
  id,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [archived, setArchived] = useState(false);
  

  useEffect(() => {
    const getSingleTask = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/task/single/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.task.title);
          setDescription(res.data.task.description);
          setStatus(res.data.task.status);
          setArchived(res.data.task.archived);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  const handleUpdateTask = async () => {
    await axios
      .put(
        `http://localhost:4000/api/v1/task/update/${id}`,
        {
          title,
          description,
          status,
          archived,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);

        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task) => {
            if (task._id === id) {
              return {
                ...task,
                title,
                description,
                status,
                archived,
              };
            } else {
              return task;
            }
          });
          return updatedTasks;
        });
        handleUpdateModalClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={2}>
            <label className="text-dark">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label className="text-dark">Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label className="text-dark">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="completed">DONE.</option>
              <option value="incomplete">TO DO</option>
            </select>
          </Stack>
          <br />
          <Stack gap={2}>
            <label className="text-dark">IN PROGRESS</label>
            <select
              value={archived}
              onChange={(e) => setArchived(e.target.value)}
            >
              <option value={true}>YES</option>
              <option value={false}>NO</option>
            </select>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            handleUpdateTask();
            window.location.reload();
          }}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTaskModal;