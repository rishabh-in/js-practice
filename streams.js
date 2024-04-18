const fs = require("fs")
const {Duplex} = require("stream")

const readStream = fs.createReadStream("./test.txt", {encoding: 'utf8'});

readStream.on("data", (chunk) => {
  console.log(chunk);
});

readStream.on("end", () => {
  console.log("stream ended")
});

const writeStream = fs.createWriteStream("output.txt");

readStream.pipe(writeStream);

// const duplexStream = new Duplex({})