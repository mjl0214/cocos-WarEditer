/*
 * @Description: 演员类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 23:40:07
 */


let Unit = require("Unit")
let UnitDef = require("UnitDef")
let ActorDef = require("ActorDef")
let Attribute = require("Attribute")
// let Listener = require("Listener")
// let ActionDef = require("ActionDef")

// let ActionType = ActionDef.ActionType;

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

        current_anger : {
            default: -1,
            type : cc.Float, 
            tooltip : "实际愤怒值",
            readonly : true,
        },

        current_level : {
            default: 1,
            type : cc.Float, 
            tooltip : "实际等级值",
            readonly : true,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._super();
        // console.log(this.getAttributeValue(AT.health_point));
        // console.log(this.getAttributeValue(AT.attack_point));
        this.initAttributeValue();
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
        this.current_attack = this._getVal(AT.attack_point) + this._getVal(AT.attack_point_ex);
        this.current_armor = this._getVal(AT.armor_point) + this._getVal(AT.armor_point_ex);
        this.current_anger = this._getVal(AT.anger_point) + this._getVal(AT.anger_point_ex);
        this.current_level = this._getVal(AT.level_point);
    },

    // 'health' 'attack' 'armor' 'anger' 'level'
    getVal(name)
    {
        var key = 'current_' + name;
        if (this.hasOwnProperty(key)) {
            return this[key];
        }

        return 0;
    },

    // 尽量用changeVal
    setVal(name, value)
    {
        var key = 'current_' + name;
        if (this.hasOwnProperty(key)) {
            this[key] = value;
            return true;
        }

        return false;
    },

    changeVal(name, value)
    {
        var key = 'current_' + name;
        if (this.hasOwnProperty(key)) {
            this[key] += value;
            console.log(key, this[key]);
            return true;
        }
        console.log(key);
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

    _changeVal(type, value)
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

    // update (dt) {},
});
