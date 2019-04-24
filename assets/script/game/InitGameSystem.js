/*
 * @Description: 初始化游戏系统(GameSystem)
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-23 11:03:56
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

var Logger = require("Logger");
gs.gameLogger = new Logger();
gs.gameLogger.turnon();

window.gs = window.$ = gs;