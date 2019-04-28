/*
 * @Description: Actor属性枚举
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-28 15:39:15
 */


var ActorDef = module.exports;

// actor属性key
ActorDef.AttributeKey = cc.Enum({
    unknown : 0,
    health : 1,             // 生命值
    mana : 2,               // 魔法值
    attack : 3,             // 攻击值
    attack_type : 4,        // 攻击类型
    armor : 5,              // 护甲值
    armor_type : 6,         // 护甲类型
    anger : 7,              // 愤怒值
    level : 8,              // 等级
    race : 9,               // 种族
    classes : 10,           // 职业
    attack_max : 11,        // 攻击值
    attack_min : 12,        // 攻击值
    x : 13,                 // x
    y : 14,                 // y
    range_max : 15,         // 攻击值
    range_min : 16,         // 攻击值
});

// 种族类型
ActorDef.RaceType = cc.Enum({
    unknown : 0,        // 未知
    human : 1,          // 人类
    orc : 2,            // 兽人
    elf : 3,            // 精灵
    undead : 4,         // 亡灵（不死）
    troll : 5,          // 巨魔
    gnome : 6,          // 侏儒
    beast : 7,          // 野兽
    naga : 8,           // 娜迦
    evil : 9,           // 恶魔
    element : 10,       // 元素
    ogre : 11,          // 食人魔
    dwarf : 12,         // 矮人
    dragon : 13,        // 龙族
    goblin : 14,        // 地精
});

// 职业类型
ActorDef.ClassesType = cc.Enum({
    unknown : 0,
    warrior : 1,        // 战士
    mage : 2,           // 法师
    druid : 3,          // 小德
    demonHunter : 4,    // 恶魔猎手
    artisan : 5,        // 工匠
    shaman : 6,         // 萨满
    assassin : 7,       // 刺客
    warlock : 8,        // 术士
    paladin : 9,        // 骑士
    hunter : 10,        // 猎人
});

// actor属性
ActorDef.AttributeType = cc.Enum({
    unknown : 0,
    health_point : 1,               // 生命值
    mana_point : 2,                 // 魔法值
    attack_point : 3,               // 攻击值
    attack_type : 4,                // 攻击类型
    armor_point : 5,                // 护甲值
    armor_type : 6,                 // 护甲类型
    action_point : 7,               // 行动值
    heath_recover_rate : 8,         // 生命恢复速率
    mana_recover_rate : 9,          // 魔法恢复速率
    motion_speed_point : 10,        // 移动速率
    strength_point : 11,            // 力量值
    intelligence_point : 12,        // 智力值
    agility_point : 13,             // 敏捷值
    day_vision : 14,                // 昼视
    night_vision : 15,              // 夜视
    attack_speed_point : 16,        // 攻击速率
    level_point : 17,               // 等级
    race_point : 18,                // 种族
    classes_point : 19,             // 职业
    attack_range_max_point : 20,    // 最大攻击距离
    attack_range_min_point : 21,    // 最小攻击距离
    spell_resistance : 22,          // 魔法抗性
    position_x : 23,                // 位置
    position_y : 24,                // 位置
    position_z : 25,                // 位置
    attack_max_point : 26,          // 最大攻击值
    attack_min_point : 27,          // 最小攻击值

    health_point_ex : 101,          // 额外生命值(生命偷取、加血光环...)
    mana_point_ex : 102,            // 额外魔法值(魔法偷取、加魔光环...)
    attack_point_ex : 103,          // 额外攻击值(攻击偷取、加攻光环...)
    armor_point_ex : 104,           // 额外护甲值(护甲偷取、加甲光环...)
});

// 攻击类型
ActorDef.AttackType = cc.Enum({
    unknown : 0,    // 未知
    normal : 1,     // 普通
    magic : 2,      // 魔法
    hero : 3,       // 英雄
    spells : 4,     // 法术
    chaos : 5,      // 混乱
    pierce : 6,     // 穿刺
    siege : 7,      // 攻城
});

// 防御类型
ActorDef.DefenseType = cc.Enum({
    unknown : 0,     // 未知
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