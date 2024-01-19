// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Gradient, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { dummyUsers } from "../../../constants/LoginCredentials";
import { blue, green } from "@mui/material/colors";
// import { useToasts } from "react-toast-notifications";

function LoginScreen() {
  //   const { addToast } = useToasts();
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  //   const { setDashboard } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [userNameErr, setUserNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  let userNameValidation = () => {
    if (loginDetails.userName) {
      let regex = /^[a-zA-Z ]{2,30}$/;
      if (regex.test(loginDetails.userName)) {
        setUserNameErr("");
        setLoading(false);
        return true;
      } else {
        setUserNameErr("*Enter valid userName");
      }
    } else {
      setUserNameErr("*This field is required");
      return false;
    }
  };

  let passwordValidation = () => {
    if (loginDetails.password) {
      let regex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (regex.test(loginDetails.password)) {
        setPasswordErr("");
        setLoading(false);
        return true;
      } else {
        setPasswordErr("*Enter valid password");
      }
    } else {
      setPasswordErr("*This field is required");
      return false;
    }
  };

  // let updateChange = (e) => {
  //   setLoginDetails({
  //     ...loginDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // useEffect(() => {
  //   sessionStorage.clear();
  // }, []);

  //   const loginDetailsOfMakerChecker = async () => {
  //     const payload = {
  //       userName: loginDetails.userName,
  //       password: loginDetails.password,
  //     };
  //     const { data, errRes } = await getLoginDetails(payload);

  //     if (data) {
  // if (data) {
  // data.data.userROle.forEach((item) => {
  //   if (item === "ROLE_MAKER") {
  //     // setLoading(false);
  //     navigate("/dashboard");
  //   }
  //   if (item === "ROLE_CHECKER") {
  //     // setLoading(false);
  //     navigate("/checkerdashboard");
  //   }
  // });
  // sessionStorage.setItem("jwtData", JSON.stringify(data));
  // sessionStorage.setItem("userName", loginDetails?.userName);
  // sessionStorage.setItem("token", JSON.stringify(data?.token));
  // if (data?.userrole?.includes("ROLE_MAKER")) {
  //   navigate("/dashboard");
  // } else if (data?.userrole?.includes("ROLE_CHECKER")) {
  //   navigate("/checkerdashboard");
  // } else {
  //   navigate("/dashboard");
  // }
  // window.location.reload();
  // addToast(data.message, { appearance: "success" });
  //   sessionStorage.setItem("jwtData", JSON.stringify(data));
  //   sessionStorage.setItem("userName", loginDetails?.userName);
  //   sessionStorage.setItem("token", JSON.stringify(data?.token));
  //   if (data?.userrole.includes("ROLE_MAKER")) {
  //     navigate("/dashboard");
  //   } else if (data?.userrole.includes("ROLE_CHECKER")) {
  //     navigate("/checkerdashboard");
  //   } else {
  //     navigate("/dashboard");
  //   }
  //   addToast("Successfully Logged In...", { appearance: "success" });
  //   window.location.reload();
  // } else if (errRes) {
  //   addToast(errRes, { appearance: "error" });
  // }
  //   };

  //   const Submit = () => {
  //     userNameValidation();
  //     passwordValidation();
  //     setTimeout(() => {
  //       // Assuming login is unsuccessful
  //       setLoading(false);
  //     }, 1000);
  //     if (userNameValidation() && passwordValidation()) {
  //       setLoginDetails({
  //         userName: "",
  //         password: "",
  //       });
  //     }
  //     setLoading(true);
  //     loginDetailsOfMakerChecker();
  //   };
  const imgStyle = {
    position: "absolute",
    left: "0",
    top: "10",
    zIndex: -2,
    // Lower z-index value
    boxShadow: "0px 0px 10px 0px black",
    borderRadius: "0px",
    width: "100%",
    height: "100%",
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Submit = () => {
    const user = dummyUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Successful login
      // setErrorMessage("");
      alert("Login successful");
      navigate("/home");
    } else {
      // Failed login
      alert("Invalid username or password");
    }
  };

  return (
    <Box>
      <Box
        className="d-flex align-items-center justify-content-center"
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <img
          src="./assets/wallcagl.jpeg"
          alt="caglimage"
          width="100%"
          height="100%"
          style={imgStyle}
        />
        <Box
          className="d-flex align-items-center justify-content-center"
          sx={{
            width: "100%",
            heigth: "100%",
            position: "absolute",
            left: 0,
            top: 100,
          }}
        >
          <Paper
            sx={{
              width: 400,
              height: 400,
              background: blue[50], //"#0d47a1",    //#E4FA9E  #E8FAAF
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              // zIndex: -1,
            }}
            elevation={10}
            
          >
            <Box>
              <img
                src="./assets/cagllogo1.png"
                alt="cagllogo"
                width="150px"
                height="80px"
              />
            </Box>
            <Typography
              sx={{ fontSize: 20, fontWeight: 700, textAlign: "center" }}
            >
              LOGIN
            </Typography>

            <Box
              sx={{
                width: "60%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                UserName
              </Typography>
              <TextField
                placeholder="EnterUserName"
                // name="userName"
                // value={loginDetails.userName}
                // onChange={(e) => {
                //   updateChange(e);
                // }}
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* {userNameErr && (
            <Typography sx={{ color: "red" }}>{userNameErr}</Typography>
          )} */}
            </Box>

            <Box
              sx={{
                width: "60%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                Password
              </Typography>
              <TextField
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                // name="password"
                // value={loginDetails.password}
                // onChange={(e) => updateChange(e)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Visibility
                          sx={{
                            fill: "#A6A6A6",
                          }}
                        />
                      ) : (
                        <VisibilityOff
                          sx={{
                            fill: "#A6A6A6",
                          }}
                        />
                      )}
                    </IconButton>
                  ),
                }}
              />
              {/* {passwordErr && (
            <Typography sx={{ color: "red" }}>{passwordErr}</Typography>
          )} */}
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => Submit()}
                sx={{
                  fontSize: 12,
                  background: "#249506",
                  paddingX: "15px",
                  paddingY: "10px",
                }}
              >
                {loading ? "Loading..." : "Login"}
                {loading ? (
                  <i
                    class="fa fa-spinner fa-spin"
                    style={{ marginLeft: "12px", marginRight: "8px" }}
                  ></i>
                ) : null}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginScreen;
// const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');
// const [errorMessage, setErrorMessage] = useState('');

// const handleLogin = () => {
//   const user = dummyUsers.find(
//     (user) => user.username === username && user.password === password
//   );

//   if (user) {
//     // Successful login
//     setErrorMessage('');
//     console.log('Login successful');
//   } else {
//     // Failed login
//     setErrorMessage('Invalid username or password');
//   }
// };
