let DialogMgr = require("DialogMgr")

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},

    show()
    {
        DialogMgr.add(this);
    },

    hide()
    {
        DialogMgr.sub(this);
    },
});
