/*
 * @Description: 技能配置文件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-30 09:57:14
 * @LastEditTime: 2019-04-30 10:51:13
 */

let SkillBuff = require("SkillBuff")

cc.Class({
    // extends: cc.Component,
    name : 'SkillGrade',

    properties: {
        skill_duration : {
            default : 0,
            type : cc.Float,
            tooltip : '技能持续时间',
        },

        skill_cooldown : {
            default : 0,
            type : cc.Float,
            tooltip : '技能冷却时间',
        },

        skill_damage : {
            default : 0,
            type : cc.Float,
            tooltip : '技能伤害',
        },

        skill_mana : {
            default : 0,
            type : cc.Integer,
            tooltip : '魔法消耗',
        },

        skill_range : {
            default : 1,
            type : cc.Integer,
            tooltip : '技能范围(格子)',
        },

        skill_buffs : {
            default : [],
            type : [SkillBuff],
            tooltip : '技能Buff列表',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
