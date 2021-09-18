import React from "react";

import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer } from "./components";

import { STREAM_API_KEY } from "./.secret/api-key";

import "./App.css";

const client = StreamChat.getInstance(STREAM_API_KEY);

function App() {
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team dark">
        <ChannelListContainer></ChannelListContainer>

        <ChannelContainer></ChannelContainer>
      </Chat>
    </div>
  );
}

export default App;
