/**
 * Chat Room
 */

import React from "react";
import { Modal, Header, Segment, Button, TextArea, Form, Message, Icon, Sidebar } from "semantic-ui-react";
import { w3cwebsocket as wsClient } from "websocket";

import { ChatRoomType } from "src/Components/ChatRoom/type";
import { getUsername } from "src/Components/UsernameCreationBox/lib";
import { t } from "src/lib/language/translate";

import { HandleOpenType } from "./type";
import "./style.scss";

interface Props {
  open: boolean;
  handleOpen: HandleOpenType;
  chatRoomInfo: ChatRoomType;
}

function Main(props: Props): JSX.Element
{
  const { open, handleOpen, chatRoomInfo } = props;

  const [chatRoomUserListVisible, setChatRoomUserListVisible] = React.useState<boolean>(false);
  const [webSocketClient, setWebSocketClient] = React.useState<wsClient>();

  const handleClose = React.useCallback(() => {
    handleOpen(false);
  }, [handleOpen]);

  React.useEffect(() => {
    if (open && !webSocketClient) {
      const Host = window.location.hostname;
      const Port = window.location.port;
      const chatRoomName = chatRoomInfo.name;
      const ws = new wsClient(`ws://${Host}:${Port}/ws/${chatRoomName}/${getUsername()}`);
      setWebSocketClient(ws);

      ws.onopen = () => {
        ////
        console.log("open");
      };
  
      ws.onclose = () => {
        ////
        console.log("close");
      };
  
      ws.onmessage = (e) => {
        ////
        console.log(e);
      };
  
      ws.onerror = () => {
        ////
        console.log("error");
      };
    } else if (!open && webSocketClient) {
      webSocketClient.close();
      setWebSocketClient(undefined);
    }
  }, [open, chatRoomInfo, webSocketClient]);

  return (
    <>
      <Modal
        open={open}
        className="chat-room-box"
      >
        <div className="inner">
          <Header attached="top">
            <div className="inner">
              <div className="box1">
                <div className="name">{chatRoomInfo.name}</div>
                <div className="intro">{chatRoomInfo.intro}</div>
              </div>
              <Icon name="close" onClick={handleClose} />
            </div>
          </Header>
          
          <Segment attached>
            <div className="chat-panel">
              <div className="msg-wrapper">
                <Sidebar.Pushable>
                  <Message></Message>
                  <Sidebar
                    direction="left"
                    animation="overlay"
                    visible={chatRoomUserListVisible}
                  />
                </Sidebar.Pushable>
              </div>
              <div className="ops-box">
                <Icon name="group" onClick={() => setChatRoomUserListVisible(!chatRoomUserListVisible)} />
              </div>
            </div>

            <div className="chat-input">
              <Form>
                <TextArea />
              </Form>
            </div>

            <Button fluid>{t("Send")}</Button>
          </Segment>
        </div>
      </Modal>
    </>
  );
}

export default Main;
