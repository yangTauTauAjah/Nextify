import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";

export default function LoginAlert({
  open,
  handleClose
}: {
  open: boolean;
  handleClose?: () => any;
}) {
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Warning!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          In order for this application to work properly, we need to collect
          your Spotify data from the official Spotify API. And to do so, you
          would later need to accept{" "}
          <a href="https://developer.spotify.com/terms">
            Spotify Developer Terms of Service
          </a>
          . Are you sure you want to proceed to login?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} autoFocus>
          Go Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/login");
          }}>
          Proceed To Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}