/*
 * @Description: 技能单位可视化组件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-17 14:26:54
 */


let SkillDef = require('SkillDef')
let Trigger = require("Trigger")
let TriggerUnit = require("TriggerUnit")
let Unit = require("Unit")
let UnitDef = require("UnitDef")
let Skill = require("Skill")

cc.Class({
    extends: cc.Component,
    mixins: [Skill],

    properties: {

        // unit_list : {
        //     default: [],
        //     type : [Trigger], 
        //     tooltip : "Unit列表",
        //     override : true,
        // },

        poolNum : {
            default : 1,
            type : cc.Integer,
            tooltip : '预制体池初始化数量', 
        },
    },

    onLoad () {
        // var unit = new Skill();
        // unit.onLoad.apply(this);
        this.onEnter();
    },

    onDestroy () {
        this.onExit();
    },

    getPoolName()
    {
        return SkillDef.SkillID[this.skill_id];
    },

    getSkillJson()
    {
        var data = {};
        data['skill_id'] = this.skill_id;
        data['skill_name'] = this.skill_name;
        data['skill_desc'] = this.skill_desc;
        data['poolNum'] = this.poolNum;
        data['trigger'] = this.trigger_unit.getJson();
        return data;
    },

    start () {
        // JSON.parse(this.getSkillJson())
        console.log(JSON.stringify(this.getSkillJson()));
    },

    // update (dt) {},
});
