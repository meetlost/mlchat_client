/**
 * App
 */

import React from "react";

import Header from "src/Components/Header";
import ChatRoomList from "src/Components/ChatRoomList";
import Footer from "src/Components/Footer";
import ChatRoomCreationBox from "src/Components/ChatRoomCreationBox";
import { HandleOpenType as HandleChatRoomCreationBoxOpenType } from "src/Components/ChatRoomCreationBox/type";
import { ChatRoomListPageInfoType, HandleChatRoomListPageInfoType } from "src/Components/ChatRoomList/type";

import "./style.scss";

function Main(): JSX.Element
{
  const [chatRoomCreationBoxOpen, setChatRoomCreationBoxOpen] = React.useState<boolean>(false);
  const [chatRoomListPageInfo, setChatRoomListPageInfo] = React.useState<ChatRoomListPageInfoType>({ page: 1, total: 1 });

  const handleChatRoomCreationBoxOpen: HandleChatRoomCreationBoxOpenType = React.useCallback((open: boolean) => {
    setChatRoomCreationBoxOpen(open);
  }, []);

  const handleChatRoomListPageInfo: HandleChatRoomListPageInfoType = React.useCallback((pageInfo: ChatRoomListPageInfoType) => {
    setChatRoomListPageInfo(pageInfo);
  }, []);

  return (
    <>
      <div className="app-box">
        <Header handleChatRoomCreationBoxOpen={handleChatRoomCreationBoxOpen} />
        <ChatRoomList handleChatRoomListPageInfo={handleChatRoomListPageInfo} />
        <Footer chatRoomListPageInfo={chatRoomListPageInfo} />
      </div>

      <ChatRoomCreationBox
        open={chatRoomCreationBoxOpen}
        handleOpen={handleChatRoomCreationBoxOpen}
      />
    </>
  );
}

export default Main;
