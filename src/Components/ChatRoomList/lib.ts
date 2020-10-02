/**
 * lib for Chat Room List
 */

import { ChatRoomListObjType } from "./type";

async function getChatRoomListObj(): Promise<ChatRoomListObjType>
{
  ////
  const total = 10;
  const obj: ChatRoomListObjType = { page: 1, total, list: [] };

  for (let i = 0, len = total; i < len; i++) {
    obj.list.push({ name: `${i}`, intro: `${i} intro` });
  }

  return obj;
}

export { getChatRoomListObj };
