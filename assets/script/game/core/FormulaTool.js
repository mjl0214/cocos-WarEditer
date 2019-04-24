/*
 * @Description: 公式类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-23 14:44:12
 */

window.getRandom = function (min, max)
{
    return Math.floor(window.curl_rand() * (max - min + 1) + min);
};

window.curl_randseed = 0;

window.curl_rand = function ()
{/* RAND_MAX assumed to be 233279 */
    window.curl_randseed = ( window.curl_randseed * 9301 + 49297 ) % 233280;
    return window.curl_randseed / 233280;
};

module.exports = {

    FormulaEnum : cc.Enum({
        none_function : 0,
        attack_damage_function01 : 1,
        attack_damage_function02 : 2,
        buff_function : 3,
        trigger_function : 4,
    }),

    /**
     * 没有函数
     */
    none_function()
    {

    },

    /** 
     *  简单物理伤害计算(不考虑攻击类型， 护甲类型)
     *  dv damage_value
     *  dt damage_type
     *  ta target_armor
     *  at armor_type
    */
    attack_damage_function01 (dv, dt, ta, at)
    {
        var damage = dv - ta;
        if (damage < 0) {
            damage = 0;
        }
        return damage;
    },

    /** 
     *  物理伤害计算
     *  dv damage_value
     *  dt damage_type
     *  ta target_armor
     *  at armor_type
    */
   attack_damage_function02 (dv, dt, ta, at)
   {
       var damage = dv * (1 - 0.06 * ta / (1 + 0.06 * ta));
       // 修正值-四舍五入
       damage = damage.toFixed(0);
       return damage;
   },

   /**
    * @description: buff
    * @param {type} 
    * @return: 
    */
   buff_function()
   {

   },

   /**
    * @description: trigger
    * @param {type} 
    * @return: 
    */
   trigger_function()
   {

   },
   
};