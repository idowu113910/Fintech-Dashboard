import { useState, useRef, type ChangeEvent } from "react";
import profilePic from "../assets/image.svg";
import editIcon from "../assets/edit icon.svg";

const Settings = () => {
  interface FormField {
    id: string;
    label: string;
    type: string;
    placeholder: string;
  }

  const editProfileFields: FormField[] = [
    {
      id: "name",
      label: "Your Name",
      type: "text",
      placeholder: "Charlene Reed",
    },
    {
      id: "username",
      label: "User Name",
      type: "text",
      placeholder: "Charlene Reed",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "charlenereed@gmail.com",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••••",
    },
    {
      id: "dob",
      label: "Date of Birth",
      type: "date",
      placeholder: "25 January 1990",
    },
    {
      id: "presentAddress",
      label: "Present Address",
      type: "text",
      placeholder: "San Jose, California, USA",
    },
    {
      id: "permanentAddress",
      label: "Permanent Address",
      type: "text",
      placeholder: "San Jose, California, USA",
    },
    { id: "city", label: "City", type: "text", placeholder: "San Jose" },
    {
      id: "postalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "45962",
    },
    { id: "country", label: "Country", type: "text", placeholder: "USA" },
  ];

  const [activeTab, setActiveTab] = useState("Edit Profile");
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // Loading state for Save button
  const [isLoading, setIsLoading] = useState(false);

  // Get currently saved image from localStorage (or default fallback)
  const [savedProfilePic, setSavedProfilePic] = useState<string>(() => {
    return localStorage.getItem("user_profile_picture") || profilePic;
  });

  // Staging/Preview state: holds selected image BEFORE saving
  const [previewPic, setPreviewPic] = useState<string>(savedProfilePic);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preferences, setPreferences] = useState({
    currency: "USD",
    timeZone: "(GMT-12:00) International Date Line West",
    digitalCurrency: true,
    merchantOrder: false,
    recommendations: true,
  });

  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewPic(base64String); // Stage image temporarily
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (id: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleTabChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    tab: string,
  ) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  // Async save handler with simulated loading delay
  const handleSave = async () => {
    setIsLoading(true);

    // Simulate standard request/save delay
    setTimeout(() => {
      // 1. Permanently store saved image in localStorage
      localStorage.setItem("user_profile_picture", previewPic);
      setSavedProfilePic(previewPic);

      // 2. Trigger global window event to inform DashboardLayout
      window.dispatchEvent(new Event("profilePicUpdated"));

      setIsLoading(false);

      console.log("Saving settings for:", activeTab, {
        formValues,
        preferences,
        twoFactorAuth,
        userProfilePic: previewPic,
      });
    }, 1200);
  };

  const tabs = ["Edit Profile", "Preference", "Security"];

  return (
    <div className="pb-8">
      <div className="w-full max-w-sm mx-auto bg-white rounded-[15px] p-6 shadow-sm border border-gray-100">
        {/* Navigation Tabs */}
        <div className="flex justify-between border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={(e) => handleTabChange(e, tab)}
              className={`pb-3 text-[14px] font-medium transition cursor-pointer ${
                activeTab === tab
                  ? "text-[#1814F3] border-b-2 border-[#1814F3] font-semibold"
                  : "text-[#718EBF] hover:text-[#232323]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB 1: EDIT PROFILE */}
        {activeTab === "Edit Profile" && (
          <div className="flex flex-col gap-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Profile Picture */}
            <div className="flex justify-center">
              <div className="relative w-24 h-24">
                <img
                  src={previewPic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1814F3] flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-[#0f0cb8] transition"
                >
                  <img src={editIcon} alt="Edit" className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              {editProfileFields.map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label
                    htmlFor={field.id}
                    className="text-[13px] font-medium text-[#232323]"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    autoComplete="off"
                    placeholder={field.placeholder}
                    value={formValues[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="border border-[#DFEAF2] rounded-[10px] h-10 w-full px-4 text-[13px] text-[#232323] placeholder:text-[#718EBF] outline-none focus:border-[#1814F3] transition"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PREFERENCE */}
        {activeTab === "Preference" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-normal text-[#232323]">
                Currency
              </label>
              <input
                type="text"
                autoComplete="off"
                value={preferences.currency}
                onChange={(e) =>
                  setPreferences({ ...preferences, currency: e.target.value })
                }
                className="border border-[#DFEAF2] rounded-[10px] h-10 w-full px-4 text-[13px] text-[#718EBF] outline-none focus:border-[#1814F3] transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-normal text-[#232323]">
                Time Zone
              </label>
              <input
                type="text"
                autoComplete="off"
                value={preferences.timeZone}
                onChange={(e) =>
                  setPreferences({ ...preferences, timeZone: e.target.value })
                }
                className="border border-[#DFEAF2] rounded-[10px] h-10 w-full font-normal px-4 text-[12px] text-[#718EBF] outline-none focus:border-[#1814F3] transition"
              />
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <p className="text-[14px] font-medium text-[#333B69]">
                Notification
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      digitalCurrency: !preferences.digitalCurrency,
                    })
                  }
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 shrink-0 ${
                    preferences.digitalCurrency
                      ? "bg-[#16DBCC]"
                      : "bg-[#E7EDF0]"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                      preferences.digitalCurrency
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-[13px] text-[#232323] font-normal leading-tight">
                  I send or receive digital currency
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      merchantOrder: !preferences.merchantOrder,
                    })
                  }
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 shrink-0 ${
                    preferences.merchantOrder ? "bg-[#16DBCC]" : "bg-[#E7EDF0]"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                      preferences.merchantOrder
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-[13px] text-[#232323] font-normal leading-tight">
                  I receive merchant order
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setPreferences({
                      ...preferences,
                      recommendations: !preferences.recommendations,
                    })
                  }
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 shrink-0 ${
                    preferences.recommendations
                      ? "bg-[#16DBCC]"
                      : "bg-[#E7EDF0]"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                      preferences.recommendations
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-[13px] text-[#232323] font-normal leading-tight">
                  There are recommendation for my account
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SECURITY */}
        {activeTab === "Security" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-medium text-[#333B69]">
                Two-factor Authentication
              </p>
              <div className="flex items-center gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 shrink-0 ${
                    twoFactorAuth ? "bg-[#16DBCC]" : "bg-[#E7EDF0]"
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                      twoFactorAuth ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="text-[13px] text-[#333B69] font-normal leading-tight">
                  Enable or disable two factor authentication
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <p className="text-[14px] font-medium text-[#232323]">
                Change Password
              </p>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-normal text-[#232323]">
                  Current Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  value={formValues.currentPassword || ""}
                  onChange={(e) =>
                    handleChange("currentPassword", e.target.value)
                  }
                  className="border border-[#DFEAF2] rounded-[10px] h-10 w-full px-4 text-[13px] text-[#232323] placeholder:text-[#718EBF] outline-none focus:border-[#1814F3] transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#232323]">
                  New Password
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••••"
                  value={formValues.newPassword || ""}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  className="border border-[#DFEAF2] rounded-[10px] h-10 w-full px-4 text-[12px] font-normal text-[#232323] placeholder:text-[#718EBF] outline-none focus:border-[#1814F3] transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button with Loading State */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-[#1814F3] text-white font-medium text-[15px] rounded-[9px] py-3 mt-8 hover:bg-[#0f0cb8] transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default Settings;
