/**
 * type for Chat Room List
 */

import { PaginationProps } from "semantic-ui-react";

interface ChatRoomListPageInfoType {
  page: number;
  total: number;
}

type HandleChatRoomListPageInfoType = (pageInfo: ChatRoomListPageInfoType) => void;

type HandleChatRoomListPageChangeType = (event: React.SyntheticEvent, data: PaginationProps) => void;

export type {
  ChatRoomListPageInfoType,
  HandleChatRoomListPageInfoType,
  HandleChatRoomListPageChangeType,
};
