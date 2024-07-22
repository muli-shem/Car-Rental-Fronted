import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("rental_rate");
    localStorage.removeItem("vehicle_id")
    navigate("/");
  }, [navigate]);

  return null; // This component does not render anything
}
