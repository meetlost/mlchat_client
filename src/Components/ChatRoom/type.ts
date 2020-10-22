/**
 * type for Chat Room
 */

interface ChatRoomType {
  name: string;
  intro: string;
}

type HandleOpenType = (open: boolean) => void;

type HandleJoinType = (chatRoom: ChatRoomType) => void;

type ChatRoomConnectionStatusType = "connecting" | "open" | "close" | "error";

export type { ChatRoomType, HandleOpenType, HandleJoinType, ChatRoomConnectionStatusType };
