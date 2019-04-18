/*
 * @Description: Unit Creator
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-18 11:13:42
 * @LastEditTime: 2019-04-18 13:08:54
 */

let UnitDef = require("UnitDef")

module.exports = {

    createUnit(type)
    {
        // unknown : 0,            // 未知
        // actor : 1,              // 演员
        // item : 2,               // 物品
        // hero : 3,               // 英雄
        // skill : 4,              // 技能
        // trigger : 5,            // 触发器
        // buff : 6,               // buff
        // timer : 7,              // 定时器
        // system : 8,             // 系统

        // let UnitDef = require("UnitDef")
        
        var unit = null;

        switch (type) {
            case UnitDef.TypeID.actor:
                let Actor = require("Actor")
                unit = new Actor();
                break;
            case UnitDef.TypeID.item:
                let Item = require("Item")
                unit = new Item();
                break;
            case UnitDef.TypeID.skill:
                let Skill = require("Skill")
                unit = new Skill();
                break;
            case UnitDef.TypeID.buff:
                let Buff = require("Buff")
                unit = new Buff();
                break;
            case UnitDef.TypeID.trigger:
                let Trigger = require("Trigger")
                unit = new Trigger();
                break;
            case UnitDef.TypeID.timer:
                let Timer = require("Timer")
                unit = new Timer();
                break;
            case UnitDef.TypeID.system:
                let Unit = require("Unit")
                unit = new Unit();
                break;
            default:
                break;
        }

        // 不要在这里 onEnter
        return unit;
    },

    createUnitByName(name)
    {
        return this.createUnit(UnitDef.TypeID[name]);
    },
};