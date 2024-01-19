import React, { useEffect, useState } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const SearchBarComponent = ({
  id = "",
  variant = "outlined",
  fullWidth = true,
  size = "small",
  showsearchResult = true,
  options = [],
  sx = "",
}) => {
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    getAllOption();
  }, []);

  const getAllOption = () => {
    let arr = [];
    options.length &&
      options.map((val) => {
        if (val.path) {
          arr.push(val);
        }
        if (val.child?.length) {
          return val.child?.map((vall) => {
            if (!vall?.hide && val.path) {
              arr.push(vall);
            }
          });
        }
      });
    setSearchResult(arr);
  };
  const navigate = useNavigate();
  let timeOut;
  const timeOutFunction = () => {
    timeOut = setTimeout(() => {
      setShowResults(false);
    }, [1000]);
  };

  return (
    <Box
      className="position-relative w-100"
      //   onMouseLeave={() => {
      //     timeOutFunction();
      //   }}
      //   onMouseEnter={() => {
      //     clearTimeout(timeOut);
      //   }}
    >
      <TextField
        className="w-100"
        id={id}
        placeholder="Search"
        variant={variant}
        fullWidth={fullWidth}
        size={size}
        value={searchText}
        onClick={() => {
          setShowResults(true);
        }}
        sx={{
          // backgroundColor: "#FAFAFA",
          borderRadius: "100px",
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: "#A6A6A6",
            },
          },
          "& .MuiOutlinedInput-root:focus": {
            "& > fieldset": {
              outline: "none",
              borderColor: "#ECECEC",
            },
          },
          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              borderColor: "#c4c4c4",
              borderRadius: "100px",
            },
            // margin:2
          },
        }}
        onChange={(e) => {
          setSearchText(e.target.value);
          if (e.target.value) {
            let arr = [];

            options.map((val) => {
              if (
                !val.child.length &&
                val.label.toLowerCase().match(e.target.value.toLowerCase()) &&
                val.path
              ) {
                arr.push(val);
              } else if (val.child.length) {
                if (
                  val.label.toLowerCase().match(e.target.value.toLowerCase()) &&
                  val.path
                ) {
                  arr.push(val);
                }
                val.child.map((vall) => {
                  if (
                    vall.label
                      .toLowerCase()
                      .match(e.target.value.toLowerCase()) &&
                    !vall?.hide &&
                    vall.path
                  ) {
                    arr.push(vall);
                  }
                });
              }
            });
            setSearchResult(arr);
            setShowResults(true);
          } else {
            // getAllOption();
            setShowResults(true);
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ display: showClearIcon }}
              onClick={(event) => {
                setShowClearIcon(event.target.value);
              }}
            >
              <ClearIcon />
            </InputAdornment>
          ),
        }}
      />
      {showsearchResult ? (
        <Box
          className="w-100 position-absolute border border-1 bg-white rounded  py-2"
          sx={{
            visibility: showResults ? "visible" : "hidden",
            top: "103%",
            maxHeight: "150px !important",
            minHeight: "40px",
            borderColor: "#c4c4c4",
            backgroundColor: "#FAFAFA",
            overflowY: "scroll",
            zIndex: "1000 !important",
          }}
        >
          {searchResult.length ? (
            searchResult.map((val, index) => (
              <Box
                key={index}
                className="d-flex justify-content-between py-1 w-100 px-4 "
                sx={{
                  cursor: "pointer",
                  borderBottom:
                    index !== searchResult.length - 1 ? "1px dashed #ccc" : "",
                  "&:hover": {
                    background: "#e2f6ff",
                  },
                }}
                onClick={() => {
                  //   navigate(val.path);
                  setShowResults(false);
                  setSearchText("");
                  //   getAllOption();
                }}
              >
                <Typography className="fs-16 text-secondary">
                  {val.label}
                </Typography>
                <Typography
                  className="fs-16 text-secondary"
                  sx={{ cursor: "pointer" }}
                >
                  Go to Page
                </Typography>
              </Box>
            ))
          ) : (
            <Typography className="fs-16 text-secondary px-4">
              No Match Found
            </Typography>
          )}
        </Box>
      ) : null}
    </Box>
  );
};

export default SearchBarComponent;
