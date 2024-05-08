import { cross } from "@/utils/global";
import { isEmptyValue } from "laser-utils";
import { logger } from "@/utils/logger";
import { URL_MATCH } from "@/utils/constant";
import type { PCRequestType } from "./request";
import { POPUP_TO_CONTENT_REQUEST } from "./request";
import type { PCResponseType } from "./response";
import { POPUP_TO_CONTENT_RESPONSE } from "./response";

export class PCBridge {
  public static readonly REQUEST = POPUP_TO_CONTENT_REQUEST;
  public static readonly RESPONSE = POPUP_TO_CONTENT_RESPONSE;

  static async postToContent(data: PCRequestType) {
    return new Promise<PCResponseType | null>(resolve => {
      cross.tabs
        .query({ active: true, currentWindow: true })
        .then(tabs => {
          const tab = tabs[0];
          const tabId = tab && tab.id;
          const tabURL = tab && tab.url;
          if (tabURL && !URL_MATCH.some(match => new RegExp(match).test(tabURL))) {
            resolve(null);
            return void 0;
          }
          if (!isEmptyValue(tabId)) {
            cross.tabs.sendMessage(tabId, data).then(resolve);
          } else {
            resolve(null);
          }
        })
        .catch(error => {
          logger.warning("Send Message Error", error);
        });
    });
  }

  static onPopupMessage(cb: (data: PCRequestType) => void | PCResponseType) {
    const handler = (
      message: PCRequestType,
      _: chrome.runtime.MessageSender,
      sendResponse: (response?: PCResponseType | null) => void
    ) => {
      const rtn = cb(message);
      rtn && sendResponse(rtn);
    };
    cross.runtime.onMessage.addListener(handler);
    return () => {
      cross.runtime.onMessage.removeListener(handler);
    };
  }
}