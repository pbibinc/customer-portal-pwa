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
import Card from "../components/Card";
import {title} from "process";

const security = [
  {
    id: 1,
    title: "Change PIN code",
    icon: <svg.KeyDetailsSvg />,
    url: "/ChangePINCode",
  },
  {
    id: 2,
    title: "Reissue the card",
    icon: <svg.RefreshSvg />,
    url: "/OpenNewCard",
  },
  {
    id: 3,
    title: "Block the card",
    icon: <svg.LockSvg />,
    url: "",
  },
  {
    id: 4,
    title: "Сlose the card",
    icon: <svg.TrashSvg />,
    url: "",
  },
];

interface Card {
  id: number;
  policyNumber: string;
  policyType: string;
  status: string;
  expirationDate: string;
  carrier: string;
  market: string;
}

interface ActivePolicy {
  id: number;
  policy_number: string;
  expiration_date: string;
  effective_date: string;
  QuotationProduct: {
    product: string;
  };
  carrier: string;
  market: string;
}

export const CardDetails: React.FC = () => {
  const {pathname} = useLocation();
  const navigate = hooks.useAppNavigate();
  const policyDetail = useAppSelector(
    (state: RootState) => state.policyDetailSlice.policyDetail
  );

  const cardData: Card = {
    id: policyDetail?.id || 0, // Defaults to 0 if undefined
    policyNumber: policyDetail?.policy_number || "Unknown Policy Number",
    policyType: policyDetail?.QuotationProduct?.product || "Unknown Type",
    status: policyDetail?.status || "Unknown Status",
    expirationDate: policyDetail?.expiration_date || "N/A",
    carrier: policyDetail?.carrier || "Unknown Carrier",
    market: policyDetail?.market || "Unknown Market",
  };

  const limits = [
    [
      {
        id: 1,
        title: "Damage to Rented",
        description: policyDetail?.GeneralLiabilty?.damage_to_rented || "N/A",
        icon: <svg.DollarDetailsSvg />,
        url: "",
      },
      {
        id: 2,
        title: "Each Occurrence",
        description: policyDetail?.GeneralLiabilty?.each_occurence || "N/A",
        icon: <svg.DollarDetailsSvg />,
        url: "",
      },
    ],
    [
      {
        id: 3,
        title: "Medical Expense",
        description: policyDetail?.GeneralLiabilty?.medical_expenses || "N/A",
        icon: <svg.DollarDetailsSvg />,
        url: "",
      },
      {
        id: 4,
        title: "Per & Adv Injury",
        description: policyDetail?.GeneralLiabilty?.per_adv_injury || "N/A",
        icon: <svg.DollarDetailsSvg />,
        url: "",
      },
    ],
    [
      {
        id: 5,
        title: "General Aggregate",
        description: policyDetail?.GeneralLiabilty?.gen_aggregate || "N/A",
        icon: <svg.DollarDetailsSvg />,
        url: "",
      },
      {
        id: 6,
        title: "Comp/OP",
        description: policyDetail?.GeneralLiabilty?.product_comp || "N/A",
        icon: <svg.DollarDetailsSvg />,
        url: "",
      },
    ],
  ];

  console.log("policy detail", policyDetail);

  const [defaultCard, setDefaultCard] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: "smooth"});
    }, 10);
  }, [pathname]);

  const renderHeader = (): JSX.Element => {
    return <components.Header goBack={true} documentIcon={true} />;
  };

  const renderCard = (): JSX.Element => {
    return (
      <div
        style={{
          width: "80%",
          height: "auto",
          borderRadius: 14,
          margin: "0 auto",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <Card card={cardData} />
      </div>
    );
  };

  const renderButtons = (): JSX.Element => {
    return (
      <div
        className="container"
        style={{...utils.rowCenter({gap: 17}), marginBottom: 30}}
      >
        <div
          style={{
            flex: "1 1 calc(33.333% - 8.5px)",
            backgroundColor: "#FFF7F2",
            border: "1px solid #FFEFE6",
            borderRadius: 10,
            padding: "14px 12px 14px 14px",
            ...utils.rowCenter(),
          }}
        >
          <text.H5 style={{marginRight: "auto", marginLeft: 12}}>
            {policyDetail?.market}
          </text.H5>
        </div>
        <div
          style={{
            flex: "1 1 calc(33.333% - 8.5px)",
            backgroundColor: "#FFF7F2",
            border: "1px solid #FFEFE6",
            borderRadius: 10,
            padding: "14px 12px 14px 14px",
            cursor: "pointer",
            userSelect: "none",
            ...utils.rowCenterSpcBtw(),
          }}
          onClick={() => setDefaultCard(!defaultCard)}
        >
          <text.H5>{policyDetail?.carrier}</text.H5>
        </div>
      </div>
    );
  };

  const renderLimits = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}} className="container">
        <text.T14 style={{marginBottom: 10}}>Limits</text.T14>

        {limits.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="container"
            style={{...utils.rowCenter({gap: 110}), marginBottom: 30}}
          >
            {group.map((item) => (
              <div key={item.id}>
                <div style={{...utils.rowCenter({gap: 10})}}>
                  {item.icon}
                  <text.H5>{item.title}</text.H5>
                </div>
                <span style={{fontSize: 12, color: theme.colors.bodyTextColor}}>
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderSecurity = (): JSX.Element => {
    return (
      <div className="container">
        <text.T14 style={{marginBottom: 10}}>Security</text.T14>
        {security.map((item, index, array) => {
          const isLast = index === array.length - 1;
          return (
            <div
              style={{
                ...utils.rowCenter(),
                marginBottom: isLast ? 0 : 20,
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => {
                if (item.url === "") {
                  return;
                }

                navigate(item.url);
              }}
            >
              {item.icon}
              <text.H5
                style={{
                  marginLeft: 10,
                  marginRight: "auto",
                  color:
                    item.title === "Block the card" ||
                    item.title === "Сlose the card"
                      ? theme.colors.mainColor
                      : theme.colors.mainDark,
                }}
              >
                {item.title}
              </text.H5>
              <svg.RightArrowSvg />
            </div>
          );
        })}
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <main style={{marginTop: 52, marginBottom: 20}}>
        {renderCard()}
        {renderButtons()}
        {renderLimits()}
        {renderSecurity()}
      </main>
    );
  };

  return (
    <div id="screen">
      {renderHeader()}
      {renderContent()}
    </div>
  );
};
