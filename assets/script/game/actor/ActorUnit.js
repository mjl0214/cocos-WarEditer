/*
 * @Description: 演员可视化组件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-25 15:42:18
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

cc.Class({
    extends: cc.Component,
    mixins: [Actor],

    properties: {
        tipNode : {
            default: null,
            type : cc.Node, 
            tooltip : "显示文字",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // var actor = new Actor();
        // actor.onLoad.apply(this);
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

    initSkill()
    {
        this._skills = new Array();

        // for (let index = 0; index < this.skill_list.length; index++) {
        //     const id = this.skill_list[index];
        //     var skillNode = PoolManager.getPerfab(SkillDef.SkillID[id]);
        //     if (skillNode == null) {
        //         console.error('技能不存在[', SkillDef.SkillID[id], ']');
        //         continue;
        //     }
        //     this.node.addChild(skillNode);
        //     this._skills.push(skillNode);
            
        //     var skill = skillNode.getComponent("SkillUnit");
        //     if (skill) {
        //         skill.setHolderId(this.getActorId());
        //     }
        // }
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
