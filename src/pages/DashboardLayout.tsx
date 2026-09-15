import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import girl from "../assets/image.svg";
import { IoIosSearch, IoIosSettings } from "react-icons/io";
import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import transaction from "../assets/transaction.svg";
import { FaUser } from "react-icons/fa";
import investment from "../assets/investments.svg";
import credit from "../assets/credit cards.svg";
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

// SVG filter tuned for active state (#1814F3)
const ACTIVE_IMAGE_FILTER =
  "invert(13%) sepia(94%) saturate(7191%) hue-rotate(244deg) brightness(96%) contrast(106%)";

// SVG filter tuned for unclicked/inactive state (#B1B1B1)
const INACTIVE_IMAGE_FILTER =
  "invert(78%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(88%) contrast(85%)";

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
    <div className="min-h-dvh bg-[#F5F7FA]">
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
              className="w-full h-12 rounded-[40px] py-3.5 pl-11 pr-11 outline-none bg-white placeholder:text-[13px] text-[#8BA3CB] font-normal border border-transparent focus:border-[#1814F3] transition"
            />
            <IoIosSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8BA3CB] text-xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Hamburger Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
          />

          <div
            className={`relative w-64 max-w-[80%] h-full bg-white shadow-lg p-6 flex flex-col gap-2 transition-transform duration-300 ease-out ${
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
              const textColorClass = isActive
                ? "text-[#1814F3]"
                : "text-[#B1B1B1]";
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleClose}
                  className={`flex items-center gap-3 font-medium text-[15px] py-2.5 px-3 rounded-lg hover:bg-[#F5F7FA] transition relative ${textColorClass}`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#1814F3] rounded-r-md" />
                  )}

                  {/* Dynamic Image or Icon */}
                  {item.isImage ? (
                    <img
                      src={item.icon as string}
                      alt=""
                      className="w-5 h-5 shrink-0 transition-all duration-200"
                      style={{
                        filter: isActive
                          ? ACTIVE_IMAGE_FILTER
                          : INACTIVE_IMAGE_FILTER,
                      }}
                    />
                  ) : (
                    <Icon className={`w-5 h-5 shrink-0 ${textColorClass}`} />
                  )}

                  {/* Text Label */}
                  <span className={textColorClass}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
