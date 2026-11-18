import { Outlet } from "react-router";
import { Box } from "@mui/material";
import NavBar from "./NavBar.jsx";

// Shared layout for the pages that need a family: the page itself plus the nav bar.
export default function AppLayout() {
  return (
    <>
      <Box
        component="main"
        sx={{
          // Room for the fixed nav bar (56px high), so it doesn't cover the page.
          pb: { xs: "56px", md: 0 },
          pt: { xs: 0, md: "56px" },
        }}
      >
        <Outlet />
      </Box>
      <NavBar />
    </>
  );
}
