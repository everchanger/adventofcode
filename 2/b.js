const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
  input: fs.createReadStream('./input'),
  console: false
});

let output = 0;
let input = null;
readInterface.on('line', function (line) {
  input = line.split(',');
});

readInterface.on('close', () => {
  const limit = 100;
  for(let noun = 0; noun < limit; ++noun) {
      for(let verb = 0; verb < limit; ++verb) {
        const result = process(noun, verb);
        // console.log(noun, verb, result)
        if(result == 19690720) {
          console.log('SUCCESS: ', noun, verb);
          exit();
        }
    }
  }

  for(let verb = 0; verb < limit; ++verb) {
    for(let noun = 0; noun < limit; ++noun) {
        const result = process(noun, verb);
        // console.log(noun, verb, result)
        if(result == 19690720) {
          console.log('SUCCESS: ', noun, verb);
          exit();
        }
    }
  }
});

function handleOpCodes(opCode, arg1, arg2) {
  if(opCode == 1) {
    return arg1 + arg2;
  } else if(opCode == 2) {
    return arg1 * arg2;
  }

  return false;
}

function process(noun, verb) {
  const data = input.slice();
  data[1] = noun;
  data[2] = verb;
  for(let i = 0; i < data.length; i+=4) {
    const outputIndex = data[i+3];
    const argIndex1 = data[i+1];
    const argIndex2 = data[i+2];

    const arg1 = parseInt(data[argIndex1]);
    const arg2 = parseInt(data[argIndex2]);
    const result = handleOpCodes(data[i], arg1, arg2);
    if(result === false) {
      break;
    }
    data[outputIndex] = result;
  }

  return data[0];
}