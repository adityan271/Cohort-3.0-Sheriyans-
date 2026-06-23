var math = Number(prompt('Enter maths marks'))
var phy = Number(prompt('Enter phy marks'))
var che = Number(prompt('Enter che marks'))

var avg = ((math + phy + che) / 3)


if (avg >= 85) {
    console.log('pass')
}
else{
    console.log('fail')
}

console.log('your average is', avg)