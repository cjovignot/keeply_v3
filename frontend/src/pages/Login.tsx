import UserForm from "../components/UserForm";
import { SocialLogin } from "../components/SocialLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 🔹 Si l'utilisateur est déjà connecté, rediriger
  if (user) {
    navigate("/profile", { replace: true });
  }

  return (
    <div className="flex flex-col items-center px-6 py-10 text-white">
      {/* 🔹 Formulaire utilisateur classique */}
      <div className="w-full max-w-sm mt-4 animate-fadeIn">
        <UserForm />
      </div>

      {/* 🔸 Séparateur stylé */}
      <div className="flex  w-full max-w-sm my-8">
        <div className="flex items-center w-full">
          <div className="w-full border-t border-gray-700" />
        </div>
        <div className=" flex justify-center items-center">
          <span className="px-3 text-sm text-gray-400">OU</span>
        </div>
        <div className="flex items-center w-full">
          <div className="w-full border-t border-gray-700" />
        </div>
      </div>

      {/* 🔹 Connexion Google */}
      <div className="mt-2">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
