/*
 * @Description: 演员属性衍生类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-24 15:35:48
 */

let ActorDef = require("ActorDef")
let ActionDef = require("ActionDef")

cc.Class({
    // extends: cc.Component,

    name : "Attribute",

    properties: {
        attribute : {
            default: ActorDef.AttributeType.unknown,
            type : cc.Enum(ActorDef.AttributeType), 
            tooltip : "属性",
        },

        value_type : {
            default: ActionDef.ImplementValueType.constant,
            type : cc.Enum(ActionDef.ImplementValueType), 
            tooltip : "值类型",
            visible() {
                switch (this.attribute) {
                    case ActorDef.AttributeType.attack_type:
                    case ActorDef.AttributeType.armor_type:  
                    case ActorDef.AttributeType.race_point:
                    case ActorDef.AttributeType.classes_point:   
                        return false;
                
                    default:
                        break;
                }
                return true;
            },
        },

        attribute_value : {
            default : 0,
            type : cc.Float,
            tooltip : "属性值",
            visible() {
                switch (this.attribute) {
                    case ActorDef.AttributeType.attack_type:
                    case ActorDef.AttributeType.armor_type:  
                    case ActorDef.AttributeType.race_point:
                    case ActorDef.AttributeType.classes_point:   
                        return false;
                
                    default:
                        break;
                }
                return true;
            },
        },

        attack_type_value : {
            default: ActorDef.AttackType.unknown,
            type : cc.Enum(ActorDef.AttackType),
            displayName : "Attributes Value",
            tooltip : "攻击类型",
            visible() {
                return this.attribute == ActorDef.AttributeType.attack_type;
            },
            notify() {
                this.attribute_value = this.attack_type_value;
            },
        },

        armor_type_value : {
            default: ActorDef.DefenseType.unknown,
            type : cc.Enum(ActorDef.DefenseType),
            displayName : "Attributes Value",
            tooltip : "护甲类型",
            visible() {
                return this.attribute == ActorDef.AttributeType.armor_type;
            },
            notify() {
                this.attribute_value = this.armor_type_value;
            },
        },

        race_type_value : {
            default: ActorDef.RaceType.unknown,
            type : cc.Enum(ActorDef.RaceType),
            displayName : "Attributes Value",
            tooltip : "种族:\nhuman人类\norc兽人\nelf精灵\nundead亡灵(不死)\ntroll巨魔\ngnome侏儒\nbeast野兽\nnaga娜迦\nevil恶魔\nelement元素\nogre食人魔\ndwarf矮人\ndragon龙族\ngoblin地精",
            visible() {
                return this.attribute == ActorDef.AttributeType.race_point;
            },
            notify() {
                this.attribute_value = this.race_type_value;
            },
        },

        classes_type_value : {
            default: ActorDef.ClassesType.unknown,
            type : cc.Enum(ActorDef.ClassesType),
            displayName : "Attributes Value",
            tooltip : "职业:\nwarrior战士\nmage法师\ndruid小德\ndemonHunter恶魔猎手\nartisan工匠\nshaman萨满\nassassin刺客\nwarlock术士\npaladin骑士\nhunter猎人",
            visible() {
                return this.attribute == ActorDef.AttributeType.classes_point;
            },
            notify() {
                this.attribute_value = this.classes_type_value;
            },
        },
    },

    ctor () {

    },

    // update (dt) {},
});
