/*
 * @Description: In User Settings Edit
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-28 14:04:13
 * @LastEditTime: 2019-04-28 14:14:49
 */

module.exports = {

    // 执行动作
    actionHold(msg, action)
    {
        // console.log(action);
        let TimerMachine = require("TimerMachine")
        var timerMachine = new TimerMachine();
        timerMachine.init(msg, action);
        timerMachine.onEnter();

        // console.log(temp, action);
        // return temp;
    },

};