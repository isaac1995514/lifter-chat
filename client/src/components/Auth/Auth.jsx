import React, { useState } from "react";

/* Components */
import { Input, Button } from "semantic-ui-react";

/* Assets */
import GoogleIcon from "../../assets/google-symbol.png";

/* Firebase */
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

/* Components */
// import { SignUpDialog } from "./sub-components/sign-up-dialog";
// import { EmailLoginPanel } from "./sub-components/email-login-panel";
// import { LoginIconPanel } from "./sub-components/login-icon-panel";

/* Style */
import "./Auth.scss";

const Auth = (props) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const onEmailLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onGoogleSignin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buttons = [
    { name: "Google", icon: GoogleIcon, action: onGoogleSignin },
  ];

  return (
    <div className="auth__page-container">
      <div className="auth__form-container">
        <div className="auth__form-container_email-login">
          <form className="auth__email-login__form" onSubmit={onEmailLogin}>
            <Input
              value={email}
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              value={password}
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={onEmailLogin} disabled={!email || !password}>
              Sign in
            </Button>
          </form>
        </div>
        <div className="auth__form-container_3rd-party-login">
          {buttons.map((btn) => (
            <button
              className={`button-wrapper ${btn.name}-button-wrapper`}
              onClick={btn.action}
            >
              <img src={btn.icon} alt={`Login with ${btn.name}`} width="30" />
            </button>
          ))}
        </div>
        <div className="signup__text">
          <span>
            Don't have an account?{" "}
            <a className="signup-link">Create an account</a>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
