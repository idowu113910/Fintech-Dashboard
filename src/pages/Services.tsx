import Li from "../assets/Life Insurance.svg";
import sa from "../assets/Savings.svg";
import checking from "../assets/Checking.svg";
import bus from "../assets/Bus Loans.svg";
import checkingsaccount from "../assets/Checking.svg";
import savingsaccount from "../assets/Savings account.svg";
import debitandcredit from "../assets/Debit and Credit Cards.svg";
import life from "../assets/Life Insurance 2.svg";
import businessloans from "../assets/Bus Loans.svg";

const Services = () => {
  const Insurance = [
    {
      id: 1,
      image: Li,
      title: "Life Insurance",
      description: "Unlimited protection",
    },
    {
      id: 2,
      image: sa,
      title: "Savings",
      description: "Buy. Think. Grow",
    },
    {
      id: 3,
      image: checking,
      title: "Checking",
      description: "Save",
    },
  ];

  const serviceList = [
    {
      id: 1,
      image: bus,
      title: "Business loans",
      description: "It is a long established",
      details: "View Details",
    },
    {
      id: 2,
      image: checkingsaccount,
      title: "Checking accounts",
      description: "It is a long established",
      details: "View Details",
    },
    {
      id: 3,
      image: savingsaccount,
      title: "Savings accounts",
      description: "It is a long established",
      details: "View Details",
    },
    {
      id: 4,
      image: debitandcredit,
      title: "Debit and credit cards",
      description: "It is a long established",
      details: "View Details",
    },
    {
      id: 5,
      image: life,
      title: "Life Insurance",
      description: "It is a long established",
      details: "View Details",
    },
    {
      id: 6,
      image: businessloans,
      title: "Business loans",
      description: "It is a long established",
      details: "View Details",
    },
  ];

  return (
    <div className="w-full max-w-md sm:max-w-xl md:max-w-4xl mx-auto px-6 sm:px-6 py-2">
      <div className="flex flex-nowrap gap-3 overflow-x-auto py-2 scrollbar-none [&::-webkit-scrollbar]:hidden [ms-overflow-style:none]">
        {Insurance.map((insure) => (
          <div
            key={insure.id}
            className="rounded-[15px] flex items-center gap-3 bg-white p-4 border border-[#DFEAF2] shadow-sm shrink-0 w-64 sm:w-72"
          >
            <img
              src={insure.image}
              alt={insure.title}
              className="w-11 h-11 object-contain shrink-0"
            />

            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="font-semibold text-[#232323] text-[15px] sm:text-[16px] truncate">
                {insure.title}
              </p>
              <p className="text-[#718EBF] text-[12px] font-normal truncate">
                {insure.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-semibold text-[16px] text-[#343C6A] mt-4">
        Bank Services List
      </h2>

      <div className="flex flex-col gap-4 mt-4">
        {serviceList.map((list) => (
          <div
            key={list.id}
            className="bg-white rounded-[10px] w-full flex items-center justify-between py-2 px-3 gap-3"
          >
            {/* Left side: Image + Text grouped together */}
            <div className="flex items-center gap-3">
              <img src={list.image} alt="" className="shrink-0" />
              <div className="flex flex-col gap-0.5">
                <p className="font-medium text-[14px] text-[#232323]">
                  {list.title}
                </p>
                <p className="font-normal text-[12px] text-[#718EBF]">
                  {list.description}
                </p>
              </div>
            </div>

            {/* Right side: Aligned to the far end */}
            <div className="shrink-0 text-right">
              <p className="font-normal text-[#1814F3] text-[12px]">
                {list.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
