/*
 * @Description: 条件定义
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-28 16:09:45
 */


var ConditionDef = module.exports;

// 条件类型
ConditionDef.ConditionType = cc.Enum({
    unknown : 0,            // 未知
    skill_id : 1,           // 技能ID
    range_min : 2,          // 最小射程
    range_max : 3,          // 最大射程
    target_appoint : 4,     // 指定目标(目标类型)
    target_amount : 5,      // 目标数量
    unit_alive : 6,         // 存活的单位
    unit_dead : 7,          // 死亡的单位
    actor_attribute : 8,    // actor属性
    have_buff : 9,          // 拥有buff
    // skill_range : 10,       // 技能距离内
    // attack_range : 11,      // 攻击范围内
});

// 逻辑门
ConditionDef.LogicGateType = cc.Enum({
    equal : 0,          // 等于
    greater : 1,        // 大于
    less : 2,           // 小于
    unequal : 3,        // 不等于
    greater_equal : 4,  // 大于等于
    less_equal : 5,     // 小于等于
    logic_true : 6,     // true
    logic_false : 7,    // false
});