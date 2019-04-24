/*
 * @Description: Buff管理器
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-23 10:55:44
 */

let DataPool = require("DataPool")
let Listener = require("Listener")
let GameMsg = require("GameMsg")

module.exports = {
    m_buffs : new DataPool(), // 定时器列表

    init()
    {

    },

    update(dt)
    {
        // var pool = this.m_buffs.getPool('buff');
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
        this._sendUpdateBuff();
    },

    removeBuff(buff)
    {
        // console.log('removeTimer', timer);
        this.m_buffs.removeFromPool('buff', buff);
        this._sendUpdateBuff();
    },

    _sendUpdateBuff()
    {
        Listener.dispatch(GameMsg.GAME_BUFF_UPDATE);
    },

    getBuff(key, unitId)
    {
        var pool = this.m_buffs.getPool('buff');
        for (let index = pool.length - 1; index >= 0; index--) {
            const buff = pool[index];
            if (buff.buff_type == key && buff.buff_hold == unitId) {
                return buff;
            }
        }  
        
        return null;
    },

    getBuffList(unitId)
    {
        var list = new Array();
        var pool = this.m_buffs.getPool('buff');
        for (let index = pool.length - 1; index >= 0; index--) {
            const buff = pool[index];
            if (buff.buff_hold == unitId) {
                list.push(buff);
            }
        }
        
        return list;
    },

};
