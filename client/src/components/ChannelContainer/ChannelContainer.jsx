import React, { useContext } from "react";
import { GlobalUIContext } from "../../context";

import { Channel, useChatContext, MessageTeam } from "stream-chat-react";

import {
  ChannelListContainer,
  CreateChannel,
  EditChannel,
  TeamMessage,
} from "..";
import { ChannelInner } from "../ChannelInner";

const ChannelContainer = (props) => {
  const { isCreating, isEditing } = useContext(GlobalUIContext);

  const { channel } = useChatContext();

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginning of your chat history
      </p>
      <p className="channel-empty__second">
        Send messages, attachments, links, emojis, and more!
      </p>
    </div>
  );

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
