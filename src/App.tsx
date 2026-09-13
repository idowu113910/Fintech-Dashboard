import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";
import Investment from "./pages/Investment";
import Credit from "./pages/Credit";
import Loans from "./pages/Loans";
import Services from "./pages/Services";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Overview /> },
      { path: "/transactions", element: <Transactions /> },
      { path: "/account", element: <Accounts /> },
      { path: "/investment", element: <Investment /> },
      { path: "/credit", element: <Credit /> },
      { path: "/loan", element: <Loans /> },
      { path: "/services", element: <Services /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
