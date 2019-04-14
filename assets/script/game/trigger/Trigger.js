/*
 * @Description: 触发器
 * @Author: mengjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 13:13:44
 */


let Event = require("Event")
let Condition = require("Condition")
let ConditionHandle = require("ConditionHandle")
let EventHandle = require("EventHandle")
let ActionHandle = require("ActionHandle")
let Action = require("Action")
let Unit = require("Unit")
let TriggerMgr = require("TriggerMgr")
let UnitDef = require("UnitDef")

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

        events : {
            default: [],
            type : [Event], 
            tooltip : "事件",
        },

        conditions : {
            default: [],
            type : [Condition], 
            tooltip : "条件",
        },

        actions : {
            default: [],
            type : [Action], 
            tooltip : "动作",
        },
    },

    ctor () {
    },

    onLoad () {
        this._super();
        TriggerMgr.pushTrigger(this);
    },

    onDestroy () {
        TriggerMgr.removeTrigger(this);
    },

    setTriggerId(triggerId)
    {
        this.trigger_id = triggerId;
    },

    // 是否触发成功
    isTriggerHold(msg)
    {
        var isEvent = true;

        for (let index = 0; index < this.events.length; index++) {
            const event = this.events[index];
            isEvent = isEvent && EventHandle.isEventHold(msg, event);
            if (isEvent == false) {
                return false;
            }
        }

        var isCondition = true;
        for (let index = 0; index < this.conditions.length; index++) {
            const condition = this.conditions[index];
            isCondition = isCondition && ConditionHandle.isConditionHold(msg, condition);
            if (isCondition == false) {
                return false;
            }
        }

        var isAction = true;
        for (let index = 0; index < this.actions.length; index++) {
            const action = this.actions[index];
            isAction = isAction && ActionHandle.isActionHold(msg, action);
            if (isAction == false) {
                return false;
            }
        }

        return true;
    },

    getJson()
    {
        var data = {};

        data['events'] = new Array();
        for (let index = 0; index < this.events.length; index++) {
            const event = this.events[index];
            data['events'].push(event.getJson()); 
        }

        data['conditions'] = new Array();
        for (let index = 0; index < this.conditions.length; index++) {
            const condition = this.conditions[index];
            data['conditions'].push(condition.getJson());  
        }

        return data;
    },

    _generalContent()
    {
        this.general_desc = '';
        var eventDesc = '事件:\n';
        var condDesc = '条件:\n';
        var actionDesc = '动作:\n';

        for (let index = 0; index < this.events.length; index++) {
            const event = this.events[index];
            eventDesc += '   事件[' + (index) + '] : ' + event.getEventDesc() + '\n'; 
        }

        if (this.events.length <= 0) {
            eventDesc += '   无\n';
        }

        for (let index = 0; index < this.conditions.length; index++) {
            const condition = this.conditions[index];
            condDesc += '   条件[' + (index) + '] : ' + condition.getConditionDesc() + '\n'; 
        }

        if (this.conditions.length <= 0) {
            condDesc += '   无\n';
        }

        for (let index = 0; index < this.actions.length; index++) {
            const action = this.actions[index];
            actionDesc += '   动作[' + (index) + '] : ' + action.getActionDesc() + '\n'; 
        }

        if (this.actions.length <= 0) {
            actionDesc += '   无\n';
        }

        this.general_desc += eventDesc;
        this.general_desc += condDesc;
        this.general_desc += actionDesc;
    },

    _clone(trigger)
    {
        this.events = [];
        for (let index = 0; index < trigger.events.length; index++) {
            const event = trigger.events[index];
            this.events.push(event);
        }

        this.conditions = [];
        for (let index = 0; index < trigger.conditions.length; index++) {
            const condition = trigger.conditions[index];
            this.conditions.push(condition);
        }

        this.actions = [];
        for (let index = 0; index < trigger.actions.length; index++) {
            const action = trigger.actions[index];
            this.actions.push(action);
        }
    },

    update (dt) {
        // console.log('trigger update', dt);
    },
});
