/*
 * @Description: 动作处理类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-17 22:13:15
 */


let EventDef = require("EventDef")
let ActionDef = require("ActionDef")
let ConditionHandle = require("ConditionHandle")
let Listener = require("Listener")
let ActorMgr = require("ActorMgr")
let FormulaTool = require("FormulaTool")
let Buff = require("Buff")


let ImplementEvent = ActionDef.ImplementEvent;
let EventType = EventDef.EventType;
let ImpType = ActionDef.ImplementType;

module.exports = {

    // 是否触发成功
    isActionHold(msg, action)
    {
        var temp = this._isActionHold(msg, action);

        // console.log(temp, action);
        return temp;
    },

    // 是否触发成功
    _isActionHold(msg, action)
    {
        var isCondition = this._isActionConditionHold(msg, action);

        if (isCondition == false) {
            return;
        }

        // this._implementHold(msg, implementMsg);
        this._onTriggerSuccess(msg, action);
        this._onTriggerEnd(msg);

        return true;
    },

    // 动作的条件是否成立
    _isActionConditionHold(msg, action)
    {
        var isCondition = true;
        for (let index = 0; index < action.action_conditions.length; index++) {
            const condition = action.action_conditions[index];
            isCondition = isCondition && ConditionHandle.isConditionHold(msg, condition);
            if (isCondition == false) {
                return isCondition;
            }
        }
        return isCondition;
    },

    _onTriggerEnd(msg)
    {
        // 发送动作结果给触发器
        Listener.dispatch(ImplementEvent[ImplementEvent.end], msg);
    },

    // 触发成功(产生一个buff)
    _onTriggerSuccess(msg, action) {
        var buff = new Buff();
        buff.init(msg, action);// 先init
        buff.onEnter();//再onEnter
    },

}