/*
 * @Description: 条件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-24 16:25:33
 */


let ConditionDef = require("ConditionDef")
let SkillDef = require("SkillDef")
let ActionDef = require("ActionDef")
let ActorDef = require("ActorDef")

let CondType = ConditionDef.ConditionType;
let LGType = ConditionDef.LogicGateType;
let TarType = ActionDef.TargetType;
let AttributeKey = ActorDef.AttributeKey;

cc.Class({
    // extends: cc.Component,

    name : 'Condition',

    properties: {
        condition_type : {
            default: CondType.unknown,
            type : cc.Enum(CondType), 
            tooltip : "条件类型",
            notify() {
                this._setEventDesc();
            },
        },

        logic_gate : {
            default: LGType.equal,
            type : cc.Enum(LGType), 
            tooltip : "逻辑门",
            notify() {
                this._setEventDesc();
            },
        },

        condition_value : {
            default: 0,
            type : cc.Float,
            tooltip : "条件值",
            visible() {
                switch (this.condition_type) {
                    case CondType.skill_id:
                    case CondType.target_appoint:
                    case CondType.unit_alive:
                    case CondType.unit_dead:
                        return false;

                    default:
                        break;
                }

                if (this.condition_type == CondType.actor_attribute) {
                    switch (this.actor_attribute_key) {
                        case AttributeKey.race:
                        case AttributeKey.classes:   
                            return false;
                    
                        default:
                            break;
                    }
                }

                return true;
            },
            notify() {
                this._setEventDesc();
            },
        },

        skill_id : {
            default: SkillDef.SkillID.unknown,
            type : cc.Enum(SkillDef.SkillID), 
            tooltip : "技能ID",
            displayName : "Condition Value",
            visible() {
                return this.condition_type == CondType.skill_id;
            },
            notify() {
                this._setEventDesc();
            },
        },

        target_type : {
            default: ActionDef.TargetType.none,
            type : cc.Enum(ActionDef.TargetType), 
            tooltip : "目标类型",
            displayName : "Condition Value",
            visible() {
                return this.condition_type == CondType.target_appoint;
            },
            notify() {
                this._setEventDesc();
            },
        },

        actor_attribute_key : {
            default: AttributeKey.unknown,
            type : cc.Enum(AttributeKey), 
            tooltip : "actor属性",
            displayName : "Condition Value",
            visible() {
                return this.condition_type == CondType.actor_attribute;
            },
            notify() {
                this._setEventDesc();
            },
        },

        actor_race : {
            default: ActorDef.RaceType.unknown,
            type : cc.Enum(ActorDef.RaceType), 
            tooltip : "种族",
            // displayName : "Condition Value",
            visible() {
                return this.actor_attribute_key == AttributeKey.race;
            },
            notify() {
                this._setEventDesc();
            },
        },

        actor_classes : {
            default: ActorDef.ClassesType.unknown,
            type : cc.Enum(ActorDef.ClassesType), 
            tooltip : "职业",
            // displayName : "Condition Value",
            visible() {
                return this.actor_attribute_key == AttributeKey.classes;
            },
            notify() {
                this._setEventDesc();
            },
        },

        temp_value : {
            default : null,
            tooltip : "缓存值(实际使用的值, condition_value不能改变值，否则会循环引用)",
            visible : false,
            // serializable: false,(用的值不要序列化，否则找不到值)
        },

    },

    ctor () {

    },

    _setEventDesc()
    {

    },

    // update (dt) {},
});
