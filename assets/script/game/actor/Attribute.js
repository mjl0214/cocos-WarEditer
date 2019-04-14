/*
 * @Description: 演员属性衍生类
 * @Author: mengjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-12 14:22:03
 */

let ActorDef = require("ActorDef")
let UnitDef = require("UnitDef")

cc.Class({
    // extends: cc.Component,

    name : "Attribute",

    properties: {
        attribute : {
            default: ActorDef.AttributeType.unknown,
            type : cc.Enum(ActorDef.AttributeType), 
            tooltip : "属性",
        },

        attribute_value : {
            default : 0,
            type : cc.Float,
            tooltip : "属性值",
            visible() {
                switch (this.attribute) {
                    case ActorDef.AttributeType.attack_type:
                    case ActorDef.AttributeType.armor_type:    
                        return false;
                
                    default:
                        break;
                }
                return true;
            },
        },

        attack_type_value : {
            default: UnitDef.AttackType.unknown,
            type : cc.Enum(UnitDef.AttackType),
            displayName : "Attributes Value",
            tooltip : "属性值",
            visible() {
                return this.attribute == ActorDef.AttributeType.attack_type;
            },
            notify() {
                this.attribute_value = this.attack_type_value;
            },
        },

        armor_type_value : {
            default: UnitDef.DefenseType.unknown,
            type : cc.Enum(UnitDef.DefenseType),
            displayName : "Attributes Value",
            tooltip : "属性值",
            visible() {
                return this.attribute == ActorDef.AttributeType.armor_type;
            },
            notify() {
                this.attribute_value = this.armor_type_value;
            },
        },
    },

    ctor () {

    },

    // update (dt) {},
});
