import React from "react";

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

const ChannelListContainer = (props) => {
  const { isCreating, setIsCreating, setCreateType, setIsEditing } = props;

  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList
              type="team"
              {...listProps}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview type="team" {...previewProps} />
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList
              type="messaging"
              {...listProps}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview type="messaging" {...previewProps} />
          )}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
