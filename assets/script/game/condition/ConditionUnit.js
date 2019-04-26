/*
 * @Description: 条件可视化组件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-23 15:09:27
 * @LastEditTime: 2019-04-26 17:01:12
 */



let ConditionDef = require("ConditionDef")
let SkillDef = require("SkillDef")
let ActionDef = require("ActionDef")
let ActorDef = require("ActorDef")
let BuffDef = require("BuffDef")
let Condition = require("Condition")

let CondType = ConditionDef.ConditionType;
let LGType = ConditionDef.LogicGateType;
let TarType = ActionDef.TargetType;
let AttributeKey = ActorDef.AttributeKey;

cc.Class({
    extends: Condition,

    name : 'ConditionUnit',

    properties: {

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

    _setBuffDesc()
    {
        this.temp_name = 'BUFF';
        var desc = BuffDef.BuffID[this.buff_id];
        this.temp_name += ' ' + desc;
        this.temp_value = this.buff_id;
        this.temp_desc = desc;
    },

    _setTargetTypeDesc()
    {
        this.temp_name = '目标类型';
        var desc = ActionDef.TargetType[this.target_type];
        this.temp_value = this.target_type;
        this.temp_desc = desc;
    },

    _setPickUpDesc()
    {
        this.temp_name = '选取目标';
        var desc = ActionDef.TargetType[this.target_type];
        this.temp_name += desc;
        this.temp_value = this.target_type;
        this.temp_desc = desc;
    },

    _setValue(name)
    {
        this.temp_name = name;
        this.temp_value = this.condition_value,
        this.temp_desc = this.condition_value;
    },

    _setActorArrKeyDesc()
    {
        // this.temp_name = 'actor属性';
        var desc = AttributeKey[this.actor_attribute_key];
        this.temp_name = 'actor属性' + desc;
        this.temp_value = this.condition_value;
        this.temp_desc = this.condition_value;

        switch (this.actor_attribute_key) {
            case AttributeKey.race:
                this.temp_value = this.actor_race;
                this.temp_desc = ActorDef.RaceType[this.actor_race];
                break;
            case AttributeKey.classes:
                this.temp_value = this.actor_classes;
                this.temp_desc = ActorDef.ClassesType[this.actor_classes];
                break;

            default:
                break;
        }
    },

    _setRaceDesc()
    {

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
                // 目标类型
                this._setTargetTypeDesc();
                break;
            case CondType.target_amount:
                this._setValue('目标数量');
                break;
            case CondType.actor_attribute:
                this._setActorArrKeyDesc();
                break;
            case CondType.unit_alive:
                this._setValue('目标存活');
                break;                
            case CondType.unit_dead:
                this._setValue('目标死亡');
                break;
            case CondType.have_buff:
                this._setBuffDesc();
                break;
            case CondType.pick_up:
                this._setPickUpDesc();
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
