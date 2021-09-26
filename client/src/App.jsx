import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";

import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer, Auth } from "./components";

import { STREAM_API_KEY } from "./.secret/api-key";

/* Firebase */
import { auth } from "./config/firebase";

import "stream-chat-react/dist/css/index.css";
import "./App.scss";

const client = StreamChat.getInstance(STREAM_API_KEY);

const cookies = new Cookies();

function App() {
  const authToken = cookies.get("token");

  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (authToken) {
      client.connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("fullName"),
          username: cookies.get("username"),
          hashedPassword: cookies.get("hashedPassword"),
          image: "https://getstream.io/random_svg/?name=John",
        },
        authToken
      );
    }
  }, [authToken]);

  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App;
