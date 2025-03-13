import React from "react";
import backgroundImg from "../assets/bg-general-liab.png";
import cardBackground from "../assets/bg-general-liab-card.png";
import {RootState, useAppSelector} from "../store";

type CardType = {
  id: number;
  policyNumber: string;
  expirationDate: string;
  policyType: string;
  status: string;
  carrier: string;
  market: string;
};

type CardProps = {
  card: CardType;
};

const Card: React.FC<CardProps> = ({card}) => {
  const selectedLead = useAppSelector(
    (state: RootState) => state.selectedLeadSlice
  );
  return (
    <div
      style={{
        width: 350,
        height: 190,
        borderRadius: 14,
        padding: 4,
        backgroundImage: `url(${cardBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        color: "#040325", // Change text color to white for visibility
        fontWeight: "bold",
      }}
    >
      {/* <div style={{display: "flex", justifyContent: "space-between"}}>
        <span style={{fontWeight: "bold"}}>{card.policyType}</span>
        <span
          style={{
            color: "white",
            backgroundColor: "green",
            padding: "4px 8px",
            borderRadius: "12px",s
            fontSize: "12px",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          {card.status}
        </span>
      </div>
      <div style={{marginTop: 20}}>
        <span style={{fontWeight: "bold"}}>Policy Number:</span>
        <span>{card.policyNumber}</span>
      </div>
      <div style={{marginTop: 70}}>
        <span style={{fontWeight: "bold", marginBottom: 10}}>Expi Date:</span>
        <h2 style={{margin: 0}}>{card.expirationDate}</h2>
      </div> */}
      <div
        style={{
          padding: "1px",
          marginTop: "38px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <span
          style={{fontWeight: "bold", color: "white", whiteSpace: "nowrap"}}
        >
          {card.policyType}
        </span>
        <span
          style={{
            color: "white",
            backgroundColor: "green",
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "bold",
            display: "inline-block",
            marginLeft: 160,
          }}
        >
          {card.status}
        </span>
      </div>
      <div
        style={{
          padding: "1px",
          marginTop: "15px", // Moves content slightly below the PBIB logo
          marginLeft: "1px",
        }}
      >
        <div style={{marginBottom: "6px"}}>
          <strong>Insured:</strong> {selectedLead.lead.company_name}
        </div>

        <div style={{marginBottom: "6px"}}>
          <strong>Effective Date:</strong> {card.expirationDate}
        </div>

        {/* Group & Policy Numbers - Right Aligned */}
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            <strong>Policy #:</strong> {card.policyNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
