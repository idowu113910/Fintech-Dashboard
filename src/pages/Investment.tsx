import { useEffect, useState } from "react";
import bal from "../assets/invested amount.svg";
import NOI from "../assets/Number of investment.svg";
import Rate from "../assets/Rate of Return.svg";
import app from "../assets/Apple 2.svg";
import sam from "../assets/Samsung.svg";
import tesla from "../assets/Tesla.svg";

interface BalanceCardItem {
  id: number;
  icon: string;
  label: string;
  value: number;
  type: "currency" | "raw" | "percentage";
}

const stores = [
  {
    id: 1,
    title: "Apple Store",
    category: "E-commerce, Marketplace",
    percentageChange: "+16%",
    image: app,
  },
  {
    id: 2,
    title: "Samsung Mobile",
    category: "Mobile Apps, Marketplace",
    percentageChange: "+24%",
    image: sam,
  },
  {
    id: 3,
    title: "Tesla Motors",
    category: "Electric Vehicles",
    percentageChange: "-5%",
    image: tesla,
  },
];

type Stock = {
  sl: string;
  name: string;
  price: number;
  return: number;
};

const trendingStocks: Stock[] = [
  { sl: "01.", name: "Trivago", price: 520, return: 5 },
  { sl: "02.", name: "Canon", price: 480, return: 10 },
  { sl: "03.", name: "Uber Food", price: 350, return: -3 },
  { sl: "04.", name: "Nokia", price: 940, return: 2 },
  { sl: "05.", name: "Tiktok", price: 670, return: -12 },
];

const ReturnText = ({ value }: { value: number }) => {
  const isPositive = value >= 0;
  return (
    <span className={isPositive ? "text-green-500" : "text-red-500"}>
      {isPositive ? "+" : ""}
      {value}%
    </span>
  );
};

const useCountUp = (target: number, duration = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const currentCount = progress * target;
      setCount(currentCount);

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
  value,
  type,
}: {
  icon: string;
  label: string;
  value: number;
  type: "currency" | "raw" | "percentage";
}) => {
  const count = useCountUp(value, 2500);

  const formatValue = () => {
    if (type === "currency") return `$${Math.floor(count).toLocaleString()}`;
    if (type === "percentage") {
      const formatted = count.toFixed(2);
      return count >= 0 ? `+${formatted}%` : `${formatted}%`;
    }
    return Math.floor(count).toLocaleString();
  };

  return (
    <div className="flex rounded-[15px] bg-white w-full h-21.25 items-center justify-start gap-3 p-4 shadow-xs border border-gray-100">
      <img src={icon} alt="" className="w-11 h-11 shrink-0 object-contain" />
      <div className="flex flex-col min-w-0">
        <p className="text-[12px] font-normal text-[#718EBF] truncate">
          {label}
        </p>
        <p className="text-[16px] font-semibold text-[#232323] truncate">
          {formatValue()}
        </p>
      </div>
    </div>
  );
};

const YearlyInvestmentChart = () => {
  const points = [
    { x: 82, y: 163 },
    { x: 125, y: 97 },
    { x: 166, y: 125 },
    { x: 210, y: 47 },
    { x: 252, y: 106 },
    { x: 296, y: 76 },
  ];

  const linePath =
    "M82 163L125.141 95.8041L166.578 125.845L209.435 46L252.008 106.872L296 76.0405";

  const yAxisLabels = ["$40,000", "$30,000", "$20,000", "$10,000", "$0"];
  const yPositions = [29.2, 68.66, 108.12, 147.57, 185.38];

  const xAxisLabels = ["2016", "2017", "2018", "2019", "2020", "2021"];

  return (
    <div className="bg-white rounded-[15px] p-3 sm:p-4 w-full shadow-xs border border-gray-100">
      <svg
        viewBox="0 0 325 225"
        className="w-full h-auto max-h-56.25"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dashed horizontal gridlines */}
        {yPositions.map((y, i) => (
          <line
            key={i}
            x1="73.2"
            y1={y}
            x2="315"
            y2={y}
            stroke="#DFE5EE"
            strokeWidth="0.41"
            strokeDasharray="4 4"
          />
        ))}

        {/* Y-axis value labels */}
        {yAxisLabels.map((label, i) => (
          <text
            key={label}
            x={label === "$0" ? "54" : "20"}
            y={yPositions[i] + 4}
            fontSize="12"
            fill="#718EBF"
            textAnchor="start"
          >
            {label}
          </text>
        ))}

        {/* X-axis year labels */}
        {xAxisLabels.map((label, i) => (
          <text
            key={label}
            x={points[i].x + 8}
            y="205"
            fontSize="12"
            fill="#718EBF"
            textAnchor="middle"
          >
            {label}
          </text>
        ))}

        {/* Trend line */}
        <path
          d={linePath}
          stroke="#FCAA0B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Data point circles */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="3.75"
            fill="white"
            stroke="#EDA10D"
            strokeWidth="2.5"
          />
        ))}
      </svg>
    </div>
  );
};

