/*
 * @Description: 公式处理类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-17 22:08:06
 * @LastEditTime: 2019-04-28 17:38:21
 */

let EventDef = require("EventDef")
let ActionDef = require("ActionDef")
let Listener = require("Listener")
let ActorMgr = require("ActorMgr")
let ActorDef = require("ActorDef")
let FormulaTool = require("FormulaTool")
let ConditionHandle = require("ConditionHandle")
let UnitCreator = require("UnitCreator")

let ActDef = require("ActDef")
// let ImplementEvent = ActionDef.ImplementEvent;
let EventType = EventDef.EventType;
let ImpType = ActionDef.ImplementType;

module.exports = {
    
    // 执行动作
    _executeAction(msg, action)
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
            case FormulaTool.FormulaEnum.attack_damage_function02:
                this._attack_damage_func(msg, action);
                break;
            case FormulaTool.FormulaEnum.buff_function:
                this._buff_func(msg, action);
                break;
            default:
                break;
        }
    },


    executeAction(msg, action)
    {
        switch (action.act_type) {
            case ActDef.ActType.none:
                
                break;
            case ActDef.ActType.condition:
                // this._exeActUnit(msg, action);
                break;
            case ActDef.ActType.unit:
                this._exeActUnit(msg, action.act_unit);
                break;
            case ActDef.ActType.unit_group:
            this._exeActUnitGroup(msg, action.act_unit_group);
                break;
            default:
                break;
        }
    },

    _exeActUnit(msg, action)
    {
        // console.log(action)
        switch (action.act_formula) {
            case FormulaTool.FormulaEnum.none_function:
                
                break;
            case FormulaTool.FormulaEnum.attack_damage_function01:
            case FormulaTool.FormulaEnum.attack_damage_function02:
                this._attack_damage_func(msg, action);
                break;
            case FormulaTool.FormulaEnum.buff_function:
                this._buff_func(msg, action);
                break;
            default:
                break;
        }
    },

    _exeActUnitGroup(msg, action)
    {
        var actor = ActorMgr.getActorByUnitId(msg.unit_id);
        var actors = ActorMgr.getAllActor();
        var target_ids = {};
        for (let index = 0; index < actors.length; index++) {
            const _actor_ = actors[index];
            
            target_ids.push(_actor_.getUnitId());
        }

        if (action.use_region == true) {
            var x = -1;
            var y = -1;
            // var actor = ActorMgr.getActorByUnitId(unitId);
            if (action.act_region.center_x == ActDef.LocationType.trigger_loc) {
                x = actor.getVal('x');
            }
            if (action.act_region.center_x == ActDef.LocationType.trigger_loc) {
                y = actor.getVal('y');
            }

            target_ids = {};
            for (let index = 0; index < actors.length; index++) {
                const _actor_ = actors[index];
                if (Math.pow(_actor_.getVal('x') - x, 2) + Math.pow(_actor_.getVal('y') - y, 2) <= Math.pow(action.act_region.region_radius, 2)) {
                    target_ids.push(_actor_.getUnitId());
                }
            }
        }

        var _target_ids = {};
        for (let index = 0; index < target_ids.length; index++) {
            const _actor_id_ = target_ids[index];
            var _msg_ = {target_ids = [_actor_id_], };
            if (this._isActionConditionHold(_msg_, action.pick_conditions)) {
                _target_ids.push(_actor_id_);
            }
        }
    },

    // 动作的条件是否成立
    _isActionConditionHold(msg, conditions)
    {
        var isCondition = true;
        for (let index = 0; index < conditions.length; index++) {
            const condition = conditions[index];
            isCondition = isCondition && ConditionHandle.isConditionHold(msg, condition);
            if (isCondition == false) {
                return isCondition;
            }
        }
        return isCondition;
    },

    _getValue(unitId, skillLevel, parameter)
    {
        var actor = ActorMgr.getActorByUnitId(unitId);

        var ivt = parameter.implement_value_type;
        if (ivt == ActDef.ValueType.constant) {
            return parameter.value_list[0];
        }
        else if (ivt == ActDef.ValueType.level_user) {
            var actorLevel = 0;
            if (actor == null) {
                return 0;
            }
            actorLevel = actor.getVal('level');
            return parameter.value_list[actorLevel];
        }
        else if (ivt == ActDef.ValueType.level_skill) {
            return parameter.value_list[skillLevel];
        }
        else if (ivt == ActDef.ValueType.random_value) {
            var value = window.getRandom(parameter.value_list[0], parameter.value_list[1]);
            return value;
        }
        return 0;
    },
    
    // 获取伤害值
    _getHurtVal(unitId, skillLevel, parameter)
    {
        var actor = ActorMgr.getActorByUnitId(unitId);

        var ivt = parameter.value_type;


        if (parameter.user_attribute_key == ActorDef.AttributeKey.unknown) {
            return this._getValue(unitId, skillLevel, parameter); 
        } else {
            if (actor == null) {
                return 0;
            }
            var key = ActorDef.AttributeKey[parameter.user_attribute_key];

            var actorAttributeValue = actor.getVal(key);
            if (parameter.user_attribute_key == ActorDef.AttributeKey.attack) {
                var Attri_min = actor.getVal(key + '_min');
                var Attri_max = actor.getVal(key + '_max');
                if (ivt == ActDef.ValueType.constant) {
                    return window.getRandom(Attri_min, Attri_max);
                }
                else if (ivt == ActDef.ValueType.percentage)
                {
                    return window.getRandom(Attri_min, Attri_max) * parameter.value_list[0] / 100;
                }
            }
            if (ivt == ActDef.ValueType.constant) {
                return actorAttributeValue;
            }
            else if (ivt == ActDef.ValueType.percentage)
            {
                return actorAttributeValue * parameter.value_list[0] / 100;
            }
        }

        return 0;
    },

    // 获取伤害来源
    _getDamageSource(unitId, targetId, sourceType)
    {
        if (sourceType == ActDef.UnitType.unit_none) {
            return -1;
        } 
        else if (sourceType == ActDef.UnitType.unit_trigger) {
            return unitId;
        } 
        else if (sourceType == ActDef.UnitType.unit_target) {
            return targetId;
        }
        else if (sourceType == ActDef.UnitType.unit_pick) {
            return targetId;
        }
    },

    _attack_damage_func(msg, action)
    {
        var funcName = FormulaTool.FormulaEnum[action.act_formula];
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
        var damage_source = ActDef.UnitType.unit_none;
        var damage_type = ActorDef.AttackType.normal;
        var target_ids = msg.target_ids;
        
        // 参数列表
        for (let index = 0; index < action.act_parameters.length; index++) {
            const parameter = action.act_parameters[index];

            if (parameter.parameter_type == ActDef.ParameterType.damage_value) {
                // dv = implement.implement_value_list[0];
                dv = this._getHurtVal(msg.unit_id, msg.skill_level, parameter);
            }
            else if (parameter.parameter_type == ActDef.ParameterType.damage_source) {
                damage_source = parameter.from_unit_type;
            }
            else if (parameter.parameter_type == ActDef.ParameterType.damage_type) {
                damage_type = parameter.damage_type;
            }
        }

        for (let index = 0; index < target_ids.length; index++) {
            const unit_id = target_ids[index];
            // console.log('element', element);
            var actor = ActorMgr.getActorByUnitId(unit_id);
            // console.log('actor', actor);
            if (actor == null) {
                continue;
            }
            ta = actor.getVal('armor');
            
            var damage = formula_func(dv, dt, ta, at);

            actor.modifyVal('health', -damage);

            var unitId = this._getDamageSource(msg.unit_id, unit_id, damage_source);

            var event_type = EventType.attribute_change;
            var send_data = {
                event_type : EventType[event_type],
                attribute : 'health', 
                value : -damage,
                target_id : unit_id,
                unitId : unitId,
                damage_type : damage_type,
            };
            console.log(send_data);
            Listener.dispatch(EventType[event_type], send_data);
        }
    },

    _buff_func(msg, action)
    {
        var list = new Array();
        var buff_id = -1;
        for (let index = 0; index < action.act_parameters.length; index++) {
            const parameter = action.act_parameters[index];
            if (parameter.parameter_type == ActDef.ParameterType.actor_attribute) {
                var data = {};
                data.value = this._getValue(msg.unit_id, 0, parameter);
                data.key = parameter.user_attribute_key;
                list.push(data);
            }
            else if (parameter.parameter_type == ActDef.ParameterType.buff_type)
            {
                buff_id = parameter.buff_id;
            }
        }

        if (buff_id == -1) {
            console.error('Buff ID no Define');
            return;
        }

        var buff = UnitCreator.createUnitByName('buff');
        buff.init(buff_id, msg, list);
        buff.onEnter();
    },
};