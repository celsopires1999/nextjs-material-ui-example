import { AppBar, Toolbar, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

type NavbarProps = {};

export const Navbar: React.FunctionComponent<NavbarProps> = (_props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <LocalShippingIcon />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TruckLife
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
