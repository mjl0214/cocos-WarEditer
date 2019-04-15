/*
 * @Description: actor状态
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-15 10:53:13
 * @LastEditTime: 2019-04-15 11:00:05
 */

var StateDef = module.exports;

StateDef.StateType = cc.Enum({
    idle : 0,                   // 空闲
    attacking : 1,              // 物理攻击
    moving : 2,                 // 移动中
    hurted : 3,                 // 受伤
    casting : 4,                // 施法中
});