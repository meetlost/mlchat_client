/**
 * type for Chat Room List
 */

import { ChatRoomType } from "src/Components/ChatRoom/type";

interface ChatRoomListPageInfoType {
  page: number;
  total: number;
}

interface ChatRoomListObjType extends ChatRoomListPageInfoType {
  list: ChatRoomType[];
}

type HandleChatRoomListPageInfoType = (pageInfo: ChatRoomListPageInfoType) => void;

export type { ChatRoomListPageInfoType, ChatRoomListObjType, HandleChatRoomListPageInfoType };
