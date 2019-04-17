// let PoolManager = require("PoolManager")
let SkillDef = require('SkillDef')
let Listener = require("Listener")
let EventDef = require("EventDef")

cc.Class({
    extends: cc.Component,

    properties: {
        actor : cc.Node,
        actor2 : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        gs.gameLogic.gameBegin();

        // console.log(window.curl_rand())
        // console.log(window.curl_rand())
        // console.log(window.curl_rand())
        // console.log(window.curl_rand())
        // console.log(window.curl_rand())
    },

    onButtonClick()
    {
        var actor = gs.gameLogic.getActorUnit(this.actor);
        var actor2 = gs.gameLogic.getActorUnit(this.actor2);

        var actorId = actor.getUnitId();
        gs.gameLogic.castSkill(SkillDef.SkillID.attack_normal, actorId, [actor2.getUnitId()]);
    },

    update (dt) {
        gs.gameLogic.update(dt);
    },
});
