/*
 * @Description: In User Settings Edit
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-26 10:34:34
 * @LastEditTime: 2019-04-26 13:12:06
 */

var BuffDef = module.exports;

// actor属性key
BuffDef.BuffID = cc.Enum({
    unknown : 0,
    vertigo : 1,            // 眩晕
    silence : 2,            // 沉默
    taunt : 3,              // 嘲讽
    armor_break : 4,        // 破甲
    magic_immune : 5,       // 魔法免疫
    curse : 6,              // 诅咒
    fanatical : 7,          // 狂热
    arcane_halo : 8,        // 奥术光环
    bloodthirsty : 9,       // 嗜血

    warrior_halo : 101,     // 战士光环
});