// 在此处添加您的代码
/**
 * TODO:设置播放模式
 */
enum ePlayMode{
    //% block="single cycle"
    SINGLECYCLE=1,
    //% block="all cycle"
    ALLCYCLE,
    //% block="single"
    SINGLE,
    //% block="random"
    RANDOM,
    //% block="folder"
    FOLDER, 
}
/**
 * TODO:设置播放状态
 */
enum ePlayState{
    //% block="start"
    START,
    //% block="pause"
    PAUSE
}
/**
 * TODO:歌曲选择
 */
enum eSongChoice{
    //% block="next"
    NEXT,
    //% block="last"
    LAST
}
/**
 * TODO:设置工作模式
 */
enum eWorkPattern{
    //% block="music mode"
    MUSIC = 1,  //Music Mode 
    //% block="U fdisk mode"
    UFDISK,     //Slave mode 
  };
/**
 * TODO:快进和后退选择
 */
enum eDirection{
    //% block="forward"
    FORWARD,
    //% block="rewind"
    REWIND
}
/**
 * TODO:获取各种数据
 */
enum eData{
    //%block="current file number"
    FILENUMBER,
    //%block="total file"
    TOTALFILE, 
    //% block="current time"
    CURTIME,
    //% block="total time"
    TOTALTIME
}
/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="\uf025" block="DFPlayer EDU"
namespace DFPlayerEDU{
    let pauseFlag = 0;
    let curFunction = 1 ;
    /**
     * TODO:设置工作模式
     */
    //% weight=93
    //% block="set work pattern %workPattern"
    export function switchFunction(workPattern:eWorkPattern):void{
        let cmd = pack("FUNCTION",workPattern.toString());
        curFunction = workPattern;
        writeATCommand(cmd,cmd.length);
        pauseFlag = 0;
        returnstate();
        basic.pause(2000);
    }
    /**
     * TODO:设置播放模式
     */
    //% weight=92
    //% block="set play mode %playMode"
    export function setPlayMode(playMode:ePlayMode):void{
        //patternDetection();
        let cmd = pack("PLAYMODE",playMode.toString());
        writeATCommand(cmd,cmd.length);
        //basic.pause(200);
         returnstate();
    }
    /**
     * TODO:获取播放模式
     */
    //% weight=91
    //% block="get play mode"
    export function getPlayMode():string{
        let cmd = pack("PLAYMODE","?");
        writeATCommand(cmd,cmd.length);
        //basic.pause(200);
        let strMode = readAck(13);
       return strMode.slice(10);
    }
    /**
     * TODO: 设置声音大小
     * @param vol 声音大小值, eg: 50
     */
    //% weight=90
    //% block="set vol %vol"
    //% vol.min=0 vol.max=30
    export function setVol(vol:number):void{
        let cmd = pack("VOL",vol.toString())
        writeATCommand(cmd,cmd.length)
        //basic.pause(200)
        returnstate()
    }
    /**
     * TODO: 获取音量大小
     * @param vol 声音大小值, eg: 50
     */
     //% weight=89
     //% block="get vol %vol"
    //% vol.min=0 vol.max=30
    export function getVol():string{
        let cmd = pack("VOL","?")
        writeATCommand(cmd,cmd.length)
        //basic.pause(200)
        let str = readAck(12);
        return str.slice(7,9)
    }

    /**
     * TODO:设置开始播放和停止播放
     * @param mode 设置播放还停止 START:开始 PAUSE：停止
     */
    //% weight=70
    //% block="set play state %mode "
    export function setPlayState(mode:ePlayState):void{
        if(mode == 0){
           let cmd = pack("PLAY","PP")
           if(pauseFlag == 1){
               basic.showIcon(IconNames.No)
               //basic.pause(200)
               basic.clearScreen()
           }else{
               pauseFlag = 1;
               writeATCommand(cmd,cmd.length)
               //basic.pause(200)
               returnstate()
           }
        }else if(mode = 1){
            let cmd = pack("PLAY","PP")
           if(pauseFlag == 0){
               basic.showIcon(IconNames.No)
               //basic.pause(200)
               basic.clearScreen()
           }else{
               pauseFlag = 0;
               writeATCommand(cmd,cmd.length)
               //basic.pause(200)
               returnstate()
           }
        }
    }
    /**
     * TODO:获取播放状态
     */
    //% weight=69
    //% block="get play state"
    export function getPlayState():string{
        let cmd = pack("PLAYSTATUS"," ")
        writeATCommand(cmd,cmd.length)
        //basic.pause(200)
        let str = readAck(3);
        return str.slice(0,1)
    }

    /**
     * TODO:歌曲上一曲下一曲切换
     * @param choice 选择歌曲是上一曲还是下一曲 NEXT:下一曲 LAST:上一曲
     */
    //% weight=60
    //% block="switch to %choice"
    export function songChoice(choice:eSongChoice):void{
        if(choice == 0){
            let cmd = pack("PLAY","NEXT")
            writeATCommand(cmd,cmd.length)
            //basic.pause(200)
            returnstate()
        }else if(choice = 1){
            let cmd = pack("PLAY","LAST")
            writeATCommand(cmd,cmd.length)
            //basic.pause(200)
            returnstate()
        }
    }
    /**
     * TODO:播放歌曲快进和后退
     * @param state 歌曲快进后退选择
     * @param second 快进/后退时间（单位：s）
     */
    //% weight=50
    //% block="music fast %state second %second"
    export function fastForwardOrReverse(state:eDirection,second:number):void{
        if(state == 0){
            let str = "+" + second.toString()
            let cmd = pack("TIME",str)
            writeATCommand(cmd,cmd.length)
            //basic.pause(200)
            returnstate()
        }else if(state = 1){
            let str = "-" + second.toString()
            let cmd = pack("TIME",str)
            writeATCommand(cmd,cmd.length)
            //basic.pause(200)
            returnstate()
        }
    }

