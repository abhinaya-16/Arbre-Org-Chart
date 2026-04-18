import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignIn from "./pages/sign-in/SignIn";
// import SignUp from "./pages/sign-up/SignUp";
import LandingPage from "./pages/landing-page/LandingPage";
import OrgChartPage from "./pages/org-chart-page/OrgChartPage";
import { useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && accounts.length > 0 && inProgress === "none") {
      instance.acquireTokenSilent({
        scopes: ["openid", "profile", "email"],
        account: accounts[0]
      }).then((response) => {
        console.log("Token acquired:", response.accessToken);
      }).catch(err => console.error(err));
    }
  }, [isAuthenticated, accounts, inProgress, instance, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      {/* <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} /> */}
      <Route
        path="/org-chart"
        element={
          <ProtectedRoute>
            <OrgChartPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

// function App() {
//   return (
//     <OrgChartPage />
//   );
// }

export default App;