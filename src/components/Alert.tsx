import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {clearAlert} from "../store/slices/alertSlice";

const Alert: React.FC = () => {
  const {message, type} = useAppSelector((state) => state.alertSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 3000); // Auto-hide alert after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: getAlertColor(type),
        color: "#fff",
      }}
    >
      {message}
    </div>
  );
};

const getAlertColor = (
  type: "success" | "error" | "info" | "warning" | null
) => {
  switch (type) {
    case "success":
      return "green";
    case "error":
      return "red";
    case "info":
      return "blue";
    case "warning":
      return "orange";
    default:
      return "gray";
  }
};

export default Alert;