    /**
     * TODO:使当前歌曲从固定时间开始播放
     * @param second 固定时间
     */
    //% weight=40
    //% block="set play time %second"
    export function setPlayTime(second:number):void{
        //patternDetection();
        let cmd = pack("TIME",second.toString())
        writeATCommand(cmd,cmd.length)
        //basic.pause(200)
        returnstate()
   }
    /**
     * TODO:播放指定编号文件，编号根据文件拷贝进U盘先后顺序排列
     * @param num 文件编号
     */
    //% weight=30
    //% block="play file %num"
    export function playFileNum(num:number):void{
        let cmd = pack("PLAYNUM",num.toString())
        writeATCommand(cmd,cmd.length)
        //basic.pause(200)
        returnstate()
    }
    /**
     * DOTO:删除当前播放文件
     */
    //% weight=20
    //% block="delete file"
    export function delCurFile():void{
        //patternDetection();
        let cmd = "AT+DEL"
        writeATCommand(cmd,cmd.length)
        //basic.pause(200)
        returnstate()
    }
    
    /**
     * DOTO:获取文件编号，获取可播放文件个数，获取当前歌曲播放时间，获取当前歌曲播放总时间
     * @param data:获取的数据
     */
    //% weight=10
    //%block="get %data"
    export function getData(data:eData):number{
        if(data == eData.FILENUMBER){
            let cmd = pack("QUERY","1")
            writeATCommand(cmd,cmd.length)
            //basic.pause(200)
            let str1 = readAck(6)
            return getINT(str1)
        }else if(data == eData.TOTALFILE){
            let cmd = pack("QUERY","2")
            writeATCommand(cmd,cmd.length)
            //basic.pause(200)
            let str1 = readAck(6)
            return getINT(str1)
        }else if(data == eData.CURTIME){
            let cmd = pack("QUERY","3")
            writeATCommand(cmd,cmd.length)
            //basic.pause(200)
            let str1 = readAck(6)
            return getINT(str1)
        }else if(data == eData.TOTALTIME){
            let cmd = pack("QUERY","4")
            writeATCommand(cmd,cmd.length)
            //basic.pause(200)
            let str1 = readAck(6)
            return getINT(str1)
        }
     return 0
    }
    
    /**
     * TODO:获取文件名称
     */
    
    //%weight=1
    //%block="get file name"
    export function getFileName():string{
        let j = 0;
        let cmd = pack("QUERY","5")
        writeATCommand(cmd,cmd.length)
        basic.pause(100)
        let buffer = pins.i2cReadBuffer(0x1f, 40)
        for (let i =0; i < 40;i++){
            if(buffer[i] == 13){
                if(buffer[i+1] == 10){
                    j=j+2;
                        break;
                }
                }
                j++;
        }
        //for (let i = 0;i<j;i++){
            //serial.writeValue("x", buffer[i])
        //}
        let str = ""
        for(let i = 0;i<(j-2);){
            if(buffer[i] != 32){
                str += String.fromCharCode(buffer[i])
            }
            i+=2;
        }
        return str;
    }
    /**
     * TODO:播放指定路径文件
     * @param path 文件路径
     */
    //% weight=9
    //% block="playback path file %path"
    export function playSpecFile(path:string):void{
        //patternDetection();
        let cmd = pack("PLAYFILE",path);
        writeATCommand(cmd,cmd.length);
        //basic.pause(200);
        returnstate();
   }
    
    function pack(cmd:string,para:string):string{
     let atCmd ="AT"
     if(cmd != " "){
         atCmd += "+"
         atCmd += cmd
     }
     if(para != " "){
         atCmd += "="
         atCmd += para 
     }
     atCmd += "\r\n"
     return atCmd
    }
    function writeATCommand(command:string,length:number):void{
        let data = pins.createBuffer(length)
        for(let i = 0; i < length; i++){
            data[i] = command.charCodeAt(i);
        }
        pins.i2cWriteBuffer(0x1f, data)
    }
    
    function readAck(len:number = 0):string{
        let str = ""
        //serial.writeNumber(len)
        basic.pause(100)
        if(len == 0){
            let buf = pins.i2cReadBuffer(0x1f, 4);
            if(buf[2]== 13 && buf[3] ==  10){
                for(let i = 0; i < 4; i++){
                    str += String.fromCharCode(buf[i])
                }
            }
            
        }else{
            let j = 0;
            let buffer = pins.i2cReadBuffer(0x1f, len)
            for(let i = 0; i<len;i++){
                if(buffer[i] == 13){
                    if(buffer[i+1] == 10){
                        j=j+2;
                        break;
                    }
                }
                j++;
            }
            for(let i = 0; i < j; i++){
                //serial.writeNumber(buffer[i])
                str += String.fromCharCode(buffer[i])
            }
        }
        return str
    }
    function returnstate():void{
        let startTime = input.runningTime();
        while(readAck() != "OK\r\n"){
            let endTime = input.runningTime();
            if((endTime - startTime) > 3000)
                break;
        }
       
    }
    function getINT(str:string):number{
        let num = 0,numLen = 0
        for(let i = 0; i < str.length;i++){
            if(str[i] != '\r' && str[i+1] != '\n'){
                numLen++
            } else{ 
                break
        } 
   }
    for(let i = 0; i < numLen;i++){
      
      num = num * 10 + str.charCodeAt(i) - 48
      
    }
    return num;
    }

    function patternDetection():void{
        while(curFunction != eWorkPattern.MUSIC){
            basic.showIcon(IconNames.No)
            basic.pause(100)
            basic.clearScreen()
            basic.pause(100)
        }
    }
}
