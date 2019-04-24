/*
 * @Description: 数据池
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-22 09:00:41
 */


cc.Class({

    properties: {
        m_datapools : new Array(),  // 保存的数据
        // m_allpools : new Array(),   // 所有数据
    },

    ctor()
    {

    },

    // 加入池
    pushToPool(key, data)
    {
        var pool = this.m_datapools[key];
        if (pool == null) {
            pool = new Array();
            this.m_datapools[key] = pool;
        }
        pool.push(data);
    },

    // 从池中取出
    getFromPool(key)
    {
        var pool = this.m_datapools[key];
        if (pool == null) {
            return null;
        }

        if (pool.length > 0) {
            return pool.pop();
        }

        return null;
    },

    getPool(key)
    {
        var pool = this.m_datapools[key];
        if (pool == null) {
            pool = new Array();
            this.m_datapools[key] = pool;
        }
        return pool;
    },

    // 从池中移除
    removeFromPool(key, data)
    {
        var pool = this.m_datapools[key];
        if (pool == null) {
            return false;
        }

        for (let index = 0; index < pool.length; index++) {
            const element = pool[index];
            if (element == data) {
                pool.splice(index, 1);
                return true;
            }
        }
        return false;
    },

    claerPool(key)
    {
        var pool = this.m_datapools[key];
        if (pool) {
            pool.length = 0;
        }
    },

    clearAllPool()
    {
        for (const key in this.m_datapools) {
            if (this.m_datapools.hasOwnProperty(key)) {
                this.claerPool(key);
            }
        }
    },

    getAll()
    {
        var datas = new Array();
        for (const key in this.m_datapools) {
            if (this.m_datapools.hasOwnProperty(key)) {
                const pool = this.m_datapools[key];
                for (let index = 0; index < pool.length; index++) {
                    const data = pool[index];
                    datas.push(data);
                }
            }
        }

        return datas;
    },

});
