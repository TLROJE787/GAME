// init
var player_main = document.getElementById('player_main');
var player_img_container = document.getElementsByClassName('player_img_container')[0];
//player动画的div，
//player有4个状态，攻击（鼠标左键），防御（鼠标右键）（未完成），跳跃（space）（未完成），移动（AD）（未完称），
//添加功能：切换装备（滚轮），选择技能（W/S），选择道具（Q/E）,暂停（ESC）
player_main.classList.add('player_img3');
var timer1;//右方向跑的移动定时器
var timer2;//左方向跑的动画定时器
var timer3;//右方向跑的动画定时器
var timer4;//左方向跑的移动定时器
var timer5;//跳跃的移动定时器，重力加速度
var To_Left = true;//是否面向左面
var ifPress = false;//是否按下按键
var ifPressA = false;//是否按下A
var ifPressD = false;//是否按下D
var ifPressS = false;//是否按下Space
var currentLeft;
var currentTop = -50;//按下Space时候的当前高度
var currentTop2;//用于检测是否开启重力加速度的当前高度

//按住鼠标左键进攻
//空中时左键强行打断跳跃动画，改为进攻动画，松手时回归跳跃动画
(function player_defense_fn() {
    addEventListener('mousedown',(e) => {
        console.log('down');
        window.clearInterval(timer2);   //中断其他状态
        window.clearInterval(timer3);   //中断其他状态
        player_main.setAttribute('class','');  //中断其他状态
        if ( (-50 < currentTop2) && ( currentTop2 < 646 ) ) {//在空中时(50~646)保持跳跃动画与重力加速度，向下速度等因素
            // alert('test');
            if(To_Left){
            player_main.classList.add('player_img2');
            player_main.classList.remove('player_img4');
            //img4代表跳跃
            //img2代表进攻
            //img3代表初始状态
        }else{
            player_main.classList.add('player_img2_rev');
            player_main.classList.replace('player_img4_rev','player_img2_rev');
        }
        }
        if ( currentTop2 > 646 ||  currentTop2 == 646){//在地面或在地下时，人物强制回归地面基线（-50px）
            if(To_Left){
                player_main.classList.add('player_img3');
                player_main.classList.replace('player_img3','player_img2');  
            }else{
                player_main.classList.add('player_img3_rev');
                player_main.classList.replace('player_img3_rev','player_img2_rev');
            }
        }
    })
    addEventListener('mouseup',(e) => {
        console.log('up');
        if ( (-50 < currentTop2) && ( currentTop2 < 646 ) ) {//在空中时(50~646)保持跳跃动画与重力加速度，向下速度等因素
            if(To_Left){
            player_main.classList.replace('player_img2','player_img4');//使用进攻动画代替跳跃动画
            //img4代表跳跃
            //img2代表进攻
            //img3代表初始状态
            }else{
                player_main.classList.replace('player_img2_rev','player_img4_rev');//反向
            }
        }
        if ( currentTop2 > 646 ||  currentTop2 == 646){//在地面或在地下时，人物强制回归地面基线（-50px）
            if(To_Left){//在地面的情况
                player_main.classList.replace('player_img2','player_img3');//使用进攻动画代替初始动画
            }else{
                player_main.classList.replace('player_img2_rev','player_img3_rev');//反向
            }
        }
    })
})()

//跳跃检测 使用style.bottom || 800 - offsetTop 检测距地面距离
//按下空格时
function Space_check() {
    var g = 3;//重力加速度
    var vDown = 0;//向下方向的速度
    
    timer5 = self.setInterval(()=>{
        // console.log(currentTop);
        player_img_container.style.bottom = currentTop + 'px';
        //currentTop与当前距离地面距离是双向绑定的，其中一个值改变则另一个也会改
        currentTop2 = player_img_container.offsetTop;
        //currentTop2是距离顶部的高度
        if ( (-50 < currentTop2) && ( currentTop2 < 646 ) ) {//在空中时(50~646)保持跳跃动画与重力加速度，向下速度等因素
            //在空中则降落
            //距离地面高度为800 - 当前top值
            //速度逐渐增加
            //在空中时触发跳跃动画，sprite4
            window.clearInterval(timer2);   
            window.clearInterval(timer3);   
            player_main.setAttribute('class','');   
            if(To_Left){
                player_main.classList.add('player_img4');
            }else{
                player_main.classList.add('player_img4_rev');
            }
            vDown += g;
            currentTop -= vDown;
        }

        if ( currentTop2 > 646 ||  currentTop2 == 646){
            //在地面或在地下时，人物强制回归地面基线（-50px）,
            //此时触发松开Space的效果
            vDown = 0;
            currentTop = -50;
            player_img_container.style.bottom = Number(currentTop) + 'px';

            //以下为松开Space的效果
            if(ifPressA || ifPressD){

            }else{
                ifPressS = false;
                if(To_Left){
                player_main.classList.remove('player_img4');
                player_main.classList.add('player_img3');
                }else{
                    player_main.classList.remove('player_img4_rev');
                    player_main.classList.add('player_img3_rev');
                }
            }//如果跳跃时按住了A或者D而松开了space则保持跳跃状态
            //解除跳跃状态时ifPressS为false
            //松开Space的效果代码结束
        }
    },100)
};Space_check();

