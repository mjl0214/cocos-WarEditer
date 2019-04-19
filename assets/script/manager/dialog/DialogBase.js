/*
 * @Description: 对话框基类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-15 08:38:25
 * @LastEditTime: 2019-04-19 14:15:50
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

    onEnter(params)
    {// 对话框被激活时
        console.log('DialogBase onEnable');
    },

    onLeave()
    {// 对话框被关闭时
        console.log('DialogBase onDisable');
    },

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

    setDialogZIndex(zIndex)
    {
        DialogMgr.setDialogZIndex(this, zIndex);
    },

    closeDialog(ani)
    {
        // 两种关闭方式
        DialogMgr.closeDialog(this, ani);
        // DialogMgr.closeDialog(this.dialog_id, ani);
    },

    playShowAni(ani)
    {
        switch (ani) {
            case 1:
            this.playShowScaleAni();
                break;
            // todo
            default:
                break;
        }
    },

    playCloseAni(ani)
    {
        switch (ani) {
            case 1:
            this.playCloseScaleAni();
                break;
            // todo
            default:
                break;
        }
    },

    playShowScaleAni()
    {
        this.node.stopAllActions();
        this.setState(0);
        var orgScale = this.node.scale;
        this.node.scale = 0;
        var action = cc.sequence(cc.scaleTo(0.5, orgScale).easing(cc.easeBackOut()), cc.callFunc((target) => {
            this.setState(1);
        }));

        this.node.runAction(action);
    },

    playCloseScaleAni()
    {
        this.node.stopAllActions();
        this.setState(2);
        var orgScale = this.node.scale;
        var action = cc.sequence(cc.scaleTo(0.2, 0), cc.callFunc((target) => {
            this.node.scale = orgScale;
            DialogMgr._closeDialog(this);
        }));

        this.node.runAction(action);
    },

    getDialogName()
    {
        return DialogDef.DialogID[this.dialog_id];
    },

});
