/*
 * @Description: 触发器
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-28 16:54:01
 *  I don't distrucst you because you're a woman. I distrust you because you're not as smart as you think you are
 */


let EventUnit = require("EventUnit")
let ConditionUnit = require("ConditionUnit")
let ConditionHandle = require("ConditionHandle")
let EventHandle = require("EventHandle")
let ActHandle = require("ActHandle")
let ActionUnit = require("ActionUnit")
let Unit = require("Unit")
let TriggerMgr = require("TriggerMgr")
let UnitDef = require("UnitDef")

let ActBase= require("ActBase")
let Event = require("Event")
let Condition = require("Condition")

cc.Class({
    extends: Unit,

    name : 'Trigger',

    properties: {
        unit_type : {
            default: UnitDef.TypeID.trigger,
            type : cc.Enum(UnitDef.TypeID), 
            tooltip : "Unit类型",
            readonly : true,
            override : true,
        },
        
        trigger_id : {
            default: -1,
            type : cc.Integer, 
            tooltip : "触发器ID",
            visible : false,
        },

        trigger_name : {
            default : '',
            tooltip : "触发器名字",
        },

        turn_on : {
            default : true,
            tooltip : "开关",
        },

        show_general : {
            default : true,
            tooltip : "显示总纲",
            readonly : true,
        },

        general_desc : {
            default : '',
            tooltip : "总纲",
            multiline : true,
            readonly : true,
            visible() {
                this._generalContent();
                return this.show_general == true;
            },
            serializable: false,
        },

        trigger_events : {
            default: [],
            type : [Event], 
            tooltip : "事件",
        },

        trigger_conditions : {
            default: [],
            type : [Condition], 
            tooltip : "条件",
        },

        trigger_actions : {
            default: [],
            type : [ActBase], 
            tooltip : "动作",
        },
    },

    ctor () {
    },

    onEnter () {
        // console.log('Trigger onLoad')
        this._super();
        TriggerMgr.pushTrigger(this);
    },

    onExit () {
        // console.log('Trigger onDestroy')
        this._super();
        TriggerMgr.removeTrigger(this);
    },

    setTriggerId(triggerId)
    {
        this.trigger_id = triggerId;
    },

    getTurnOn()
    {
        return this.turn_on;
    },

    setTurnOn(on)
    {
        this.turn_on = on;
    },

    // 是否触发成功
    isTriggerHold(msg)
    {
        var isEvent = true;

        for (let index = 0; index < this.trigger_events.length; index++) {
            const event = this.trigger_events[index];
            isEvent = isEvent && EventHandle.isEventHold(msg, event);
            if (isEvent == false) {
                return false;
            }
        }

        var isCondition = true;
        for (let index = 0; index < this.trigger_conditions.length; index++) {
            const condition = this.trigger_conditions[index];
            isCondition = isCondition && ConditionHandle.isConditionHold(msg, condition);
            if (isCondition == false) {
                return false;
            }
        }

        console.log('触发成功 执行Actions');
        // 触发成功 执行Actions
        for (let index = 0; index < this.trigger_actions.length; index++) {
            const action = this.trigger_actions[index];
            ActHandle.actionHold(msg, action);
        }

        return true;
    },

    getJson()
    {
        var data = {};

        // data['events'] = new Array();
        // for (let index = 0; index < this.trigger_events.length; index++) {
        //     const event = this.trigger_events[index];
        //     data['events'].push(event.getJson()); 
        // }

        // data['conditions'] = new Array();
        // for (let index = 0; index < this.trigger_conditions.length; index++) {
        //     const condition = this.trigger_conditions[index];
        //     data['conditions'].push(condition.getJson());  
        // }

        return data;
    },

    _generalContent()
    {
        this.general_desc = '';
        var eventDesc = '事件:\n';
        var condDesc = '条件:\n';
        var actionDesc = '动作:\n';

        // for (let index = 0; index < this.trigger_events.length; index++) {
        //     const event = this.trigger_events[index];
        //     eventDesc += '   事件[' + (index) + '] : ' + event.getEventDesc() + '\n'; 
        // }

        // if (this.trigger_events.length <= 0) {
        //     eventDesc += '   无\n';
        // }

        // for (let index = 0; index < this.trigger_conditions.length; index++) {
        //     const condition = this.trigger_conditions[index];
        //     condDesc += '   条件[' + (index) + '] : ' + condition.getConditionDesc() + '\n'; 
        // }

        // if (this.trigger_conditions.length <= 0) {
        //     condDesc += '   无\n';
        // }

        // for (let index = 0; index < this.trigger_actions.length; index++) {
        //     const action = this.trigger_actions[index];
        //     actionDesc += '   动作[' + (index) + '] : ' + action.getActionDesc() + '\n'; 
        // }

        // if (this.trigger_actions.length <= 0) {
        //     actionDesc += '   无\n';
        // }

        this.general_desc += eventDesc;
        this.general_desc += condDesc;
        this.general_desc += actionDesc;
    },

    _clone(trigger)
    {
        this.events = [];
        for (let index = 0; index < trigger.trigger_events.length; index++) {
            const event = trigger.trigger_events[index];
            this.events.push(event);
        }

        this.conditions = [];
        for (let index = 0; index < trigger.trigger_conditions.length; index++) {
            const condition = trigger.trigger_conditions[index];
            this.conditions.push(condition);
        }

        this.actions = [];
        for (let index = 0; index < trigger.trigger_actions.length; index++) {
            const action = trigger.trigger_actions[index];
            this.actions.push(action);
        }
    },

    update (dt) {
        // console.log('trigger update', dt);
    },
});
