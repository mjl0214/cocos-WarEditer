/*
 * @Description: 公式处理类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-17 22:08:06
 * @LastEditTime: 2019-04-18 01:08:14
 */

let EventDef = require("EventDef")
let ActionDef = require("ActionDef")
let Listener = require("Listener")
let ActorMgr = require("ActorMgr")
let FormulaTool = require("FormulaTool")
let ConditionHandle = require("ConditionHandle")
// let Buff = require("Buff")


// let ImplementEvent = ActionDef.ImplementEvent;
let EventType = EventDef.EventType;
let ImpType = ActionDef.ImplementType;

module.exports = {
    
    // 执行动作
    executeAction(msg, action)
    {
        var isCondition = this._isActionConditionHold(msg, action);
        if (isCondition == false) {
            return false;
        }

        var funcName = FormulaTool.FormulaEnum[action.action_formula];
        switch (action.action_formula) {
            case FormulaTool.FormulaEnum.none_function:
                
                break;
            case FormulaTool.FormulaEnum.attack_damage_function01:
                this._attack_damage_func01(msg, action);
                break;
            default:
                break;
        }
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
    
    // 获取伤害值
    _getHurtVal(unitId, skillLevel, implement)
    {
        var ivt = implement.implement_value_type
        if (ivt == ActionDef.ImplementValueType.constant) {
            return implement.implement_value_list[0];
        }
        else if (ivt == ActionDef.ImplementValueType.level_user) {
            var actor = ActorMgr.getActorByUnitId(unitId);
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

    // 获取伤害来源
    _getDamageSource(unitId, targetId, sourceType)
    {
        if (sourceType == ActionDef.DamageSourceType.nothing) {
            return -1;
        } 
        else if (sourceType == ActionDef.DamageSourceType.skill_user) {
            return unitId;
        } 
        else if (sourceType == ActionDef.DamageSourceType.skill_target) {
            return targetId;
        }
    },

    _attack_damage_func01(msg, action)
    {
        var funcName = FormulaTool.FormulaEnum[action.action_formula];
        // console.log('funcName', funcName);
        if (funcName == null && func_index > -1) {
            console.error('未知函数');
            return false;
        }
        // 执行函数
        var formula_func = FormulaTool[funcName];

        // 参数列表
        var dv = 0;
        var ta = 0;
        var dt = 0;
        var at = 0;
        var damage_source_type = ActionDef.DamageSourceType.nothing;
        
        // 参数列表
        for (let index = 0; index < action.action_implements.length; index++) {
            const implement = action.action_implements[index];

            if (implement.implement_type == ImpType.damage_value) {
                dv = implement.implement_value_list[0];
                dv = this._getHurtVal(msg.unit_id, msg.skill_level, implement);
            }
            else if (implement.implement_type == ImpType.damage_source) {
                damage_source_type = implement.damage_source_type;
            }
        }

        for (let index = 0; index < msg.target_ids.length; index++) {
            const unit_id = msg.target_ids[index];
            // console.log('element', element);
            var actor = ActorMgr.getActorByUnitId(unit_id);
            // console.log('actor', actor);
            if (actor == null) {
                continue;
            }
            ta = actor.getVal('armor');
            
            var damage = formula_func(dv, dt, ta, at);

            actor.changeVal('health', -damage);

            var unitId = this._getDamageSource(msg.unit_id, unit_id, damage_source_type);

            var event_type = EventType.attribute_change;
            var send_data = {
                event_type : EventType[event_type],
                attribute : 'health', 
                value : -damage,
                targetId : unit_id,
                unitId : unitId,
            };
            console.log(send_data);
            Listener.dispatch(EventType[event_type], send_data);
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
};