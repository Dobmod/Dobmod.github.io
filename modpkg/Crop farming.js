//变量
var Hfarmland=0;
var Ufarmland=0;
var capital=15.0;
var grade="乞丐";
//算法
function useItem(x,y,z,itemID,blockID){
  if((itemID==290||itemID==291||itemID==292||itemID==293||itemID==294)&&(blockID==2||blockID==3)){
    if(Hfarmland==Ufarmland){
    preventDefault();
    clientMessage("§4您没有足够的地来耕种！");
  }
    else if(detectWater(x,y,z)!=true){
      preventDefault();
      clientMessage("§4您附近没有水源！");
        }
    else if(Hfarmland>Ufarmland)
    {
        Ufarmland+=1
      }
    }
  if((itemID==269||itemID==273||itemID==256||itemID==284||itemID==277)&&(blockID==60)){
    if(Hfarmland>0){
    setTile(x,y,z,3,0);
    Hfarmland-=1
    Ufarmland-=1
    capital=(capital*10+3.4*10)/10;
    clientMessage("§2耕地已售卖");
      }
    }
  if((itemID>0&&itemID<256)&&blockID==60){
    preventDefault();
    }
  }


{
Block.setDestroyTime(60,18000);
}


function itemtrade(itemID,sl,price){
if(getCarriedItem()==itemID&&Player.getCarriedItemCount()>=sl){
clientMessage("已售卖")
capital=(capital*10+((sl*10*price*10)/100)*10)/10
Entity.setCarriedItem(Player.getEntity(),Player.getCarriedItem(),Player.getCarriedItemCount()-sl);
}
  else
    {
      clientMessage("请手持对应物品进行交易或物品数量不足！");
      }
}

function chatHook(chat) {
    for(num=1;num<65;num++)
      {
        if(chat=="购买耕地"+" "+num)
        {
          if(capital<num*6){
            clientMessage("§4您没有足够的资金来买地！");
            }
          else
            {
              capital=(capital*10-((num*10*6*10)/100)*10)/10
              Hfarmland+=num
              clientMessage("§2已购买！");
              }
          }
        if(chat=="购买小麦种子"+" "+num){
          if(num*2.3>capital){
            clientMessage("§4您没有足够的资金来购买种子!")
            }
          else
            {
              Player.addItemInventory(295,num,0);
              capital=(capital*10-((num*10*2.3*10)/100)*10)/10
              clientMessage("§2已购买！");
              }
          }
        if(chat=="购买胡萝卜种子"+" "+num){
          if(num*3.5>capital){
            clientMessage("§4您没有足够的资金来购买种子!")
            }
          else
            {
              Player.addItemInventory(391,num,0);
              capital=(capital*10-((num*10*3.5*10)/100)*10)/10
              clientMessage("§2已购买！");
              }
          }
        if(chat=="购买马铃薯种子"+" "+num){
          if(num*3.7>capital){
            clientMessage("§4您没有足够的资金来购买种子!")
            }
          else
            {
              Player.addItemInventory(392,num,0);
              capital=(capital*10-((num*10*3.7*10)/100)*10)/10
              clientMessage("§2已购买！");
              }
          }
        if(chat=="购买骨块"+" "+num){
          if(num*5.1>capital){
            clientMessage("§4您没有足够的资金来购买骨块!")
            }
          else
            {
              Player.addItemInventory(216,num,0);
              capital=(capital*10-((num*10*5.1*10)/100)*10)/10
              clientMessage("§2已购买！");
              }
          }
        
        if(chat=="售卖小麦"+" "+num){
          itemtrade(296,num,1.7);
          }
        if(chat=="售卖小麦种子"+" "+num){
          itemtrade(295,num,1.2);
         }
        if(chat=="售卖胡萝卜种子"+" "+num){
          itemtrade(391,num,2.3);
          }
        if(chat=="售卖马铃薯种子"+" "+num){
          itemtrade(392,num,2.5);
          }
    }
  }

