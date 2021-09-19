import React, { useState } from "react";

import Cookies from "universal-cookie";
import axios from "axios";
import { postUserLogin } from "../../services/apis";

/* Components */
import { Input, Button } from "semantic-ui-react";

/* Assets */
import GoogleIcon from "../../assets/google-symbol.png";

/* Firebase */
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

/* Components */
import { Signup } from "../";

/* Style */
import "./Auth.scss";

const Auth = (props) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [createAccount, setCreateAccount] = useState(false);

  const onEmailLogin = async (e) => {
    e.preventDefault();

    try {
      await postUserLogin(login);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
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
              value={login.email}
              placeholder="Email"
              type="email"
              onChange={(e) =>
                setLogin((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <Input
              value={login.password}
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setLogin((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Button
              onClick={onEmailLogin}
              disabled={!login.email || !login.password}
            >
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
            <button
              className="signup__text_link"
              onClick={() => setCreateAccount(true)}
            >
              Create an account
            </button>{" "}
          </span>
        </div>
      </div>
      <Signup open={createAccount} setOpen={setCreateAccount} />
    </div>
  );
};

export default Auth;
