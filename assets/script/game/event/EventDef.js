/*
 * @Description: 事件定义
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-24 15:59:19
 */


var EventDef = module.exports;

// 触发器事件类型
EventDef.EventType = cc.Enum({
    unknown : 0,                    // 未知
    cast_skill : 1,              // 释放技能
    pickup_item : 2,                // 拾取物品
    giveup_item : 3,                // 丢弃物品
    enter_region : 4,               // 进入区域
    leave_region : 5,               // 离开区域
    attribute_change : 6,           // 属性变化
    once_timer : 7,                 // 一次性定时器
    every_timer : 8,                // 周期性定时器
    unit_create : 9,                // 单位被创建出来

    game_begin : 101,                 // 游戏开始
    game_end : 102,                   // 游戏结束
    game_pause : 103,                 // 游戏暂停
    game_resume : 104,                // 游戏继续
});

// 触发器单位类型
EventDef.UnitType = cc.Enum({
    unknown : 0,             // 未知
    any_unit : 1,            // 任意单位
    timer_unit : 2,          // 计时器单位
    system_unit : 3,         // 系统单位
});
