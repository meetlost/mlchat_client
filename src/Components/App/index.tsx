/**
 * App
 */

import React from "react";
import { PaginationProps } from "semantic-ui-react";

import Header from "src/Components/Header";
import ChatRoomList from "src/Components/ChatRoomList";
import Footer from "src/Components/Footer";
import ChatRoomCreationBox from "src/Components/ChatRoomCreationBox";
import { HandleOpenType as HandleChatRoomCreationBoxOpenType } from "src/Components/ChatRoomCreationBox/type";
import {
  ChatRoomListPageInfoType,
  HandleChatRoomListPageInfoType,
  HandleChatRoomListPageChangeType,
} from "src/Components/ChatRoomList/type";

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

  const handleChatRoomListPageChange: HandleChatRoomListPageChangeType = React.useCallback((event: React.SyntheticEvent, data: PaginationProps) => {
    ////
    console.log(event);
    console.log(data);
  }, [])

  return (
    <>
      <div className="app-box">
        <Header handleChatRoomCreationBoxOpen={handleChatRoomCreationBoxOpen} />
        <ChatRoomList handleChatRoomListPageInfo={handleChatRoomListPageInfo} />
        <Footer
          chatRoomListPageInfo={chatRoomListPageInfo}
          handleChatRoomListPageChange={handleChatRoomListPageChange}
        />
      </div>

      <ChatRoomCreationBox
        open={chatRoomCreationBoxOpen}
        handleOpen={handleChatRoomCreationBoxOpen}
      />
    </>
  );
}

export default Main;
