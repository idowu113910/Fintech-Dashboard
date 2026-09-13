import personalLoans from "../assets/Personal Loans.svg";
import corporateLoans from "../assets/Coporate Loans.svg";

const Loans = () => {
  const loanCategories = [
    {
      id: 1,
      image: personalLoans,
      title: "Personal Loans",
      amount: "$50,000",
    },
    {
      id: 2,
      image: corporateLoans,
      title: "Corporate Loans",
      amount: "$100,000",
    },
    {
      id: 3,
      image: personalLoans,
      title: "Mortgage Loans",
      amount: "$150,000",
    },
  ];

  interface LoanItem {
    id: number;
    loanMoney: string;
    leftToRepay: string;
  }

  const loans: LoanItem[] = [
    { id: 1, loanMoney: "$100,000", leftToRepay: "$40,500" },
    { id: 2, loanMoney: "$500,000", leftToRepay: "$250,000" },
    { id: 3, loanMoney: "$900,000", leftToRepay: "$40,500" },
    { id: 4, loanMoney: "$50,000", leftToRepay: "$40,500" },
    { id: 5, loanMoney: "$50,000", leftToRepay: "$40,500" },
    { id: 6, loanMoney: "$80,000", leftToRepay: "$25,500" },
    { id: 7, loanMoney: "$12,000", leftToRepay: "$5,500" },
    { id: 8, loanMoney: "$160,000", leftToRepay: "$100,800" },
  ];

  const totalLoanMoney = "$1,250,000";
  const totalLeftToRepay = "$750,000";

  return (
    <div className="w-full max-w-md sm:max-w-xl md:max-w-4xl mx-auto px-4 sm:px-6 py-2">
      {/* Top Cards Horizontal Carousel */}
      <div className="flex overflow-x-auto gap-3 py-2 [&::-webkit-scrollbar]:hidden [ms-overflow-style:none] scrollbar-none">
        {loanCategories.map((category) => (
          <div
            key={category.id}
            className="flex flex-row items-center gap-3 p-4 bg-white rounded-xl border 
            border-[#DFEAF2] shadow-sm shrink-0 min-w-50 flex-1 sm:flex-initial"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-10 h-10 object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <h3 className="text-[12px] font-normal text-[#718EBF] truncate">
                {category.title}
              </h3>
              <p className="text-[15px] sm:text-[16px] text-[#232323] font-semibold truncate">
                {category.amount}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Loans Table Section */}
      <div className="w-full mt-6">
        <h2 className="text-[18px] sm:text-[20px] font-bold text-[#232323] mb-3">
          Active Loans Overview
        </h2>

        <div className="bg-[#F5F7FA] rounded-[15px] p-3.5 sm:p-5 overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 text-[11px] sm:text-[12px] font-medium text-[#718EBF] pb-3 border-b border-gray-200/70">
            <span>Loan Money</span>
            <span>Left to repay</span>
            <span className="text-right sm:text-center w-16 sm:w-20">
              Repay
            </span>
          </div>

          {/* Loan Items List */}
          <div className="flex flex-col">
            {loans.map((loan) => (
              <div
                key={loan.id}
                className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center py-3 border-b border-gray-200/70 last:border-b-0"
              >
                <span className="text-[11px] sm:text-[12px] font-normal text-[#232323] truncate">
                  {loan.loanMoney}
                </span>
                <span className="text-[11px] sm:text-[12px] font-normal text-[#232323] truncate">
                  {loan.leftToRepay}
                </span>
                <div className="flex justify-end sm:justify-center">
                  <button
                    type="button"
                    className="border border-[#1814F3] text-[#1814F3] font-medium text-[11px] sm:text-[12px] rounded-[50px] px-3 sm:px-4 py-1 hover:bg-[#2D60FF] hover:text-white transition cursor-pointer"
                  >
                    Repay
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Row */}
          <div className="pt-3.5 mt-1 border-t border-gray-200/70">
            <p className="text-[11px] sm:text-[12px] font-semibold text-[#FE5C73]">
              Total
            </p>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 mt-1">
              <span className="text-[11px] sm:text-[12px] font-semibold text-[#FE5C73] truncate">
                {totalLoanMoney}
              </span>
              <span className="text-[11px] sm:text-[12px] font-semibold text-[#FE5C73] truncate">
                {totalLeftToRepay}
              </span>
              <div className="w-16 sm:w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
