/*
 * @Description: 演员类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-29 17:36:50
 * The winter is coming！
 */


let Unit = require("Unit")
let UnitDef = require("UnitDef")
let ActorDef = require("ActorDef")
let Attribute = require("Attribute")
let Listener = require("Listener")
let StateDef = require("StateDef")
let SkillDef = require("SkillDef")
let BuffMgr = require("BuffMgr")
let EventDef = require("EventDef")
let TriggerMsg = require("TriggerMsg")
let TimerMgr = require("TimerMgr")

let StateType = StateDef.StateType;

let AT = ActorDef.AttributeType;

cc.Class({
    extends: Unit,

    properties: {
        unit_type : {
            default: UnitDef.TypeID.actor,
            type : cc.Enum(UnitDef.TypeID), 
            tooltip : "Unit类型",
            readonly : true,
            override : true,
        },

        actor_id : {
            default: -1,
            type : cc.Integer, 
            tooltip : "actor ID",
            readonly : true,
        },  

        team_id : {
            default: -1,
            type : cc.Integer, 
            tooltip : "队伍ID",
        },

        skill_list : {
            default : [],
            type : [cc.Enum(SkillDef.SkillID)],
            tooltip : "技能ID列表",
        },

        attributes : {
            default: [],
            type : [Attribute], 
            tooltip : "属性列表",
        },

        current_health : {
            default: -1,
            type : cc.Float, 
            tooltip : "实际血量",
            readonly : true,
        },

        current_mana : {
            default: -1,
            type : cc.Float, 
            tooltip : "实际魔法",
            readonly : true,
        },

        current_attack : {
            default: -1,
            type : cc.Float, 
            tooltip : "实际攻击力",
            readonly : true,
        },

        current_armor : {
            default: -1,
            type : cc.Float, 
            tooltip : "实际护甲",
            readonly : true,
        },

        current_spell_resistance : {
            default: -1,
            type : cc.Float, 
            tooltip : "实际魔抗",
            readonly : true,
        },

        current_level : {
            default: 1,
            type : cc.Float, 
            tooltip : "实际等级值",
            readonly : true,
        },

        current_x : {
            default: 0,
            type : cc.Float, 
            tooltip : "实际x坐标",
            // readonly : true,
        },

        current_y : {
            default: 0,
            type : cc.Float, 
            tooltip : "实际y坐标",
            // readonly : true,
        },

        actor_state : {
            default: StateType.idle,
            type : cc.Enum(StateType),
            tooltip : "actor状态",
            readonly : true,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onEnter () {
        this._super();
        this.initAttributeValue();

        var event_type = EventDef.EventType.unit_create;
        var msg = TriggerMsg.getSystemMsg();
        msg.event_type = event_type;
        msg.unit_id = this.getUnitId();
        Listener.dispatch(EventDef.EventType[event_type], msg);
    },

    onExit () {
        // console.log('Actor onDestroy')
        this._super();
    },

    ctor () {
        // console.log('ctor')
    },

    onEnable()
    {
        // console.log('onEnable')
    },

    start()
    {
        // console.log('start')
    },

    initAttributeValue()
    {
        this.current_health = this._getVal(AT.health_point) + this._getVal(AT.health_point_ex);
        this.current_mana = this._getVal(AT.mana_point) + this._getVal(AT.mana_point_ex);
        this.current_attack = (this._getVal(AT.attack_max_point) + this._getVal(AT.attack_min_point)) / 2;
        this.current_armor = this._getVal(AT.armor_point) + this._getVal(AT.armor_point_ex);
        this.current_level = this._getVal(AT.level_point);
        this.current_attack_max = this._getVal(AT.attack_max_point);
        this.current_attack_min = this._getVal(AT.attack_min_point);

        this.current_attack_type = this._getVal(AT.attack_type);
        this.current_armor_type = this._getVal(AT.armor_type);
        this.current_spell_resistance = this._getVal(AT.spell_resistance);

        this.current_race = this._getVal(AT.race_point);
        this.current_classes = this._getVal(AT.classes_point);
        this.current_range_max = this._getVal(AT.attack_range_max_point);
        this.current_range_min = this._getVal(AT.attack_range_min_point);
    },

    // 'health' 'attack' 'armor' 'level'
    getVal(name)
    {
        var key = 'current_' + name;
        var value = 0;
        if (this.hasOwnProperty(key)) {
            value = this[key];
        }

        var buffList = BuffMgr.getBuffList(this.getUnitId());

        for (let index = 0; index < buffList.length; index++) {
            const buff = buffList[index];
            value += buff.getValue(ActorDef.AttributeKey[name]);
        }

        return value;
    },

    // 
    setVal(name, value)
    {
        var key = 'current_' + name;
        if (this.hasOwnProperty(key)) {
            this[key] = value;
            return true;
        }

        return false;
    },

    modifyVal(name, value)
    {
        var key = 'current_' + name;
        if (this.hasOwnProperty(key)) {
            this[key] += value;
            // console.log(key, this[key]);
            return true;
        }
        // console.log(key);
        return false;
    },

    getValEx(name)
    {
        var key = name + '_point_ex';
        if (AT.hasOwnProperty(key)) {
            return this._getVal(AT[key]);
        }

        return 0;
    },

    setState(state)
    {
        this.actor_state = state;
    },

    getState()
    {
        return this.actor_state;
    },

    _getVal(type)
    {
        for (let index = 0; index < this.attributes.length; index++) {
            const attribute = this.attributes[index];
            if (attribute.attribute == type) {
                return attribute.attribute_value;
            }
        }
        return 0;
    },

    _setVal(type, value)
    {
        for (let index = 0; index < this.attributes.length; index++) {
            const attribute = this.attributes[index];
            if (attribute.attribute == type) {
                attribute.attribute_value = value;
                break;
            }
        }
    },

    _modifyVal(type, value)
    {
        // console.log(type, value);
        for (let index = 0; index < this.attributes.length; index++) {
            const attribute = this.attributes[index];
            if (attribute.attribute == type) {
                attribute.attribute_value += value;
                // console.error(attribute.attribute, attribute.attribute_value);
                break;
            }
        }
        // console.log(this);
    },

    update (dt) {
        if (this.actor_state != StateDef.StateType.death) {
            if (this.getVal('health') <= 0) {
                this.onDead();
            }
        }
    },


    onDead()
    {
        // 设置状态
        this.actor_state = StateDef.StateType.death;
        // 移除buff 
        BuffMgr.removeAllBuff(this.getUnitId());
        // 停止技能
        TimerMgr.removeAllTimerMachine(this.getUnitId());
    },
    
});
