/**
 * App
 */

import React from "react";

import Header from "src/Components/Header";
import ChatRoomCreationBox from "src/Components/ChatRoomCreationBox";
import { HandleChatRoomCreationBoxOpenType } from "src/Components/ChatRoomCreationBox/type";

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
        <ChatRoomCreationBox
          open={chatRoomCreationBoxOpen}
          handleChatRoomCreationBoxOpen={handleChatRoomCreationBoxOpen}
        />
      </div>
    </>
  );
}

export default Main;
