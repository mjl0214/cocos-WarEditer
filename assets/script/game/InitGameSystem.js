/*
 * @Description: 初始化游戏系统(GameSystem)
 * @Author: mengjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-12 14:27:36
 */


window.getRandom = function (min, max)
{
    return Math.floor(Math.random()*(max - min + 1) + min);
};

var gs = {
    formula : require("FormulaTool"),
    unitMgr : require("UnitMgr"),
    triggerMgr : require("TriggerMgr"),
    actorMgr : require("ActorMgr"),
    gameLogic : require("GameLogic"),
}

gs.unitMgr.init();
gs.triggerMgr.init();
gs.actorMgr.init();
gs.gameLogic.init();

window.gs = window.$ = gs;