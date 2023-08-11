import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton } from "@mui/material";
import LunchDiningTwoToneIcon from "@mui/icons-material/LunchDiningTwoTone";
import DeliveryDiningTwoToneIcon from "@mui/icons-material/DeliveryDiningTwoTone";
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import LocalCafeTwoToneIcon from "@mui/icons-material/LocalCafeTwoTone";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./view/Home";
import Logo from "./assets/logo.jpeg";
import Topbar from "./TopBar";

const App = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        className="app"
        collapsed
        collapsedWidth="120px"
        backgroundColor="#111111"
      >
        <Menu
          menuItemStyles={{
            button: {
              textAlign: "center",
              padding: "0px",
              marginBottom: "25px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          }}
          rootStyles={{
            color: "#9f0099",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{ borderBottom: "1px solid #30290b", mb: 5 }}
          ></Box>
          <MenuItem component={<Link to="/" />}>
            <IconButton
              aria-label="menu"
              color="primary"
              sx={{
                width: "60px",
                height: "60px",
                borderRadius: "5px",
                border: 0,
                backgroundColor: "primary.main",
                color: "#000",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "#000",
                },
              }}
            >
              <LunchDiningTwoToneIcon fontSize="large" />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="track" color="primary">
              <DeliveryDiningTwoToneIcon fontSize="large" />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="notification" color="primary">
              <NotificationsTwoToneIcon fontSize="large" />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="call" color="primary">
              <LocalCafeTwoToneIcon fontSize="large" />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="help" color="primary">
              <HelpTwoToneIcon fontSize="large" />
            </IconButton>
          </MenuItem>
        </Menu>
      </Sidebar>
      <Box
        component="section"
        maxWidth="100%"
        flex={1}
        disableGutters={false}
        sx={{
          position: "relative",
          overflowY: "scroll",
          backgroundColor: "#F4F4F4",
        }}
      >
        <Box
          component="section"
          maxWidth="100%"
          flex={1}
          disableGutters={false}
          sx={{ m: 3 }}
        >
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
};
export default App;