// Monthly Revenue chart — replaced with the smooth teal curve, using the
// exact path data from the uploaded SVG. Month labels kept (Jan-Jun) since
// this section represents monthly, not yearly, data.
const MonthlyRevenueChart = () => {
  const smoothCurvePath =
    "M76 142C79.5813 136.613 82.0607 132.054 89.7743 132.054C97.4879 132.054 99.9672 106.775 110.987 104.703C122.006 102.631 125.863 139.928 136.882 139.099C147.902 138.27 146.249 86.0551 157.544 80.6678C168.839 75.2805 173.246 57.8754 184.266 57.0466C195.285 56.2178 197.765 104.703 208.508 104.703C219.252 104.703 222.283 73.2085 231.925 73.2085C241.567 73.2085 246.801 91.0279 258.371 91.4424C269.942 91.4424 270.217 126.253 280.686 126.253C291.154 126.253 295.562 49.5873 303 50.0017";

  const yAxisLabels = ["$40,000", "$30,000", "$20,000", "$10,000", "$0"];
  const yPositions = [29.2055, 68.6611, 108.117, 147.572, 185.384];

  const xAxisLabels = ["2016", "2017", "2018", "2019", "2020", "2021"];
  const xPositions = [76, 116, 156, 197, 237, 277];

  return (
    <div className="bg-white rounded-[15px] p-3 sm:p-4 w-full shadow-xs border border-gray-100">
      <svg
        viewBox="0 0 325 225"
        className="w-full h-auto max-h-56.25"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dashed horizontal gridlines */}
        {yPositions.map((y, i) => (
          <line
            key={i}
            x1="73.2"
            y1={y}
            x2="304.8"
            y2={y}
            stroke="#DFE5EE"
            strokeWidth="0.41"
            strokeDasharray="4 4"
          />
        ))}

        {/* Y-axis value labels */}
        {yAxisLabels.map((label, i) => (
          <text
            key={label}
            x={label === "$0" ? "54" : "20"}
            y={yPositions[i] + 4}
            fontSize="12"
            fill="#718EBF"
            textAnchor="start"
          >
            {label}
          </text>
        ))}

        {/* X-axis month labels */}
        {xAxisLabels.map((label, i) => (
          <text
            key={label}
            x={xPositions[i]}
            y="205"
            fontSize="12"
            fill="#718EBF"
            textAnchor="start"
          >
            {label}
          </text>
        ))}

        {/* Smooth trend curve — exact path from source SVG */}
        <path
          d={smoothCurvePath}
          stroke="#16DBCC"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

const BalanceCardsList = () => {
  const mockBalanceApi: BalanceCardItem[] = [
    {
      id: 1,
      icon: bal,
      label: "Total Invested Amount",
      value: 150000,
      type: "currency",
    },
    {
      id: 2,
      icon: NOI,
      label: "Number of Investments",
      value: 1250,
      type: "raw",
    },
    {
      id: 3,
      icon: Rate,
      label: "Rate of Return",
      value: 5.8,
      type: "percentage",
    },
  ];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 py-2">
      {/* Cards Container */}
      <div className="flex flex-col gap-3 w-full">
        {mockBalanceApi.map((card) => (
          <SummaryCard
            key={card.id}
            icon={card.icon}
            label={card.label}
            value={card.value}
            type={card.type}
          />
        ))}
      </div>

      {/* Yearly Investment Chart Section */}
      <h5 className="my-4 text-[16px] font-semibold text-[#333B69]">
        Yearly Total Investment
      </h5>

      <div className="w-full -mt-2">
        <YearlyInvestmentChart />
      </div>

      {/* Monthly Revenue Chart Section */}
      <h5 className="my-4 text-[16px] font-semibold text-[#333B69]">
        Monthly Revenue
      </h5>

      <div className="w-full -mt-2">
        <MonthlyRevenueChart />
      </div>

      {/* My Investment Stores Section */}
      <h6 className="font-semibold text-[#333B69] text-[16px] mt-4">
        My Investment
      </h6>

      <div className="flex flex-col gap-3">
        {stores.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[10px] mt-3 p-3 flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              <img src={item.image} alt={item.title} />

              <div className="flex flex-col">
                <p className="text-[14px] font-medium text-[#232323]">
                  {item.title}
                </p>
                <p className="font-normal text-[12px] text-[#718EBF]">
                  {item.category}
                </p>
              </div>
            </div>

            <p className="font-medium text-[12px] text-[#16DBAA]">
              {item.percentageChange}
            </p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mt-4">
        Trending Stock
      </h3>
      <div className="w-full max-w-lg bg-white rounded-xl p-5 mt-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[#718EBF] text-xs font-medium">
              <th className="text-left pb-3 font-normal">SL No</th>
              <th className="text-left pb-3 font-normal">Name</th>
              <th className="text-left pb-3 font-normal">Price</th>
              <th className="text-left pb-3 font-normal">Return</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {trendingStocks.map((stock) => (
              <tr key={stock.sl} className="border-t border-gray-100">
                <td className="py-3">{stock.sl}</td>
                <td className="py-3 font-medium">{stock.name}</td>
                <td className="py-3">${stock.price}</td>
                <td className="py-3">
                  <ReturnText value={stock.return} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalanceCardsList;
