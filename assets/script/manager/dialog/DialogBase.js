/*
 * @Description: 对话框基类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-15 08:38:25
 * @LastEditTime: 2019-04-18 17:40:36
 */

let DialogMgr = require("DialogMgr")
let DialogDef = require("DialogDef")

cc.Class({
    extends: cc.Component,

    properties: {
        dialog_id : {
            default: DialogDef.DialogID.dialog_unknown,
            type : cc.Enum(DialogDef.DialogID), 
            tooltip : "对话框ID",
        },

        poolNum : {
            default: 1,
            type : cc.Integer, 
            tooltip : "初始化数量",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},

    // show()
    // {
    //     DialogMgr.add(this);
    // },

    closeDialog(ani)
    {
        DialogMgr.closeDialog(this);
    },

    getDialogName()
    {
        return DialogDef.DialogID[this.dialog_id];
    },

});
