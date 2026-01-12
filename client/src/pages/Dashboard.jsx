import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
   
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false, // ✅ important
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/task`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task created successfully ✅");

      // reset form
      setFormData({
        title: "",
        description: "",
        completed: false,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired, please login again");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error(
          err.response?.data?.message || "Failed to create task"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Create Task</h1>
          
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />

          {/* Optional completed flag */}
          <label className="flex items-center mb-4 text-sm">
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
              className="mr-2"
            />
            Mark as completed
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
