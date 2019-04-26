/*
 * @Description: 演员可视化组件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-26 15:29:34
 */


let ActorDef = require("ActorDef")
let Actor = require("Actor")
let Listener = require("Listener")
let EventDef = require("EventDef")
let ActorMgr = require("ActorMgr")
let SkillDef = require("SkillDef")
let PoolManager = require("PoolManager")
let DialogMgr = require("DialogMgr")
let DialogDef = require("DialogDef")
let NameDef = require("NameDef")

cc.Class({
    extends: cc.Component,
    mixins: [Actor],

    properties: {
        actor_name : {
            default : '',
        },

        poolNum : {
            default : 1,
            type : cc.Integer,
            tooltip : '预制体池初始化数量',
            visible : false, 
        },

        actor_name : {
            default : NameDef.no_one,
            type : cc.Enum(NameDef),
            tooltip : '英雄名字',
        },
        
        tipNode : {
            default: null,
            type : cc.Node, 
            tooltip : "显示文字",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.onEnter();
        this.actor_id = ActorMgr.createActorId();
        this.initEvent();
    },

    onDestroy () {
        this.onExit();

        this.tipNode.off(cc.Node.EventType.MOUSE_ENTER);
        this.tipNode.off(cc.Node.EventType.MOUSE_LEAVE);
        this.tipNode.off(cc.Node.EventType.MOUSE_MOVE);
    },

    start () {

    },

    getPoolName()
    {
        return NameDef[this.actor_name];
    },

    getSkills()
    {
        return this._skills;
    },

    getActorId()
    {
        return this.actor_id;
    },

    getTeamId()
    {
        return this.team_id;
    },

    initEvent()
    {
        this.tipNode.on(cc.Node.EventType.MOUSE_ENTER, function (event) {
                DialogMgr.showDialog(DialogDef.DialogID.dialog_actor_tip, {unit_id : this.unit_id});
            }, this);

        this.tipNode.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
                DialogMgr.closeDialog(DialogDef.DialogID.dialog_actor_tip);
            }, this);

        this.tipNode.on(cc.Node.EventType.MOUSE_MOVE, function (event) {
                // console.log(event.getLocation())
                var dialog = DialogMgr.getDialog(DialogDef.DialogID.dialog_actor_tip);
                if (dialog) {
                    dialog.node.setPosition(event.getLocation());
                }
                // DialogMgr.closeDialog(DialogDef.DialogID.dialog_actor_tip);
            }, this);
    },

    // update (dt) {},
});
