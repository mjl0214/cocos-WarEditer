/*
 * @Description: 技能定义
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-26 11:27:15
 */


var SkillDef = module.exports;

// 动作类型
SkillDef.SkillID = cc.Enum({
    unknown : 0,                    // 未知
    attack_normal : 1,              // 普通攻击
    attack_magic : 2,               // 魔法攻击
    blood_return : 3,               // 回血
    thorns_halo : 4,                // 荆棘光环
    blade_storm : 5,                // 剑刃风暴

});