
const website = {
    regexp: new RegExp("commandlinux|cnki|leetcode-cn|yuque|ruiwen"),
    init: function($) {
        $("body").append(`<style id="copy-hide">#_copy{display: none !important;}</style>`);
    },
    hideButton: function($){
        this.init($);
    },
    showButton: function($){
        $("#copy-hide").remove();
    }
} 

export default website;