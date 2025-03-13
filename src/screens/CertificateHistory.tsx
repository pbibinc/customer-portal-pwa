import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {hooks} from "../hooks";
import {components} from "../components";
import {utils} from "../utils";
import {text} from "../text";
import {RootState, useAppSelector} from "../store";

export const CertificateHistory: React.FC = () => {
  const selectedData = useAppSelector(
    (state: RootState) => state.selectedLeadSlice
  );
  const {pathname} = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    setTimeout(() => {
      window.scroll({top: -1, left: 0, behavior: "smooth"});
    }, 10);
  }, [pathname]);

  const navigate = hooks.useAppNavigate();

  console.log("certHistory", selectedData.lead.certificate);

  const formatDateManually = (dateString: string): string => {
    const date = new Date(dateString);
    const monthNames: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day: string = date.getDate().toString().padStart(2, "0");
    const month: string = monthNames[date.getMonth()];
    const year: number = date.getFullYear();

    return `${month} ${day} ${year}`;
  };

  interface CertificateItem {
    requested_date: string;
    status: string;
  }

  const certificate: CertificateItem[] | undefined =
    selectedData?.lead?.certificate;

  const totalPages = certificate
    ? Math.ceil(certificate.length / itemsPerPage)
    : 0;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const renderBackground = (): JSX.Element => {
    return <components.Background />;
  };

  const renderContent = (): JSX.Element => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = certificate?.slice(startIndex, endIndex);

    return (
      <main
        style={{marginTop: 52 + 100, marginBottom: 20}}
        className="container"
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 20,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h3 style={{marginBottom: 20, textAlign: "center"}}>
            Certificate History
          </h3>

          <table style={{width: "100%", borderCollapse: "collapse"}}>
            <thead style={{backgroundColor: "#f2f2f2"}}>
              <tr>
                <th style={{textAlign: "left", padding: "10px"}}>Date</th>
                <th style={{textAlign: "left", padding: "10px"}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(paginatedData) &&
                paginatedData.map((item: CertificateItem, index: number) => (
                  <tr key={index} style={{borderBottom: "1px solid #ddd"}}>
                    <td style={{padding: "10px"}}>
                      {formatDateManually(item.requested_date)}
                    </td>
                    <td style={{padding: "10px"}}>
                      {" "}
                      <span
                        style={{
                          color: "white",
                          backgroundColor:
                            item.status === "approved" ? "green" : "yellow",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "inline-block",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div style={{marginTop: 20, textAlign: "center"}}>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              style={{
                marginRight: 10,
                padding: "5px 10px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                border: "1px solid #ddd",
                borderRadius: 4,
                backgroundColor: currentPage === 1 ? "#f0f0f0" : "#007bff",
                color: currentPage === 1 ? "#999" : "#fff",
              }}
            >
              Previous
            </button>
            <span style={{margin: "0 10px"}}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                marginLeft: 10,
                padding: "5px 10px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                border: "1px solid #ddd",
                borderRadius: 4,
                backgroundColor:
                  currentPage === totalPages ? "#f0f0f0" : "#007bff",
                color: currentPage === totalPages ? "#999" : "#fff",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    );
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header title="CERT HISTORY" goBack={true} />;
  };

  return (
    <div id="screen">
      {renderHeader()}
      {renderBackground()}
      {renderContent()}
    </div>
  );
};
