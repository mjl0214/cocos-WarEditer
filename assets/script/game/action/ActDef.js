/*
 * @Description: 动作定义
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-28 10:49:56
 * @LastEditTime: 2019-04-28 16:31:04
 */


var ActDef = module.exports;

ActDef.ActType = cc.Enum({
    none : 0,                    // 没有类型
    condition : 1,               // 条件
    unit : 2,                    // 单位
    unit_group : 3,              // 单位组
    custom_script : 4,           // 自定义脚本
});

ActDef.UnitType = cc.Enum({
    unit_none : 0,                  // 没有单位
    unit_any : 1,                   // 任意单位
    unit_trigger : 2,               // 触发单位
    unit_target : 3,                // 目标单位
    unit_pick : 4,                  // 挑选的单位
});

// 值类型
ActDef.ValueType = cc.Enum({
    constant : 0,           // 定值
    level_user : 1,         // 使用者等级
    level_skill : 2,        // 技能等级
    random_value : 3,       // 随机 
    percentage : 4,         // 百分比   
});

// 位置来源
ActDef.LocationType = cc.Enum({
    nothing : 0,            // 没有来源
    skill_loc : 1,          // 技能使用者
    trigger_loc : 2,        // 技能目标
});

// 参数类型
ActDef.ParameterType = cc.Enum({
    nothing : 0,
    actor_attribute : 1,    // actor属性
    damage_source : 2,      // 伤害来源
    damage_value : 3,       // 伤害值
    consume_mana : 4,       // 魔法消耗
    damage_type : 5,        // 伤害类型
    buff_type : 6,          // buff
    // pick_up_unit : 8,       // 挑选unit
    // act_type : 9,           // 作用目标类型
});
