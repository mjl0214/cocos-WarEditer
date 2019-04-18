/*
 * @Description: Unit定义
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-18 15:43:48
 */


var UnitDef = module.exports;

// Unit类型
UnitDef.TypeID = cc.Enum({
    unknown : 0,            // 未知
    actor : 1,              // 演员
    item : 2,               // 物品
    hero : 3,               // 英雄
    skill : 4,              // 技能
    trigger : 5,            // 触发器
    buff : 6,               // buff
    timer : 7,              // 定时器
    system : 8,             // 系统
});