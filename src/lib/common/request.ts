/**
 * Do HTTP Request
 */

import axios from "axios";

import { AppAnyType } from "src/Components/App/type";
import { t } from "src/lib/language/translate";

interface RequestType {
  method: "GET" | "POST";
  url: string;
  req?: AppAnyType;
}

interface ResponseType {
  code: number;
  message?: string;
  res?: AppAnyType;
}

function request(request: RequestType): Promise<ResponseType>
{
  return new Promise((resolve) => {
    axios({
      method: request.method,
      url: request.url,
      headers: {
        "Content-Type": "application/json",
      },
      data: request.req,
    }).then(response => {
      const myResponse: ResponseType = { code: 200 };

      if (response.data) {
        if (response.data.code) {
          myResponse.code = response.data.code;
        }
        if (response.data.message) {
          myResponse.message = response.data.message;
        }
        if (response.data.res) {
          myResponse.res = response.data.res;
        }
      } else {
        myResponse.code = 400;
        myResponse.message = t("Unknown Error");
      }
      
      resolve(myResponse);
    }).catch(() => {
      const myResponse: ResponseType = {
        code: 400,
        message: t("Unknown Error"),
      };
      resolve(myResponse);
    });
  });
}

function isResponseOk(response: ResponseType): boolean
{
  return response.code === 200;
}

export { request, isResponseOk };
