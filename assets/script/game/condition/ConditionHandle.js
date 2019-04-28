/*
 * @Description: 条件处理类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-28 16:09:30
 */


let ConditionDef = require("ConditionDef")
let SkillDef = require("SkillDef")
let ActionDef = require("ActionDef")
let ActorMgr = require("ActorMgr")
let StateDef = require("StateDef")
let ActorDef = require("ActorDef")
let BuffMgr = require("BuffMgr")

let CondType = ConditionDef.ConditionType;
let LGType = ConditionDef.LogicGateType;
let TarType = ActionDef.TargetType;
let StateType = StateDef.StateType;

let RaceType = ActorDef.RaceType;
let ClassesType = ActorDef.ClassesType;

module.exports = {

    m_msg : null,
    condition : null,

    isConditionHold(msg, condition)
    {
        // 赋值传参
        this.m_msg = msg;
        this.condition = condition;
        
        var result = this._isConditionHold();

        if (result) {
            console.log(result, '{条件}', condition.condition_desc);
        }
        else
        {
            console.error(result, '{条件}', msg, condition);
        }
        return result;
    },

    // 条件是否成立
    _isConditionHold()
    {
        var isHold = true;
        // 判断传入的值是否< > = <= >= != this.temp_value
        switch (this.condition.condition_type) {
            case CondType.unknown:
                isHold = isHold && this.handle_unknown();
                break;
            case CondType.skill_id:
                isHold = isHold && this.handle_skill_id();
                break;
            case CondType.target_amount:
                isHold = isHold && this.handle_target_amount();
                break;
            case CondType.target_appoint:
                isHold = isHold && this.handle_target_appoint();
                break;
            case CondType.unit_alive:
                isHold = isHold && this.handle_unit_alive();
                break;
            case CondType.unit_dead:
                isHold = isHold && this.handle_unit_dead();
                break;
            case CondType.actor_attribute:
                isHold = isHold && this.handle_actor_attribute();
                break;
            case CondType.have_buff:
                isHold = isHold && this.handle_have_buff();
                break;
                
            default:
                isHold = isHold && false;
                break;
        }

        return isHold;
    },

    _juageLogicGate(value1, value2, logic_gate)
    {
        // equal : 0,          // 等于
        // greater : 1,        // 大于
        // less : 2,           // 小于
        // unequal : 3,        // 不等于
        // greater_equal : 4,  // 大于等于
        // less_equal : 5,     // 小于等于
        // logic_true : 6,     // true
        // logic_false : 7,    // false

        var result = true;
        switch (logic_gate) {
            case LGType.equal:
                result = value1 == value2;
                break;
            case LGType.greater:
                result = value1 > value2;
                break;
            case LGType.less:
                result = value1 < value2;
                break;
            case LGType.unequal:
                result = value1 != value2;
                break;
            case LGType.greater_equal:
                result = value1 >= value2;
                break;
            case LGType.less_equal:
                result = value1 <= value2;
                break;
            case LGType.logic_true:
                result = value1 != 0;
                break;
            case LGType.logic_false:
                result = value1 == 0;
                break;
        
            default:
                result = false;
                break;
        }

        return result;
    },

    handle_unknown(){ 
        return false;
    },

    handle_skill_id(){
        return this._juageLogicGate(this.m_msg.skill_id, 
            this.condition.skill_id, 
            this.condition.logic_gate);
    },

    handle_target_amount(){
        return this._juageLogicGate(this.m_msg.target_ids.length, 
            this.condition.condition_value, 
            this.condition.logic_gate);
    },

    handle_target_appoint(){ 
        // none : 0,                   // 不需要目标
        // all : 1,                    // 所有人
        // self : 2,                   // 自己
        // enemy : 3,                  // 敌方单位

        var holder_team = -1;
        var actor = ActorMgr.getActorByUnitId(this.m_msg.unit_id);
        if (actor != null) {
            holder_team = actor.team_id;
        }

        var targets = [];
        for (let index = 0; index < this.m_msg.target_ids.length; index++) {
            const unit_id = this.m_msg.target_ids[index];
            var actor = ActorMgr.getActorByUnitId(unit_id);
            if (actor != null) {
                targets.push({unit_id : unit_id, team_id : actor.team_id});
            }
        }

        var result = true;
        switch (this.condition.condition_value) {
            case TarType.none:
                result = true;
                break;
            case TarType.all:
                result = true;
                break;
            case TarType.self:
                result = this.m_msg.target_amount == 1 && 
                    (this.m_msg.unit_id > -1) &&
                    (targets.length > 0) &&
                    (targets[0].unit_id == this.m_msg.unit_id);
                break;
            case TarType.enemy:
            // case TarType.enemy_team:
            // case TarType.enemy_team_random:
                for (let index = 0; index < targets.length; index++) {
                    const target = targets[index];
                    var actor = ActorMgr.getActorByUnitId(target.unit_id);
                    if (target.team_id == holder_team) {
                        result = false;
                        break;
                    }
                }
                if (targets.length == 0) {
                    result = false;
                }
                break;
        
            default:
                result = false;
                break;
        }

        return result;
    },

    handle_unit_alive()
    {
        var result = true;

        for (let index = 0; index < this.m_msg.target_ids.length; index++) {
            const unit_id = this.m_msg.target_ids[index];
            var actor = ActorMgr.getActorByUnitId(unit_id);
            if (actor != null) {
                var state = actor.getState();
                if (this.condition.logic_gate == LGType.logic_true) {
                    result = result && (state != StateType.death);
                } else {
                    result = result && (state == StateType.death);
                }
            }
        }

        return result;
    },

    handle_unit_dead()
    {
        var result = true;

        for (let index = 0; index < this.m_msg.target_ids.length; index++) {
            const unit_id = this.m_msg.target_ids[index];
            var actor = ActorMgr.getActorByUnitId(unit_id);
            if (actor != null) {
                var state = actor.getState();
                if (this.condition.logic_gate == LGType.logic_true) {
                    result = result && (state == StateType.death);
                } else {
                    result = result && (state != StateType.death);
                }
            }
        }

        return result;
    },

    handle_actor_attribute()
    {
        // console.log(this.condition_value, this.actor_race, this.actor_classes)
        var actor = ActorMgr.getActorByUnitId(this.m_msg.unit_id);
        if (actor == null) {
            return false;
        }

        if (this.condition.actor_attribute_key == ActorDef.AttributeKey.race) {
            return this.condition.actor_race == actor.getVal('race');
        }
        else if (this.condition.actor_attribute_key == ActorDef.AttributeKey.classes) {
            return this.condition.actor_classes == actor.getVal('classes');
        }

        return false;
    },

    handle_have_buff()
    {
        var actor = ActorMgr.getActorByUnitId(this.m_msg.unit_id);
        if (actor == null) {
            return false;
        }

        var buff = BuffMgr.getBuff(this.condition.skill_id, this.m_msg.unit_id);
        if (this.condition.logic_gate == LGType.logic_true) {
            return buff != null;
        }
        else if (this.condition.logic_gate == LGType.logic_false)
        {
            return buff == null;
        }

        return false;
    },

};
