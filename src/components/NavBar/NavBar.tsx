import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../Sidebar/Sidebar";
import Button from "@mui/material/Button";
import ShopCard from "../ShopCard/ShopCard";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProductContext } from "../Context/ProductContext";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import "./Nav.css";
import { Navigate, useNavigate } from "react-router";
import { Link } from "@mui/material";
import { ContextUser } from "../Context/UserContext";

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
    marginLeft: theme.spacing(1),
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

const NavBar = () => {
  const { search, setSearch } = useProductContext();
  const [open, setOpen] = useState(false);
  var name = localStorage.getItem("name");
  let menuUser;

  const navigation = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { login: Login, setLogin } = ContextUser();
  const listItem = [
    {
      menuTitle: "Profile",
      url: "/profile",
    },
    {
      menuTitle: "DashBoard",
      url: "/cpanel",
    },
    {
      menuTitle: "Logout",
      url: "/",
    },
  ];
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = async (pageUrl: string) => {
    navigation(pageUrl);
    if (pageUrl == "/") localStorage.removeItem("name");
    setAnchorElUser(null);
  };

  function handleSearchInput(e: any) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    async function findProduct() {
      const response = await fetch(
        `http://localhost:7080/Product/find/${search}`
      );
      const result = await response.json();

      console.log("Result find: ", result);
    }
    findProduct();
  }, [search]);

  if (name != null || name != null) {
    menuUser = (
      <>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={name} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {listItem.map((setting) => {
              const { menuTitle, url } = setting;
              return (
                <MenuItem
                  key={setting.url}
                  onClick={() => handleCloseUserMenu(url)}
                >
                  {menuTitle}
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      </>
    );
  } else {
    menuUser = <>Login</>;
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#2E3B55" }}>
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Search onChange={handleSearchInput}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                fullWidth
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            ></Typography>

            {menuUser}
          </Toolbar>
        </AppBar>
      </Box>

      {open && <Sidebar open={open} setOpen={setOpen} />}
    </>
  );
};

export default NavBar;
