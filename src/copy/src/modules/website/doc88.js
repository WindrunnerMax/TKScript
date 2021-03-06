
let path = "";

const website = {
    regexp: /.*doc88\.com\/.+/,
    init: function($) {
        // GM_xmlhttpRequest({
        //     method: "GET",
        //     url: "https://res.doc88.com/assets/js/v2.js",
        //     onload: function(response) {
        //         var view = new Function("var view = " + response.responseText.replace("eval", "") + "; return view;");
        //         path = /<textarea[\s\S]*?Viewer.([\S]*?)\+[\S]*?\/textarea>/.exec(view())[1];
        //     }
        // })
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://static.doc88.com/resources/js/modules/main-v1.min.js?v=1.90",
            onload: function(response) {
                path = /<textarea[\s\S]+>'\+([\S]*?)\+\"<\/textarea>/.exec(response.responseText)[1];
            }
        })
    },
    getSelectedText: function(){
        let select = unsafeWindow;
        path.split(".").forEach(v => {
            select = select[v];
        });
        return select;
    }
} 

export default website;