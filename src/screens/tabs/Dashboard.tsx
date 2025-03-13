import axios from "axios";
import {useLocation} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

import {URLS} from "../../config";
import {items} from "../../items";
import {hooks} from "../../hooks";
import {custom} from "../../custom";
import {svg} from "../../assets/svg";
import {theme} from "../../constants";
import {components} from "../../components";
import {TransactionType, UserType, OperationType} from "../../types";
import Card from "../../components/Card";
import {RootState, useAppSelector} from "../../store";
import exp from "constants";
import {setPolicyDetail} from "../../store/slices/policyDetailSlice";
import {useDispatch} from "react-redux";

const operations: OperationType[] = [
  {
    id: 1,
    title: "Create \n DIY CERTIFICATE",
    icon: <svg.ReceiveSvg />,
    url: "/CreateInvoice",
  },
  {
    id: 2,
    title: "Certificate \n History",
    icon: <svg.RepeatSvg />,
    url: "/CertificateHistory",
  },
  {
    id: 3,
    title: "Make a \n Payment",
    icon: <svg.DollarSignSvg />,
    url: "/Payments",
  },
];

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

interface Card {
  id: number;
  policyNumber: string;
  policyType: string;
  status: string;
  expirationDate: string;
  carrier: string;
  market: string;
}

export const Dashboard: React.FC = () => {
  const selectedLead = useAppSelector(
    (state: RootState) => state.selectedLeadSlice
  );
  const dispatch = useDispatch();
  const cards: Card[] =
    selectedLead?.lead?.activePolicies
      ?.map((activePolicy: ActivePolicy) => ({
        id: activePolicy.id,
        policyNumber: activePolicy.policy_number, // Ensure the key names match your actual data
        policyType: activePolicy.QuotationProduct.product,
        status: "Active", // Fixed typo from "stats" to "status"
        expirationDate: `${new Date(
          activePolicy.effective_date
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })} - ${new Date(activePolicy.expiration_date).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )}`,
        carrier: activePolicy.carrier,
        market: activePolicy.market,
      }))
      ?.sort((a: Card, b: Card) =>
        a.policyType === "General Liability" ? -1 : 1
      ) || [];

  const navigate = hooks.useAppNavigate();

  const {pathname} = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0; // Для совместимости с мобильными браузерами
    };

    scrollToTop();
  }, [pathname]);

  const [loading, setLoading] = useState<boolean>(true);
  const [usersData, setUsersData] = useState<UserType[]>([]);
  const [transactionsData, setTransactionsData] = useState<TransactionType[]>(
    []
  );

  const getData = async () => {
    setLoading(true);

    try {
      const results = await Promise.allSettled([
        axios.get(URLS.GET_USERS),
        axios.get(URLS.GET_TRANSACTIONS),
      ]);

      const usersResponse = results[0];
      const transactionsResponse = results[1];

      if (usersResponse.status === "fulfilled") {
        setUsersData(usersResponse.value.data.users);
      } else {
        console.error("Error fetching users:", usersResponse.reason);
      }

      if (transactionsResponse.status === "fulfilled") {
        setTransactionsData(transactionsResponse.value.data.transactions);
      } else {
        console.error(
          "Error fetching transactions:",
          transactionsResponse.reason
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const renderHeader = (): JSX.Element => {
    return <components.Header user={true} creditCard={true} />;
  };

  const renderCards = (): JSX.Element => {
    return (
      <div style={{marginBottom: 16, marginTop: 4}}>
        <Swiper
          spaceBetween={14}
          slidesPerView={"auto"}
          pagination={{clickable: true}}
        >
          {cards.map((card) => {
            return (
              <SwiperSlide
                key={card.id}
                style={{
                  height: 190,
                  width: 350,
                  borderRadius: 14,
                  cursor: "pointer",
                }}
                onClick={() => {
                  const policyDetail = selectedLead?.lead?.activePolicies?.find(
                    (activePolicy: any) => activePolicy.id === card.id
                  );

                  dispatch(setPolicyDetail(policyDetail));
                  navigate("/CardDetails");
                }}
              >
                {/* <img
                  src={item.cardUrl}
                  alt="card"
                  style={{width: 310, height: 190, borderRadius: 14}}
                /> */}
                <Card card={card} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };

  const renderOperations = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <custom.ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          {operations.map((operation, index, array) => {
            const isLast = index === array.length - 1;
            return (
              <items.Operation
                isLast={isLast}
                operation={operation}
                key={operation.id || index}
              />
            );
          })}
        </custom.ScrollView>
      </div>
    );
  };

  const renderDashboardBackground = (): JSX.Element => {
    return <components.BlueBackground />;
  };

  // const renderQuickMoneyTransfer = (): JSX.Element => {
  //   return (
  //     <div style={{marginBottom: 30}}>
  //       <components.BlockHeading
  //         title="Quick money transfer to:"
  //         containerStyle={{margin: "0 20px 14px 20px"}}
  //       />

  //       <custom.ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
  //         {usersData?.map((user, index, array) => {
  //           return <items.User user={user} key={user.id || index} />;
  //         })}
  //         <div
  //           style={{
  //             maxWidth: 55,
  //             width: "100%",
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //             cursor: "pointer",
  //           }}
  //         >
  //           <div
  //             style={{
  //               width: 40,
  //               height: 40,
  //               marginBottom: 4,
  //               borderRadius: 20,
  //               backgroundColor: "#FFD9C3",
  //               display: "flex",
  //               justifyContent: "center",
  //               alignItems: "center",
  //             }}
  //           >
  //             <svg.PlusSvg />
  //           </div>
  //           <span
  //             style={{
  //               fontSize: 12,
  //               color: theme.colors.bodyTextColor,
  //               ...theme.fonts.SourceSansPro_400Regular,
  //             }}
  //           >
  //             Choose
  //           </span>
  //         </div>
  //       </custom.ScrollView>
  //     </div>
  //   );
  // };

  // const renderLatestTransactions = (): JSX.Element => {
  //   return (
  //     <div className="container">
  //       <components.BlockHeading
  //         title="Latest transactions"
  //         rightIcon={<svg.SearchSvg />}
  //         containerStyle={{marginBottom: 14}}
  //       />
  //       <div>
  //         {transactionsData?.map((transaction, index, array) => {
  //           const isLast = index === array.length - 1;
  //           return (
  //             <items.Transaction
  //               isLast={isLast}
  //               transaction={transaction}
  //               key={transaction.id || index}
  //             />
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };

  const renderBottomTabBar = () => {
    return <components.BottomTabBar />;
  };

  const renderBackground = (): JSX.Element => {
    return <components.Background />;
  };

  const renderContent = (): JSX.Element => {
    if (loading) return <components.TabLoader />;

    return (
      <main style={{marginTop: 52, paddingBottom: 100}}>
        {renderCards()}
        {renderOperations()}
        {/* {renderQuickMoneyTransfer()}
        {renderLatestTransactions()} */}
      </main>
    );
  };

  return (
    <div id="screen">
      <components.ScrollToTop />
      {renderHeader()}
      {renderContent()}
      {renderBackground()}
      {renderBottomTabBar()}
    </div>
  );
};
