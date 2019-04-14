/*
 * @Description: 监听
 * @Author: megjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-12 14:24:19
 */


module.exports = {
    m_funcArray: new Array(),

    addListener:function(key, func, target, type)
    {
        let obj = {};
        obj.key = key;
        obj.func = func;
        obj.target = target;
        obj.type = type;
        this.m_funcArray.push(obj);
    },

    removeListenerByTargetAndName:function(target, key)
    {
        for (let i = this.m_funcArray.length - 1; i >= 0; i--) {
            const o = this.m_funcArray[i];
            if(o.key == key && o.target == target){
                this.m_funcArray.splice(i, 1);
            }
        }
    },

    removeListenerByTarget:function(target)
    {
        for (let i = this.m_funcArray.length - 1; i >= 0; i--) {
            const o = this.m_funcArray[i];
            if(o.target == target){
                this.m_funcArray.splice(i, 1);
            }
        }
    },

    dispatch(key, param)
    {
        for (let i = this.m_funcArray.length - 1; i >= 0; i--) {
            const o = this.m_funcArray[i];
            if(key == o.key || (o.type && o.type == 'all')){
                o.func(param);
            }
        }
        // console.error(param);
    }
};