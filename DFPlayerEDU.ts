// 在此处添加您的代码
/**
 * TODO:设置播放模式
 */
enum ePlayMode{
    SINGLECYCLE,
    ALLCYCLE,
    SINGLE,
    RANDOM,
    FOLDER, 
    ERROR
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
 * TODO:快进和后退选择
 */
enum eDirection{
    //% block="forward"
    FORWARD,
    //% block="reverse"
    REVERSE
}
/**
 * TODO:获取各种数据
 */
enum eData{
    //%block="curFileNumber"
    FILENUMBER,
    //%block="Totalfild"
    TOTALFILE, 
    //% block="CurTime"
    CURTIME,
    //% block="TotalTime"
    TOTALTIME
}
/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="\uf025" block="DFPlayer EDU"
namespace DFPlayerEDU{
    let pauseFlag = 0
    /**
     * TODO:音乐模式
     */
    //% weight=91
    //% block="start music mode"
    export function switchFunction():void{
        let str = pack("BAUDRATE","1")
        writeATCommand(str,str.length)
        returnstate()
    }
    /**
     * TODO: 设置声音大小
     * @param vol 声音大小值, eg: 50
     */
    //% weight=90
    //% block="set volume %vol"
    //% vol.min=0 vol.max=30
    export function setVol(vol:number):void{
        let str = pack("VOL",vol.toString())
        writeATCommand(str,str.length)
        returnstate()
    }

    /**
     * TODO: 设置播放模式
     * @param modo SINGLECYCLE,ALLCYCLE,SINGLE
     */
    //% weight=80
    //% block="set play mode %mode"
    export function setPlayMode(mode:ePlayMode):void{
        let str = pack("PLAYMODE",mode.toString())
        writeATCommand(str,str.length)
        returnstate()
    }

    /**
     * TODO:设置开始播放和停止播放
     * @param mode 设置播放还停止 START:开始 PAUSE：停止
     */
    //% weight=70
    //% block="set play state %mode "
    export function setPlayState(mode:ePlayState):void{
        if(mode == 0){
           let str = pack("PLAY","PP")
           if(pauseFlag == 1){
               basic.showIcon(IconNames.No)
               basic.pause(100)
               basic.clearScreen()
           }else{
               pauseFlag = 1
               writeATCommand(str,str.length)
               returnstate()
           }
        }else if(mode = 1){
            let str = pack("PLAY","PP")
           if(pauseFlag == 1){
               basic.showIcon(IconNames.No)
               basic.pause(100)
               basic.clearScreen()
           }else{
               pauseFlag = 0
               writeATCommand(str,str.length)
               returnstate()
           }
        }
    }

    /**
     * TODO:歌曲上一曲下一曲切换
     * @param choice 选择歌曲是上一曲还是下一曲 NEXT:下一曲 LAST:上一曲
     */
    //% weight=60
    //% block="song choice %choice"
    export function songChoice(choice:eSongChoice):void{
        if(choice == 0){
            let str = pack("PLAY","NEXT")
            writeATCommand(str,str.length)
            returnstate()
        }else if(choice = 1){
            let str = pack("PLAY","LAST")
            writeATCommand(str,str.length)
            returnstate()
        }
    }
    /**
     * TODO:播放歌曲快进和后退
     * @param state 歌曲快进后退选择
     * @param second 快进/后退时间（单位：s）
     */
    //% weight=50
    //% block="fast %state second %second"
    export function fastForwardOrReverse(state:eDirection,second:number):void{
        if(state == 0){
            let str = "+" + second.toString()
            let str2 = pack("TIME",str)
            writeATCommand(str2,str2.length)
            returnstate()
        }else if(state = 1){
            let str = "-" + second.toString()
            let str2 = pack("TIME",str)
            writeATCommand(str2,str2.length)
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
        let str = pack("TIME",second.toString())
        writeATCommand(str,str.length)
        returnstate()
   }
    /**
     * TODO:播放指定编号文件，编号根据文件拷贝进U盘先后顺序排列
     * @param num 文件编号
     */
    //% weight=30
    //% block="play file num %num"
    export function playFileNum(num:number):void{
        let str = pack("PLAYNUM",num.toString())
        writeATCommand(str,str.length)
        returnstate()
    }
    /**
     * DOTO:删除当前播放文件
     */
    //% weight=20
    //% block="delet file"
    export function delCurFile():void{
        let str = "DEL"
        writeATCommand(str,str.length)
        returnstate()
    }
    
    /**
     * DOTO:获取文件编号，获取可播放文件个数，获取当前歌曲播放时间，获取当前歌曲播放总时间
     * @param data:获取的数据
     */
    //% weight=10
    //%block="get %data"
    export function getData(data:eData):number{
        if(data == 0){
            let str = pack("QUERY","1")
            writeATCommand(str,str.length)
            let str1 = readAck(6)
            return getINT(str1)
        }
     return 0
    }
    
    /**
     * TODO:获取文件名称
     */
    /*
    //weight=1
    //block="get file name"
    export function getFileName():string{
        let cmd = pack("QUERY","5")
        let str = readAck(0)
        let name = ""
        for(let i = 0;i < str.length();i+=2){
            letdataUnicode = (str[i+1] << 8) | (uint8_t)str[i];
            if(dataUnicode == 0x0a0d) break;
          let len = unicodeToUtf8(dataUnicode,dataUtf8);
        char *cDataUtf8 =(char *)dataUtf8;
      
      for(uint8_t i=0;i < len ;i++){
        name += cDataUtf8[i];
        //Serial.print(cDataUtf8[i],HEX);
     }
   }
        return "a"
    }*/
    
    function pack(cmd:string,para:string):string{
     let atCmd = ""
     atCmd += "AT"
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
        let data = pins.createBuffer(40)
        for(let i = 0; i < length; i++){
            data[i] = command.charCodeAt(i)
        }
        pins.i2cWriteBuffer(0xef, data)
    }
    
    function readAck(len:number = 0):string{
        let str = ""
        if(len == 0){
            let buf = pins.i2cReadBuffer(0xef, 4);
            if(String.fromCharCode(buf[2]) == '\r' && String.fromCharCode(buf[3]) == '\n' ){
                for(let i = 0; i < 4; i++){
                    str += String.fromCharCode(buf[i])
                }
            }
            
        }else{
            let buf = pins.i2cReadBuffer(0xef, len)
            if(String.fromCharCode(buf[len-2]) == '\r' && String.fromCharCode(buf[len-1]) == '\n' ){
                for(let i = 0; i < 4; i++){
                    str += String.fromCharCode(buf[i])
                }
            }
        }
        return str
    }
    function returnstate():void{
        while(readAck() != "OK\r\n"){
            basic.showIcon(IconNames.No)
            basic.pause(100)
        }
        basic.showIcon(IconNames.Yes)
        basic.pause(100)
        basic.clearScreen()
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
}