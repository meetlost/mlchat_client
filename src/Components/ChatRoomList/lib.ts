/**
 * lib for Chat Room List
 */

import { ChatRoomType } from "src/Components/ChatRoom/type";

async function getChatRoomList(): Promise<ChatRoomType[]>
{
  const list: ChatRoomType[] = [];

  ////
  for (let i = 0, len = 10; i < len; i++) {
    list.push({ name: `${i}`, intro: `${i} intro` });
  }

  return list;
}

export { getChatRoomList };
