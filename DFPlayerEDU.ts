// 在此处添加您的代码
/**
 * TODO:设置播放模式
 */
enum ePlayMode{
    SINGLECYCLE,
    ALLCYCLE,
    SINGLE
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

    /**
     * TODO: 设置声音大小
     * @param vol 声音大小值, eg: 50
     */
    //% weight=90
    //% block="set volume %vol"
    //% vol.min=0 vol.max=100
    export function setVol(vol:number):void{

    }

    /**
     * TODO: 设置播放模式
     * @param modo SINGLECYCLE,ALLCYCLE,SINGLE
     */
    //% weight=80
    //% block="set play mode %mode"
    export function setPlayMode(mode:ePlayMode):void{

    }

    /**
     * TODO:设置开始播放和停止播放
     * @param mode 设置播放还停止 START:开始 PAUSE：停止
     */
    //% weight=70
    //% block="set play state %mode "
    export function setPlayState(mode:ePlayState):void{

    }

    /**
     * TODO:歌曲上一曲下一曲切换
     * @param choice 选择歌曲是上一曲还是下一曲 NEXT:下一曲 LAST:上一曲
     */
    //% weight=60
    //% block="song choice %choice"
    export function songChoice(choice:eSongChoice):void{

    }
    /**
     * TODO:播放歌曲快进和后退
     * @param state 歌曲快进后退选择
     * @param second 快进/后退时间（单位：s）
     */
    //% weight=50
    //% block="fast %state second %second"
    export function fastForwardOrReverse(state:eDirection,second:number):void{

    }

    /**
     * TODO:使当前歌曲从固定时间开始播放
     * @param second 固定时间
     */
    //% weight=40
    //% block="set play time %second"
    export function setPlayTime(second:number):void{
        
   }
    /**
     * TODO:播放指定编号文件，编号根据文件拷贝进U盘先后顺序排列
     * @param num 文件编号
     */
    //% weight=30
    //% block="play file num %num"
    export function playFileNum(num:number):void{

    }
    /**
     * DOTO:删除当前播放文件
     */
    //% weight=20
    //% block="delet file"
    export function delCurFile():void{

    }
    
    /**
     * DOTO:获取文件编号，获取可播放文件个数，获取当前歌曲播放时间，获取当前歌曲播放总时间
     * @param data:获取的数据
     */
    //% weight=10
    //%block="get %data"
    export function getData(data:eData):number{
     return 0
    }
    
    /**
     * TODO:获取文件名称
     */
    //weight=1
    //block="get file name"
    export function getFileName():string{
        return "a"
    }


}