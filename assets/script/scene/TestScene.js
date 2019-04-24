let DialogMgr = require('DialogMgr')
let DialogDef = require("DialogDef")

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onClickToGame()
    {
        cc.director.loadScene('GameScene');
    },

    onClickOpenBook()
    {
        DialogMgr.showDialog(DialogDef.DialogID.dialog_book, 1);
    },

    // update (dt) {},
});
