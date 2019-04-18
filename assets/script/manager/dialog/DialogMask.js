// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        maskNode : {
            default: null,
            type : cc.Node, 
            tooltip : "遮罩节点",
        },

        inputNode : {
            default: null,
            type : cc.Node,  
            tooltip : "穿透节点",
        },

        maskId : {
            default: -1,
            type : cc.Integer, 
            tooltip : "遮罩对话框ID",
            visible : false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    setMaskId(maskId)
    {
        this.maskId = maskId;
    },

    getMaskId()
    {
        return this.maskId;
    },

    setMask(mask)
    {
        this.maskNode.active = mask;
    },

    setInput(input)
    {
        this.inputNode.active = input;
    },

    // update (dt) {},
});