//按空格跳跃,按AD移动
//跳跃瞬间距离地面高度为100（使用transition linear bottom平滑跳跃）
//更改currentTop值为100
function player_defense_fn() {
    addEventListener('keypress',(e) => {
        if( (ifPress && e.code == 'Space') && ( ifPressA || ( ifPressD ||ifPressS) ) ) {
            console.log('space_special');
            window.clearInterval(timer2);   
            window.clearInterval(timer3);   
            player_main.setAttribute('class','');   
            if(To_Left){
                player_main.classList.add('player_img4');
            }else{
                player_main.classList.add('player_img4_rev');
            }
            if( currentTop2 == 646 || currentTop2 > 646 ){
                currentTop = 100;
                player_img_container.style.bottom = Number(100) + 'px';
            }
        }
        if(ifPress && ( ifPressA || ( ifPressD ||ifPressS) ) ){
            return;
        }
        //按下AD后会阻止AD重叠触发
        //AD进行中按Space会强行进入跳跃状态
        ifPress = true;
        // console.log('keypress',e);
        if(e.code == 'Space'){
            ifPressS = true;
            if(To_Left){
                player_main.classList.add('player_img4');
            }else{
                player_main.classList.add('player_img4_rev');
            }//当人物在地面上时按空格则触发跳跃动画
            if( currentTop2 == 646 || currentTop2 > 646 ){
                currentTop = 100;
                player_img_container.style.bottom = Number(100) + 'px';
            }
        }
        if(e.code == 'KeyA'){
            ifPressA = true;
            if(!To_Left){
                player_main.setAttribute('style','transform-origin: 102px 102px;transform:rotateY(0deg);');
                To_Left = true;
            }
            let i = 1;
            currentLeft = player_img_container.offsetLeft;
            timer4 = self.setInterval(()=>{
                currentLeft--;
                player_img_container.style.left = Number(currentLeft) + 'px';
            },1)
            timer2 = self.setInterval(()=>{
                player_img_container.style.left = ++player_img_container.offsetLeft + 'px';
                player_main.setAttribute('class','');
                if(i == 4){i = 1;}
                player_main.classList.add(`player_img5_${(i++)}`);
                // player_main.classList.add(`player_img5_${(i++)}`);
            },100)
        }
        if(e.code == 'KeyD'){
            ifPressD = true;
            To_Left = false;
            player_main.setAttribute('style','transform-origin: 102px 102px;transform:rotateY(180deg);');
            player_main.setAttribute('class','');
            let i = 1;
            currentLeft = player_img_container.offsetLeft;
            timer1 = self.setInterval(()=>{
                currentLeft++;
                player_img_container.style.left = Number(currentLeft) + 'px';
            },1)
            timer3 = self.setInterval(()=>{
                // console.log(player_img_container.style.left);
                player_main.setAttribute('class','');
                if(i == 4){i = 1;}
                player_main.classList.add(`player_img5_${(i++)}_rev`);
            },100)
        }
    })
    addEventListener('keyup',(e) => {
        // console.log('keyup',e);
        if(e.code == 'Space'){
            if(ifPressA || ifPressD){

            }else{
                ifPressS = false;
                if(To_Left){
                player_main.classList.remove('player_img4');
                }else{
                    player_main.classList.remove('player_img4_rev');
                }
            }//如果跳跃时按住了A或者D而松开了space则保持跳跃状态
            //解除跳跃状态时ifPressS为false
        }
        if(e.code == 'KeyA'){
            ifPressA =false;
            window.clearInterval(timer2);    
            window.clearInterval(timer4);    
            player_main.setAttribute('class','');    
            player_main.classList.add('player_img3');    
        }
        if(e.code == 'KeyD'){
            ifPressD =false;
            window.clearInterval(timer3);   
            window.clearInterval(timer1);   
            player_main.setAttribute('class','');    
            player_main.classList.add('player_img3_rev');    
        }
    })
};player_defense_fn();

var player ={
    hp:100,
    lever:1
}//玩家属性