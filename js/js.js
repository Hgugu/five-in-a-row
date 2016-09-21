window.onload=function(){
    var chessBox=document.getElementById("chessBox");
    var chessBoxUl=chessBox.getElementsByTagName("ul")[0];
    var arr=[];//二维数组，对应棋盘落子状态
    function chessBoxOut(rows){//rows表示输出的行数
        var cols=chessBox.clientWidth/40;//每行有几个
        var frag=document.createDocumentFragment();//碎片
        for(var i=0;i<rows;i++){//行；纵坐标
            for(var j=0;j<cols;j++){//列；横坐标
                arr[j]=[];//定义一维数组的元素为数组
                arr[j][i]=false;//false表示没有棋子，true表示已经落子
                if(j==cols-1){//补上第26个点
                    arr[cols]=[];
                    arr[cols][i]=false;
                }
                var li=document.createElement("li");
                frag.appendChild(li);
            }
        }
        chessBoxUl.appendChild(frag);
    }
    chessBoxOut(10);//创建棋盘
    console.log(arr);

    var boolChess="black";//
    chessBox.onclick=function(e){
        var event=window.event||e;//兼容写法；event事件对象
        var bodyChessBoxPosX=chessBox.offsetLeft;//得到节点于父级(body)的距离Left（position相关）
        var bodyChessBoxPosY=chessBox.offsetTop;//得到节点于父级(body)的距离Top（position相关）
        var pageX=event.pageX;//得到鼠标相对于网页的水平坐标
        var pageY=event.pageY;//得到鼠标相对于网页的垂直坐标
        console.log(bodyChessBoxPosX,bodyChessBoxPosY,pageX,pageY);
        var chessBoxWidth=chessBox.clientWidth;//得到棋盘的宽度
        var chessBoxHeight=chessBox.clientHeight;//得到棋盘的高度
        console.log(chessBoxWidth,chessBoxHeight);
        if(pageX<bodyChessBoxPosX||pageY<bodyChessBoxPosY||pageX>bodyChessBoxPosX+chessBoxWidth||pageY>bodyChessBoxPosY+chessBoxHeight){//鼠标点击在棋盘外的位置
            return;//跳出函数
        }
        var chessX=Math.round((pageX-bodyChessBoxPosX)/40);//得到鼠标相对于棋盘的水平位置(坐标)
        var chessY=Math.round((pageY-bodyChessBoxPosY)/40);//得到鼠标相对于棋盘的垂直位置（坐标）
        console.log(chessX,chessY);
        if(arr[chessX][chessY]=="black"||arr[chessX][chessY]=="white"){//不等于false时进入判断
            alert("此位置已落子，请重新下棋!");
            return;///强制跳出函数
        }
        var i=document.createElement("i");//创建盛放棋子的i节点
        var currentNode=document.querySelector(".current");
        if(boolChess=="black"){//判断下黑棋还是下白棋//下黑棋
            i.className="black";
            arr[chessX][chessY]="black";//给数组对应位置赋值black
            currentNode.style.top=80+"px";
            win(chessX,chessY,"black");
            boolChess="white";
        }else{//下白棋
            i.className="white";
            arr[chessX][chessY]="white";//给数组对应位置赋值white
            currentNode.style.top=0+"px";
            win(chessX,chessY,"white");
            boolChess="black";
        }
        i.setAttribute("style","position:absolute;left:"+(chessX*40-15)+"px;top:"+(chessY*40-15)+"px");//设置i节点样式
        chessBox.appendChild(i);//将i存放到chessBox里
    };


    function win(x,y,boolColor){
        var count1=0;
        var count2=0;
        var count3=0;
        var count4=0;
        //连续的水平坐标
        for(var i=x;i>=0;i--){//寻找比当前棋子的x坐标小的相邻坐标//从左
            if(arr[i][y]!=boolColor){//如果找到的坐标不为所要求的颜色值
                break;//跳出循环，所以可找到连续的相同颜色的棋子
            }else{
                count1++;
            }
        }
        for(var i=x+1;i<26;i++){//寻找比当前棋子的x坐标大的相邻坐标//到右
            if(arr[i][y]!=boolColor){//如果找到的坐标不为所要求的颜色值
                break;//跳出循环
            }else{
                count1++;
            }
        }
        //连续的垂直位置
        for(var i=y;i>=0;i--){//寻找比当前棋子的y坐标小的相邻坐标//从上
            if(arr[x][i]!=boolColor){//如果找到的坐标不为所要求的颜色值
                break;//跳出循环
            }else{
                count2++;
            }
        }
        for(var i=y+1;i<11;i++){//寻找比当前棋子的y坐标大的相邻坐标//到下
            if(arr[x][i]!=boolColor){//如果找到的坐标不为所要求的颜色值
                break;//跳出循环
            }else{
                count2++;
            }
        }

        //对角线连续
        for(var i=x ,j=y;i>=0,j>=0;i--,j--){//从左上
                if(arr[i][j]!=boolColor){//如果找到的坐标不为所要求的颜色值
                    break;//跳出循环
                }else{
                    count3++;
                }
        }
        for(var i=x+1 ,j=y+1;i<26,j<11;i++,j++){//到右下
            if(arr[i][j]!=boolColor){//如果找到的坐标不为所要求的颜色值
                break;//跳出循环
            }else{
                count3++;
            }
        }


        for(var i=x ,j=y;i>=0,j<11;i--,j++){//从左下
            if(arr[i][j]!=boolColor){//如果找到的坐标不为所要求的颜色值
                break;//跳出循环
            }else{
                count4++;
            }
        }
        for(var i=x+1 ,j=y-1;i<26,j>=0;i++,j--){//到右上
            if(arr[i][j]!=boolColor){//如果找到的坐标不为所要求的颜色值
                break;//跳出循环
            }else{
                count4++;
            }
        }
        console.log(count1,count2,count3,count4);

        if(count1>=5||count2>=5||count3>=5||count4>=5){
            if(boolColor=="black"){
                alert("黑子WIN!");
            }else if(boolColor=="white"){
                alert("白子WIN!");
            }
        }
    }
};