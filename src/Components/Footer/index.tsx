/**
 * Footer
 */

import React from "react";
import { Pagination } from "semantic-ui-react";

import { ChatRoomListPageInfoType } from "src/Components/ChatRoomList/type";

import "./style.scss";

interface Props {
  chatRoomListPageInfo: ChatRoomListPageInfoType;
}

function Main(props: Props): JSX.Element
{
  const { chatRoomListPageInfo } = props;

  return (
    <>
      <div className="footer-box">
        <Pagination
          defaultActivePage={chatRoomListPageInfo.page}
          totalPages={chatRoomListPageInfo.total}
          firstItem={null}
          lastItem={null}
          ellipsisItem={null}
          boundaryRange={0}
        />
      </div>
    </>
  );
}

export default Main;
