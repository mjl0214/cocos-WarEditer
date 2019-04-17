/*
 * @Description: 初始化游戏系统(GameSystem)
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-17 16:17:02
 */


var gs = {
    formula : require("FormulaTool"),
    unitMgr : require("UnitMgr"),
    triggerMgr : require("TriggerMgr"),
    actorMgr : require("ActorMgr"),
    timerMgr : require("TimerMgr"),
    gameLogic : require("GameLogic"),
}

gs.unitMgr.init();
gs.triggerMgr.init();
gs.actorMgr.init();
gs.timerMgr.init();
gs.gameLogic.init();

window.gs = window.$ = gs;