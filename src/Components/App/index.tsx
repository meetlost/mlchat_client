/**
 * App
 */

import React from "react";
import { PaginationProps } from "semantic-ui-react";

import Header from "src/Components/Header";
import ChatRoomList from "src/Components/ChatRoomList";
import Footer from "src/Components/Footer";
import Loader from "src/Components/Loader";
import ChatRoomCreationBox from "src/Components/ChatRoomCreationBox";
import { HandleOpenType as HandleChatRoomCreationBoxOpenType } from "src/Components/ChatRoomCreationBox/type";
import {
  ChatRoomListPageInfoType,
  HandleChatRoomListPageInfoType,
  HandleChatRoomListPageChangeType,
} from "src/Components/ChatRoomList/type";
import { getChatRoomListObj } from "src/Components/ChatRoomList/lib";
import {
  ChatRoomType,
  HandleOpenType as HandleChatRoomOpenType,
  HandleJoinType as HandleChatRoomJoinType,
} from "src/Components/ChatRoom/type";
import ChatRoom from "src/Components/ChatRoom";

import "./style.scss";

function Main(): JSX.Element
{
  const [chatRoomCreationBoxOpen, setChatRoomCreationBoxOpen] = React.useState<boolean>(false);
  const [chatRoomListPageInfo, setChatRoomListPageInfo] = React.useState<ChatRoomListPageInfoType>({ page: 1, total: 1 });
  const [chatRoomList, setChatRoomList] = React.useState<ChatRoomType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [chatRoomOpen, setChatRoomOpen] = React.useState<boolean>(false);
  const [chatRoomInfo, setChatRoomInfo] = React.useState<ChatRoomType>({ name: "", intro: "" });

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
  }, []);

  const handleChatRoomOpen: HandleChatRoomOpenType = React.useCallback((open: boolean) => {
    setChatRoomOpen(open);
  }, []);

  const handleChatRoomJoin: HandleChatRoomJoinType = React.useCallback((chatRoom: ChatRoomType) => {
    setChatRoomInfo(chatRoom);
  }, []);

  const fetchChatRoomList = React.useCallback(async () => {
    setLoading(true);
    const obj = await getChatRoomListObj();
    setLoading(false);

    setChatRoomList(obj.list);
    handleChatRoomListPageInfo({ page: obj.page, total: obj.total });
  }, [handleChatRoomListPageInfo]);

  React.useEffect(() => {
    fetchChatRoomList();
  }, [fetchChatRoomList]);

  return (
    <>
      <div className="app-box">
        <Header handleChatRoomCreationBoxOpen={handleChatRoomCreationBoxOpen} />
        <ChatRoomList
          chatRoomList={chatRoomList}
          handleChatRoomOpen={handleChatRoomOpen}
          handleChatRoomJoin={handleChatRoomJoin}
        />
        <Footer
          chatRoomListPageInfo={chatRoomListPageInfo}
          handleChatRoomListPageChange={handleChatRoomListPageChange}
        />

        <Loader loading={loading} />
      </div>

      <ChatRoomCreationBox
        open={chatRoomCreationBoxOpen}
        handleOpen={handleChatRoomCreationBoxOpen}
      />
      <ChatRoom
        open={chatRoomOpen}
        handleOpen={handleChatRoomOpen}
        chatRoomInfo={chatRoomInfo}
      />
    </>
  );
}

export default Main;
