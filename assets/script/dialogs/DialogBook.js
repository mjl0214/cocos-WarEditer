
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
    },

    onEnter(params)
    {
        this.showLabel.string = '我是图鉴,' + '第[' + (DialogMgr.getDialogAmount() + 1) + ']个对话框';
    },

    onLeave()
    {
        // console.log('onDisable');
    },

    onClickClose()
    {
        this.closeDialog();
    },

    onClickOpen()
    {
        DialogMgr.showDialog(DialogDef.DialogID.dialog_book);
    },

    onClickTip()
    {
        DialogMgr.showDialog(DialogDef.DialogID.dialog_tip);
    },

    onClickProp()
    {
        DialogMgr.showDialog(DialogDef.DialogID.dialog_prop);
    },

    onClickItem()
    {
        DialogMgr.showDialog(DialogDef.DialogID.dialog_item);
    },

    onClickCloseAll()
    {
        DialogMgr.closeAllDialog();
    },

    // update (dt) {},
});
