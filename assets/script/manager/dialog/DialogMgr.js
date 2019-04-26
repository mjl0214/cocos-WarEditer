/*
 * @Description: 对话框管理器
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-15 08:38:25
 * @LastEditTime: 2019-04-26 09:48:14
 */

 /**
 *                                         ,s555SB@@&                          
 *                                      :9H####@@@@@Xi                        
 *                                     1@@@@@@@@@@@@@@8                       
 *                                   ,8@@@@@@@@@B@@@@@@8                      
 *                                  :B@@@@X3hi8Bs;B@@@@@Ah,                   
 *             ,8i                  r@@@B:     1S ,M@@@@@@#8;                 
 *            1AB35.i:               X@@8 .   SGhr ,A@@@@@@@@S                
 *            1@h31MX8                18Hhh3i .i3r ,A@@@@@@@@@5               
 *            ;@&i,58r5                 rGSS:     :B@@@@@@@@@@A               
 *             1#i  . 9i                 hX.  .: .5@@@@@@@@@@@1               
 *              sG1,  ,G53s.              9#Xi;hS5 3B@@@@@@@B1                
 *               .h8h.,A@@@MXSs,           #@H1:    3ssSSX@1                  
 *               s ,@@@@@@@@@@@@Xhi,       r#@@X1s9M8    .GA981               
 *               ,. rS8H#@@@@@@@@@@#HG51;.  .h31i;9@r    .8@@@@BS;i;          
 *                .19AXXXAB@@@@@@@@@@@@@@#MHXG893hrX#XGGXM@@@@@@@@@@MS        
 *                s@@MM@@@hsX#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&,      
 *              :GB@#3G@@Brs ,1GM@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B,     
 *            .hM@@@#@@#MX 51  r;iSGAM@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8     
 *          :3B@@@@@@@@@@@&9@h :Gs   .;sSXH@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:    
 *      s&HA#@@@@@@@@@@@@@@M89A;.8S.       ,r3@@@@@@@@@@@@@@@@@@@@@@@@@@@r    
 *   ,13B@@@@@@@@@@@@@@@@@@@5 5B3 ;.         ;@@@@@@@@@@@@@@@@@@@@@@@@@@@i    
 *  5#@@#&@@@@@@@@@@@@@@@@@@9  .39:          ;@@@@@@@@@@@@@@@@@@@@@@@@@@@;    
 *  9@@@X:MM@@@@@@@@@@@@@@@#;    ;31.         H@@@@@@@@@@@@@@@@@@@@@@@@@@:    
 *   SH#@B9.rM@@@@@@@@@@@@@B       :.         3@@@@@@@@@@@@@@@@@@@@@@@@@@5    
 *     ,:.   9@@@@@@@@@@@#HB5                 .M@@@@@@@@@@@@@@@@@@@@@@@@@B    
 *           ,ssirhSM@&1;i19911i,.             s@@@@@@@@@@@@@@@@@@@@@@@@@@S   
 *              ,,,rHAri1h1rh&@#353Sh:          8@@@@@@@@@@@@@@@@@@@@@@@@@#:  
 *            .A3hH@#5S553&@@#h   i:i9S          #@@@@@@@@@@@@@@@@@@@@@@@@@A.
 *
 *
 *    又看源码，看你妹妹呀！
 */

let DialogDef = require("DialogDef")
let PoolManager = require("PoolManager")

