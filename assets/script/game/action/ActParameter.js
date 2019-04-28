/*
 * @Description: In User Settings Edit
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-28 13:06:53
 * @LastEditTime: 2019-04-28 14:39:01
 */

let ActDef = require("ActDef")
let BuffDef = require("BuffDef")
let ActorDef = require("ActorDef")

cc.Class({
    // extends: cc.Component,
    name : 'ActParameter',

    properties: {
        from_unit_type : {
            default: ActDef.UnitType.unit_none,
            type : cc.Enum(ActDef.UnitType),
            tooltip : "值来源-单位类型",
            // readonly : true,
            // override : true,
        },

        parameter_type : {
            default: ActDef.ParameterType.nothing,
            type : cc.Enum(ActDef.ParameterType), 
            tooltip : "参数类型",
            notify() {
                // this.getImplementDesc();
            },
        },

        user_attribute_key : {
            default: ActorDef.AttributeKey.unknown,
            type : cc.Enum(ActorDef.AttributeKey), 
            tooltip : "使用者属性键值",
            visible() {

                if (this.parameter_type == ActDef.ParameterType.actor_attribute) {
                    return true;
                }
                else if (this.parameter_type == ActDef.ParameterType.damage_value) {
                    return true;
                }
                return false;
            },
            notify() {

            },
        },

        // damage_source_type : {
        //     default: ActDef.DamageSourceType.nothing,
        //     type : cc.Enum(ActDef.DamageSourceType), 
        //     tooltip : "伤害来源",
        //     // displayName : "Implement Value List",
        //     visible() {
        //         return this.parameter_type == ActDef.ParameterType.damage_source;
        //     },
        //     notify() {

        //     },
        // },

        damage_type : {
            default: ActorDef.AttackType.normal,
            type : cc.Enum(ActorDef.AttackType), 
            tooltip : "伤害类型",
            visible() {
                return this.parameter_type == ActDef.ParameterType.damage_type;
            },
            notify() {

            },
        },

        value_type : {
            default: ActDef.ValueType.constant,
            type : cc.Enum(ActDef.ValueType), 
            tooltip : "值类型",
            visible() {
                if (this.parameter_type == ActDef.ParameterType.damage_source) {
                    return false;
                }
                else if (this.parameter_type == ActDef.ParameterType.damage_type) {
                    return false;
                }
                else if (this.parameter_type == ActDef.ParameterType.buff_type) {
                    return false;
                }

                return true;
            },
            notify() {
                // this.getImplementDesc();
            },
        },

        value_list : {
            default: [],
            type : [cc.Float], 
            tooltip : "值列表",
            // displayName : "Implement Value",
            visible() {
                if (this.parameter_type == ActDef.ParameterType.damage_source) {
                    return false;
                }
                else if (this.parameter_type == ActDef.ParameterType.damage_type) {
                    return false;
                }
                else if (this.parameter_type == ActDef.ParameterType.buff_type) {
                    return false;
                }
                
                return true;
            },
        },

        buff_id : {
            default: BuffDef.BuffID.unknown,
            type : cc.Enum(BuffDef.BuffID),
            tooltip : "BUFF ID", 
            visible() {
                return this.parameter_type == ActDef.ParameterType.buff_type;
            },
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
