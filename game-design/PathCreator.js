// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._points = new Array();
        this._wx = 540;
        this._wy = 1920 / 2 + 600;

        this.createPath();

        var ctx = this.node.getComponent(cc.Graphics);

        console.log(this._wx, this._wy)

        for (let index = 0; index < this._points.length; index++) {
            const element = this._points[index];
            if (index == 0) {
                ctx.moveTo(element.x - 540, element.y - 960);
            }
            else
            {
                ctx.lineTo(element.x - 540, element.y - 960);
            }
        }

        ctx.stroke();
    },

    createPath4()
    {
        var wx = 540;
        var wy = 1920 / 2 + 600;
        this._wx = wx;
        this._wy = wy;
    
        var a = 600;
        var b = 250;
    
        var step = 10;
    
        var num = Math.floor(2 * a / step);
    
        var frame = 2.0;

        var dy7 = b;
        var alg = Math.asin(dy7 / b);
        var dx7 = Math.floor(a * Math.cos(alg));
        var frontX = dx7;

        var points = new Array();

        for (var i = 0; i <= num; i++)
        {

            // var _dy = (b - i * step);
            var dx = a - i * step;
            var alg = Math.acos(dx / a);
            var dy = (b * Math.sin(alg));
    
            // if (Math.abs(dx - frontX) > frame * step)
            // {// 补帧
            //     var num2 = Math.ceil(Math.abs(dx - frontX) / (frame * step));
            //     //num2 = 2;
    
            //     var dirY2 = 1.0;
            //     if (dx - frontX < 0)
            //     {
            //         dirY2 = -1.0;
            //     }
    
            //     for (var j = 1; j <= num2 - 1; j++)
            //     {
            //         var dx2 = frontX + dirY2 * j * frame * step;
            //         var alg2 = Math.acos(dx2 / a);
            //         var dy2 = dirY2 * (b * Math.sin(alg2));
    
            //         var angle = 180;
            //         if (dx2 != 0)
            //         {
            //             angle = 180 - (180 / 3.14 * Math.atan(dy2 / dx2));
            //         }
    
            //         points.push({x : Number((dx2 + wx).toFixed(4)), y : Number((dy2 + wy).toFixed(4)), angle : Number(angle.toFixed(3)),})
            //     }
    
            // }
    
            var angle = 180 - (180 / 3.14 * Math.atan2(dy , dx));
    
            frontX = dx;

            angle = -angle / 2 - 45;
            // console.log((180 / 3.14 * Math.atan2(dy , dx)));
    
            this._points.push({x : Number((dx + wx).toFixed(4)), y : Number((-dy + wy).toFixed(4)), angle : Number(angle.toFixed(3)),})
        }

        console.log(JSON.stringify({id : 2014, points : this._points}))
    },

    createPath3()
    {
        var wx = 540;
        var wy = 1920 / 2 + 0;
        this._wx = wx;
        this._wy = wy;
    
        var a = 600;
        var b = 250;
    
        var step = 10;
    
        var num = Math.floor(2 * a / step);
    
        var frame = 2.0;

        var dy7 = b;
        var alg = Math.asin(dy7 / b);
        var dx7 = Math.floor(a * Math.cos(alg));
        var frontX = dx7;

        var points = new Array();

        for (var i = 0; i <= num; i++)
        {

            // var _dy = (b - i * step);
            var dx = -a + i * step;
            var alg = Math.acos(dx / a);
            var dy = (b * Math.sin(alg));
    
            // if (Math.abs(dx - frontX) > frame * step)
            // {// 补帧
            //     var num2 = Math.ceil(Math.abs(dx - frontX) / (frame * step));
            //     //num2 = 2;
    
            //     var dirY2 = 1.0;
            //     if (dx - frontX < 0)
            //     {
            //         dirY2 = -1.0;
            //     }
    
            //     for (var j = 1; j <= num2 - 1; j++)
            //     {
            //         var dx2 = frontX + dirY2 * j * frame * step;
            //         var alg2 = Math.acos(dx2 / a);
            //         var dy2 = dirY2 * (b * Math.sin(alg2));
    
            //         var angle = 180;
            //         if (dx2 != 0)
            //         {
            //             angle = 180 - (180 / 3.14 * Math.atan(dy2 / dx2));
            //         }
    
            //         points.push({x : Number((dx2 + wx).toFixed(4)), y : Number((dy2 + wy).toFixed(4)), angle : Number(angle.toFixed(3)),})
            //     }
    
            // }
    
            var angle = 180 - (180 / 3.14 * Math.atan2(dy , dx));
    
            frontX = dx;

            angle = angle / 2 + 45;
            // console.log((180 / 3.14 * Math.atan2(dy , dx)));
    
            this._points.push({x : Number((dx + wx).toFixed(4)), y : Number((dy + wy).toFixed(4)), angle : Number(angle.toFixed(3)),})
        }

        console.log(JSON.stringify({id : 2013, points : this._points}))
    },

    createPath2()
    {
        var wx = 1080 + 100;
        var wy = 1920 / 2 + 300;
        this._wx = wx;
        this._wy = wy;
    
        var a = 700;
        var b = 450;
    
        var step = 10;
    
        var num = Math.floor(2 * b / step);
    
        var frame = 2.0;

        var dy7 = b;
        var alg = Math.asin(dy7 / b);
        var dx7 = Math.floor(a * Math.cos(alg));
        var frontX = dx7;

        var points = new Array();

        for (var i = 0; i <= num; i++)
        {

            // var _dy = (b - i * step);
            var dy = b - i * step;
            var alg = Math.asin(dy / b);
            var dx = (a * Math.cos(alg));
    
            if (Math.abs(dx - frontX) > frame * step)
            {// 补帧
                var num2 = Math.ceil(Math.abs(dx - frontX) / (frame * step));
                //num2 = 2;
    
                var dirY2 = 1.0;
                if (dx - frontX < 0)
                {
                    dirY2 = -1.0;
                }
    
                for (var j = 1; j <= num2 - 1; j++)
                {
                    var dx2 = frontX + dirY2 * j * frame * step;
                    var alg2 = Math.acos(dx2 / a);
                    var dy2 = dirY2 * (b * Math.sin(alg2));
    
                    var angle = 180 + (180 / 3.14 * Math.atan2(dy2 , dx2));
    
                    this._points.push({x : Number((-dx2 + wx).toFixed(4)), y : Number((dy2 + wy).toFixed(4)), angle : Number(angle.toFixed(3)),})
                }
    
            }
    
            var angle = 180 + (180 / 3.14 * Math.atan2(dy , dx));
    
            frontX = dx;
    
            this._points.push({x : Number((-dx + wx).toFixed(4)), y : Number((dy + wy).toFixed(4)), angle : Number(angle.toFixed(3)),})
        }

        console.log(JSON.stringify({id : 2012, points : this._points}))
    },

    createPath()
    {
        var wx = -100;
        var wy = 1920 / 2 + 300;
        this._wx = wx;
        this._wy = wy;
    
        var a = 700;
        var b = 450;
    
        var step = 10;
    
        var num = Math.floor(2 * b / step);
    
        var frame = 2.0;

        var dy7 = b - i * step;
        var alg = Math.asin(dy7 / b);
        var dx7 = (a * Math.cos(alg));
        var frontX = dx7;

        // console.log('frontX', frontX);

        for (var i = 0; i <= num; i++)
        {

            // var _dy = (b - i * step);
            var dy = b - i * step;
            var alg = Math.asin(dy / b);
            var dx = (a * Math.cos(alg));

            // console.log('dx', dx);
    
            if (Math.abs(dx - frontX) > frame * step)
            {// 补帧
                var num2 = Math.ceil(Math.abs(dx - frontX) / (frame * step));
                //num2 = 2;
                // console.log(dx , frontX, num2);
    
                var dirY2 = 1.0;
                if (dx - frontX < 0)
                {
                    dirY2 = -1.0;
                }
    
                for (var j = 1; j <= num2 - 1; j++)
                {
                    var dx2 = frontX + dirY2 * j * frame * step;
                    var alg2 = Math.acos(dx2 / a);
                    var dy2 = dirY2 * (b * Math.sin(alg2));
    
                    var angle = 180 - (180 / 3.14 * Math.atan2(dy2 , dx2));
    
                    this._points.push({x : Number((dx2 + wx).toFixed(4)), y : Number((dy2 + wy).toFixed(4)), angle : Number(angle.toFixed(3)),})
                }
    
            }
    
            var angle = 180 - (180 / 3.14 * Math.atan2(dy , dx));
    
            frontX = dx;
    
            this._points.push({x : Number((dx + wx).toFixed(4)), y : Number((dy + wy).toFixed(4)), angle : Number(angle.toFixed(3)),})
        }

        console.log(JSON.stringify({id : 2011, points : this._points}))
    },

    // update (dt) {},
});
