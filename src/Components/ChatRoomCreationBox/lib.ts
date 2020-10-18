/**
 * lib for Chat Room Creation Box
 */

import { ChatRoomType } from "src/Components/ChatRoom/type";
import { request, isResponseOk } from "src/lib/common/request";
import { AppRetType } from "src/Components/App/type";
import { t } from "src/lib/language/translate";

async function createChatRoom(chatRoom: ChatRoomType): Promise<AppRetType>
{
  const ret: AppRetType = { okFlag: true };

  const response = await request({
    method: "POST",
    url: "/api/rooms",
    body: {
      "name": chatRoom.name,
      "intro": chatRoom.intro,
    },
  });

  if (!isResponseOk(response)) {
    ret.okFlag = false;
    ret.reason = response.message || t("Unknown Reason");
    return ret;
  }

  return ret;
}

export { createChatRoom };
