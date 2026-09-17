import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import girl from "../assets/image.svg";
import { IoIosSearch, IoIosSettings } from "react-icons/io";
import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import transaction from "../assets/transaction.svg";
import { FaUser } from "react-icons/fa";
import investment from "../assets/investments.svg";
import credit from "../assets/credit cards.svg"; // Renamed space to hyphen
import loan from "../assets/Loans.svg";
import service from "../assets/services.svg";

interface MenuItem {
  label: string;
  title: string;
  path: string;
  icon: any;
  isImage: boolean;
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    title: "Overview",
    path: "/",
    icon: AiFillHome,
    isImage: false,
  },
  {
    label: "Transactions",
    title: "Transactions",
    path: "/transactions",
    icon: transaction,
    isImage: true,
  },
  {
    label: "Accounts",
    title: "Accounts",
    path: "/account",
    icon: FaUser,
    isImage: false,
  },
  {
    label: "Investments",
    title: "Investments",
    path: "/investment",
    icon: investment,
    isImage: true,
  },
  {
    label: "Credit Cards",
    title: "Credit Cards",
    path: "/credit",
    icon: credit,
    isImage: true,
  },
  {
    label: "Loans",
    title: "Loans",
    path: "/loan",
    icon: loan,
    isImage: true,
  },
  {
    label: "Services",
    title: "Services",
    path: "/services",
    icon: service,
    isImage: true,
  },
  {
    label: "Settings",
    title: "Settings",
    path: "/settings",
    icon: IoIosSettings,
    isImage: false,
  },
];

const DashboardLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const [navbarProfilePic, setNavbarProfilePic] = useState<string>(() => {
    return localStorage.getItem("user_profile_picture") || girl;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const updatedPic = localStorage.getItem("user_profile_picture");
      if (updatedPic) {
        setNavbarProfilePic(updatedPic);
      }
    };

    window.addEventListener("profilePicUpdated", handleUpdate);
    return () => window.removeEventListener("profilePicUpdated", handleUpdate);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    } else {
      setIsVisible(false);
    }
  }, [isMenuOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsMenuOpen(false), 300);
  };

  const checkIsActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const currentPage = menuItems.find((item) => checkIsActive(item.path));
  const pageTitle = currentPage ? currentPage.title : "Overview";

  return (
    <>
      <div className="w-full h-full min-h-screen min-h-[100dvh] min-h-[-webkit-fill-available] bg-[#F5F7FA] grid grid-rows-[auto_1fr]">
        {/* Header / Top Section */}
        <div className="p-7 px-4">
          <div className="flex px-4 gap-8 justify-between items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="p-1 hover:bg-gray-100 rounded-lg transition"
            >
              <RxHamburgerMenu className="mt-1 text-2xl text-[#343C6A]" />
            </button>

            <h1 className="text-[20px] text-[#343C6A] font-semibold">
              {pageTitle}
            </h1>

            <img
              src={navbarProfilePic}
              alt="User Profile"
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
            />
          </div>

          <div className="w-full px-4 mt-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for something"
                className="w-full h-12 rounded-[40px] py-3.5 pl-11 pr-11 outline-none bg-white placeholder:text-[13px]
                 text-[#8BA3CB] font-normal border border-transparent focus:border-[#1814F3] transition"
              />
              <IoIosSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8BA3CB] text-xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Hamburger Drawer */}
        {/* Hamburger Drawer */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex h-screen h-[100dvh] min-h-[-webkit-fill-available] w-full">
            {/* Backdrop */}
            <div
              className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              onClick={handleClose}
            />

            {/* Drawer Panel */}
            <div
              className={`relative w-64 max-w-[80%] h-full min-h-[-webkit-fill-available] bg-white shadow-lg p-6 flex flex-col gap-2 transition-transform duration-300 ease-out z-10 ${
                isVisible ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <button
                type="button"
                onClick={handleClose}
                className="self-end mb-4 p-1 hover:bg-gray-100 rounded-lg transition"
                aria-label="Close menu"
              >
                <RxCross2 className="text-[#343C6A] text-xl" />
              </button>

              {menuItems.map((item) => {
                const isActive = checkIsActive(item.path);
                const activeHex = "#1814F3";
                const inactiveHex = "#B1B1B1";
                const currentColor = isActive ? activeHex : inactiveHex;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleClose}
                    style={{ color: currentColor }}
                    className="flex items-center gap-3 font-medium text-[15px] py-2.5 px-3 rounded-lg hover:bg-[#F5F7FA] transition relative"
                  >
                    {/* Left indicator bar for active item */}
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#1814F3] rounded-r-md" />
                    )}

                    {/* SVG Mask rendering */}
                    {item.isImage ? (
                      <span
                        className="w-5 h-5 shrink-0 inline-block"
                        style={{
                          backgroundColor: currentColor,
                          WebkitMaskImage: `url("${item.icon}")`,
                          maskImage: `url("${item.icon}")`,
                          WebkitMaskSize: "contain",
                          maskSize: "contain",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskPosition: "center",
                        }}
                      />
                    ) : (
                      <Icon
                        className="w-5 h-5 shrink-0 transition-colors duration-200"
                        style={{ color: currentColor }}
                      />
                    )}

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <main className="flex-1 w-full flex flex-col">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
