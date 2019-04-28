/*
 * @Description: 动作定义
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-28 10:37:45
 */


var ActionDef = module.exports;

ActionDef.ActionType = cc.Enum({
    none : 0,                    // 没有类型
    unit : 1,                    // 单位
    unit_group : 2,              // 单位组
    custom_script : 3,           // 自定义脚本
});

// 目标类型
ActionDef.TargetType = cc.Enum({
    none : 0,                   // 不需要目标
    all : 1,                    // 所有人
    self : 2,                   // 自己
    enemy : 3,                  // 敌方单位
    // self_team : 4,              // 己方队伍
    // enemy_team : 5,             // 敌方队伍
    // self_team_random : 6,       // 己方队伍随机
    // enemy_team_random : 7,      // 敌方队伍随机
});

// 伤害来源
ActionDef.DamageSourceType = cc.Enum({
    nothing : 0,            // 没有来源
    skill_user : 1,         // 技能使用者
    skill_target : 2,       // 技能目标
});

// 值类型
ActionDef.ImplementValueType = cc.Enum({
    constant : 0,           // 定值
    level_user : 1,         // 使用者等级
    level_skill : 2,        // 技能等级
    random_value : 3,       // 随机 
    percentage : 4,         // 百分比   
});

// 执行类型
ActionDef.ImplementType = cc.Enum({
    nothing : 0,
    actor_attribute : 1,    // actor属性
    damage_source : 2,      // 伤害来源
    damage_value : 3,       // 伤害值
    damage_targets : 4,     // 伤害目标数组
    consume_mana : 5,       // 魔法消耗
    damage_type : 6,        // 伤害类型
    buff_type : 7,          // buff
    // pick_up_unit : 8,       // 挑选unit
    // act_type : 9,           // 作用目标类型
});

// // 执行事件
// ActionDef.ImplementEvent = cc.Enum({
//     unknown : 0,
//     begin : 1,
//     end : 2,
// });