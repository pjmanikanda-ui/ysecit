import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Typography } from "@mui/material";
import { Sidebar } from "react-pro-sidebar";
import Cart from "./view/Cart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Topbar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </MenuItem>
    </Menu>
  );
  const [toggled, setToggled] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        style={{ background: "transparent", boxShadow: "none", color: "#000" }}
      >
        <Toolbar>
          <Box>
            <Typography variant="h4">Welcome to Yogh</Typography>
            <Typography variant="h5">Choose the category</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            aria-label="cart"
            onClick={() => setToggled(!toggled)}
            sx={{
              mr: 2,
              color: "white",
              backgroundColor: "#FFCA00",
              borderRadius: "50%",
              p: 1,
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
          >
            <StyledBadge badgeContent={0}>
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          <Search
            sx={{ display: { xs: "none", md: "flex", background: "#fff" } }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Sidebar
        width="30%"
        backgroundColor="#fff"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="always"
        rootStyles={{
          zIndex: "9999 !important",
          left: "unset !important",
          right: "-30% !important",
          "&.ps-toggled": {
            left: "unset !important",
            right: "0 !important",
          },
        }}
      >
        <Cart />
      </Sidebar>
    </Box>
  );
}
