import React, { useState } from "react";
import PropTypes from "prop-types";

/* Database */
import firebase from "firebase/app";

import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  Box,
} from "@material-ui/core";

import validateEmail from "email-validator";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    width: "500px",
  },
  closeButton: {
    color: theme.palette.grey[500],
    padding: theme.spacing(0),
  },
});
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "300px",
    height: "250px",
    padding: "0px 30px",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function SignUpDialog(props) {
  const auth = firebase.auth();

  const { isDialogOpen, closeSignupDialog } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSamePassword, setIsSamePassword] = useState(false);

  const isSumbitEnabled =
    isSamePassword && email && validateEmail.validate(email);

  const handleEmailSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        closeSignupDialog();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Dialog
        onClose={closeSignupDialog}
        aria-labelledby="customized-dialog-title"
        className="email-sign-up-dialog"
        open={isDialogOpen}
      >
        <DialogContent dividers>
          <Box display="flex" flexDirection="column">
            <TextField
              label="Email"
              value={email}
              type="email"
              className="input-box email-input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              value={password}
              type="password"
              className="input-box password-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Comfirm Password"
              type="password"
              className="input-box confirm-password-input"
              onChange={(e) => {
                setIsSamePassword(e.target.value === password);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSignupDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleEmailSignUp}
            color="primary"
            disabled={!isSumbitEnabled}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SignUpDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  closeSignupDialog: PropTypes.func,
};

export default SignUpDialog;
