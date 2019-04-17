/*
 * @Description: 计时器管理
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-17 16:27:04
 */

let DataPool = require("DataPool")

module.exports = {
    m_timers : new DataPool(), // 定时器列表

    init()
    {

    },

    update(dt)
    {
        // var pool = this.m_timers.getPool('timer');
        // for (let index = pool.length - 1; index >= 0; index--) {
        //     const timer = pool[index];
        //     if (timer.isUnitActive() == false) {
        //         timer.onExit();
        //         // pool.splice(index, 1);
        //     }
        // }
    },

    // 添加计时器
    pushTimer(timer)
    {
        console.log('pushTimer', timer);
        this.m_timers.pushToPool('timer', timer);
    },

    removeTimer(timer)
    {
        console.log('removeTimer', timer);
        this.m_timers.removeFromPool('timer', timer);
    },
};
