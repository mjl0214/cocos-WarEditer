/*
 * @Description: 条件定义
 * @Author: megjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-12 14:22:39
 */


var ConditionDef = module.exports;

// 条件类型
ConditionDef.ConditionType = cc.Enum({
    unknown : 0,        // 未知
    skill_id : 1,       // 技能ID
    range_min : 2,      // 最小射程
    range_max : 3,      // 最大射程
    target_appoint : 4,   // 指定目标(目标类型)
    target_amount : 5,  // 目标数量
    // unit_friend : 4,    // 友方单位
    // unit_enemy : 5,     // 敌方单位
});

// 逻辑门
ConditionDef.LogicGateType = cc.Enum({
    equal : 0,          // 等于
    greater : 1,        // 大于
    less : 2,           // 小于
    unequal : 3,        // 不等于
    greater_equal : 4,  // 大于等于
    less_equal : 5,     // 小于等于
    logic_true : 6,
    logic_false : 7,
});