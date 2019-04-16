/*
 * @Description: Unit定义
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-16 23:11:02
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

// 攻击类型
UnitDef.AttackType = cc.Enum({
    unknown : 0,     // 未知
    normal : 1,     // 普通
    magic : 2,      // 魔法
    hero : 3,       // 英雄
    spells : 4,     // 法术
    chaos : 5,      // 混乱
    pierce : 6,     // 穿刺
    siege : 7,      // 攻城
});

// 防御类型
UnitDef.DefenseType = cc.Enum({
    unknown : 0,      // 未知
    small : 1,       // 轻甲
    medium : 2,      // 中甲
    large : 3,       // 重甲
    fortified : 4,   // 加强型护甲
    normal : 5,      // 普通甲
    hero : 6,        // 英雄甲
    divine : 7,      // 神圣护甲
    unarmored : 8,   // 无甲
    ethereal : 9,    // 虚无
});