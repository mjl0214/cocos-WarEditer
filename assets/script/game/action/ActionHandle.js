/*
 * @Description: 动作处理类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-24 13:53:20
 */


let EventDef = require("EventDef")
let ActionDef = require("ActionDef")
let ConditionHandle = require("ConditionHandle")
let Listener = require("Listener")
let UnitCreator = require("UnitCreator")
// let UnitDef = require("UnitDef")
// let Buff = require("Buff")
let FormulaTool = require("FormulaTool")
// let Timer = require("Timer")


let ImplementEvent = ActionDef.ImplementEvent;
let EventType = EventDef.EventType;
let ImpType = ActionDef.ImplementType;
let FormulaEnum = FormulaTool.FormulaEnum;

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

        this._onTriggerSuccess(msg, action);

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

    // 触发成功(产生一个时光鸡)
    _onTriggerSuccess(msg, action) {
        /*
        * 我是时光鸡
        */
        let TimerMachine = require("TimerMachine")
        var timerMachine = new TimerMachine();
        timerMachine.init(msg, action);
        timerMachine.onEnter();

    },

}