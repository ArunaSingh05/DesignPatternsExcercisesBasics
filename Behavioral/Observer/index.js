var EventEmitter = require('events');
var fs = require('fs');



// function findRegex(files, regex) {
//   var emitter = new EventEmitter();

//   files.forEach(file => {
//     fs.readFile(file, 'utf8', (err, data) => {
//       if (err) {
//         return emitter.emit('error', err);
//       }
//       emitter.emit('fileread', file);
//       const match = data.match(regex);
//       if (match) {
//         match.forEach(elem => emitter.emit('found', file, elem));
//       }
//     })
//   });
//   return emitter;
// }

// findRegex(['fileB.json'], 'hello')
//   .on('fileread', file => console.log(`${file} was read`))
//   .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
//   .on('error', err => console.error(`Error emitted ${err.message}`))


class FindRegex extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }
  addFile(file) {
    this.files.push(file)
    return this
  }
  find() {
    for (const file of this.files) {
      fs.readFile(file, 'utf8', (err, content) => {
        if (err) {
          return this.emit('error', err)
        }
        this.emit('fileread', file)
        const match = content.match(this.regex)
        if (match) {
          match.forEach(elem => this.emit('found', file, elem))
        }
      })
    }
    return this
  }
}


const findRegexInstance = new FindRegex(/hello \w+/)
findRegexInstance
  .addFile('fileB.json')
  .find()
  .on('found', (file, match) => console.log(`Matched "${match}" in file
${file}`))
  .on('error', err => console.error(`Error emitted ${err.message}`))