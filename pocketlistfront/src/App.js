import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";

// PAGES
import Login from "../src/PAGES/Login";
import WelcomePlus from "../src/PAGES/WelcomePlus";
import MyList from "../src/PAGES/MyList";
import SharedList from "../src/PAGES/SharedList";

// COMPONENTS
import Sidebar from "./COMPONENTS/Sidebar";
import ExitButton from "./COMPONENTS/ExitButton";

// STYLES
import "../src/STYLES/App.css";

function App() {
  const location = useLocation(); // Obtenir la route actuelle

  const showSidebarAndExitButton = location.pathname !== "/";

  return (
    <div>
      {showSidebarAndExitButton && <ExitButton />}
      <div className="AppContainer">
        {showSidebarAndExitButton && (
          <div className="SidebarContainer">
            <Sidebar />
          </div>
        )}
        <div className="MainContent">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/WelcomePlus" element={<WelcomePlus />} />
            <Route path="/MyList" element={<MyList />} />
            <Route path="/SharedList" element={<SharedList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
