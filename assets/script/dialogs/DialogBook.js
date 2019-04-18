
let DialogBase = require("DialogBase")
let DialogMgr = require("DialogMgr")
let DialogDef = require("DialogDef")

cc.Class({
    extends: DialogBase,

    properties: {
        showLabel : {
            default: null,
            type : cc.Label, 
            tooltip : "显示文字",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.showLabel.string = '我是图鉴,' + '第[' + DialogMgr.getDialogAmount() + ']个对话框';
    },

    onClickClose()
    {
        this.closeDialog(true);
    },

    onClickOpen()
    {
        DialogMgr.showDialog(DialogDef.DialogID.dialog_book, true);
    },

    onClickCloseAll()
    {
        DialogMgr.closeAllDialog(true);
    },

    // update (dt) {},
});
