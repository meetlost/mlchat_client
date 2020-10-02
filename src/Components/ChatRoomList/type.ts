/**
 * type for Chat Room List
 */

import { PaginationProps } from "semantic-ui-react";

import { ChatRoomType } from "src/Components/ChatRoom/type";

interface ChatRoomListPageInfoType {
  page: number;
  total: number;
}

interface ChatRoomListObjType extends ChatRoomListPageInfoType {
  list: ChatRoomType[];
}

type HandleChatRoomListPageInfoType = (pageInfo: ChatRoomListPageInfoType) => void;

type HandleChatRoomListPageChangeType = (event: React.SyntheticEvent, data: PaginationProps) => void;

export type {
  ChatRoomListPageInfoType,
  ChatRoomListObjType,
  HandleChatRoomListPageInfoType,
  HandleChatRoomListPageChangeType,
};
