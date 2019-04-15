/*
 * @Description: 触发器可视化组件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-15 12:56:22
 */


let Trigger = require("Trigger")
let TriggerMgr = require("TriggerMgr")

let poolIndex = 0

cc.Class({
    extends: cc.Component,
    mixins: [Trigger],

    properties: {
        poolNum : {
            default : 1,
            type : cc.Integer,
            tooltip : '预制体池初始化数量', 
        },

        cloneTrigger : {
            default : false,
            tooltip : '克隆触发器',
        },

        cloneTriggerPrefab : {
            default : null,
            type : cc.Prefab,
            tooltip : '克隆的触发器预制体',
            visible() {
                return (this.cloneTrigger == true);
            },

            notify() {
                if (this.cloneTriggerPrefab) {
                    var _trigger = this.cloneTriggerPrefab.data.getComponent('TriggerUnit');
                    this._clone(_trigger);
                }
            },
        },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor()
    {
    },

    onLoad () {
        var unit = new Trigger();
        unit.onLoad.apply(this);
    },

    onDestroy () {
        var unit = new Trigger();
        unit.onLoad.onDestroy(this);
    },

    getPoolName()
    {
        poolIndex++;
        return 'Sysytem_Trigger_' + poolIndex;
    },

    start () {
    },

    // update (dt) {},
});
