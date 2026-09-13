import bal from "../assets/My Bal.svg";
import ex from "../assets/ex.svg";
import ts from "../assets/Ts.svg";
import income from "../assets/second bal.svg";
import { useEffect, useState } from "react";
import spotify from "../assets/Spotify.svg";
import freelance from "../assets/Mobile service.svg";
import shopping from "../assets/emily.svg";
import chip from "../assets/chip.svg";
import app from "../assets/applee.svg";
import mike from "../assets/Michael 2.svg";
import ps from "../assets/PS 2.svg";
import pro from "../assets/william 2.svg";

interface TransactionItem {
  id: number;
  icon: string;
  title: string;
  amount: string;
  date?: string;
  timeAgo?: string;
  isExpense?: boolean;
}

interface CreditCard {
  id: number;
  balance: string;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
}

const useCountUp = (target: number, duration = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return count;
};

const SummaryCard = ({
  icon,
  label,
  amount,
}: {
  icon: string;
  label: string;
  amount: number;
}) => {
  const count = useCountUp(amount, 2500);

  return (
    <div className="flex rounded-[15px] bg-white w-full h-21.25 items-center justify-start gap-3 p-4 shadow-xs">
      <img
        src={icon}
        alt=""
        className="w-11.25 h-11.25 shrink-0 object-contain"
      />

      <div className="flex flex-col min-w-0">
        <p className="text-[12px] font-normal text-[#718EBF] truncate">
          {label}
        </p>
        <p className="text-[16px] font-semibold text-[#232323] truncate">
          ${count.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const Accounts = () => {
  const summaryCards = [
    {
      id: 1,
      icon: bal,
      label: "My Balance",
      amount: 12750,
    },
    {
      id: 2,
      icon: income,
      label: "Income",
      amount: 8500,
    },
    {
      id: 3,
      icon: ex,
      label: "Expense",
      amount: 3200,
    },
    {
      id: 4,
      icon: ts,
      label: "Savings",
      amount: 5400,
    },
  ];

  const mockTransactions: TransactionItem[] = [
    {
      id: 1,
      icon: spotify,
      title: "Spotify Subscription",
      date: "25 Jan 2021",
      amount: "-$150",
      isExpense: true,
    },
    {
      id: 2,
      icon: freelance,
      title: "Mobile Service",
      date: "25 Feb 2021",
      amount: "-$340",
      isExpense: true,
    },
    {
      id: 3,
      icon: shopping,
      title: "Shopping Mall",
      date: "25 Mar 2021",
      amount: "+$780",
      isExpense: false,
    },
  ];

  const singleCard: CreditCard = {
    id: 1,
    balance: "$5,756",
    cardHolder: "Eddy Cusuma",
    validThru: "12/22",
    cardNumber: "3778 **** **** 1234",
  };

  const chartData = [
    { day: "Sat", debit: 72, credit: 130 },
    { day: "Sun", debit: 48, credit: 102 },
    { day: "Mon", debit: 44, credit: 64 },
    { day: "Tue", debit: 110, credit: 62 },
    { day: "Wed", debit: 78, credit: 116 },
    { day: "Thu", debit: 82, credit: 47 },
    { day: "Fri", debit: 96, credit: 122 },
  ];

  const mockInvoiceData: TransactionItem[] = [
    {
      id: 1,
      title: "Apple Store",
      timeAgo: "5h ago",
      amount: "$450",
      icon: app,
    },
    {
      id: 2,
      title: "Michael",
      timeAgo: "2 days ago",
      amount: "$160",
      icon: mike,
    },
    {
      id: 3,
      title: "Play Station",
      timeAgo: "5 days ago",
      amount: "$1085",
      icon: ps,
    },
    {
      id: 4,
      title: "William",
      timeAgo: "10 days ago",
      amount: "$90",
      icon: pro,
    },
  ];

  return (
    <div className="w-full max-w-md sm:max-w-xl md:max-w-4xl mx-auto px-4 py-6 overflow-x-hidden text-[#343C6A]">
      {/* Summary Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {summaryCards.map((card) => (
          <SummaryCard
            key={card.id}
            icon={card.icon}
            label={card.label}
            amount={card.amount}
          />
        ))}
      </div>

      {/* Transactions Header */}
      <h2 className="mt-6 text-[#333B69] text-[16px] font-semibold">
        Last Transaction
      </h2>

      {/* Transaction List Container */}
      <div className="flex flex-col border border-gray-100 bg-white rounded-[15px]
       p-4 mt-3 w-full max-w-md shadow-xs">
        {mockTransactions.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center justify-between gap-4 py-3 w-full ${
              index !== mockTransactions.length - 1
                ? "border-b border-[#F2F4F7]"
                : ""
            }`}
          >
            {/* Left Side: Dynamic Image & Text */}
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={item.icon}
                alt={item.title}
                className="w-10 h-10 object-contain shrink-0"
              />

              <div className="flex flex-col min-w-0">
                <p className="font-medium text-[#333B69] text-[14px] truncate">
                  {item.title}
                </p>

                <p className="font-normal text-[12px] text-[#718EBF] truncate">
                  {item.date}
                </p>
              </div>
            </div>

            {/* Right Side: Amount */}
            <p
              className={`font-medium text-[12px] shrink-0 ${
                item.isExpense === false ? "text-[#41D4A8]" : "text-[#FE5C73]"
              }`}
            >
              {item.amount}
            </p>
          </div>
        ))}
      </div>

      {/* Cards Section Header */}
      <div className="flex px-1 justify-between items-center mt-6 mb-2">
        <h1 className="font-semibold text-[16px] text-[#343C6A]">My Card</h1>
        <p className="font-semibold text-[14px] text-[#343C6A] cursor-pointer hover:underline">
          See All
        </p>
      </div>

      {/* Single Debit Card Display */}
      <div className="w-full max-w-md">
        <div className="rounded-[20px] w-full shrink-0 flex flex-col overflow-hidden 
        bg-[#2D60FF] text-white shadow-md">
          {/* Top & Middle Card Content */}
          <div className="p-5">
            <div className="flex justify-between items-start px-1">
              <div className="flex flex-col">
                <h2 className="font-normal text-[12px] text-white/80">
                  Balance
                </h2>
                <p className="font-semibold text-[20px] sm:text-[22px]">
                  {singleCard.balance}
                </p>
              </div>
              <img src={chip} className="w-8 h-8 mt-1" alt="Card Chip" />
            </div>

            <div className="flex gap-12 sm:gap-16 mt-6 px-1">
              <div className="flex flex-col">
                <h3 className="font-normal text-[10px] sm:text-[11px] text-white/60 tracking-wide uppercase">
                  CARD HOLDER
                </h3>
                <p className="font-semibold text-[13px] sm:text-[15px] mt-1 truncate">
                  {singleCard.cardHolder}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="font-normal text-[10px] sm:text-[11px] text-white/60 tracking-wide uppercase">
                  VALID THRU
                </h3>
                <p className="font-semibold text-[13px] sm:text-[15px] mt-1">
                  {singleCard.validThru}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar with Card Number & Logo Circles */}
          <div className="flex justify-between items-center px-6 py-4 bg-linear-to-b
           from-white/10 to-transparent border-t border-white/15">
            <p className="text-[15px] sm:text-[17px] font-semibold tracking-wider">
              {singleCard.cardNumber}
            </p>
            <div className="relative w-9 h-6 shrink-0 flex items-center justify-end">
              <div className="w-5 h-5 rounded-full bg-white/60 -mr-2" />
              <div className="w-5 h-5 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Header */}
      <h2 className="font-semibold text-[#333B69] text-[16px] px-1 mt-6 mb-3">
        Debit & Credit Overview
      </h2>

      {/* Bar Chart Container */}
      <div className="bg-white rounded-[15px] w-full max-w-md p-5 shadow-xs">
        {/* Legend */}
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-xs bg-[#4C78FF]" />
            <span className="text-[12px] sm:text-[13px] text-[#718EBF] font-medium">
              Debit
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-xs bg-[#FF82AC]" />
            <span className="text-[12px] sm:text-[13px] text-[#718EBF] font-medium">
              Credit
            </span>
          </div>
        </div>

        {/* Bars */}
        <div className="flex items-end justify-between gap-1.5 h-32 mt-6 px-1">
          {chartData.map((item) => (
            <div key={item.day} className="flex flex-col items-center flex-1">
              <div className="flex items-end gap-1">
                <div
                  className="w-2.5 rounded-xs bg-[#FC7900]"
                  style={{ height: `${item.debit}px` }}
                />
                <div
                  className="w-2.5 rounded-xs bg-[#1814F3]"
                  style={{ height: `${item.credit}px` }}
                />
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#718EBF] font-medium mt-2">
                {item.day}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices Sent Header */}
      <h2 className="font-semibold text-[#333B69] text-[16px] px-1 mt-6 mb-3">
        Invoices Sent
      </h2>

      {/* Invoices Sent List */}
      <div className="w-full max-w-md bg-white rounded-[15px] border
       border-gray-100 flex flex-col gap-3 p-4 shadow-xs">
        {mockInvoiceData.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center justify-between pb-2 ${
              index !== mockInvoiceData.length - 1
                ? "border-b border-[#F2F4F7]"
                : ""
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={item.icon}
                alt={item.title}
                className="w-9 h-9 object-contain shrink-0"
              />

              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-[#333B69] text-[14px] font-medium truncate">
                  {item.title}
                </p>
                <p className="text-[12px] text-[#718EBF] truncate">
                  {item.timeAgo}
                </p>
              </div>
            </div>

            <p className="font-medium text-[#718EBF] text-[13px] shrink-0">
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