/*
function randomEdp(max,min,bl){
  var Fnum=Math.round(Math.random()*(max-min)+min)
    var Snum=Math.round(Math.random())
    Tedp[bl]=Fnum+"."+Snum;
  }
*/

  function modTick(){
    var px=Player.getX();
    var py=Player.getY();
    var pz=Player.getZ();
    if(isNaN(capital)==true){
      capital=15.0
      }
    if(isNaN(Hfarmland)==true){
      Hfarmland=0
      }
    if(isNaN(Ufarmland)==true){
      Ufarmland=0
      }
  if(capital<0){
    grade="卖身奴";
    }
  if(Hfarmland>=0&&Hfarmland<10&&capital>=0&&capital<20){
    grade="乞丐";
    }
  if(Hfarmland>=10&&Hfarmland>20&&capital>=20&&capital>40){
    grade="长工";
    }
  if(Hfarmland>=20&&Hfarmland>50&&capital>=40&&capital>70){
    grade="贫农";
    }
  if(Hfarmland>=50&&Hfarmland>90&&capital>=70&&capital>110){
    grade="中农";
    }
  if(Hfarmland>=90&&Hfarmland>140&&capital>=110&&capital>160){
    grade="富农";
    }
  if(Hfarmland>=140&&Hfarmland>200&&capital>=160&&capital>220){
    grade="地主";
    }
  if(Hfarmland>=200&&Hfarmland>270&&capital>=220&&capital>300){
    grade="富翁";
    }
    if(getTile(px,py-3,pz)==60||getTile(px,py-4,pz)==60){
      setPosition(getPlayerEnt(),px,py-1,pz);
      clientMessage("您不能踩坏耕地！");
      }
    
  ModPE.showTipMessage("资金："+capital+"―"+"耕地："+Ufarmland+"/"+Hfarmland+"―"+"等级:"+grade);
    
}


function readdata(TYPE,NAME,FOLDER){
var result=""
var DATA=""
switch(TYPE){
case 0:
DATA=INPUTFILE("games/com.mojang/minecraftpe/"+FOLDER+"/"+NAME+".data")
result=DATA
break;
case 1:
var wdir=Level.getWorldDir();
DATA=INPUTFILE("games/com.mojang/minecraftWorlds/"+wdir+"/"+FOLDER+"/"+NAME+".data")
result=DATA
break;
}
return result

}
function savedata(TYPE,NAME,FOLDER,DATA){
var result;
switch(TYPE){
case 0:
SAVETOFILE("games/com.mojang/minecraftpe/"+FOLDER+"/"+NAME+".data",DATA)
if(readdata(TYPE,NAME,FOLDER)==DATA){
result = true

}
else{
result = false

}
break;
case 1:
var wdir=Level.getWorldDir();
SAVETOFILE("games/com.mojang/minecraftWorlds/"+wdir+"/"+FOLDER+"/"+NAME+".data",DATA)
if(readdata(TYPE,NAME,FOLDER)==DATA){
result = true

}
else{
result = false
}
break;
}
return result;
}
function INPUTFILE(p){
var sdcard=android.os.Environment.getExternalStorageDirectory();
var result=""
var o=p.split("/")
var l=o.length
var pa=""
for(u=0;u<(l-1);
u++){
pa+=("/"+o[u])
if(!java.io.File(sdcard+pa+"/").exists()){
mkdir(pa+"/")

}
}
pa+="/"+o[l-1]
if(java.io.File(sdcard+pa).exists()){
var path=sdcard+pa
var br=new java.io.BufferedReader(new java.io.FileReader(new java.io.File(path)));
var value=null;
while((value=br.readLine())!=null)result=result+value;
}
else{
result="ERROR:readfail"

}
return result;
}
function mkdir($PATH){
 var sdcard=android.os.Environment.getExternalStorageDirectory();
new java.io.File(sdcard+"/"+$PATH+"/").mkdirs();
}
function SAVETOFILE(path,str){
 var sdcard=android.os.Environment.getExternalStorageDirectory();
var p=path.split("/")
var l=p.length
var pa=""
for(u=0;u<(l-1);
u++){
pa+=("/"+p[u])
if(!java.io.File(sdcard+pa+"/").exists()){
mkdir(pa+"/")

}
}
    var file=new java.io.FileOutputStream(sdcard+"/"+path);
file.write(new java.lang.String(str).getBytes());
file.close()
}
function detectWater(Dx,By,Dz){
  var result=false;
  for(Bx=Dx-4;Bx<=Dx+4;Bx++){
    for(Bz=Dz-4;Bz<=Dz+4;Bz++){
      if(getTile(Bx,By,Bz)==8||getTile(Bx,By,Bz)==9){
        result=true;
        }
      }
      }
  return result;
  }
  
function newLevel(){
  clientMessage("游戏加载中……");
  capital=readdata(1,"Acapital","MOD")*1;
  Hfarmland=readdata(1,"BHfarmland","MOD")*1;
  Ufarmland=readdata(1,"CUfarmland","MOD")*1;
  clientMessage("加载完成！\n种植业Mod build2版――by Dob\no∩_∩o");
  if(Level.getGameMode()==1){
    clientMessage("您需要开启生存模式进行游戏！");
    }
     
}
function leaveGame(){
  capital=savedata(1,"Acapital","MOD",capital);
  Hfarmland=savedata(1,"BHfarmland","MOD",Hfarmland);
  Ufarmland=savedata(1,"CUfarmland","MOD",Ufarmland);
}
