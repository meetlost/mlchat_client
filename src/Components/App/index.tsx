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
  FetchChatRoomListType,
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
  const defaultPageNumber = 1;
  const defaultPageSize = 10;
  
  const [chatRoomCreationBoxOpen, setChatRoomCreationBoxOpen] = React.useState<boolean>(false);
  const [chatRoomListPageInfo, setChatRoomListPageInfo] = React.useState<ChatRoomListPageInfoType>({
    pageNumber: defaultPageNumber,
    pageSize: defaultPageSize,
    total: 0,
  });
  const [chatRoomList, setChatRoomList] = React.useState<ChatRoomType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [chatRoomOpen, setChatRoomOpen] = React.useState<boolean>(false);
  const [chatRoomInfo, setChatRoomInfo] = React.useState<ChatRoomType>({ name: "", intro: "" });
  const [chatRoomListError, setChatRoomListError] = React.useState<string>("");

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

  const fetchChatRoomList: FetchChatRoomListType = React.useCallback(async (pageNumber = defaultPageNumber, pageSize = defaultPageSize) => {
    setLoading(true);
    const ret = await getChatRoomListObj(pageNumber, pageSize);
    setLoading(false);

    if (!ret.okFlag) {
      setChatRoomListError(ret.reason || "");
      setChatRoomList([]);
      handleChatRoomListPageInfo({ pageNumber, pageSize, total: 0 });
    } else {
      setChatRoomListError("");

      if (ret.data) {
        setChatRoomList(ret.data.list);
        handleChatRoomListPageInfo({ pageNumber, pageSize, total: ret.data.total });
      } else {
        setChatRoomList([]);
        handleChatRoomListPageInfo({ pageNumber, pageSize, total: 0 });
      }
    }
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
          chatRoomListError={chatRoomListError}
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
        fetchChatRoomList={fetchChatRoomList}
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
