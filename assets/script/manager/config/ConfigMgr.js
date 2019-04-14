/*************************************************
Copyright:(c)
Author:mengjl
Date:2019-3-27
Description:配置文件
**************************************************/

module.exports = {
    m_loadNum : 0,

    m_configArray : new Array(),

    init(list)
    {
        this.m_loadNum = 0;

        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            // json
            this.loadConfig(element, 'json');
        }
        
    },

    loadConfig(filename, type)
    {
        this.m_loadNum++;

        var url = 'config/' + filename;
        cc.loader.loadRes(url, (err, object) => {
            if(err){
               console.log("-res.json--->",err)
            }
            else{
                // console.log(object);
                if (type == 'json') {
                    this.m_configArray[filename] = object.json;
                }
                else {
                    this.m_configArray[filename] = object.text;
                }
                
                //console.log(this.configArray[filename]);
            }

            this.m_loadNum--;
            this.checkLoadEnd();
        });
    },

    getLoadNum()
    {
        return this.m_loadNum;
    },

    getConfig(filename)
    {
        return this.m_configArray[filename];
    },

    checkLoadEnd()
    {
        if (this.m_loadNum <= 0) {
        }
    },
};
