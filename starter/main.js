/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description: 
 * 
 * Created Date: 
 * Author: Stefanie
 * 
 */
const path = require('path');

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;


IOhandler.unzip(zipFilePath, pathUnzipped)
  .then(() => IOhandler.readDir(pathUnzipped))
  .then(pngFiles => {
    pngFiles.forEach(file => {
      let directory = `${__dirname}/unzipped/${file}`;
      IOhandler.grayScale(directory, pathProcessed);
    })
  })
  .then("done")





// 1.) In iohandler.js, create readstream that will 
//     unzip the zip fiile using unzipper.

// 1.5.) Show an alert saying "Extraction operation complete" and use the parse.promise() to trigger the finish event

// 2.) Create a function in IOhandler.js that reads the directroy (fs.mkdir) - createReadStream and
//     pipe it to filter out all the hidden files by only reading the png extensions before
//     creating directory

// 3.) Read in the result of the promise array and have it pass to the
//     grayScale function (pathin)

// 4.) in the function create readstream("in.png") that loops through
//     each pixel in the original picture and go through the grayscale algorithm 
//     to get the grayscale number - store in a new array(?) (create new array IN the loop)

// 5.) compare the new array to the pngjs array and return the grayscale RGB values.

// 6.) have the checked array and write it back to the unzipped file through pathOut.

// 7.) end loop.


