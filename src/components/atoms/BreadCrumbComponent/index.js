import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import HomeIcon from "@mui/icons-material/Home";

const BreadCrumbComponent = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div>
        <Breadcrumb>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/home">{<HomeIcon />}</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item>{capatilize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>
                <Link to={`${routeTo}`}>{capatilize(name)}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumbComponent;

// import React from "react";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import Stack from "@mui/material/Stack";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// function handleClick(event) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

{
  /* <Stack spacing={2}> { breadcrumbs, separator }
      <Breadcrumbs separator={separator} aria-label="breadcrumb">
        {breadcrumbs?.map((breadcrumb, index) => (
          <React.Fragment key={index}>{breadcrumb}</React.Fragment>
        ))}
      </Breadcrumbs>
    </Stack> */
}

// Breadcrumb.js
// import { Typography } from "@mui/material";
// import React from "react";

// const BreadCrumbComponent = ({ items }) => {
//   return (
//     <nav aria-label="breadCrumb">
//       <ol className="breadCrumb">
//         {items && items?.map((item, index) => (
//           <li
//             key={index}
//             className={`breadCrumb-item ${item?.active ? "active" : ""}`}
//           >
//             {item?.active ? (
//               <Typography>{item?.label}</Typography>
//             ) : (
//               // <a href={item?.link}>{item?.label}</a>
//               <Typography>{item?.label} </Typography>
//             )}
//           </li>
//         ))}
//       </ol>
//     </nav>
//   );
// };

// export default BreadCrumbComponent;
