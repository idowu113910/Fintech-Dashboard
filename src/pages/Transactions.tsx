import { SiMastercard } from "react-icons/si";
import chip from "../assets/chip.svg";
import up from "../assets/up.svg";
import down from "../assets/down.svg";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";

interface CreditCard {
  id: number;
  balance: string;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
}

interface Transaction {
  id: number;
  icon: string;
  title: string;
  date: string;
  amount: string;
  isExpense: boolean;
}

const Transactions = () => {
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">(
    "all",
  );

  const mockCards: CreditCard[] = [
    {
      id: 1,
      balance: "$5,756",
      cardHolder: "Eddy Cusuma",
      validThru: "12/22",
      cardNumber: "3778 **** **** 1234",
    },
    {
      id: 2,
      balance: "$2,410",
      cardHolder: "Eddy Cusuma",
      validThru: "08/25",
      cardNumber: "5241 **** **** 8910",
    },
    {
      id: 3,
      balance: "$9,820",
      cardHolder: "Eddy Cusuma",
      validThru: "11/27",
      cardNumber: "4111 **** **** 5678",
    },
  ];

  const mockTransactions: Transaction[] = [
    {
      id: 1,
      icon: up,
      title: "Spotify Subscription",
      date: "28 Jan, 12.30 AM",
      amount: "-$2,500",
      isExpense: true,
    },
    {
      id: 2,
      icon: down,
      title: "Freelance Pay",
      date: "25 Jan, 10.15 PM",
      amount: "+$750",
      isExpense: false,
    },
    {
      id: 3,
      icon: up,
      title: "Netflix Subscription",
      date: "20 Jan, 08.00 PM",
      amount: "-$150",
      isExpense: true,
    },
    {
      id: 4,
      icon: up,
      title: "Shopping",
      date: "15 Jan, 03.45 PM",
      amount: "-$1050",
      isExpense: true,
    },
    {
      id: 5,
      icon: down,
      title: "Transfer Received",
      date: "10 Jan, 11.20 AM",
      amount: "+$840",
      isExpense: false,
    },
  ];

  const bars = [
    { day: "Sat", height: 110 },
    { day: "Sun", height: 155 },
    { day: "Mon", height: 115 },
    { day: "Tue", height: 65 },
    { day: "Wed", height: 145, active: true },
    { day: "Thu", height: 105 },
  ];

  const filteredTransactions = mockTransactions.filter((item) => {
    if (activeTab === "income") return !item.isExpense;
    if (activeTab === "expense") return item.isExpense;
    return true;
  });

  return (
    <div className="pb-12 w-full max-w-md sm:max-w-xl md:max-w-4xl mx-auto px-4 py-6 overflow-x-hidden text-[#343C6A]">
      {/* Header */}
      <div className="flex px-1 justify-between items-center mb-3">
        <h1 className="font-semibold text-[16px] text-[#343C6A]">My Cards</h1>
        <p className="font-semibold text-[14px] text-[#343C6A] cursor-pointer hover:underline">
          + Add Card
        </p>
      </div>

      {/* Credit Cards Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-4 py-2 px-1 -mt-4 [&::-webkit-scrollbar]:hidden [ms-overflow-style:none] scrollbar-none">
        {mockCards.map((card, index) => {
          const isSecondCard = index === 1;

          return (
            <div
              key={card.id}
              className={`rounded-[15px] w-66.25 h-42.5 shrink-0 flex flex-col justify-between overflow-hidden shadow-xs ${
                isSecondCard
                  ? "bg-white text-[#343C6A] border border-[#DFEAF2]"
                  : "text-white"
              }`}
              style={
                !isSecondCard
                  ? {
                      background:
                        "linear-gradient(135deg, #2D60FF 0%, #539BFF 100%)",
                    }
                  : undefined
              }
            >
              {/* Top & Middle Card Content */}
              <div className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <h2
                      className={`font-normal text-[11px] ${
                        isSecondCard ? "text-[#718EBF]" : "text-white/80"
                      }`}
                    >
                      Balance
                    </h2>
                    <p className="font-semibold text-[16px]">{card.balance}</p>
                  </div>

                  <img src={chip} className="w-7 h-7" alt="Card Chip" />
                </div>

                <div className="flex gap-10 mt-3">
                  <div className="flex flex-col">
                    <h3
                      className={`font-normal text-[10px] ${
                        isSecondCard ? "text-[#718EBF]" : "text-white/70"
                      }`}
                    >
                      CARD HOLDER
                    </h3>
                    <p className="font-semibold text-[13px] truncate max-w-25">
                      {card.cardHolder}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <h3
                      className={`font-normal text-[10px] ${
                        isSecondCard ? "text-[#718EBF]" : "text-white/70"
                      }`}
                    >
                      VALID THRU
                    </h3>
                    <p className="font-semibold text-[13px]">
                      {card.validThru}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Bar with Card Number & Mastercard Logo */}
              <div
                className={`flex justify-between items-center px-4 py-3 border-t ${
                  isSecondCard
                    ? "border-[#DFEAF2] bg-white"
                    : "border-white/15 bg-linear-to-b from-white/15 to-transparent"
                }`}
              >
                <p className="text-[14px] sm:text-[15px] font-semibold tracking-wider">
                  {card.cardNumber}
                </p>
                <SiMastercard className="w-7 h-4.5 shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Expense Section Header */}
      <h2 className="font-semibold text-[#343C6A] text-[16px] px-1 mt-6 mb-3">
        My Expense
      </h2>

      {/* Taller Expense Chart Container */}
      <div className="bg-white rounded-[15px] w-full max-w-md h-64 p-5 relative mx-auto shadow-xs flex flex-col justify-end">
        <div className="flex items-end justify-between gap-2 h-44 mb-2">
          {bars.map((bar) => (
            <div
              key={bar.day}
              className="flex flex-col items-center relative flex-1"
            >
              {bar.active && (
                <div className="absolute -top-8 bg-white text-[#343C6A] text-[10px] font-semibold px-2 py-1 rounded-md shadow-md whitespace-nowrap z-10">
                  $12,500
                </div>
              )}
              <div
                className={`w-full max-w-8.75 rounded-[10px] ${
                  bar.active
                    ? "bg-[#16DBCC] shadow-[0_0_20px_rgba(22,219,204,0.4)]"
                    : "bg-[#EDF0F7]"
                }`}
                style={{ height: `${bar.height}px` }}
              />
              <p className="text-[10px] text-[#718EBF] font-medium mt-2">
                {bar.day}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Header */}
      <h2 className="text-[16px] text-[#343C6A] font-semibold px-1 mt-6 mb-3">
        Recent Transactions
      </h2>

      <div className="w-full max-w-md mx-auto">
        {/* Dynamic Tab Bar */}
        <div className="flex border-b border-[#E6EFF5] relative">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex-1 pb-2 text-[12px] sm:text-[13px] font-medium transition-colors cursor-pointer text-center ${
              activeTab === "all" ? "text-[#1814F3]" : "text-[#718EBF]"
            }`}
          >
            All Transactions
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("income")}
            className={`flex-1 pb-2 text-[12px] sm:text-[13px] font-medium transition-colors cursor-pointer text-center ${
              activeTab === "income" ? "text-[#1814F3]" : "text-[#718EBF]"
            }`}
          >
            Income
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("expense")}
            className={`flex-1 pb-2 text-[12px] sm:text-[13px] font-medium transition-colors cursor-pointer text-center ${
              activeTab === "expense" ? "text-[#1814F3]" : "text-[#718EBF]"
            }`}
          >
            Expense
          </button>

          {/* Sliding Indicator Line */}
          <span
            className={`absolute bottom-0 h-[2.5px] w-1/3 bg-[#1814F3] rounded-t-sm transition-transform duration-300 ease-in-out ${
              activeTab === "all"
                ? "translate-x-0"
                : activeTab === "income"
                  ? "translate-x-full"
                  : "translate-x-[200%]"
            }`}
          />
        </div>

        {/* Transaction List Container */}
        <div className="border border-gray-100 bg-white rounded-[15px] p-4 w-full mx-auto mt-4 min-h-75 flex flex-col justify-start shadow-xs">
          {filteredTransactions.length > 0 ? (
            <div className="w-full transition-opacity duration-300">
              {filteredTransactions.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between py-3 gap-3 ${
                    index !== filteredTransactions.length - 1
                      ? "border-b border-[#E6EFF5]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-8 h-8 object-contain shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <p className="font-medium text-[13px] text-[#232323] truncate">
                        {item.title}
                      </p>
                      <p className="font-normal text-[12px] text-[#718EBF] truncate">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`text-[13px] font-medium shrink-0 ${
                      item.isExpense ? "text-[#FE5C73]" : "text-[#16DBCC]"
                    }`}
                  >
                    {item.amount}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center w-full my-auto">
              <p className="font-medium text-[13px] text-[#718EBF]">
                Nothing here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center text-[#1814F3] gap-4 sm:gap-6 mx-auto mt-6">
        <button
          type="button"
          className="flex items-center gap-1 cursor-pointer hover:opacity-80"
        >
          <IoIosArrowBack />
          <span className="font-medium text-[12px]">Previous</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="rounded-[7px] bg-[#1814F3] text-white w-7 h-7 flex items-center justify-center text-[12px] font-medium">
            1
          </span>
          <span className="cursor-pointer text-[12px] px-2 py-1 rounded hover:bg-gray-100">
            2
          </span>
          <span className="cursor-pointer text-[12px] px-2 py-1 rounded hover:bg-gray-100">
            3
          </span>
          <span className="cursor-pointer text-[12px] px-2 py-1 rounded hover:bg-gray-100">
            4
          </span>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 cursor-pointer hover:opacity-80"
        >
          <span className="font-medium text-[12px]">Next</span>
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Transactions;
