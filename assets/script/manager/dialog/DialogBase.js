/*
 * @Description: 对话框基类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-15 08:38:25
 * @LastEditTime: 2019-04-18 23:43:38
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

        isMask : {
            default: true,
            tooltip : "显示遮罩",
        },

        isInput : {
            default: true,
            tooltip : "不可穿透",
        },

        maskId : {
            default: -1,
            type : cc.Integer, 
            tooltip : "遮罩对话框ID",
            visible : false,
        },

        poolNum : {
            default: 1,
            type : cc.Integer, 
            tooltip : "初始化数量",
        },

        _state : {
            default: -1,
            type : cc.Integer, 
            tooltip : "对话框状态(-1关闭,0打开中,1打开,2关闭中)",
            visible : false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},

    setMaskId(maskId)
    {
        this.maskId = maskId;
    },

    getMaskId()
    {
        return this.maskId;
    },

    getIsMask()
    {
        return this.isMask;
    },

    getIsInput()
    {
        return this.isInput;
    },

    setState(state)
    {
        this._state = state;
    },

    closeDialog(ani)
    {
        DialogMgr.closeDialog(this, ani);
    },

    getDialogName()
    {
        return DialogDef.DialogID[this.dialog_id];
    },

});
