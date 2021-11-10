
const csv = require('csv-parser')
const fs= require('fs')
const result=[];
let data

// const myPromise = new Promise((resolve,reject)=>{
//     fs.createReadStream('./file_folder/c.csv')
//         .pipe(csv({}))
//         .on('data' ,function (data){  result.push(data)})
//         .on('end', () =>{
//             resolve(result)
//             // console.log(result)
//             console.log('conversion successful')
//         })

// }) 

// myPromise
// .then((result)=> console.log(result))


// console.log(result)

    // setTimeout(()=> console.log(result),5000)

async function getCSVData(filepath) {
    return new Promise((resolve, reject) => {
        // here write your csv parsing
        fs.createReadStream(filepath)
            .pipe(csv({}))
            .on('data' ,function (data){  result.push(data)})
            .on('end', () =>{
                resolve(result)
                // console.log(result)
                console.log('conversion successful')
            })

        // on .on('end') event resolve with parsed data
        });
    }

// async function n(){
//  data = await getCSVData();
 
// }
    
// n()
// console.log(data)
// module.exports = data

module.exports= getCSVData