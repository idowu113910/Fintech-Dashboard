import { SiMastercard } from "react-icons/si";
import chip from "../assets/chip.svg";
import deposit from "../assets/Deposit.svg";
import paypal from "../assets/paypal.svg";
import jemi from "../assets/jemi.svg";
import analysis from "../assets/analystics.svg";
import expenses from "../assets/entertainment.svg";
import randy from "../assets/Randy.svg";
import workman from "../assets/Workman.svg";
import livia from "../assets/livia.svg";
import next from "../assets/next.svg";
import send from "../assets/send 2.svg";
import bal from "../assets/Balance hsitory.svg";

interface Transaction {
  id: number;
  icon: string;
  title: string;
  date: string;
  amount: string;
  isCredit: boolean;
}

interface CreditCard {
  id: number;
  balance: string;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
}

const Overview = () => {
  const mockTransactions: Transaction[] = [
    {
      id: 1,
      icon: deposit,
      title: "Deposit from my",
      date: "28 January 2021",
      amount: "-$850",
      isCredit: false,
    },
    {
      id: 2,
      icon: paypal,
      title: "Deposit Paypal",
      date: "25 January 2021",
      amount: "+$2,500",
      isCredit: true,
    },
    {
      id: 3,
      icon: jemi,
      title: "Jemi Wilson",
      date: "21 January 2021",
      amount: "+$5,400",
      isCredit: true,
    },
  ];

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

  return (
    <div className="pb-12 w-full max-w-md sm:max-w-xl md:max-w-4xl mx-auto px-2 sm:px-4 overflow-x-hidden">
      {/* Header */}
      <div className="flex p-4 px-6 justify-between items-center">
        <h1 className="font-semibold text-[16px] text-[#343C6A]">My Cards</h1>
        <p className="font-semibold text-[14px] text-[#343C6A] cursor-pointer hover:underline">
          See All
        </p>
      </div>

      {/* Credit Cards Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-2 p-2 sm:p-4 [&::-webkit-scrollbar]:hidden [ms-overflow-style:none] [scrollbar-width:none]">
        {mockCards.map((card, index) => {
          const isSecondCard = index === 1;

          return (
            <div
              key={card.id}
              className={`rounded-[15px] w-66.25 h-42.5 shrink-0 flex flex-col justify-between overflow-hidden ${
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
              <div className="p-3 pb-0">
                <div className="flex justify-between mt-2 ml-1">
                  <div className="flex flex-col">
                    <h2
                      className={`font-normal text-[11px] ml-0.5 ${
                        isSecondCard ? "text-[#718EBF]" : "text-white/80"
                      }`}
                    >
                      Balance
                    </h2>
                    <p className="font-semibold text-[16px]">{card.balance}</p>
                  </div>

                  <img src={chip} className="w-7.25 h-7.25" alt="Card Chip" />
                </div>

                <div className="flex gap-14 mt-4">
                  <div className="flex flex-col">
                    <h3
                      className={`font-normal text-[10px] ${
                        isSecondCard ? "text-[#718EBF]" : "text-white/70"
                      }`}
                    >
                      CARD HOLDER
                    </h3>
                    <p className="font-semibold text-[13px]">
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
                    : "border-white/15 bg-linear-to-b from-white/15 to-white/0"
                }`}
              >
                <p className="text-[15px] font-semibold tracking-wider">
                  {card.cardNumber}
                </p>
                <SiMastercard className="w-6.75 h-[18.41px]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Transactions Header */}
      <h4 className="font-semibold text-[#343C6A] text-[16px] mt-4 px-6">
        Recent Transactions
      </h4>

      {/* Transaction List */}
      <div className="flex flex-col gap-3 px-6 mt-4 w-full max-w-md mx-auto sm:mx-0">
        {mockTransactions.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between w-full p-2 bg-white rounded-[15px] sm:bg-transparent"
          >
            {/* Left Side: Icon & Details */}
            <div className="flex items-center gap-4">
              <img
                src={item.icon}
                alt={item.title}
                className="w-10 h-10 object-contain shrink-0"
              />
              <div className="flex flex-col">
                <h5 className="font-medium text-[#232323] text-[14px]">
                  {item.title}
                </h5>
                <p className="font-normal text-[12px] text-[#718EBF]">
                  {item.date}
                </p>
              </div>
            </div>

            {/* Right Side: Amount */}
            <p
              className={`text-[12px] font-medium shrink-0 ${
                item.isCredit ? "text-[#41D4A8]" : "text-[#FF4B4A]"
              }`}
            >
              {item.amount}
            </p>
          </div>
        ))}
      </div>

      {/* Weekly Activity */}
      <h6 className="text-[16px] font-semibold text-[#343C6A] px-6 mt-6">
        Weekly Activity
      </h6>
      <div className="px-6 mt-2 flex justify-center sm:justify-start">
        <img
          src={analysis}
          alt="Weekly Activity Chart"
          className="w-full max-w-md md:max-w-full h-auto object-contain"
        />
      </div>

      {/* Expense Statistics */}
      <h6 className="text-[16px] font-semibold text-[#343C6A] px-6 mt-6">
        Expense Statistics
      </h6>
      <div className="px-6 mt-4 flex justify-center">
        <img
          src={expenses}
          alt="Expense Statistics Chart"
          className="w-full max-w-md md:max-w-full h-auto object-contain"
        />
      </div>

      {/* Quick Transfer */}
      <h6 className="text-[16px] font-semibold text-[#343C6A] px-6 mt-8">
        Quick Transfer
      </h6>

      <div className="flex flex-col px-6 mt-6 gap-6 max-w-md">
        {/* Contact List */}
        <div className="flex items-center gap-6 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [ms-overflow-style:none] scrollbar-none">
          <div className="flex flex-col items-center shrink-0 cursor-pointer">
            <img
              src={livia}
              alt="Livia Bator"
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="text-center mt-2">
              <p className="font-normal text-[12px] text-[#232323]">
                Livia Bator
              </p>
              <p className="font-normal text-[12px] text-[#718EBF]">CEO</p>
            </div>
          </div>

          <div className="flex flex-col items-center shrink-0 cursor-pointer">
            <img
              src={randy}
              alt="Randy Press"
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="text-center mt-2">
              <p className="font-normal text-[12px] text-[#232323]">
                Randy Press
              </p>
              <p className="font-normal text-[12px] text-[#718EBF]">Director</p>
            </div>
          </div>

          <div className="flex flex-col items-center shrink-0 cursor-pointer">
            <img
              src={workman}
              alt="Workman"
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="text-center mt-2">
              <p className="font-normal text-[12px] text-[#232323]">Workman</p>
              <p className="font-normal text-[12px] text-[#718EBF]">Designer</p>
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 p-2 focus:outline-none cursor-pointer"
          >
            <img src={next} alt="Next" className="w-6 h-6 object-contain" />
          </button>
        </div>

        {/* Input Capsule */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
          <p className="text-[12px] font-normal text-[#718EBF] whitespace-nowrap">
            Write Amount
          </p>

          <div className="flex items-center justify-between rounded-[50px] bg-[#EDF1F7] w-full max-w-55 h-10 pl-4 overflow-hidden shrink-0">
            <p className="text-[12px] font-normal text-[#718EBF]">525.50</p>

            <button
              type="button"
              className="flex bg-[#1814F3] rounded-[50px] px-5 h-full items-center justify-center gap-2 cursor-pointer shrink-0 border-none outline-none"
            >
              <span className="font-medium text-[13px] text-white">Send</span>
              <img
                src={send}
                alt="Send"
                className="w-[16.1px] h-3.5 object-contain"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Balance History */}
      <h6 className="text-[16px] font-semibold text-[#343C6A] px-6 mt-8">
        Balance History
      </h6>
      <div className="px-6 mt-4 flex justify-center">
        <img
          src={bal}
          alt="Balance History Chart"
          className="w-full max-w-md md:max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Overview;
