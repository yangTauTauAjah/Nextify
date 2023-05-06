import { RootState } from "@/components/store";
import { LoginAlert } from "@/pages/collection";
import { History, NotificationsNone, Settings } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function Greeting({ message }: { message: string }) {
  const state = useSelector((state: RootState) => state.data);

  const [open, setOpen] = React.useState(false);

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
          <NotificationsNone className="cursor-pointer white-hover" sx={{ fontSize: "2rem" }} />
          <History className="cursor-pointer white-hover" sx={{ fontSize: "2rem" }} />
          <Settings className="cursor-pointer white-hover" sx={{ fontSize: "2rem" }} />
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
