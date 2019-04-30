/*
 * @Description: In User Settings Edit
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-30 10:44:55
 * @LastEditTime: 2019-04-30 10:57:53
 */


let BuffDef = require("BuffDef")
let ActorDef = require("ActorDef")
let ActDef = require("ActDef")

cc.Class({
    // extends: cc.Component,
    name : 'SkillBuff',

    properties: {

        buff_id : {
            default : BuffDef.BuffID.unknown,
            type : cc.Enum(BuffDef.BuffID),
            tooltip : 'buff ID',
        },

        buff_duration : {
            default : 0,
            type : cc.Float,
            tooltip : 'buff持续时间',
        },

        buff_influence : {
            default : ActorDef.AttributeKey.unknown,
            type : cc.Enum(ActorDef.AttributeKey),
            tooltip : 'buff 影响的属性',
        },

        value_type : {
            default : ActDef.ValueType.constant,
            type : cc.Enum(ActDef.ValueType),
            tooltip : '值类型',
        },

        value_list : {
            default : [],
            type : [cc.Float],
            tooltip : '值列表',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
