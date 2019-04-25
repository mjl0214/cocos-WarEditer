let DialogBase = require("DialogBase")
let DialogMgr = require("DialogMgr")
let DialogDef = require("DialogDef")
let ActorMgr = require("ActorMgr")
// let ActorDef = require("ActorDef")

cc.Class({
    extends: DialogBase,

    properties: {
        showLabel : {
            default: null,
            type : cc.Label, 
            tooltip : "显示文字",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onEnter(params)
    {
        this.showLabel.string = '';
        // console.log('Item onEnter');
        var actor_id = params.unit_id;
        var actor = ActorMgr.getActorByUnitId(actor_id);
        if (actor == null) {
            this.showLabel.string = 'No Actor';
        }

        this.showLabel.string += 'ID: ' + actor.actor_id + '\n';
        this.showLabel.string += '生命: ' + actor.getVal('health') + '\n';
        this.showLabel.string += '魔法: ' + actor.getVal('mana') + '\n';
        this.showLabel.string += '护甲: ' + actor.getVal('armor') + '\n';
        this.showLabel.string += '攻击: ' + actor.getVal('attack') + '\n';
    },

    onLeave()
    {
        // console.log('Item onLeave');
    },

    // update (dt) {},
});
