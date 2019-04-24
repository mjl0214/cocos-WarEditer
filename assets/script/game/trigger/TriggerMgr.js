/*
 * @Description: 触发器管理类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-24 10:56:50
 */


let DataPool = require("DataPool")
let Listener = require("Listener")
let EventDef = require("EventDef")
let ActorMgr = require("ActorMgr")
let ActionDef = require("ActionDef")
let FormulaTool = require("FormulaTool")
let ActorDef = require("ActorDef")

let ImpType = ActionDef.ImplementType;

let EventType = EventDef.EventType;
let ImplementEvent = ActionDef.ImplementEvent;

module.exports = {

    m_triggers : new DataPool(),    // 触发器列表
    m_triggerIndex : 0,

    init()
    {
        this.initListener();
    },

    /**
     * @description: 注册所有事件 
     * @param {type} 
     * @return: 
     */
    initListener()
    {
        var self = this;

        for (const key in EventType) {
            if (EventType.hasOwnProperty(key)) {
                const element = EventType[key];
                if (element == EventType.unknown) {
                    continue;
                }
                Listener.addListener(key, function(msg) { self.onTrigger(msg); }, this);
            }
        }


        // setTimeout(() => {
        //     var pool = this.m_triggers.getPool('trigger');
        //     for (let index = 0; index < pool.length; index++) {
        //         const trigger = pool[index];
        //         trigger.onDestroy();
        //         break;
        //     }
        // }, 2000);
    },

    onTrigger(msg)
    {
        // console.log('event_type', msg);
        // console.trace();

        var pool = this.m_triggers.getPool('trigger');
        // console.log('pool.length', pool.length);
        // var _msg_ = this._extractTriggerInfo(msg);
        for (let index = 0; index < pool.length; index++) {
            const trigger = pool[index];
            // console.log(trigger.isUnitActive());
            if (trigger.isUnitActive() && trigger.getTurnOn()) {
                trigger.isTriggerHold(msg);
            }
        }
    },

    // 添加触发器
    pushTrigger(trigger)
    {
        // console.log(trigger);
        this.m_triggerIndex++;
        trigger.setTriggerId(this.m_triggerIndex);
        this.m_triggers.pushToPool('trigger', trigger);
    },

    removeTrigger(trigger)
    {
        console.log(trigger);
        this.m_triggers.removeFromPool('trigger', trigger);
    },

};