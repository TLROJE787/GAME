var canvas = document.getElementById('canvas');
var body = document.getElementsByTagName('body')[0];
var playerC = player_img_container;
canvas.width = body.offsetWidth;
canvas.height = body.offsetHeight;
var ctx;
var timerC1;//刷新页面的定时器
var ifmouseClick = false;//鼠标是否点击
var MX;var MY;//鼠标的X或者Y坐标
var PX;//玩家的X或者Y坐标
var PY;//玩家的X或者Y坐标
var TX;var TY;//移动状态中的X与Y值
var ABSX = Math.abs( MX - PX );var ABSY = Math.abs( MY - PY );//X与Y的绝对值差
window.onload = () => {
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(197, 180, 180, 1)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // console.log(To_Left);
    // draw_ball();
    timerC1 = self.setInterval(() => {
        // ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(197, 180, 180, .3)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        draw_ball();
        //第一坐标系
        if(ifmouseClick){
            if(MX-TX>0 && MY-TY<0){
                // console.log('1');
                if( ABSX > ABSY ){
                    //ABSX 与 ABSY是 死值
                    //判断终点/移动终点的判断方法就是：
                    //初始MY - PY是否为0,为零就是终点
                    //除此之外还要判断鼠标位于第几坐标系
                    if(Math.abs(MY - TY)){
                        TY--;
                        TX += ABSX/ABSY;
                        draw_attack_ball(TX,TY)
                    }else if(!Math.abs(MY - TY)){
                        ifmouseClick = false;
                    }
                }
                if( ABSX < ABSY ){
                    //反向
                    if(Math.abs(MX - TX)){
                        TX++;
                        TY -= ABSY/ABSX;
                        draw_attack_ball(TX,TY)
                    }else if(!Math.abs(MY - TY)){
                        ifmouseClick = false;
                    }
                }
            }
            //第二坐标系
            if(MX-TX<0 && MY-TY<0){
                // console.log('2');
                
                if( ABSX > ABSY ){
                    if(Math.abs(MY - TY)){
                        TY--;
                        TX -= ABSX/ABSY;
                        draw_attack_ball(TX,TY)
                    }else if(!Math.abs(MY - TY)){
                        ifmouseClick = false;
                    }
                }
                if( ABSX < ABSY ){
                    //反向
                    if(Math.abs(MX - TX)){
                        TX--;
                        TY -= ABSY/ABSX;
                        draw_attack_ball(TX,TY)
                    }else if(!Math.abs(MY - TY)){
                        ifmouseClick = false;
                    }
                }
            }
            //第三坐标系
            if(MX-TX<0 && MY-TY>0){
                // console.log('3');
                if( ABSX > ABSY ){
                    if(Math.abs(MY - TY)){
                        TY++;
                        TX -= ABSX/ABSY;
                        draw_attack_ball(TX,TY)
                    }else if(!Math.abs(MY - TY)){
                        ifmouseClick = false;
                    }
                }
                if( ABSX < ABSY ){
                    //反向
                    if(Math.abs(MX - TX)){
                        TX--;
                        TY += ABSY/ABSX;
                        draw_attack_ball(TX,TY)
                    }else if(!Math.abs(MY - TY)){
                        ifmouseClick = false;
                    }
                }
            }
            //第四坐标系
            if(MX-TX>0 && MY-TY>0){
                // console.log('4');
                if( ABSX > ABSY ){
                    if(Math.abs(MY - TY)){
                        TY++;
                        TX += ABSX/ABSY;
                        draw_attack_ball(TX,TY)
                    }else if(!Math.abs(MY - TY)){
                        ifmouseClick = false;
                    }
                }
                if( ABSX < ABSY ){
                    //反向
                    if(Math.abs(MX - TX)){
                        TX++;
                        TY += ABSY/ABSX;
                        draw_attack_ball(TX,TY)
                    }else if(!Math.abs(MY - TY)){
                        ifmouseClick = false;
                    }
                }
            }
        }
    },1)
}

//鼠标点击攻击
function attack() {
    addEventListener('click',(e) => {
        ifmouseClick = true;
        //鼠标点击的时侯，确定当前玩家X,Y坐标，鼠标X,Y坐标,移动初始X,Y坐标,绝对差
        PX = playerC.offsetLeft + 102;//玩家的X或者Y坐标
        PY = 800 - ( currentTop + 50 ) - 77;//玩家的X或者Y坐标
        MX = e.clientX;
        MY = e.clientY;
        TX = PX;
        TY = PY;
        ABSX = Math.abs( MX - TX );
        ABSY = Math.abs( MY - TY );
    })
};attack();

//绘制判定点
//判定点用于判定自己是否受到攻击
//并且判定点跟随人物实时移动
function draw_ball() {
    ctx.beginPath();
    ctx.arc(playerC.offsetLeft + 102,800 - ( currentTop + 50 ) - 77,50,0*Math.PI,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
};

//绘制攻击法球
function draw_attack_ball(x,y) {
    ctx.beginPath();
    ctx.arc(x,y,50,0*Math.PI,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
};
