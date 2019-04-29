let DialogBase = require("DialogBase")
let DialogMgr = require("DialogMgr")
let DialogDef = require("DialogDef")
let ActorMgr = require("ActorMgr")
let NameDef = require("NameDef")
let Listener = require("Listener")
let EventDef = require("EventDef")

let EventType = EventDef.EventType;

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
        // console.log('Item onEnter');
        this._actor_id = params.unit_id;
        this.showInfo(this._actor_id);

        setTimeout(() => {
            this.bgNode.width = this.showLabel.node.width + 24*2;
            this.bgNode.height = this.showLabel.node.height + 24;
        }, 300);

        var self = this;
        var event_type = EventType.attribute_change;
        Listener.addListener(EventType[event_type], function(msg) { self.onAttributeChange(msg); }, this);
    },

    onLeave()
    {
        Listener.removeListenerByTarget(this);
        // console.log('Item onLeave');
    },

    showInfo(actorId)
    {
        this.showLabel.string = '';
        // console.log('Item onEnter');
        var actor_id = actorId;
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
            this.showLabel.string += '魔抗: ' + actor.getVal('spell_resistance') + '\n';
            this.showLabel.string += '攻击: ' + actor.getVal('attack_min') + '~' + actor.getVal('attack_max') + '\n';
            this.showLabel.string += '攻击距离: ' + actor.getVal('range_min') + '~' + actor.getVal('range_max') + '\n';
            this.showLabel.string += '坐标: ' + '(' + actor.getVal('x') + ',' + actor.getVal('y') + ')' + '\n';        
        }
    },

    onAttributeChange(msg)
    {
        if (this._actor_id == msg.target_id) {
            this.showInfo(msg.target_id);
        }
        
    },

    // update (dt) {},
});
