/*
 * @Description: 动作处理类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 23:39:56
 */


let EventDef = require("EventDef")
let ActionDef = require("ActionDef")
let ConditionHandle = require("ConditionHandle")
let Listener = require("Listener")
let ActorMgr = require("ActorMgr")
let FormulaTool = require("FormulaTool")


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
        var isCondition = true;
        for (let index = 0; index < action.conditions.length; index++) {
            const condition = action.conditions[index];
            isCondition = isCondition && ConditionHandle.isConditionHold(msg, condition);
            if (isCondition == false) {
                return false;
            }
        }

        var implementMsg = new Array();
        for (let index = 0; index < action.implements.length; index++) {
            const implement = action.implements[index];
            var _msg_ = implement.handle(msg);
            implementMsg.push(_msg_);
        }

        this._implementHold(msg, implementMsg);
        this._onTriggerEnd(msg);

        return true;
    },

    _onTriggerEnd(msg)
    {
        // 发送动作结果给触发器
        Listener.dispatch(ImplementEvent[ImplementEvent.end], msg);
    },

    _getHurtVal(holderId, skillLevel, implement)
    {
        var ivt = implement.implement_value_type
        if (ivt == ActionDef.ImplementValueType.constant) {
            return implement.implement_value_list[0];
        }
        else if (ivt == ActionDef.ImplementValueType.level_user) {
            var actor = ActorMgr.getActorById(holderId);
            var actorLevel = 0;
            if (actor == null) {
                return 0;
            }
            actorLevel = actor.getVal('level');
            return implement.implement_value_list[actorLevel];
        }
        else if (ivt == ActionDef.ImplementValueType.level_skill) {
            return implement.implement_value_list[skillLevel];
        }
        else if (ivt == ActionDef.ImplementValueType.random_value) {
            var value = window.getRandom(implement.implement_value_list[0], implement.implement_value_list[1]);
            return value;
        }
    },

    _getDamageSource(holderId, targetId, sourceType)
    {
        if (sourceType == ActionDef.DamageSourceType.nothing) {
            return -1;
        } 
        else if (sourceType == ActionDef.DamageSourceType.skill_user) {
            return holderId;
        } 
        else if (sourceType == ActionDef.DamageSourceType.skill_target) {
            return targetId;
        }
    },

    // 执行动作
    _implementHold(msg, imps)
    {
        // data.implement_type = this.implement_type;
        // data.implement_value_type = this.implement_value_type;
        // data.implement_value_list = this.implement_value_list;
        // data.damage_source_type = this.damage_source_type;
        // data.implement_function = this.implement_function;
        // console.log('action_type', msg.action_type);
        var dv = 0;
        var ta = 0;
        var dt = 0;
        var at = 0;
        var damage = 0;
        var func_index = -1;
        var damage_source_type = ActionDef.DamageSourceType.nothing;
        for (let index = 0; index < imps.length; index++) {
            const implement = imps[index];
            if (implement.implement_type == ImpType.function_used) {
                func_index = implement.implement_function;
            }
            else if (implement.implement_type == ImpType.damage_value) {
                dv = implement.implement_value_list[0];
                dv = this._getHurtVal(msg.holder_id, msg.skill_level, implement);
            }
            else if (implement.implement_type == ImpType.damage_source) {
                damage_source_type = implement.damage_source_type;
            }
        }
        
        var funcName = FormulaTool.FormulaEnum[func_index];
        // console.log('funcName', funcName);
        if (funcName == null && func_index > -1) {
            console.error('未知函数');
            return;
        }

        var formula_func = FormulaTool[funcName];
        // console.log('func', func);

        for (let index = 0; index < msg.targets.length; index++) {
            const element = msg.targets[index];
            // console.log('element', element);
            var actor = ActorMgr.getActorById(element.actorId);
            // console.log('actor', actor);
            if (actor == null) {
                continue;
            }
            ta = actor.getVal('armor');
            
            damage = formula_func(dv, dt, ta, at);

            actor.changeVal('health', -damage);

            var holderId = this._getDamageSource(msg.holder_id, element.actorId, damage_source_type);

            var event_type = EventType.attribute_change;
            var send_data = {
                event_type : EventType[event_type],
                attribute : 'health', 
                value : -damage,
                targetId : element.actorId,
                holderId : holderId,
            };
            console.log(send_data);
            Listener.dispatch(EventType[event_type], send_data);
        }
    },
}