
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
        this.closeDialog(1);
    },

    onClickOpen()
    {
        DialogMgr.showDialog(DialogDef.DialogID.dialog_book, 1);
    },

    onClickTip()
    {
        DialogMgr.showDialog(DialogDef.DialogID.dialog_tip, 1);
    },

    onClickProp()
    {
        DialogMgr.showDialog(DialogDef.DialogID.dialog_prop, 1);
    },

    onClickCloseAll()
    {
        DialogMgr.closeAllDialog(1);
    },

    // update (dt) {},
});
