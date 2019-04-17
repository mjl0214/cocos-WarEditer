/*
 * @Description: Buff管理器
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-17 16:36:48
 */

let DataPool = require("DataPool")

module.exports = {
    m_buffs : new DataPool(), // 定时器列表

    init()
    {

    },

    update(dt)
    {
        // var pool = this.m_buffs.getPool('timer');
        // for (let index = pool.length - 1; index >= 0; index--) {
        //     const timer = pool[index];
        //     if (timer.isUnitActive() == false) {
        //         timer.onExit();
        //         // pool.splice(index, 1);
        //     }
        // }
    },

    // 添加计时器
    pushBuff(buff)
    {
        // console.log('pushTimer', timer);
        this.m_buffs.pushToPool('buff', buff);
    },

    removeBuff(buff)
    {
        // console.log('removeTimer', timer);
        this.m_buffs.removeFromPool('buff', buff);
    },
};
