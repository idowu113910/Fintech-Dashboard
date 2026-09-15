import { SiMastercard } from "react-icons/si";
import chip from "../assets/chip.svg";
import cardType from "../assets/Card Type.svg";
import cardType2 from "../assets/Card Type 2.svg";
import cardType3 from "../assets/Card Type 3.svg";
import block from "../assets/block card image.svg";
import block2 from "../assets/Change Pic code.svg";
import block3 from "../assets/Add to Google Pay.svg";
import { LiaApple } from "react-icons/lia";
import credit from "../assets/CREDIT BUREAU.svg";
import type { ReactNode } from "react";

const Credit = () => {
  interface CreditCard {
    id: number;
    balance: string;
    cardHolder: string;
    validThru: string;
    cardNumber: string;
  }

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

  const data = [
    { name: "DBL Bank", value: 25, color: "#2D60FF" },
    { name: "ABM Bank", value: 25, color: "#FF82AC" },
    { name: "BRC Bank", value: 25, color: "#16DBAA" },
    { name: "MCP Bank", value: 25, color: "#FCAA0B" },
  ];

  interface CardDetail {
    id: number;
    cardType: string;
    bank: string;
    image: string;
  }

  const cardsData: CardDetail[] = [
    {
      id: 1,
      cardType: "Secondary",
      bank: "DBL Bank",
      image: cardType,
    },
    {
      id: 2,
      cardType: "Primary",
      bank: "BRAC Bank",
      image: cardType2,
    },
    {
      id: 3,
      cardType: "Business",
      bank: "City Bank",
      image: cardType3,
    },
  ];

  interface Cards {
    id: number;
    image: string | ReactNode;
    title: string;
    description: string;
  }

  const allCards: Cards[] = [
    {
      id: 1,
      image: block,
      title: "Block Card",
      description: "Instantly block your card",
    },

    {
      id: 2,
      image: block2,
      title: "Change Pic Code",
      description: "Withdraw without any card",
    },

    {
      id: 3,
      image: block3,
      title: "Add to Google Pay",
      description: "Withdraw without any card",
    },

    {
      id: 4,
      image: <LiaApple className="w-6 h-6 text-[#16DBCC]" />,
      title: "Add to Apple Pay",
      description: "Withdraw without any card",
    },
    {
      id: 5,
      image: <LiaApple className="w-6 h-6 text-[#16DBCC]" />,
      title: "Add to Apple Store",
      description: "Withdraw without any card",
    },
  ];

  return (
    <div className="w-full max-w-md sm:max-w-xl md:max-w-4xl mx-auto px-4 sm:px-6 py-2">
      {/* Header */}
      <div className="py-2">
        <h1 className="font-semibold text-[16px] text-[#343C6A]">My Cards</h1>
      </div>

      {/* Credit Cards Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-3 py-2 [&::-webkit-scrollbar]:hidden [ms-overflow-style:none] scrollbar-none -mt-1.5">
        {mockCards.map((card, index) => {
          const isSecondCard = index === 1;

          return (
            <div
              key={card.id}
              className="rounded-[15px] w-64 xs:w-66.25 h-42.5 shrink-0 flex flex-col justify-between overflow-hidden text-white"
              style={{
                background: isSecondCard
                  ? "linear-gradient(135deg, #4C49ED 0%, #0A06F4 100%)"
                  : "linear-gradient(135deg, #2D60FF 0%, #539BFF 100%)",
              }}
            >
              {/* Top & Middle Card Content */}
              <div className="p-3 pb-0">
                <div className="flex justify-between mt-2 ml-1">
                  <div className="flex flex-col">
                    <h2 className="font-normal text-[11px] ml-0.5 text-white/80">
                      Balance
                    </h2>
                    <p className="font-semibold text-[16px]">{card.balance}</p>
                  </div>

                  <img src={chip} className="w-7.25 h-7.25" alt="Card Chip" />
                </div>

                <div className="flex justify-between pr-4 mt-4">
                  <div className="flex flex-col">
                    <h3 className="font-normal text-[10px] text-white/70">
                      CARD HOLDER
                    </h3>
                    <p className="font-semibold text-[13px]">
                      {card.cardHolder}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-normal text-[10px] text-white/70">
                      VALID THRU
                    </h3>
                    <p className="font-semibold text-[13px]">
                      {card.validThru}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="flex justify-between items-center px-4 py-3 border-t border-white/15 bg-linear-to-b from-white/15 to-white/0">
                <p className="text-[15px] font-semibold tracking-wider">
                  {card.cardNumber}
                </p>
                <SiMastercard className="w-6.75 h-[18.41px]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Expense Statistics Chart Card */}
      <h3 className="text-[16px] font-semibold text-[#333B69] mb-3 mt-4">
        Card Expense Statistics
      </h3>
      <div className="w-full bg-white rounded-2xl p-4 sm:p-5 mt-4">
        <div className="relative flex flex-col items-center">
          <div className="h-44 w-full max-w-55">
            <img src={credit} alt="" />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-1.5 mt-12 text-center sm:text-left">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-[#718EBF] truncate">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card List Section */}
      <h4 className="font-semibold mt-6 mb-3 text-[#333B69] text-[16px]">
        Card List
      </h4>

      <div className="flex flex-col gap-3">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="rounded-[10px] w-full bg-white p-3 min-h-16 flex items-center justify-between gap-2 sm:gap-4 overflow-hidden"
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <img
                src={card.image}
                alt="Card Icon"
                className="w-10 h-10 shrink-0 object-contain"
              />

              <div className="flex items-center gap-4 sm:gap-8 min-w-0 flex-1">
                <div className="flex flex-col min-w-0">
                  <p className="text-[13px] sm:text-[14px] text-[#232323] font-medium truncate">
                    Card Type
                  </p>
                  <p className="font-normal text-[11px] sm:text-[12px] text-[#718EBF] truncate">
                    {card.cardType}
                  </p>
                </div>

                <div className="flex flex-col min-w-0">
                  <p className="font-medium text-[13px] sm:text-[14px] text-[#232323] truncate">
                    Bank
                  </p>
                  <p className="font-normal text-[11px] sm:text-[12px] text-[#718EBF] truncate">
                    {card.bank}
                  </p>
                </div>
              </div>
            </div>

            <p className="font-medium text-[#1814F3] text-[11px] sm:text-[12px] whitespace-nowrap cursor-pointer hover:underline shrink-0">
              View Details
            </p>
          </div>
        ))}
      </div>

      <h5 className="font-semibold text-[16px] text-[#333B69] mt-4">
        Add New Card
      </h5>

      <div className="w-full bg-white border border-[#DFEAF2] rounded-[15px] p-4 sm:p-5 mt-4">
        <p className="text-[12px] font-normal text-[#718EBF] leading-relaxed">
          Credit Card generally means a plastic card issued by Scheduled
          Commercial Banks assigned to a Cardholder, with a credit limit, that
          can be used to purchase goods and services on credit or obtain cash
          advances.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-4 flex flex-col gap-3.5"
        >
          <div className="flex flex-col">
            <label className="font-normal text-[13px] text-[#232323]">
              Card Type
            </label>
            <input
              type="text"
              placeholder="Classic"
              className="border border-[#DFEAF2] rounded-[10px] mt-1.5 w-full h-10 px-4 placeholder:text-[#718EBF] 
              text-[12px] font-normal text-[#232323] outline-none focus:border-[#1814F3] transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-normal text-[13px] text-[#232323]">
              Name On Card
            </label>
            <input
              type="text"
              placeholder="My Cards"
              className="border border-[#DFEAF2] rounded-[10px] mt-1.5 w-full h-10 px-4 placeholder:text-[#718EBF] text-[12px] 
              font-normal text-[#232323] outline-none focus:border-[#1814F3] transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-normal text-[13px] text-[#232323]">
              Card Number
            </label>
            <input
              type="text"
              placeholder="**** **** **** ****"
              className="border border-[#DFEAF2] rounded-[10px] mt-1.5 w-full h-10 px-4 placeholder:text-[#718EBF] text-[12px] 
              font-normal text-[#232323] outline-none focus:border-[#1814F3] transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-normal text-[13px] text-[#232323]">
              Expiration Date
            </label>
            <input
              type="text"
              placeholder="25 January 2025"
              className="border border-[#DFEAF2] rounded-[10px] mt-1.5 w-full h-10 px-4 placeholder:text-[#718EBF] text-[12px] 
              font-normal text-[#232323] outline-none focus:border-[#1814F3] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="rounded-[9px] bg-[#1814F3] text-white font-medium text-[13px] h-10 w-full mt-3 hover:bg-[#120ec2] transition-colors cursor-pointer"
          >
            Add Card
          </button>
        </form>
      </div>

      <h5 className="text-[16px] font-semibold text-[#333B69] mt-6">
        Card Setting
      </h5>

      <div className="bg-white rounded-[15px] w-full p-3 flex flex-col mt-4 gap-8">
        {allCards.map((card, index) => {
          const isLastTwo = index >= allCards.length - 2;

          return (
            <div key={card.id}>
              <div className="flex gap-4 items-center">
                {isLastTwo ? (
                  <div className="w-12 h-12 rounded-[15px] bg-[#DCFAF8] flex items-center justify-center shrink-0">
                    {card.image}
                  </div>
                ) : (
                  <img
                    src={card.image as string}
                    alt={card.title}
                    className="w-12 h-12 object-contain shrink-0"
                  />
                )}

                <div className="flex flex-col">
                  <p className="font-medium text-[14px] text-[#232323]">
                    {card.title}
                  </p>
                  <p className="text-[12px] font-normal text-[#718EBF]">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Credit;
