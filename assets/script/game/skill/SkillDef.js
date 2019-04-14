/*
 * @Description: 技能定义
 * @Author: megjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-12 14:24:38
 */


var SkillDef = module.exports;

// 动作类型
SkillDef.SkillID = cc.Enum({
    unknown : 0,                    // 未知
    attack_normal : 1,              // 普通攻击
    attack_magic : 2,               // 魔法攻击
    blood_return : 3,               // 回血
    thorns_halo : 4,                // 荆棘光环
});