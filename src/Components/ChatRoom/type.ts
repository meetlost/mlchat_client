/**
 * type for Chat Room
 */

interface ChatRoomType {
  name: string;
  intro: string;
}

type HandleOpenType = (open: boolean) => void;

type HandleJoinType = (chatRoom: ChatRoomType) => void;

export type { ChatRoomType, HandleOpenType, HandleJoinType };