module.exports = {
    
    m_dialogs : new Array(),
    m_maskPool : new cc.NodePool(),
    m_masks : new Array(),
    m_maskIndex : 0,
    m_baseZIndex : 1000,
    m_maxZIndex : 0,        // 当前最大ZIndex
    m_maskPrefab : null,
    m_dialogIndex : 0,

    init()
    {
        // cc.loader.loadRes('prefab/DialogMask', cc.Prefab, (err, prefab) => {
        //     if (err) {
        //         cc.error(err);
        //     }
        //     else
        //     {
        //         // console.log(prefab);
        //         // var maskPrefab = cc.instantiate(prefab);
        //         // this.m_maskPool.put(maskPrefab);
        //         this.m_maskPrefab = prefab;
        //     }
            
        // });
    },

    showDialog(id, params)
    {
        var dialog_name = DialogDef.DialogID[id];
        if (dialog_name == null) {
            console.error('对话框不存在 id =[' + id + ']');
            return;
        }

        var _dialog = this.getDialog(id);
        if (_dialog && _dialog.single == true) {
            this.closeDialog(_dialog);
        }

        // 自动分配ZIndex
        this.m_dialogIndex++;
        var zIndex = this.m_baseZIndex + this.m_dialogIndex;

        var dialogPrefab = PoolManager.getPerfab(dialog_name);
        if (dialogPrefab == null) {
            console.error('预制体未注册 id =[' + dialog_name + ']');
            return;
        }
        dialogPrefab.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
        var dlgComp = dialogPrefab.getComponent('DialogBase');

        // 分配mask
        var maskPrefab = this._addMask();
        maskPrefab.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
        var maskComp = maskPrefab.getComponent('DialogMask');

        var maskId = this.m_maskIndex++;

        maskComp.setMask(dlgComp.getIsMask());
        maskComp.setInput(dlgComp.getIsInput());
        maskComp.setMaskId(maskId);

        dlgComp.setMaskId(maskId);

        this._getParent().addChild(maskPrefab, zIndex);
        this._getParent().addChild(dialogPrefab, zIndex);
        // console.log('zIndex', zIndex);
        
        dlgComp.onEnter(params);

        this.m_dialogs.push(dialogPrefab);

        dlgComp.playOpenAni();

        this._autoMaxZIndex();
    },

    /**
     * @description: 
     * @param dialog(class or number)
     * @return: 
     */
    closeDialog(dialog)
    {
        var _dialog = dialog;
        // console.log(typeof dialog);
        if (typeof dialog == 'number') {
            _dialog = this.getDialog(dialog);
        }

        _dialog.playCloseAni();
    },

    closeAllDialog()
    {
        // console.log(this.m_dialogs);
        for (let index = this.m_dialogs.length - 1; index >= 0; index--) {
            const dialogPrefab = this.m_dialogs[index];
            var dlgComp = dialogPrefab.getComponent('DialogBase');
            this.closeDialog(dlgComp);
        }
    },

    getDialogAmount()
    {
        return this.m_dialogs.length;
    },

    getDialog(id)
    {
        for (let index = this.m_dialogs.length - 1; index >= 0; index--) {
            const dialogPrefab = this.m_dialogs[index];
            var dlgComp = dialogPrefab.getComponent('DialogBase');
            // console.log(dlgComp.dialog_id);
            if (dlgComp.dialog_id == id) {
                return dlgComp;
            }
        }
        return null;
    },

    setDialogZIndex(dialog, zIndex)
    {
        dialog.node.zIndex = zIndex;
        this._autoMaxZIndex();

        var maskPrefab = this._getMask(dialog.getMaskId());
        // console.log(maskPrefab);
        if (maskPrefab) {
            var maskComp = maskPrefab.getComponent('DialogMask');
            maskComp.node.zIndex = zIndex;
            // console.log(maskComp.node.zIndex);
        }
        
        // console.log('dialog.node.zIndex', dialog.node.zIndex)
    },

    _closeDialog(dialog)
    {
        var dialog_name = dialog.getDialogName();
        var maskId = dialog.getMaskId();
        dialog.onLeave();
        PoolManager.recoveryPerfab(dialog_name, dialog.node);

        for (let index = 0; index < this.m_dialogs.length; index++) {
            const element = this.m_dialogs[index];
            if (dialog.node == element) {
                this.m_dialogs.splice(index, 1);
                break;
            }
        }

        this._subMask(maskId);

        this._autoMaxZIndex();

        // console.log(this.m_dialogs.length);
    },

    _autoMaxZIndex()
    {
        this.m_maxZIndex = this.m_baseZIndex;
        for (let index = 0; index < this.m_dialogs.length; index++) {
            const element = this.m_dialogs[index];
            if (element.zIndex > this.m_maxZIndex) {
                this.m_maxZIndex = element.zIndex;
            }
        }

        if (this.m_dialogs.length <= 0) {
            this.m_dialogIndex = 0;
        }

        // console.log('this.m_maxZIndex', this.m_maxZIndex);
    },

    _getParent()
    {
        return cc.director.getScene();
    },

    _addMask()
    {
        let _prefab_ = this.m_maskPool.get();
        if (_prefab_ == null) {
            _prefab_ = cc.instantiate(this.m_maskPrefab);
        }
        this.m_masks.push(_prefab_);
        return _prefab_;
    },

    _subMask(maskId)
    {
        for (let index = 0; index < this.m_masks.length; index++) {
            const mask = this.m_masks[index];
            var maskComp = mask.getComponent('DialogMask');
            if (maskComp.getMaskId() == maskId) {
                this.m_maskPool.put(mask);
                this.m_masks.splice(index, 1);
                break;
            }
        }
    },

    _getMask(maskId)
    {
        for (let index = 0; index < this.m_masks.length; index++) {
            const mask = this.m_masks[index];
            var maskComp = mask.getComponent('DialogMask');
            if (maskComp.getMaskId() == maskId) {
                return mask;
            }
        }
        return null;
    },
};