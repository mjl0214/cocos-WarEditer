/*
 * @Description: 技能管理器
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-17 23:43:39
 * @LastEditTime: 2019-04-18 00:48:48
 */


let DataPool = require("DataPool")

module.exports = {
    m_skills : new DataPool(), // 定时器列表

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
    pushSkill(skill)
    {
        // console.log('pushTimer', timer);
        this.m_skills.pushToPool('skill', skill);
    },

    removeSkill(skill)
    {
        // console.log('removeTimer', timer);
        this.m_skills.removeFromPool('skill', skill);
    },
};
