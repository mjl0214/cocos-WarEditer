/*
 * @Description: 初始化管理器
 * @Author: mengjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-12 14:27:51
 */


var mgr = {
    poolMgr : require("PoolManager"),
    poolDef : require("PoolDef"),
    dialogMgr : require("DialogMgr"),
}

window.mgr = window.$ = mgr;