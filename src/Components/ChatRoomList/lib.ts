/**
 * lib for Chat Room List
 */

import { request, isResponseOk } from "src/lib/common/request";
import { AppRetType } from "src/Components/App/type";
import { t } from "src/lib/language/translate";

async function getChatRoomListObj(pageNumber: number, pageSize: number): Promise<AppRetType>
{
  const ret: AppRetType = { okFlag: true };

  const response = await request({
    method: "GET",
    url: "/api/rooms",
    params: {
      pageNumber,
      pageSize,
    },
  });

  if (!isResponseOk(response)) {
    ret.okFlag = false;
    ret.reason = response.message || t("Unknown Reason");
    return ret;
  }

  if (response.res) {
    ret.data = {
      list: response.res.list,
      total: response.res.total,
    }
  }

  return ret;
}

export { getChatRoomListObj };
