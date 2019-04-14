/*
 * @Description: 动作定义
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 23:39:49
 */


var ActionDef = module.exports;

// // 动作类型
// ActionDef.ActionType = cc.Enum({
//     unknown : 0,                    // 未知
//     release_skill : 1,              // 释放技能
//     pickup_item : 2,                // 拾取物品
//     giveup_item : 3,                // 丢弃物品
//     enter_region : 4,               // 进入区域
//     leave_region : 5,               // 离开区域
//     attribute_change : 6,           // 属性变化
//     once_timer : 7,                 // 一次性定时器
//     every_timer : 8,                // 周期性定时器

//     game_begin : 101,                 // 游戏开始
//     game_end : 102,                   // 游戏结束
//     game_pause : 103,                 // 游戏暂停
//     game_resume : 104,                // 游戏继续
// });

// 目标类型
ActionDef.TargetType = cc.Enum({
    none : 0,                   // 不需要目标
    all : 1,                    // 所有人
    self : 2,                   // 自己
    enemy : 3,                  // 敌方单位
    self_team : 4,              // 己方队伍
    enemy_team : 5,             // 敌方队伍
    self_team_random : 6,       // 己方队伍随机
    enemy_team_random : 7,      // 敌方队伍随机
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
});

// 执行类型
ActionDef.ImplementType = cc.Enum({
    nothing : 0,
    function_used : 1,      // 函数
    actor_attribute : 2,    // actor属性
    damage_source : 3,      // 伤害来源
    damage_value : 4,       // 伤害值
    damage_targets : 5,     // 伤害目标数组
    time_duration : 6,      // 持续时间
    consume_mana : 7,       // 魔法消耗
    consume_anger : 8,      // 怒气消耗
});

// 执行事件
ActionDef.ImplementEvent = cc.Enum({
    unknown : 0,
    begin : 1,
    end : 2,
});