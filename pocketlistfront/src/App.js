import {BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';

// PAGES
import Login from "../src/PAGES/Login";
import SignIn from "../src/PAGES/SignIn";
import WelcomePlus from "../src/PAGES/WelcomePlus";
import MyList from "../src/PAGES/MyList";
import SharedList from "../src/PAGES/SharedList";

//COMPONENTS
import Sidebar from "./COMPONENTS/Sidebar";

// STYLES
import '../src/STYLES/App.css';



function App() {
  return (
    <BrowserRouter>
    <div className="AppContainer">
      <div className="SidebarContainer">
        <Sidebar />
      </div>
      <div className="MainContent">
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/SignIn'} element={<SignIn />} />
          <Route path={'/WelcomePlus'} element={<WelcomePlus />} />
          <Route path={'/MyList'} element={<MyList />} />
          <Route path={'/SharedList'} element={<SharedList />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}
export default App;