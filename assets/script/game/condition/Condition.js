/*
 * @Description: 条件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-15 08:40:57
 */


let ConditionDef = require("ConditionDef")
let SkillDef = require("SkillDef")
let ActionDef = require("ActionDef")

let CondType = ConditionDef.ConditionType;
let LGType = ConditionDef.LogicGateType;
let TarType = ActionDef.TargetType;

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

        condition_desc : {
            default : '',
            tooltip : "条件描述",
            // multiline : true,
            readonly : true,
            // serializable: false,
        },

        temp_desc : {
            default : '',
            tooltip : "缓存描述",
            visible : false,
            serializable: false,
        },

        temp_value : {
            default : null,
            tooltip : "缓存值(实际使用的值, condition_value不能改变值，否则会循环引用)",
            visible : false,
            // serializable: false,(用的值不要序列化，否则找不到值)
        },

        temp_name : {
            default : '',
            tooltip : "缓存描述名字",
            visible : false,
            serializable: false,
        },

        temp_logic_gate : {
            default : '',
            tooltip : "缓存逻辑门名字",
            visible : false,
            serializable: false,
        },

    },

    ctor () {

    },

    getJson()
    {
        return this.getData();
    },

    getData()
    {
        var data = {
            'condition_type' : this.condition_type,
            'logic_gate' : this.logic_gate,
            'condition_value' : this.temp_value,
        }
        return data;
    },

    _setUnknownDesc()
    {
        this.temp_name = '未知条件';
        this.temp_value = null,
        this.temp_desc = '没有值';
    },

    _setSkillDesc()
    {
        this.temp_name = '技能ID';
        var desc = SkillDef.SkillID[this.skill_id];
        this.temp_value = this.skill_id;
        this.temp_desc = desc;
    },

    _setTargetTypeDesc()
    {
        this.temp_name = '目标类型';
        var desc = ActionDef.TargetType[this.target_type];
        this.temp_value = this.target_type;
        this.temp_desc = desc;
    },

    _setValue(name)
    {
        this.temp_name = name;
        this.temp_value = this.condition_value,
        this.temp_desc = this.condition_value;
    },

    _setLogicGate()
    {
        switch (this.logic_gate) {
            case LGType.equal:
                this.temp_logic_gate = '='
                break;
            case LGType.greater:
                this.temp_logic_gate = '>'
                break;
            case LGType.less:
                this.temp_logic_gate = '<'
                break;
            case LGType.unequal:
                this.temp_logic_gate = '!='
                break;
            case LGType.greater_equal:
                this.temp_logic_gate = '>='
                break;
            case LGType.less_equal:
                this.temp_logic_gate = '<='
                break;
            case LGType.logic_true:
                this.temp_logic_gate = '='
                this.temp_desc = 'true'
                break;
            case LGType.logic_false:
                this.temp_logic_gate = '='
                this.temp_desc = 'false'
                break;

            default:
                break;
        }
    },

    _setEventDesc()
    {
        switch (this.condition_type) {
            case CondType.unknown:
                this._setUnknownDesc();
                break;
            case CondType.skill_id:
                this._setSkillDesc();
                break;
            case CondType.range_min:
                this._setValue('最小射程');
                break;
            case CondType.range_max:
                this._setValue('最大射程');
                break;
            case CondType.target_appoint:
                this._setTargetTypeDesc();
                break;
            case CondType.target_amount:
            this._setValue('目标数量');
                break;


            default:
                this._setUnknownDesc();
                break;
        }

        this._setLogicGate();

        this.condition_desc =  "[" + this.temp_name +  "] "
            + this.temp_logic_gate
            + " [" + this.temp_desc + "]";
    },

    getConditionDesc()
    {
        return this.condition_desc;
    },

    // update (dt) {},
});
