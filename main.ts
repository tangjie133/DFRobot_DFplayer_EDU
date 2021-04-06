input.onButtonPressed(Button.A, function () {
    DFPlayerEDU.setPlayState(ePlayState.PAUSE)
})
DFPlayerEDU.switchFunction()
DFPlayerEDU.setVol(50)
DFPlayerEDU.setPlayMode(ePlayMode.ALLCYCLE)
DFPlayerEDU.setPlayState(ePlayState.START)
basic.forever(function () {
	
})
