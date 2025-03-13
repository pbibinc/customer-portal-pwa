import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {text} from "../text";
import {hooks} from "../hooks";
import {custom} from "../custom";
import {svg} from "../assets/svg";
import {components} from "../components";
import {setToken, setUser} from "../store/slices/userSlice";
import axiosClient from "../axios/axios.client";

import {useDispatch} from "react-redux";
import {showAlert} from "../store/slices/alertSlice";
import Swal from "sweetalert2";
import {fetchUserAndLead} from "../store/slices/leadThunk";
import {setLead} from "../store/slices/leadSlice";
import {json} from "stream/consumers";
import {setSelectedLead} from "../store/slices/selectedLeadSlic";

export const SignIn: React.FC = () => {
  const {pathname} = useLocation();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    console.log(email, password);
    const formData = {
      email: email,
      password: password,
    };

    axiosClient
      .post("/api/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);

        const {user, token} = response.data;

        // Dispatch actions to update Redux state
        dispatch(setUser(user));
        dispatch(setToken(token));
        axiosClient
          .get(`/api/lead-data/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((r) => {
            const leads = r.data.data;
            console.log(leads);
            dispatch(setLead(leads));
            dispatch(setSelectedLead(leads[0]));
            navigate("/TabNavigator");
          });
      })
      .catch((error) => {
        // Alert.alert("Error", error.response?.data || error.message);
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid email or password",
        });
      });
  };
  const [isPasswordType, setIsPasswordType] = useState<boolean>(true);
  const togglePasswordVisibility = () => {
    setIsPasswordType((prev) => !prev);
  };
  const navigate = hooks.useAppNavigate();

  const [rememberMe, setRememberMe] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: "smooth"});
    }, 10);
  }, [pathname]);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (location.pathname.includes("Onboarding")) {
      metaThemeColor?.setAttribute("content", "#040325");
    } else {
      metaThemeColor?.setAttribute("content", "#ffffff");
    }
  }, [location]);

  const renderBackground = (): JSX.Element => {
    return <components.Background />;
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        className="container"
        style={{marginTop: 52, paddingTop: "18%", paddingBottom: 20, zIndex: 1}}
      >
        <text.H1 style={{marginBottom: 30}}>Welcome Back!</text.H1>

        <custom.InputField
          leftIcon={<svg.EmailSvg />}
          rightIcon={<svg.CheckSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <custom.InputField
          placeholder="••••••••"
          clickable={true}
          leftIcon={<svg.PasswordSvg />}
          rightIcon={
            <div onClick={togglePasswordVisibility} style={{cursor: "pointer"}}>
              {isPasswordType ? <svg.EyeOffSvg /> : <svg.EyeOffSvg />}
            </div>
          }
          containerStyle={{marginBottom: 20}}
          value={password}
          type={isPasswordType ? "password" : "text"}
          onChange={(e) => setPassword(e.target.value)}
        />

        <components.Button
          title="Sign In"
          containerStyle={{marginBottom: 14}}
          onClick={handleSubmit}
        />

        {/* <div style={{...utils.rowCenter(), marginBottom: 40}}>
          <text.T16 style={{marginRight: 4}}>No account?</text.T16>
          <text.T16
            onClick={() => navigate('/SignUp')}
            style={{cursor: 'pointer', color: theme.colors.mainColor}}
          >
            Register now
          </text.T16>
        </div> */}
      </main>
    );
  };

  return (
    <div id="screen">
      {renderBackground()}
      {renderHeader()}
      {renderContent()}
    </div>
  );
};
