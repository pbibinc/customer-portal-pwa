import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";

import {text} from "../text";
import {hooks} from "../hooks";
import {utils} from "../utils";
import {custom} from "../custom";
import {svg} from "../assets/svg";
import {theme} from "../constants";
import {components} from "../components";
import {RootState, useAppSelector} from "../store";
import axiosClient from "../axios/axios.client";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {setLead} from "../store/slices/leadSlice";
import {setSelectedLead} from "../store/slices/selectedLeadSlic";

export const CreateInvoice: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();
  const user = useAppSelector((state: RootState) => state.userSlice.user);
  const selectedLead = useAppSelector(
    (state: RootState) => state.selectedLeadSlice
  );
  const token = useAppSelector((state: RootState) => state.userSlice.token);
  const [currency, setCurrency] = useState<string>("Default");
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState<string>("");
  const [description, setDescription] = useState<string>(
    currency === "Default"
      ? "All locations as required by written contract."
      : ""
  );

  const [email, setEmail] = useState("");
  const [telNumber, setTelNumber] = useState("");

  const handleSetCurrency = (title: string) => {
    setCurrency(title);
    if (title === "Default") {
      setDescription("All locations as required by written contract.");
    } else {
      setDescription("");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: "smooth"});
    }, 10);
  }, [pathname]);

  const renderBackground = (): JSX.Element => {
    return <components.Background />;
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header title="DIY CERTIFICATE" goBack={true} />;
  };

  const handleCertSubmit = () => {
    const formData = new FormData();
    formData.append("companyName", selectedLead?.lead?.company_name);
    formData.append("contactNumber", telNumber);
    formData.append("emailAddress", email);
    formData.append("descriptionOperation", description);
    formData.append("selectedData", JSON.stringify(selectedLead?.lead));
    formData.append("projectDescription", currency);
    axiosClient
      .post("api/generate-cert-pdf", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        axiosClient
          .get(`/api/lead-data/${user?.id}`, {
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
        navigate("/TabNavigator");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to generate certificate",
        });
      });
  };

  const renderContent = (): JSX.Element => {
    return (
      <main
        style={{marginTop: 52 + 10, marginBottom: 20}}
        className="container"
      >
        <custom.InputField
          leftIcon={<svg.UserSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder="Company name"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <custom.InputField
          leftIcon={<svg.PhoneSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder="Tel Number"
          onChange={(e) => setTelNumber(e.target.value)}
        />
        <custom.InputField
          leftIcon={<svg.EmailSvg />}
          containerStyle={{marginBottom: 10}}
          placeholder="Company email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <custom.InputField
          leftIcon={<svg.DollarSvg />}
          containerStyle={{marginBottom: 30}}
          placeholder="Amount"
        /> */}
        <div style={{marginBottom: 30}}>
          <text.T14 style={{marginBottom: 10}}>Project Description</text.T14>
          <div style={{...utils.rowCenter({gap: 11})}}>
            {["Default", "Manual"].map((title) => {
              return (
                <div
                  key={title}
                  style={{
                    borderRadius: 6,
                    flex: "1 1 calc(50% - 5.5px)",
                    height: 30,
                    userSelect: "none",
                    cursor: "pointer",
                    border: `1px solid ${theme.colors.mainDark}`,
                    backgroundColor:
                      currency === title
                        ? theme.colors.mainDark
                        : theme.colors.transparent,
                    ...utils.flexCenter(),
                  }}
                  onClick={(e) => handleSetCurrency(title)}
                >
                  <text.T14
                    style={{
                      textTransform: "uppercase",
                      color:
                        currency === title
                          ? theme.colors.white
                          : theme.colors.mainDark,
                    }}
                  >
                    {title}
                  </text.T14>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "14px 20px",
            backgroundColor: theme.colors.white,
            border: "1px solid #FFEFE6",
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <textarea
            placeholder="Description"
            style={{
              width: "100%",
              height: 120,
              ...theme.fonts.SourceSansPro_400Regular,
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <text.T14 style={{marginBottom: 30}}>
          Manual Description, is for approvval
        </text.T14>
        <components.Button title="Submit" onClick={handleCertSubmit} />
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
