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
    const firstSheet = excelfile.Sheets['최종 업데이트 파일_20231130'];
    const jsonData = xlsx.utils.sheet_to_json(firstSheet);

    for(var i=0; i<jsonData.length; i++){

        var row = jsonData[i];

        if(min_lat<=row.위도 && row.위도 <= max_lat){

            if(min_long<=row.경도 && row.경도 <= max_long){
                var region_data = row.시 + row.구명 + row.지역명;

               const midterm_excel = xlsx.readFile("C:\\Users\\jihoon\\Downloads\\direct\\midterm_regionid.xlsx");
                const regionid_sheet = midterm_excel.Sheets['regionid'];
                const regionid_sheet_json = xlsx.utils.sheet_to_json(regionid_sheet);

                for(var j=0; j<regionid_sheet_json.length; j++){
                    var region_id_row = regionid_sheet_json[j];
                    if(region_data.includes(region_id_row.region_name)){
                        var region_id = region_id_row.id;
                    }
                }

                console.log(region_data)
                var region_data2;
                if(region_data.includes('서울')){
                    region_data2 = '11B00000'
                }else if(region_data.includes('경기')){
                    region_data2 = '11B00000'
                }else if(region_data.includes('인천')){
                    region_data2 = '11B00000'
                }else if(region_data.includes('강원')){
                    if(region_data.includes('강릉')){
                        region_data2 = '11D20000'
                    }else if(region_data.includes('삼척')){
                        region_data2 = '11D20000'
                    }else if(region_data.includes('동해')){
                        region_data2 = '11D20000'
                    }else if(region_data.includes('태백')){
                        region_data2 = '11D20000'
                    }else if(region_data.includes('속초')){
                        region_data2 = '11D20000'
                    }else if(region_data.includes('양양')){
                        region_data2 = '11D20000'
                    }else if(region_data.includes('고성')){
                        region_data2 = '11D20000'
                    }else{
                        region_data2 = '11D10000'
                    }
                }else if(region_data.includes('대전')){
                    region_data2 = '11C20000'
                }else if(region_data.includes('세종')){
                    region_data2 = '11C20000'
                }else if(region_data.includes('충청남도')){
                    region_data2 = '11C20000'
                }else if(region_data.includes('충청북도')){
                    region_data2 = '11C10000'
                }else if(region_data.includes('광주광역시')){
                    region_data2 = '11F20000'
                }else if(region_data.includes('전라남도')){
                    region_data2 = '11F20000'
                }else if(region_data.includes('전라북도')){
                    region_data2 = '11F10000'
                }else if(region_data.includes('대구광역시')){
                    region_data2 = '11H10000'
                }else if(region_data.includes('경상북도')){
                    region_data2 = '11H10000'
                }else if(region_data.includes('부산')){
                    region_data2 = '11H20000'
                }else if(region_data.includes('울산')){
                    region_data2 = '11H20000'
                }else if(region_data.includes('경상남도')){
                    region_data2 = '11H20000'
                }else if(region_data.includes('제주')){
                    region_data2 = '11G00000'
                }

                // if(region_data.some('서울','경기','인천')){
                //     console.log('서울 경기 인천')
                // }
                
                // if(['서울', '경기', '인천'].indexOf(region_data) > -1){
                //     midterm_landforecast_regionid='11B00000';
                //     console.log('서울 경기 인천 포함')
                // }else if(region_data.includes('강원')){
                //     if(['강릉','삼척','동해','태백','속초','양양','고성']){
                //         midterm_landforecast_regionid = '11D20000';
                //     }else{
                //         midterm_landforecast_regionid = '11D10000';
                //     }
                // }else if(['대전','세종','충청남도'].indexOf(region_data) >-1){
                //     midterm_landforecast_regionid = '11C20000';
                // }else if(region_data.includes('충청북도')){
                //     midterm_landforecast_regionid = '11C10000';
                // }else if(['전라남도','광주광역시'].indexOf(region_data) >-1){
                //     midterm_landforecast_regionid = '11F20000';
                // }else if(region_data.includes('전라북도')){
                //     midterm_landforecast_regionid = '11F10000';
                // }else if(['경상북도','대구광역시'].indexOf(region_data) >-1){
                //     midterm_landforecast_regionid = '11H10000';
                // }else if(region_data.includes('제주')){
                //     midterm_landforecast_regionid = '11G00000';
                // }

                const send_data = {
                    nx:row.nx,
                    ny:row.ny,
                    시:row.시,
                    구:row.구명,
                    지역명:row.지역명,
                    'region_id':region_id,
                    'region_data2':region_data2,
                }
                res.send(send_data);
            }

            }
        }




} )


module.exports = router;
