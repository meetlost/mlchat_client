/**
 * Chat Room List
 */

import React from "react";
import { Grid, Card, Icon } from "semantic-ui-react";

import { ChatRoomType } from "src/Components/ChatRoom/type";

import { HandleChatRoomListPageInfoType } from "./type";
import { getChatRoomListObj } from "./lib";
import "./style.scss";

interface Props {
  handleChatRoomListPageInfo: HandleChatRoomListPageInfoType;
}

function Main(props: Props): JSX.Element
{
  const { handleChatRoomListPageInfo } = props;

  const [chatRoomList, setChatRoomList] = React.useState<ChatRoomType[]>([]);

  const fetchChatRoomList = React.useCallback(async () => {
    const obj = await getChatRoomListObj();

    setChatRoomList(obj.list);
    handleChatRoomListPageInfo({ page: obj.page, total: obj.total });
  }, [handleChatRoomListPageInfo]);

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
