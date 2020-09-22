/**
 * App
 */

import React from "react";

import Header from "src/Components/Header";
import ChatRoomList from "src/Components/ChatRoomList";
import Footer from "src/Components/Footer";
import ChatRoomCreationBox from "src/Components/ChatRoomCreationBox";
import { HandleChatRoomCreationBoxOpenType } from "src/Components/ChatRoomCreationBox/type";

import "./style.scss";

function Main(): JSX.Element
{
  const [chatRoomCreationBoxOpen, setChatRoomCreationBoxOpen] = React.useState<boolean>(false);

  const handleChatRoomCreationBoxOpen: HandleChatRoomCreationBoxOpenType = React.useCallback((open: boolean) => {
    setChatRoomCreationBoxOpen(open);
  }, []);

  return (
    <>
      <div className="app-box">
        <Header handleChatRoomCreationBoxOpen={handleChatRoomCreationBoxOpen} />
        <ChatRoomList />
        <Footer />
      </div>

      <ChatRoomCreationBox
        open={chatRoomCreationBoxOpen}
        handleChatRoomCreationBoxOpen={handleChatRoomCreationBoxOpen}
      />
    </>
  );
}

export default Main;
