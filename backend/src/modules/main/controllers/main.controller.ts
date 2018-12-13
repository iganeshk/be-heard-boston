import * as express from 'express';
// import * as path from 'path';
import * as XLSX from 'xlsx';
import { ErrorHandler } from '../conf/error-handler';
import { CONFIGURATIONS } from '../conf/configurations';
import * as moment from 'moment';
import * as http from "http";
import * as https from "https";
export class MainController {

    // private file = '../../../../files/test-file.csv';
    constructor() { }

    loadFile(req: express.Request, res: express.Response, next: express.NextFunction) {

        let file = '/../../../../files/' + CONFIGURATIONS.localFileName;

        try {

            let workbook = XLSX.readFile(__dirname + file);
            let wsname: string = workbook.SheetNames[0];
            let worksheet: XLSX.WorkSheet = workbook.Sheets[wsname];

            let tempData = XLSX.utils.sheet_to_json(worksheet, { header: 2, blankrows: true, defval: '' });

            res.json(tempData);

        } catch (error) {
            ErrorHandler.send(error, res, next)
        }

    }

    checkCode(req: express.Request, res:express.Response, next: express.NextFunction) {
        let file = '/../../../../files/' + CONFIGURATIONS.localFileName;
        let found = false;
        try {
            let workbook = XLSX.readFile(__dirname + file, { raw: false });
            let wsname = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[wsname];
            let tempData = XLSX.utils.sheet_to_json(worksheet, { header: 2, blankrows: true, defval: '' });
            tempData.forEach((row: any) => {
                if (row.code == req.body.code.toUpperCase()) {
                    found = row;
                }
            });
            res.json({data: found})

        } catch (error) {
            ErrorHandler.send(error, res, next)
        }

    }

    claimPrize(req: express.Request, res:express.Response, next: express.NextFunction) {
        let file = '/../../../../files/' + CONFIGURATIONS.localFileName;
        let found: any = false;
        let order: number;
        try {
            let workbook = XLSX.readFile(__dirname + file, { raw: true });
            let wsname = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[wsname];
            let tempData = XLSX.utils.sheet_to_json(worksheet, { header: 2, blankrows: true, defval: '' });
            tempData.forEach((row: any, key:number) => {
                if (row.code == req.body.code) {
                    found = row;
                    order = key + 2;
                }
            });
            if (found !== false) {
                found.last_attempt = moment().format('YYYY-MM-DD hh:mm');
                if (found.redeemed == 0 || found.redeemed == '') {
                    found.redeemedDate = moment().format('YYYY-MM-DD hh:mm');
                    found.redeemed = 1;
                    found.visits_count = 0;
                }
                found.visits_count = parseInt(found.visits_count) + 1;      

                if (found.claim_url != '') {

                    worksheet['E' + order] = { t: 's', w: found.last_attempt, v: found.last_attempt };
                    worksheet['F' + order] = { t: 's', w: found.visits_count, v: found.visits_count };
                    let workbook = { SheetNames: ["Sheet1"], Sheets: { Sheet1: worksheet } };
                    XLSX.writeFile(workbook, __dirname + file);

                    res.json({data : found})            

                } else {
                    var jsonData = {"campaign_key":""+CONFIGURATIONS.service.campaign_key,"gift_claims":[{"id":""+found.code,"email_recipient":false,"custom_field":[{"surveyURL":""+found.surveyURL}]}]};
                var options = {
                    hostname: CONFIGURATIONS.service.host,
                    port: CONFIGURATIONS.service.port,
                    path: CONFIGURATIONS.service.path,
                    method: 'POST',                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': CONFIGURATIONS.service.auth,
                        'Cache-Control': 'no-cache'
                    },
                };
                try {
                    var request = null;

                    request = https.request(options, function (result) {
                        console.log(JSON.stringify(jsonData));
                        console.log('STATUS: ' + result.statusCode);
                        console.log('HEADERS: ' + JSON.stringify(result.headers));                        
                        result.setEncoding('utf8');
                        var responseBody = '';                        
                        result.on('data',  (chunk) => {
                            responseBody += chunk;
                        });
                        result.on('end',  () => {
                            var response = JSON.parse(responseBody);                      
                            if (response.success == true) {
                                found.claim_url = response.result[0].claim_url
                            }
                            worksheet['A' + order] = { t: 's', w: found.code, v: found.code };
                            worksheet['B' + order] = { t: 's', w: found.email, v: found.email };
                            worksheet['C' + order] = { t: 's', w: found.surveyURL, v: found.surveyURL };
                            worksheet['D' + order] = { t: 's', w: found.redeemedDate, v: found.redeemedDate };
                            worksheet['E' + order] = { t: 's', w: found.last_attempt, v: found.last_attempt };
                            worksheet['F' + order] = { t: 's', w: found.visits_count, v: found.visits_count };
                            worksheet['G' + order] = { t: 's', w: found.claim_url, v: found.claim_url };
                            worksheet['H' + order] = { t: 's', w: found.redeemed, v: found.redeemed };

                            // console.log(worksheet);

                            let workbook = { SheetNames: ["Sheet1"], Sheets: { Sheet1: worksheet } };
                            XLSX.writeFile(workbook, __dirname + file);

                            res.json({data : found})
                        });
                        result.on('error',  (err) => {
                            ErrorHandler.send(err, res, next)
                        })
                    });

                    request.on('error',  (err) => {
                        ErrorHandler.send(err, res, next)
                    });

                    request.write(JSON.stringify(jsonData));
                    request.end();
                } catch (e) {
                    ErrorHandler.sendServerError(e, res, next);
                }
                }
                

            } else {
                res.json({data: false})
            }

        } catch (error) {
            ErrorHandler.send(error, res, next)
        }
    }

    updateFile(req: express.Request, res: express.Response, next: express.NextFunction) {

        let file = '/../../../../files/' + CONFIGURATIONS.localFileName;
        let data = req.body;

        let found = false;
        try {
            let workbook = XLSX.readFile(__dirname + file, { raw: false });
            let wsname = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[wsname];
            let tempData = XLSX.utils.sheet_to_json(worksheet, { header: 2, blankrows: true, defval: '' });
            tempData.forEach((row: any, key: any) => {
                console.log(key);
                if (row.code == data.code) {
                    found = row;
                }
            });
            if (found) {

            }

        } catch (error) {
            ErrorHandler.send(error, res, next)
        }

    }

}
