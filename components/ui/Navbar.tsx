import { CartContex, UiContext } from "../../context";
import NextLink from "next/link";

import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContex);

  const { pathname, push } = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
    setIsSearchVisible(false);
    setSearchTerm("");
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Vestir Charro |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        {/* TODO flex */}
        <Box flex="1" />

        <Box
          className="fadeIn"
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
        >
          <NextLink href="/category/charros" passHref>
            <Link>
              <Button
                color={pathname === "/category/charros" ? "primary" : "info"}
              >
                Charros
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/escaramuzas" passHref>
            <Link>
              <Button
                color={
                  pathname === "/category/escaramuzas" ? "primary" : "info"
                }
              >
                Escaramuzas
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/charritos" passHref>
            <Link>
              <Button
                color={pathname === "/category/charritos" ? "primary" : "info"}
              >
                Charritos
              </Button>
            </Link>
          </NextLink>
        </Box>

        {/* TODO flex */}
        <Box flex="1" />

        {/* Desktop
        <IconButton>
          <SearchOutlined />
        </IconButton> */}

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            // onClick={onSearchTerm}
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: "none", sm: "flex" } }}
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantallas pequenias */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              {/* para que se vean los num de carrito */}
              <Badge
                badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
