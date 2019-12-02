const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
  input: fs.createReadStream('./input'),
  console: false
});

let totalFuel = 0;
readInterface.on('line', function (line) {
  const mass = parseInt(line);
  let fuel = calculateFuel(mass);
  while(1) {
    if(fuel <= 0) {
      break;
    } 
    totalFuel += fuel;
    fuel = calculateFuel(fuel);
  }
});

readInterface.on('close', () => {
  console.log(totalFuel);
});

function calculateFuel(mass) {
  return Math.floor(mass/3) - 2;
}