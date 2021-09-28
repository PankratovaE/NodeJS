// Задача 1 Ответ: 1 5 6 2 3 4


const EventEmitter = require('events')
const emitter = new EventEmitter()
const moment = require('moment')

moment.locale('ru')

class Handler {
    static endTime() {
        console.log("Time is over")
    }
    static wrongArg() {
        console.log("This date has passed");
    }

}

function timer (str) {

    
    let userDate = moment(str, "hh:mm  DD MM YYYY")
 
    let now = moment()

    let diff = Math.floor(userDate.diff(now) / 1000)

    if (diff < 0) {
        emitter.emit('wrongArg')
        return
    }
    setTimeout(() => {
        
        console.clear()
        let ms = (diff - 10800) * 1000 // почему то moment прибавляет 3 лишних часа при переводе времени, пока не разобралась
                                       // с локалями отнимаю тут эти 3 часа
        let date = moment(ms).format("HH:mm:ss")
        
        console.log(date)
    
       
        if (diff === 0) {
            console.clear()
            emitter.emit('endTime')
        } else {
            timer(str)
        }
        
        diff--

    }, 1000)

}

emitter.on('endTime', Handler.endTime)
emitter.on('wrongArg', Handler.wrongArg)

timer(process.argv[2]) // 'HH-mm-DD-MM-YYYY'