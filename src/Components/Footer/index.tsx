/**
 * Footer
 */

import React from "react";
import { Pagination } from "semantic-ui-react";

import { ChatRoomListPageInfoType, HandleChatRoomListPageChangeType } from "src/Components/ChatRoomList/type";

import "./style.scss";

interface Props {
  chatRoomListPageInfo: ChatRoomListPageInfoType;
  handleChatRoomListPageChange: HandleChatRoomListPageChangeType;
}

function Main(props: Props): JSX.Element
{
  const { chatRoomListPageInfo, handleChatRoomListPageChange } = props;

  return (
    <>
      <div className="footer-box">
        <Pagination
          activePage={chatRoomListPageInfo.pageNumber}
          totalPages={Math.ceil(chatRoomListPageInfo.total / chatRoomListPageInfo.pageSize)}
          firstItem={null}
          lastItem={null}
          ellipsisItem={null}
          boundaryRange={0}
          onPageChange={handleChatRoomListPageChange}
        />
      </div>
    </>
  );
}

export default Main;
