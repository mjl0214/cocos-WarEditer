/*
 * @Description: 演员可视化组件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-17 22:58:24
 */


let ActorDef = require("ActorDef")
let Actor = require("Actor")
let Listener = require("Listener")
let EventDef = require("EventDef")
let ActorMgr = require("ActorMgr")
let SkillDef = require("SkillDef")
let PoolManager = require("PoolManager")

cc.Class({
    extends: cc.Component,
    mixins: [Actor],

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // var actor = new Actor();
        // actor.onLoad.apply(this);
        this.onEnter();

        this.actor_id = ActorMgr.createActorId();
        // this.initSkill();
    },

    onDestroy () {
        this.onExit();
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

    // update (dt) {},
});
