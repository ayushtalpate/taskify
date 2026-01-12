import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id || decoded._id);
      fetchTasks(token);
    } catch {
      toast.error("Invalid session");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  const fetchTasks = async (token) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/task`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data.data);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/task/${editingTask._id}`,
        {
          title: editingTask.title,
          description: editingTask.description,
          completed: editingTask.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task updated");

      setTasks((prev) =>
        prev.map((t) =>
          t._id === editingTask._id ? res.data.data : t
        )
      );

      setEditingTask(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task deleted");
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      toast.error("Delete not allowed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-200">
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created By</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => {
              const isCreator =
                task.createdBy?._id?.toString() === userId;

              return (
                <tr key={task._id} className="border-t">
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">{task.description}</td>
                  <td className="p-2">
                    {task.completed ? "Completed" : "Pending"}
                  </td>
                  <td className="p-2 text-blue-600 font-medium">
                    {task.createdBy?.username}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      disabled={!isCreator}
                      onClick={() => setEditingTask(task)}
                      className={`px-3 py-1 rounded ${
                        isCreator
                          ? "bg-blue-600 text-white"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-3 py-1 rounded bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* UPDATE MODAL */}
        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">
                Update Task
              </h2>

              <input
                className="w-full mb-3 border px-3 py-2"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                className="w-full mb-3 border px-3 py-2"
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
              />

              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={editingTask.completed}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      completed: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                Completed
              </label>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingTask(null)}
                  className="bg-gray-300 px-4 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateSubmit}
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
