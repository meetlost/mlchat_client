/**
 * Chat Room List
 */

import React from "react";
import { Grid, Card, Icon } from "semantic-ui-react";

import {
  ChatRoomType,
  HandleOpenType as HandleChatRoomOpenType,
  HandleJoinType as HandleChatRoomJoinType,
} from "src/Components/ChatRoom/type";

import "./style.scss";

interface Props {
  chatRoomList: ChatRoomType[];
  handleChatRoomOpen: HandleChatRoomOpenType;
  handleChatRoomJoin: HandleChatRoomJoinType;
}

function Main(props: Props): JSX.Element
{
  const { chatRoomList, handleChatRoomOpen, handleChatRoomJoin } = props;

  const joinChatRoom = React.useCallback((chatRoom: ChatRoomType) => {
    handleChatRoomOpen(true);
    handleChatRoomJoin(chatRoom);
  }, [handleChatRoomOpen, handleChatRoomJoin]);

  return (
    <>
      <div className="chat-room-list-box">
        <Grid centered>
          {chatRoomList.map((a: ChatRoomType) => (
            <Grid.Column key={a.name}>
              <Card onClick={() => joinChatRoom(a)}>
                <Card.Content extra header={a.name} />
                <Card.Content description={a.intro} />
                <Card.Content extra>
                  <Icon name="chat" />
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default Main;
