var XLSX = require("xlsx");

async function xlsTOjson(filepath) {
    return new Promise((resolve, reject) => {
        var workbook = XLSX.readFile(filepath);
        var sheet_name_list = workbook.SheetNames;
        // console.log(sheet_name_list); // getting as Sheet1

        sheet_name_list.forEach((x)=>{
            var worksheet= workbook.Sheets[x]

            // console.log(worksheet)

            // var headers= {}
            var data=[]
            data = XLSX.utils.sheet_to_json(worksheet);
            resolve(data)
            // console.log(data)
        })
    });
}

module.exports= xlsTOjson

