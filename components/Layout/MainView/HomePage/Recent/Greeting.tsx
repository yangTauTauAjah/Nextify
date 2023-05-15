import LoginAlert from "@/components/Layout/LoginAlert";
import { RootState } from "@/components/store";
import History from "@mui/icons-material/History";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Greeting({ message }: { message: string }) {
  const state = useSelector((state: RootState) => state.data);

  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className="flex justify-between items-center my-1"
      style={{ zIndex: "10" }}>
      <h1>{message}</h1>
      <LoginAlert open={open} handleClose={handleClose} />
      {state.user ? (
        <div className="flex items-center gap-1">
          <NotificationsNone
            className="cursor-pointer white-hover"
            sx={{ fontSize: "2rem" }}
          />
          <History
            className="cursor-pointer white-hover"
            sx={{ fontSize: "2rem" }}
          />
          <LogoutIcon
            className="cursor-pointer white-hover"
            sx={{ fontSize: "2rem" }}
            onClick={() => {
              window.location.replace('/logout');
            }}
          />
        </div>
      ) : (
        <Button
          onClick={handleClickOpen}
          color="primary"
          variant="contained"
          sx={{
            borderRadius: "10rem",
            padding: "0.5rem 2rem",
            fontSize: "1rem",
            letterSpacing: "2px"
          }}>
          Login
        </Button>
      )}
    </div>
  );
}

export default Greeting;
