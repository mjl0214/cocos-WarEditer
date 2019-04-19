/*
 * @Description: 对话框定义
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-18 16:27:03
 * @LastEditTime: 2019-04-19 09:44:25
 */

var DialogDef = module.exports;

// Unit类型
DialogDef.DialogID = cc.Enum({
    dialog_unknown : 0,             // 未知
    dialog_book : 1,                // 图鉴
    dialog_item : 2,                // 物品
    dialog_tip : 3,                // 提示
});