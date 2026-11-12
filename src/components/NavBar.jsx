import { NavLink, useLocation } from "react-router";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

const links = [
  { label: "Meal Plan", path: "/mealplan" },
  { label: "Shopping List", path: "/shopping" },
  { label: "Dishes", path: "/dishes" },
  { label: "My Family", path: "/family-management" },
];

export default function NavBar() {
  // The current path decides which link is highlighted.
  const { pathname } = useLocation();

  return (
    <Paper
      component="nav"
      elevation={3}
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        // Mobile first: bottom on small screens, top from MUI's "md" and up.
        bottom: { xs: 0, md: "auto" },
        top: { xs: "auto", md: 0 },
        zIndex: "appBar",
      }}
    >
      <BottomNavigation value={pathname} showLabels>
        {links.map((link) => (
          <BottomNavigationAction
            key={link.path}
            label={link.label}
            value={link.path}
            component={NavLink}
            to={link.path}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
