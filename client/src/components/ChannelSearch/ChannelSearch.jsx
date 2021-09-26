import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";

import { SearchIcon } from "../../assets/SearchIcon";
import { ResultsDropdown } from "../";

const ChannelSearch = ({ setToggleContainer }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);
  const { client, setActiveChannel } = useChatContext();

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  const getChannels = async (text) => {
    if (!text) return;

    try {
      const channelResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID || ""] },
      });

      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });

      const [channels, userList] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      if (channels.length) setTeamChannels(channels);
      if (userList?.users?.length) setDirectChannels(userList.users);
    } catch (e) {
      console.error(e);
      setQuery(""); // Reset Search
    }
  };

  const setChannel = (channel) => {
    setQuery("");
    setActiveChannel(channel);
  };

  const onSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          placeholder="Serach"
          type="text"
          value={query}
          onChange={onSearch}
        />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
