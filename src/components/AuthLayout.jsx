import { Outlet } from "react-router";
import { Container } from "@mui/material";

//Layout for pages before the user is in the app (no nav bar)
export default function AuthLayout() {
  return (
    <Container component="main" maxWidth="xs" sx={{ py: 4 }}>
      <Outlet />
    </Container>
  );
}
