import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";

import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer, Auth } from "./components";

import { STREAM_API_KEY } from "./.secret/api-key";

/* Firebase */
import { auth } from "./config/firebase";

import "./App.scss";

const client = StreamChat.getInstance(STREAM_API_KEY);

const authToken = null;

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team dark">
        <ChannelListContainer />/
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
