module.exports = {
  write: (str) => process.stdout.write(str),
  writeLine: (str) => process.stdout.write(`${str}\n`),
  newLine: () => process.stdout.write('\n'),
  line: (pattern, times) => Array.from(Array(times)).fill(pattern).join(''),
  clear: () => process.stdout.write('\x1b[2J\x1b[1;1H')
};
