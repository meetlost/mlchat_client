/**
 * type for Chat Room Creation Box
 */

type HandleChatRoomCreationBoxOpenType = (open: boolean) => void;

interface ChatRoomType {
  name: string;
  intro: string;
}

export type { HandleChatRoomCreationBoxOpenType, ChatRoomType };
