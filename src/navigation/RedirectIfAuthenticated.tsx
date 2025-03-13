import React, {ReactNode} from "react";
import {useAppSelector} from "../store";
import {Navigate} from "react-router-dom";
interface Props {
  children: ReactNode; // Define children prop as ReactNode
}

const RedirectIfAuthenticated: React.FC<Props> = ({children}) => {
  const token = useAppSelector((state) => state.userSlice.token);

  if (token) {
    return <Navigate to="/TabNavigator" replace />;
  }

  return <>{children}</>; // Wrap children in a React fragment
};

export default RedirectIfAuthenticated;
