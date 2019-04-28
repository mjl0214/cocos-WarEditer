let DialogBase = require("DialogBase")
let DialogMgr = require("DialogMgr")
let DialogDef = require("DialogDef")
let ActorMgr = require("ActorMgr")
let NameDef = require("NameDef")

cc.Class({
    extends: DialogBase,

    properties: {

        bgNode : {
            default: null,
            type : cc.Node, 
            tooltip : "显示文字",
        },
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
        else
        {
            this.showLabel.string += 'ID: ' + actor.actor_id + '\n';
            this.showLabel.string += 'Name: ' + NameDef[actor.actor_name] + '\n';
            this.showLabel.string += '生命: ' + actor.getVal('health') + '\n';
            this.showLabel.string += '魔法: ' + actor.getVal('mana') + '\n';
            this.showLabel.string += '护甲: ' + actor.getVal('armor') + '\n';
            this.showLabel.string += '攻击: ' + actor.getVal('attack_min') + '~' + actor.getVal('attack_max') + '\n';
            this.showLabel.string += '攻击距离: ' + actor.getVal('range_min') + '~' + actor.getVal('range_max') + '\n';
            this.showLabel.string += '坐标: ' + '(' + actor.getVal('x') + ',' + actor.getVal('y') + ')' + '\n';        
        }



        setTimeout(() => {
            this.bgNode.width = this.showLabel.node.width + 24*2;
            this.bgNode.height = this.showLabel.node.height + 24;
        }, 300);
    },

    onLeave()
    {
        // console.log('Item onLeave');
    },

    // update (dt) {},
});
