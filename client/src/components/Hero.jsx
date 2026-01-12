import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center text-white">
        {/* Logo / Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Taskify
        </h1>

        <p className="text-lg md:text-xl mb-8 text-blue-100">
          A secure and scalable task management platform built with
          modern web technologies.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">
             Secure Authentication
            </h3>
            <p className="text-sm text-blue-100">
              JWT-based login with role and ownership validation.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">
               Smart Task Control
            </h3>
            <p className="text-sm text-blue-100">
              Only task creators can update, admins control deletion.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">
              Scalable Backend
            </h3>
            <p className="text-sm text-blue-100">
              Built using REST APIs, MongoDB, and clean architecture.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded hover:bg-blue-100 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-transparent border border-white font-semibold rounded hover:bg-white hover:text-blue-700 transition"
          >
            Register
          </button>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-sm text-blue-200">
          Built as a backend-focused internship assignment 🚀
        </p>
      </div>
    </div>
  );
}

export default Hero;
