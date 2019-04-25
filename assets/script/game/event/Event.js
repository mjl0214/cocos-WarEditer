/*
 * @Description: 事件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-25 13:55:25
 * Every hurt is a lesson, and every lesson makes you better
 */


let EventDef = require("EventDef")
let ActionDef = require("ActionDef")
// let Condition = require("Condition")
// let Action = require("Action")
let EventType = EventDef.EventType;

cc.Class({
    // extends: cc.Component,

    name : 'Event',

    properties: {
        unit_type : {
            default: EventDef.UnitType.unknown,
            type : cc.Enum(EventDef.UnitType), 
            tooltip : "单位类型",
            notify() {
                this._setEventDesc();
            },
        },

        event_type : {
            default: EventType.unknown,
            type : cc.Enum(EventType), 
            tooltip : "事件类型",
            notify() {
                this._setEventDesc();
            },
        },

    },

    ctor () {

    },

    _setEventDesc()
    {

    },

    // update (dt) {},
});
