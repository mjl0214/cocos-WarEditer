/*
 * @Description: 动作执行类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-24 17:02:43
 */


let ActionDef = require("ActionDef")
let ActorDef = require("ActorDef")
let FormulaTool = require("FormulaTool")

let ImpType = ActionDef.ImplementType;
let FormulaEnum = FormulaTool.FormulaEnum;

cc.Class({
    // extends: cc.Component,

    name : 'Implement',

    properties: {
        implement_type : {
            default: ImpType.nothing,
            type : cc.Enum(ImpType), 
            tooltip : "类型",
            notify() {
                this.getImplementDesc();
            },
        },

        user_attribute_key : {
            default: ActorDef.AttributeKey.unknown,
            type : cc.Enum(ActorDef.AttributeKey), 
            tooltip : "使用者属性键值",
            // displayName : "Implement Value List",
            visible() {
                var result = (this.implement_type == ImpType.actor_attribute) || 
                    (this.implement_type == ImpType.damage_source);
                return result;
            },
            notify() {

            },
        },

        damage_source_type : {
            default: ActionDef.DamageSourceType.nothing,
            type : cc.Enum(ActionDef.DamageSourceType), 
            tooltip : "伤害来源",
            // displayName : "Implement Value List",
            visible() {
                return this.implement_type == ImpType.damage_source;
            },
            notify() {

            },
        },

        implement_value_type : {
            default: ActionDef.ImplementValueType.constant,
            type : cc.Enum(ActionDef.ImplementValueType), 
            tooltip : "值类型",
            visible() {
                if (this.implement_type == ImpType.damage_source) {
                    return false;
                }
                // else if (this.implement_type == ImpType.attribute_user) {
                //     return false;
                // }

                return true;
            },
            notify() {
                this.getImplementDesc();
            },
        },

        implement_value_list : {
            default: [],
            type : [cc.Float], 
            tooltip : "值列表",
            // displayName : "Implement Value",
            visible() {
                if (this.implement_type == ImpType.damage_source) {
                    return false;
                }
                
                // if (this.implement_value_type == ActionDef.ImplementValueType.attribute_user) {
                //     return false;
                // }
                // if (this.implement_type == ImpType.function_used) {
                //     return false;
                // }
                return true;
            },
        },


        // temp_value : {
        //     default: '', 
        //     tooltip : "缓存值",
        //     visible : false,
        // },

        temp_type_desc : {
            default: '',
            tooltip : "缓存类型描述",
            visible : false,
            serializable: false,
        },

        temp_value_desc : {
            default: '',
            tooltip : "缓存值描述",
            visible : false,
            serializable: false,
        },

        temp_value_type_desc : {
            default: '',
            tooltip : "缓存值类型描述",
            visible : false,
            serializable: false,
        },
    },

    ctor () {

    },

    handle(msg)
    {
        var data = {};
        data.implement_type = this.implement_type;
        data.implement_value_type = this.implement_value_type;
        data.implement_value_list = this.implement_value_list;
        data.damage_source_type = this.damage_source_type;
        return data;
    },

    _getImplementValueTypeDesc()
    {
        // constant : 0,           // 定值
        // level_user : 1,         // 使用者等级
        // level_skill : 2,        // 技能等级
        var desc = '';
        switch (this.implement_value_type) {
            case ActionDef.ImplementValueType.constant:
                desc = '定值';
                break;
            case ActionDef.ImplementValueType.level_user:
                desc = '使用者等级';
                break;
            case ActionDef.ImplementValueType.level_skill:
                desc = '技能等级';
                break;
            case ActionDef.ImplementValueType.random_value:
                desc = '随机';
                break;

            default:
                break;
        }

        return desc;
    },

    _setListFirst(onlyFirst)
    {
        if (onlyFirst == true) {
            if (this.implement_value_list.length > 0) {
                this.temp_value_desc = this.implement_value_list[0];
                this.temp_value_type_desc = '(' + this._getImplementValueTypeDesc() + ')';
            }
            else
            {
                this.temp_value_desc = 'null';
            }
        }
        else
        {
            this.temp_value_desc = JSON.stringify(this.implement_value_list);
            this.temp_value_type_desc = '(' + this._getImplementValueTypeDesc() + ')';
        }
    },

    _getImplementTypeDesc()
    {
        // nothing : 0,
        // function_used : 1,      // 函数
        // actor_attribute : 2,    // actor属性
        // damage_source : 3,      // 伤害来源
        // damage_value : 4,       // 伤害值
        // damage_targets : 5,     // 伤害目标数组

        this.temp_value_type_desc = '';

        switch (this.implement_type) {
            case ImpType.nothing:
                this.temp_type_desc = '什么都不做';
                this.temp_value_desc = '';
                break;

            case ImpType.function_used:
                this.temp_type_desc = '使用函数';
                this.temp_value_desc = FormulaEnum[this.implement_function];
                break;

            case ImpType.actor_attribute:
                this.temp_type_desc = 'actor属性';
                this._setListFirst(true);
                break;

            case ImpType.damage_source:
                this.temp_type_desc = '伤害来源';
                this.temp_value_desc = ActionDef.DamageSourceType[this.damage_source_type];
                break;

            case ImpType.damage_value:
                this.temp_type_desc = '伤害数值列表';
                this._setListFirst(false);
                break;

            case ImpType.damage_targets:
                this.temp_type_desc = '伤害目标';
                this.temp_value_desc = '';
                break;

            case ImpType.time_duration:
                this.temp_type_desc = '持续时间';
                this._setListFirst(true);
                break;

            case ImpType.consume_mana:
                this.temp_type_desc = '魔法消耗';
                this._setListFirst(false);
                break;
            case ImpType.consume_anger:
                this.temp_type_desc = '怒气消耗';
                this._setListFirst(false);
                break;

            default:
                break;
        }
    },

    getImplementDesc()
    {
        this._getImplementTypeDesc();
        return '[' + this.temp_type_desc + ']=[' + this.temp_value_desc + ']' + ' ' + this.temp_value_type_desc;
    }

    // update (dt) {},
});
