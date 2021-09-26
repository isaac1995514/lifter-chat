import React, { useState } from "react";

import { ChannelList, useChatContext } from "stream-chat-react";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "../";
import Cookies from "universal-cookie";

/* Icons */
import DumbbellsIcon from "../../assets/dumbbells.png";
import LogoutIcon from "../../assets/logout.png";

const cookies = new Cookies();

const SideBar = () => {
  const onLogout = () => {
    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("hashedPassword");
    window.location.reload();
  };

  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={DumbbellsIcon} alt="Lifter" width="30" />
        </div>
      </div>
      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner">
          <img src={LogoutIcon} alt="Logout" width="30" onClick={onLogout} />
        </div>
      </div>
    </div>
  );
};

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Lifter Pager</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = (props) => {
  const { setToggleContainer } = props;

  const { client } = useChatContext();

  const filters = { members: { $in: [client?.userID || ""] } };

  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              type="team"
              {...listProps}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              type="team"
              {...previewProps}
              setToggleContainer={setToggleContainer}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              type="messaging"
              {...listProps}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              type="messaging"
              {...previewProps}
              setToggleContainer={setToggleContainer}
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = () => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent />
      </div>
      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() => setToggleContainer((prev) => !prev)}
        >
          <ChannelListContent setToggleContainer={setToggleContainer} />
        </div>
      </div>
    </>
  );
};

export default ChannelListContainer;
