const colors = require('colors')

colors.setTheme({
    red: ['red'],
    green: ['green'],
    yellow: ['yellow']
  });

function printPrime(a, b) {
    
    if ( isNaN(a) || isNaN(b)) {
        console.log('Аргумент не является числом'.red)
        return
    }
    let primes = []
    
     for (let i = a; i <= b; i++) {
        let isPrime = true
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false
                break
            }
        }
        if (isPrime) {
            primes.push(i)
            }
    }
    if (primes.length === 0) {
        return console.log('Простых чисел в этом диапазоне нет'.red)
    }
        return colorizeNum(primes)
    

}



function colorizeNum(arr) {
    for (let i = 1; i < 4; i++) {
        for (num of arr) {
            switch (i) {
                case 1:
                    console.log(`${num}`.red)
                    i++
                    break
                case 2:
                    console.log(`${num}`.green)
                    i++
                    break
                case 3:
                    console.log(`${num}`.yellow)
                    i = 1
                    break
            }
        }
    }
}

printPrime(Number(process.argv[2]), Number(process.argv[3]))