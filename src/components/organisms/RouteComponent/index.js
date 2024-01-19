import React from "react";
import { useLocation } from "react-router-dom";
import NavComponent from "../NavComponent";
import Dashboard from "../../pages/RentalProcessDetails/Dashboard";
import RentalDetails from "../../pages/RentalProcessDetails/RentalDetails";

const RouteComponent = () => {
  const { pathname } = useLocation();
  const pathstartsWith = ["dashboard", "rentContracts"];

  if (pathstartsWith.includes(pathname.split("/")[1])) {
    return <NavComponent />;
  }

  if (pathname.startsWith("/dashboard")) {
    return <Dashboard />;
  }

  if (pathname.startsWith("/rentContracts")) {
    return <RentalDetails />;
  }
};

export default RouteComponent;
