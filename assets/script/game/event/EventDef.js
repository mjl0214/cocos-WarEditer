/*
 * @Description: 事件定义
 * @Author: mengjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 20:22:46
 */


var EventDef = module.exports;

// 事件类型
EventDef.EventType = cc.Enum({
    unknown : 0,                    // 未知
    release_skill : 1,              // 释放技能
    pickup_item : 2,                // 拾取物品
    giveup_item : 3,                // 丢弃物品
    enter_region : 4,               // 进入区域
    leave_region : 5,               // 离开区域
    attribute_change : 6,           // 属性变化
    once_timer : 7,                 // 一次性定时器
    every_timer : 8,                // 周期性定时器

    game_begin : 101,                 // 游戏开始
    game_end : 102,                   // 游戏结束
    game_pause : 103,                 // 游戏暂停
    game_resume : 104,                // 游戏继续
});

// 单位类型
EventDef.UnitType = cc.Enum({
    unknown : 0,             // 未知
    any_unit : 1,            // 任意单位
    friend_unit : 2,         // 友方单位
    enemy_unit : 3,          // 敌方单位
    timer_unit : 4,          // 计时器单位
    system_unit : 5,         // 系统单位
});

// // 事件ID
// EventDef.EventID = {
//     EVENT_UNKNOWN : 'event_unknown',
//     EVENT_USE_SKILL : 'event_use_skill',
// };