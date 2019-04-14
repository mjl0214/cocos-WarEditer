/*
 * @Description: 公式类
 * @Author: mengjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-12 14:23:09
 */


module.exports = {

    FormulaEnum : cc.Enum({
        none_function : 0,
        damage_function01 : 1,
    }),

    /**
     * 没有函数
     */
    none_function()
    {

    },

    /** 
     *  简单伤害计算(不考虑攻击类型， 护甲类型)
     *  dv damage_value
     *  dt damage_type
     *  ta target_armor
     *  at armor_type
    */
    damage_function01 (dv, dt, ta, at)
    {
        var damage = dv - ta;
        if (damage < 0) {
            damage = 0;
        }
        return damage;
    },
};