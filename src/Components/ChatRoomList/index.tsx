/**
 * Chat Room List
 */

import React from "react";
import { Grid, Card } from "semantic-ui-react";

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
                {a.name}
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default Main;
