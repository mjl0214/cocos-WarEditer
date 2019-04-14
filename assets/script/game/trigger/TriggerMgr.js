/*
 * @Description: 触发器管理类
 * @Author: megjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 20:52:37
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

    },

    onTrigger(msg)
    {
        console.log('event_type', msg.event_type);
        // console.trace();

        var pool = this.m_triggers.getPool('trigger');
        // console.log('pool.length', pool.length);
        var _msg_ = this._extractTriggerInfo(msg);
        for (let index = 0; index < pool.length; index++) {
            const trigger = pool[index];
            trigger.isTriggerHold(_msg_);
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
        this.m_triggerIndex++;
        this.m_triggers.pushToPool('trigger', trigger);
    },

    // 提取触发器需要的信息
    _extractTriggerInfo(msg)
    {
        // console.log(msg.hasOwnProperty('holder_id'));

        msg.skill_level = 1;
        if (msg.hasOwnProperty('holder_id')) {
            var holder = ActorMgr.getActorById(msg.holder_id);
            // console.log(holder);
            if (holder) {
                msg.holder_team = holder.getTeamId();
            }
        }
        else
        {
            msg.holder_team = -1;
        }

        if (msg.hasOwnProperty('targets')) {
            var targets = msg['targets'];
            msg.target_amount = targets.length;
        }
        else
        {
            msg.target_amount = 0;
            msg.targets = [];
        }

        // console.log(msg)

        return msg;
    },

};