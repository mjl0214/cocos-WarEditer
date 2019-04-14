/*
 * @Description: Actor属性枚举
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 23:40:12
 */


var ActorDef = module.exports;

// 模型属性
ActorDef.AttributeType = cc.Enum({
    unknown : 0,
    health_point : 1,       // 生命值
    mana_point : 2,         // 魔法值
    attack_point : 3,       // 攻击值
    attack_type : 4,        // 攻击类型
    armor_point : 5,        // 护甲值
    armor_type : 6,         // 护甲类型
    anger_point : 7,        // 愤怒值
    action_point : 8,       // 行动值

    health_point_ex : 9,    // 额外生命值(生命偷取、加血光环...)
    mana_point_ex : 10,     // 额外魔法值(魔法偷取、加魔光环...)
    attack_point_ex : 11,   // 额外攻击值(攻击偷取、加攻光环...)
    armor_point_ex : 12,    // 额外护甲值(护甲偷取、加甲光环...)
    anger_point_ex : 13,    // 额外愤怒值(愤怒偷取、加怒光环...)

    heath_recover_rate : 14,
    mana_recover_rate : 15,

    motion_speed_point : 16,
    strength_point : 17,
    intelligence_point : 18,
    agility_point : 19,
    day_vision : 20,
    night_vision : 21,
    attack_speed_point : 22,

    level_point : 23,
});