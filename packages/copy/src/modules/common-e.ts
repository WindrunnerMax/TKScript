import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp(["wjx", "fanyi\\.baidu", "tianqi"].join("|")),
    init: function ($) {
        utils.hideButton($);
        utils.enableUserSelect($, "*");
        utils.enableOnCopyByCapture();
        utils.enableOnKeyDownByCapture();
        utils.enableOnSelectStartByCapture();
        utils.enableOnContextMenuByCapture();
    },
};

export default website;