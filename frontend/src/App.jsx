import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Sign-in/SignIn";
import OrgChartPage from "./pages/org-chart-page/OrgChartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/org-chart" element={<OrgChartPage />} />
      </Routes>
    </Router>
  );
}

// function App() {
//   return (
//     <OrgChartPage />
//   );
// }

export default App;