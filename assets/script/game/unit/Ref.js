/*
 * @Description: 基类(用于Unit中不能引用自身)
 * @Author: mengjl
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-12 22:56:28
 * @LastEditTime: 2019-04-14 23:32:53
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
