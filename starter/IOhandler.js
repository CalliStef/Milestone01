/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: November 5th, 2021
 * Author: Callista Stefanie Taswin
 * 
 */

const unzipper = require('unzipper'),
  fs = require("fs").promises,
  fsC = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');


/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fsC.createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .promise()
    .then( () => {
      console.log("Extraction operation complete");
      resolve();
    })
    .catch((err) => reject(err));
  })
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */

function readDir(dir) {
  return new Promise((resolve, reject) => {        
      let pngFiles = [];
      fs.readdir(dir)
        .then(files => {
          files.forEach(function(file){
            let extension = path.extname(file);
            if(extension == '.png'){
              pngFiles.push(file);
            }
          })
          resolve(pngFiles);
        })
        .catch(err => reject(err))
  });
};


/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise ((resolve, reject) => {
    fsC.createReadStream(pathIn)
    .pipe(
      new PNG ({})
    )
    .on("parsed", function(){
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;
               
          let grayAlgo= (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;

          this.data[idx] = grayAlgo;
          this.data[idx + 1] = grayAlgo;
          this.data[idx + 2] = grayAlgo;
        }
      }
      let num = Math.random();
      this.pack().pipe(fsC.createWriteStream(`${pathOut}/out${num}.png`))
    })
    resolve();
    reject();
  }) 
  
};

module.exports = {
  unzip,
  readDir,
  grayScale
};
