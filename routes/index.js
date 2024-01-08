var express = require('express');
var router = express.Router();
var read_excel = require('read-excel-file/node');
var xlsx = require('xlsx');
const {json} = require("express");

// read_excel("C:\\Users\\jihoon\\Downloads\\direct\\2.xlsx").then((rows) => {
//
//   for (var i=0; i<rows.length; i++){
//       let code = rows[i][1];
//       let address_1 = rows[i][2];
//       let address_2 = rows[i][3];
//       let address_3 = rows[i][4];
//       let x = rows[i][5];
//       let y= rows[i][6];
//       let latitude = rows[i][14];
//       let longitude = rows[i][13];
//
//   }
//
// })




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '날씨' });
});




router.post('/check_region', (req, res) => {

    const data = req.body;
    const latitude = data.lat;

    const min_lat = latitude-0.01;
    const max_lat = latitude+0.01;

    const longitude = data.long;
    const min_long = longitude-0.01;
    const max_long = longitude+0.01;

    console.log(latitude, longitude);

    const excelfile = xlsx.readFile("C:\\Users\\jihoon\\Downloads\\direct\\2.xlsx");
    // const firstsheetname = excelfile.SheetNames[0];
    const firstSheet = excelfile.Sheets['최종 업데이트 파일_20231130'];
    const jsonData = xlsx.utils.sheet_to_json(firstSheet);
    for(var i=0; i<jsonData.length; i++){

        var row = jsonData[i];

        if(min_lat<=row.위도 && row.위도 <= max_lat){
            // console.log(parseFloat(jsonData[i].위도))
            if(min_long<=row.경도 && row.경도 <= max_long){
                console.log(row.nx, row.ny);
                console.log(row.시, row.구명, row.지역명);
                var region_data = row.시 + row.구명 + row.지역명;

                const midterm_excel = xlsx.readFile("C:\\Users\\jihoon\\Downloads\\direct\\midterm_regionid.xlsx");
                const regionid_sheet = midterm_excel.Sheets['regionid'];
                const regionid_sheet_json = xlsx.utils.sheet_to_json(regionid_sheet);

                for(var j=0; j<regionid_sheet_json.length; j++){
                    var region_id_row = regionid_sheet_json[j];
                    if(region_data.includes(region_id_row.region_name)){
                        console.log(region_id_row)
                        console.log(region_id_row.region_name)
                        console.log(region_id_row.id)
                        var region_id = region_id_row.id;
                    }
                }

                const send_data = {
                    nx:row.nx,
                    ny:row.ny,
                    시:row.시,
                    구:row.구명,
                    지역명:row.지역명,
                    'region_id':region_id,
                }
                res.send(send_data);
            }
        }
    }

} )


module.exports = router;
