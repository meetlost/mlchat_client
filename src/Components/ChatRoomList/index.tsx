/**
 * Chat Room List
 */

import React from "react";
import { Grid, Card, Icon } from "semantic-ui-react";

import { ChatRoomType } from "src/Components/ChatRoom/type";

import { getChatRoomList } from "./lib";
import "./style.scss";

function Main(): JSX.Element
{
  const [chatRoomList, setChatRoomList] = React.useState<ChatRoomType[]>([]);

  const fetchChatRoomList = React.useCallback(async () => {
    const list = await getChatRoomList();
    setChatRoomList(list);
  }, []);

  React.useEffect(() => {
    fetchChatRoomList();
  }, [fetchChatRoomList]);

  return (
    <>
      <div className="chat-room-list-box">
        <Grid centered>
          {chatRoomList.map((a: ChatRoomType) => (
            <Grid.Column key={a.name}>
              <Card>
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
