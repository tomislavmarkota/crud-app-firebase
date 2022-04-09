import React from "react";
import AuthProvider from "./auth/auth-context/AuthProvider";
import CreateAcc from "./auth/CreateAcc";
import Login from "./auth/Login";
import Dashboard from "./Dashboard";
import Favorites from "./Favorites";
import AddContact from "./AddContact";
import PrivateRoute from "./PrivateRoute";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CrudProvider from "./context/CrudProvider";


function App() {
  return (
    <AuthProvider>
      <CrudProvider>
        <Router>
          <Routes>
            <Route path="/" element={<CreateAcc />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/addcontact" element={<AddContact />} />
                <Route path="/updatecontact/:id" element={<AddContact />} />
                <Route path="/favorites" element={<Favorites />} />
            </Route>  
          </Routes>
        </Router>
      </CrudProvider> 
    </AuthProvider>
  );
}

export default App;
