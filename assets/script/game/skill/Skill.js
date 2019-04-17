/*
 * @Description: 技能类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 22:47:30
 * @LastEditTime: 2019-04-17 14:25:28
 */

let Item = require("Item")
let UnitDef = require("UnitDef")
let SkillDef = require('SkillDef')
let Trigger = require("Trigger")

cc.Class({
    extends: Item,

    properties: {
        unit_type : {
            default: UnitDef.TypeID.skill,
            type : cc.Enum(UnitDef.TypeID), 
            tooltip : "Unit类型",
            readonly : true,
            override : true,
        },

        holder_id : {
            default: -1,
            type : cc.Integer, 
            tooltip : "技能持有者ID",
            visible : false,
        },

        skill_id : {
            default: SkillDef.SkillID.unknown,
            type : cc.Enum(SkillDef.SkillID), 
            tooltip : "技能ID",
        },

        skill_name: {
            default: '',
            // type : String, 
            tooltip : "技能名字",
        },

        skill_desc: {
            default: '',
            // type : String, 
            tooltip : "技能描述",
            multiline : true,
        },

        skill_level : {
            default : 1,
            type : cc.Integer,
            tooltip : '技能等级', 
        },

        trigger_unit : {
            default: null,
            type : Trigger, 
            tooltip : "触发器",
        },
    },

    onEnter () {
        this._super();
        // console.log('this.trigger_unit', this.trigger_unit)

        // 调用触发器的onLoad
        this.trigger_unit.onEnter();
    },

    onExit () {
        // console.log('Skill onDestroy')
        this._super();
        this.trigger_unit.onExit();
    },

    ctor () {
        // console.log('Skill ctor')
    },

    update (dt) {
        // console.log('Skill update')
    },

    getSkillID()
    {
        return this.skill_id;
    },

    getSkillLevel()
    {
        return this.skill_level;
    },

    getHolderId()
    {
        return this.holder_id;
    },

    setHolderId(holderId)
    {
        this.holder_id = holderId;
    },
});
