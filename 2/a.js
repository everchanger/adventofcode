const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
  input: fs.createReadStream('./input'),
  console: false
});

let output = 0;
readInterface.on('line', function (line) {
  const data = line.split(',');
  for(let i = 0; i < data.length; i+=4) {
    const outputIndex = data[i+3];
    const arg1 = parseInt(data[data[i+1]]);
    const arg2 = parseInt(data[data[i+2]]);
    const result = handleOpCodes(data[i], arg1, arg2);
    if(result === false) {
      break;
    }
    data[outputIndex] = result;
  }

  output = data[0];
});

readInterface.on('close', () => {
  console.log(output);
});

function handleOpCodes(opCode, arg1, arg2) {
  if(opCode == 1) {
    return arg1 + arg2;
  } else if(opCode == 2) {
    return arg1 * arg2;
  }

  return false;
}