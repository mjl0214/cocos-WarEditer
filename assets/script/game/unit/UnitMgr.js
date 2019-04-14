/*
 * @Description: Unit管理器
 * @Author: mengjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 21:24:10
 */


let DataPool = require("DataPool")

module.exports = {
    m_units : new DataPool(),    // Unit列表
    m_unitId : 0,

    init()
    {

    },

    update(dt)
    {
        for (const key in this.m_units.m_datapools) {
            if (this.m_units.m_datapools.hasOwnProperty(key)) {
                const pool = this.m_units.m_datapools[key];
                for (let index = 0; index < pool.length; index++) {
                    const unit = pool[index];
                    unit.update(dt);
                }
            }
        }
    },

    pushUnit(unit)
    {
        unit.setUnitId(++this.m_unitId);
        this.m_units.pushToPool(unit.getUnitType(), unit);
        // console.log('pushUnit', this.m_unitId, unit.getUnitType());
        if (unit.getUnitType() == 0) {
            console.trace()
        }
    },

    removeUnit(unit)
    {
        this.m_units.removeFromPool(unit.getUnitType(), unit);
    },

    getUnitByType(type)
    {
        return this.m_units.getPool(type);
    },
};