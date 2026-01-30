import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const nav = useNavigate();

  // Load tasks
  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
      alert("Please login again");
      nav("/login");
    }
  };

  // On page load
  useEffect(() => {
    loadTasks();
  }, []);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Enter task");
      return;
    }

    try {
      await api.post("/tasks", { title });
      setTitle("");
      loadTasks();
    } catch (error) {
      console.log(error);
      alert("Error adding task");
    }
  };

  // Edit task
  const editTask = async (id, oldTitle) => {

    const newTitle = prompt("Edit task", oldTitle);

    if (!newTitle) return;

    try {
      await api.put(`/tasks/${id}`, { title: newTitle });
      loadTasks();
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div className="container">

      <h2>Dashboard</h2>

      <hr />

      {/* Add Task */}
      <form onSubmit={addTask} className="form-group">

        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="center">
          <button>Add</button>
        </div>

      </form>

      <h3>My Tasks</h3>

      {tasks.length === 0 && <p>No tasks</p>}

      <ul>

        {tasks.map((t) => (

          <li key={t.id} className="task-item">

            <span>{t.title}</span>

            <div>

              <button
                onClick={() => editTask(t.id, t.title)}
                style={{ marginRight: "5px" }}
              >
                Edit
              </button>

              <button onClick={() => deleteTask(t.id)}>
                Delete
              </button>

            </div>

          </li>

        ))}

      </ul>

      {/* Logout */}
      <div className="center">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Dashboard;
