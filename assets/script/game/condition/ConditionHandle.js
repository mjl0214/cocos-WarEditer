/*
 * @Description: 条件处理类
 * @Author: megjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-13 01:43:35
 */


let ConditionDef = require("ConditionDef")
let SkillDef = require("SkillDef")
let ActionDef = require("ActionDef")

let CondType = ConditionDef.ConditionType;
let LGType = ConditionDef.LogicGateType;
let TarType = ActionDef.TargetType;

module.exports = {

    condition_type : CondType.unknown,
    condition_value : 0,
    logic_gate : LGType.equal,
    m_msg : null,

    isConditionHold(msg, condition)
    {
        // 赋值传参
        this.m_msg = msg;

        var condData = condition.getData();
        this.logic_gate = condData.logic_gate;
        this.condition_value = condData.condition_value;
        this.condition_type = condData.condition_type;
        
        var result = this._isConditionHold();

        if (result) {
            console.log(result, '{条件}', condition.condition_desc);
        }
        else
        {
            console.error(result, '{条件}', condition.condition_desc);
        }
        return result;
    },

    // 条件是否成立
    _isConditionHold()
    {
        var isHold = true;
        // 判断传入的值是否< > = <= >= != this.temp_value
        switch (this.condition_type) {
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
            default:
                isHold = isHold && false;
                break;
        }

        return isHold;
    },

    handle_unknown(){ 
        return false;
    },

    handle_skill_id(){
        return this._juageLogicGate(this.m_msg.skill_id, 
            this.condition_value, 
            this.logic_gate);
    },

    handle_target_amount(){
        return this._juageLogicGate(this.m_msg.target_amount, 
            this.condition_value, 
            this.logic_gate);
    },

    _juageLogicGate(value1, value2, logic_gate)
    {
        // equal : 0,          // 等于
        // greater : 1,        // 大于
        // less : 2,           // 小于
        // unequal : 3,        // 不等于
        // greater_equal : 4,  // 大于等于
        // less_equal : 5,     // 小于等于
        // logic_true : 6,
        // logic_false : 7,

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

    handle_target_appoint(){ 
        // none : 0,                   // 不需要目标
        // all : 1,                    // 所有人
        // self : 2,                   // 自己
        // enemy : 3,                  // 敌方单位
        // self_team : 4,              // 己方队伍
        // enemy_team : 5,             // 敌方队伍
        // self_team_random : 6,       // 己方队伍随机
        // enemy_team_random : 7,      // 敌方队伍随机
        var result = true;
        switch (this.condition_value) {
            case TarType.none:
                result = true;
                break;
            case TarType.all:
                result = true;
                break;
            case TarType.self:
                result = this.m_msg.target_amount == 1 && 
                    (this.m_msg.holder_id > -1) &&
                    (this.m_msg.targets[0].actorId == this.m_msg.holder_id)
                break;
            case TarType.enemy:
            case TarType.enemy_team:
            case TarType.enemy_team_random:
                for (let index = 0; index < this.m_msg.targets.length; index++) {
                    const element = this.m_msg.targets[index];
                    if (element.teamId = this.m_msg.teamId) {
                        result = false;
                        break;
                    }
                }
                if (this.m_msg.targets.length == 0) {
                    result = false;
                }
                break;
            case TarType.self_team:
            case TarType.self_team_random:
                for (let index = 0; index < this.m_msg.targets.length; index++) {
                    const element = this.m_msg.targets[index];
                    if (element.teamId != this.m_msg.teamId) {
                        result = false;
                        break;
                    }
                }
                if (this.m_msg.targets.length == 0) {
                    result = false;
                }
                break;
        
            default:
                result = false;
                break;
        }

        return result;
    },
};
