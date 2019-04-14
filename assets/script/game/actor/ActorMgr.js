/*
 * @Description: Actor管理器
 * @Author: megjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-12 14:21:35
 */


let UnitMgr = require("UnitMgr")
let UnitDef = require("UnitDef")

module.exports = {

    m_actorIndex : 0,

    init()
    {

    },

    createActorId()
    {
        return ++this.m_actorIndex;
    },

    getActorById(actorId)
    {
        var pool = UnitMgr.getUnitByType(UnitDef.TypeID.actor);
        for (let index = 0; index < pool.length; index++) {
            const actor = pool[index];
            if (actorId == actor.getActorId()) {
                return actor;
            }
        }
        return null;
    },
};