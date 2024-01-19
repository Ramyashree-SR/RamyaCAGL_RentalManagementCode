import React from "react";

import { Box, Card, Typography } from "@mui/material";
import "./dashboard.css";
import NavComponent from "../../../organisms/NavComponent";
import SearchBarComponent from "../../../atoms/SearchBarComponent";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  // const userData = [
  //   { id: 1, col1: "1", col2: "3/16", col3: "open", col4: "Branch" },
  //   { id: 2, col1: "1", col2: "3/16", col3: "open", col4: "Branch" },
  // ];

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          flexBasis: "30%",
          background: "#fff",
        }}
      >
        <NavComponent />
      </Box>

      <Box
        className="d-flex align-items-center justify-content-between "
        sx={{
          margin: "1% auto 0% 4%",
          position: "fixed",
          marginTop: "-50px",
        }}
      >
        <Box
          className="d-flex align-items-center justify-content-between py-4"
          sx={{ width: 300 }}
        >
          <Typography
            sx={{ fontSize: 17, fontWeight: 900, fontFamily: "sans-serif" }}
          >
            Dashboard
          </Typography>
        </Box>
        <Box sx={{ margin: "1% auto auto 20%", width: 750 }}>
          <SearchBarComponent />
        </Box>
      </Box>

      <Box
        sm={12}
        xs={12}
        sx={{
          margin: "1% auto auto 0%",
          flexBasis: "80%",
          background: "#fff",
          mt: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <main className="main-container">
          <div className="main-cards">
            <div className="card">
              
              <div className="card-inner">
                <h3>Active Rent Contacts</h3>
                {/* <BsFillArchiveFill className='card_icon'/> */}
              </div>
              <h1>300</h1>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>Provision Cases</h3>
                {/* <BsFillGrid3X3GapFill className='card_icon'/> */}
              </div>
              <h1>12</h1>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>Rent Actual List</h3>
                {/* <BsPeopleFill className='card_icon'/> */}
              </div>
              <h1>33</h1>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>Rent Due Cases</h3>
                {/* <BsFillBellFill className='card_icon'/> */}
              </div>
              <h1>42</h1>
            </div>
          </div>

          {/* <div className="charts">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div> */}
          {/* <div className="charts">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div> */}
        </main>
      </Box>
    </Box>
  );
};

export default Dashboard;
