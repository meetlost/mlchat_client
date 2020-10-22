/**
 * Chat Room
 */

import React from "react";
import { Modal, Header, Segment, Button, TextArea, Form, Message, Icon, Sidebar } from "semantic-ui-react";
import { w3cwebsocket as wsClient } from "websocket";

import { ChatRoomType } from "src/Components/ChatRoom/type";
import { UsernameType } from "src/Components/UsernameCreationBox/type";
import { getUsername } from "src/Components/UsernameCreationBox/lib";
import { t } from "src/lib/language/translate";

import { HandleOpenType, ChatRoomConnectionStatusType } from "./type";
import { isCMDUserList, isCMDNewUser, isCMDUserLeft, isCMDChat, formatConnectionStatus } from "./lib";
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
  const [chatMessage, setChatMessage] = React.useState<string>("");
  const [connectionStatus, setConnectionStatus] = React.useState<ChatRoomConnectionStatusType>("connecting");

  const userListRef = React.useRef<HTMLDivElement>(null);
  const chatMessageRef = React.useRef<HTMLDivElement>(null);

  const onChatMessageChange = React.useCallback((event: React.SyntheticEvent, data) => {
    setChatMessage(data.value);
  }, []);

  const updateUserList = React.useCallback((userList: UsernameType[]) => {
    if (userListRef.current) {
      let userListHtml = "";
      userList.forEach(a => userListHtml += `<p>${a.username}</p>`);
      userListRef.current.innerHTML = userListHtml;
    }
  }, []);

  const handleNewUserMessage = React.useCallback((message: string) => {
    if (chatMessageRef.current) {
      const newNode = document.createElement("p");
      newNode.innerHTML = message;
      chatMessageRef.current.appendChild(newNode);
      chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
    }
  }, []);

  const handleUserLeftMessage = React.useCallback((message: string) => {
    if (chatMessageRef.current) {
      const newNode = document.createElement("p");
      newNode.innerHTML = message;
      chatMessageRef.current.appendChild(newNode);
      chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
    }
  }, []);

  const handleChatMessage = React.useCallback((message: string) => {
    if (chatMessageRef.current) {
      const newNode = document.createElement("p");
      newNode.innerHTML = message;
      chatMessageRef.current.appendChild(newNode);
      chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
    }
  }, []);

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

      setConnectionStatus("connecting");

      ws.onopen = () => {
        setConnectionStatus("open");
      };
  
      ws.onclose = () => {
        setConnectionStatus("close");
      };

      ws.onmessage = (e) => {
        try {
          const message = JSON.parse(e.data as string);

          if (isCMDUserList(message.cmd)) {
            const userList = JSON.parse(message.content);
            updateUserList(userList);
          } else if (isCMDNewUser(message.cmd)) {
            handleNewUserMessage(`Hello from ${message.username}`);
          } else if (isCMDUserLeft(message.cmd)) {
            handleUserLeftMessage(`Goodbye from ${message.username}`);
          } else if (isCMDChat(message.cmd)) {
            handleChatMessage(`${message.username}: ${message.content}`);
          }
        } catch (error) {
          // Forget the error.
        }
      };
  
      ws.onerror = () => {
        setConnectionStatus("error");
      };
    } else if (!open && webSocketClient) {
      webSocketClient.close();
      setWebSocketClient(undefined);
    }
  }, [
    open,
    chatRoomInfo,
    webSocketClient,
    updateUserList,
    handleNewUserMessage,
    handleUserLeftMessage,
    handleChatMessage,
  ]);

  const sendMessage = React.useCallback(() => {
    if (webSocketClient && chatMessage) {
      webSocketClient.send(chatMessage);
      setChatMessage("");
    }
  }, [webSocketClient, chatMessage]);

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
                <div className="name">
                  <Icon name="circle" size="small" color={formatConnectionStatus(connectionStatus)} />
                  {chatRoomInfo.name}
                </div>
                <div className="intro">{chatRoomInfo.intro}</div>
              </div>
              <Icon name="close" onClick={handleClose} />
            </div>
          </Header>
          
          <Segment attached>
            <div className="chat-panel">
              <div className="msg-wrapper">
                <Sidebar.Pushable>
                  <Message>
                    <div ref={chatMessageRef} className="inner"></div>
                  </Message>
                  <Sidebar
                    direction="left"
                    animation="overlay"
                    visible={chatRoomUserListVisible}
                  >
                    <div ref={userListRef} className="inner"></div>
                  </Sidebar>
                </Sidebar.Pushable>
              </div>
              <div className="ops-box">
                <Icon name="group" onClick={() => setChatRoomUserListVisible(!chatRoomUserListVisible)} />
              </div>
            </div>

            <div className="chat-input">
              <Form>
                <TextArea value={chatMessage} onChange={onChatMessageChange} />
              </Form>
            </div>

            <Button onClick={sendMessage} fluid>{t("Send")}</Button>
          </Segment>
        </div>
      </Modal>
    </>
  );
}

export default Main;
