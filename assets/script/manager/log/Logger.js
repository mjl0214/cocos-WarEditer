/*
 * @Description: 日志类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-23 10:30:08
 * @LastEditTime: 2019-04-23 11:16:11
 */


cc.Class({
    // extends: cc.Component,

    name : 'Logger',

    properties: {
        module_name : {
            default : '',
            tooltip : "模块名字",
        },

        log_switch : {
            default : true,
            tooltip : "日志开关",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    turnon()
    {
        this.log_switch = true;
    },

    turnoff()
    {
        this.log_switch = false;
    },

    log(message, ...optionalParams)
    {
        this._log_type('log', message, ...optionalParams);
    },

    warn(message, ...optionalParams)
    {
        this._log_type('warn', message, ...optionalParams);
    },

    error(message, ...optionalParams)
    {
        this._log_type('error', message, ...optionalParams);
    },

    trace(message, ...optionalParams)
    {
        this._log_type('trace', message, ...optionalParams);
    },

    _log_type(type, message, ...optionalParams)
    {
        if (this.log_switch == false) {
            return;
        }

        switch (type) {
            case 'log':
            console.log(message, optionalParams);
                break;
            case 'log':
            console.warn(message, optionalParams);
                break;
            case 'log':
            console.error(message, optionalParams);
                break;
            case 'trace':
            console.trace(message, optionalParams);
                break;
            default:
                break;
        }
    },

    // update (dt) {},
});
