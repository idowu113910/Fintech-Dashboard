import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import girl from "../assets/image.svg";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import transaction from "../assets/transaction.svg";
import { FaUser } from "react-icons/fa";
import investment from "../assets/investments.svg";
import credit from "../assets/credit cards.svg";
import loan from "../assets/Loans.svg";
import service from "../assets/services.svg";
import { IoIosSettings } from "react-icons/io";

const menuItems = [
  {
    label: "Dashboard", // shown in the slide-in drawer
    title: "Overview", // shown in the h1 header
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

// CSS filter approximation to tint a black/dark SVG image to match
// the brand blue (#2D60FF). Since <img>-based SVGs can't be recolored
// with text-color classes the way icon-font components can, this
// filter chain is the standard workaround for tinting raster/image
// icons to a specific color.
const ACTIVE_IMAGE_FILTER =
  "invert(32%) sepia(93%) saturate(1352%) hue-rotate(213deg) brightness(97%) contrast(101%)";

// Tints the image to the inactive gray (#B1B1B1) the same way, so both
// states are true color matches instead of just opacity/grayscale.
const INACTIVE_IMAGE_FILTER =
  "invert(72%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(90%)";

const DashboardLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

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

  // Find the matching menu item for the current route. The h1 uses
  // `title` (e.g. "Overview"), while the drawer uses `label`
  // (e.g. "Dashboard") — same route, two different display strings.
  const currentPage = menuItems.find((item) => item.path === location.pathname);
  const pageTitle = currentPage ? currentPage.title : "Overview";

  return (
    // min-h-screen + bg color here wraps the header AND the <Outlet />
    // below, so every page rendered through this layout inherits the
    // same background color across the full height of the viewport.
    <div className="min-h-dvh bg-[#F5F7FA]">
      <div className="p-7 px-4">
        <div className="flex px-4 gap-8 justify-between">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <RxHamburgerMenu className="mt-1" />
          </button>

          <h1 className="text-[20px] text-[#343C6A] font-semibold">
            {pageTitle}
          </h1>

          <img src={girl} alt="" className="w-8.75 h-8.75" />
        </div>

        <div className="w-full px-4 mt-12">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for something"
              className="w-full h-12 rounded-[40px] py-3.5 pl-11 pr-11 outline-none bg-white placeholder:text-[13px] text-[#8BA3CB] font-normal"
            />
            <IoIosSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8BA3CB]  pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Slide-in menu drawer */}
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
              className="self-end mb-4"
              aria-label="Close menu"
            >
              <RxCross2 className="text-[#343C6A] text-xl" />
            </button>

            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const colorClass = isActive ? "text-[#2D60FF]" : "text-[#B1B1B1]";

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleClose}
                  className={`flex items-center gap-3 font-medium text-[15px] py-2.5 px-2 rounded-lg hover:bg-[#F5F7FA] transition ${colorClass}`}
                >
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
                    (() => {
                      const Icon = item.icon as React.ComponentType<{
                        className?: string;
                      }>;
                      return (
                        <Icon className={`w-5 h-5 shrink-0 ${colorClass}`} />
                      );
                    })()
                  )}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Each page's actual content renders here — inherits the
          same #F5F7FA background from the wrapping div above */}
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
