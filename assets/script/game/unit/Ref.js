/*
 * @Description: 基类(用于Unit中不能引用自身)
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 22:56:28
 * @LastEditTime: 2019-04-25 11:40:13
 * 
 * @Night watcher swear :
 * Night gathers, and now my watch begins. 
 * It shall not end until my death. 
 * I shall take no wife, hold no lands, father no children. 
 * I shall wear no crowns and win no glory. 
 * I shall live and die at my post. 
 * I am the sword in the darkness. 
 * I am the watcher on the walls. 
 * I am the fire that burns against the cold, 
 * the light that brings the dawn, 
 * the horn that wakes the sleepers, 
 * the shield that guards the realms of men. 
 * I pledge my life and honor to the Night's Watch, 
 * for this night and all the nights to come.
 */

let ref_index = 0;

cc.Class({
    // extends: cc.Component,

    name : "Ref",

    properties: {
        ref_id : {
            default: -1,
            type : cc.Integer, 
            tooltip : "RefID",
            visible : false,
            serializable: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    ctor ()
    {
        this.ref_id = ref_index++;
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
