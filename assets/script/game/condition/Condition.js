/*
 * @Description: 条件类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-28 16:09:38
 */


let ConditionDef = require("ConditionDef")
let SkillDef = require("SkillDef")
let ActionDef = require("ActionDef")
let ActorDef = require("ActorDef")
let BuffDef = require("BuffDef")

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

                switch (this.logic_gate) {
                    case LGType.logic_true:
                    case LGType.logic_false:
                        return false;

                    default:
                        break;
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
                if (this.condition_type == CondType.skill_id) {
                    return true;
                } 
                // else if (this.condition_type == CondType.have_buff) {
                //     return true;
                // }
                return false;
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
                if (this.condition_type == CondType.target_appoint) {
                    return true;
                } else if (this.condition_type == CondType.pick_up) {
                    return true;
                }
                return false;
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

        buff_id : {
            default: BuffDef.BuffID.unknown,
            type : cc.Enum(BuffDef.BuffID),
            tooltip : "BUFF ID", 
            visible() {
                return this.condition_type == CondType.have_buff;
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

    getData()
    {
        var data = {
            'condition_type' : this.condition_type,
            'logic_gate' : this.logic_gate,
            'condition_value' : this.temp_value,
            'actor_classes' : this.actor_classes,
            'actor_race' : this.actor_race,
        }
        return data;
    },

    _setEventDesc()
    {

    },

    // update (dt) {},
});
