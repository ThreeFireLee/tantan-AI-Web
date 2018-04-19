var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var assert = require('assert');
var hbase = require('hbase');
var client = hbase({
  host:'localhost',
  port:8010
});

router.get('/', function(req, res, next) {
     res.send('this is our parser');
});

router.use(express.static(path.join(__dirname, 'public')));

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});



router.post('/upload', function(req, res){

  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '/upload');
  //改名
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });



  form.on('file', function load(file, cb) {
    fs.readFile(file, function(err, data) {
      if (err)
        throw err;
      cb(JSON.parse(data.toString()));
    });
  });

  (function() {
    if (process.argv.length < 2) {
      console.log("usage\n\t" + process.argv[1] + " loadfile");
      return;
    }
    load(process.argv[2], function(obj) {
      console.log("%s\n", obj.person.name);
      console.log("%s\n", obj.person.birth);
    });
  })();

  form.parse(req);
  form.on('end', function() {
    res.end('success');
  });

});



/*
    Input parameters to hbase
 */
router.post("/hbase", function (req,res,next) {
  var param = {
    rowKey:req.body.rowKey,
    hbaseTable:req.body.hbaseTable,
    colFamily:req.body.colFamily
  }
  console.log('success');
  console.log(req.body);
  res.json({
    status:'0',
    msg:'',
    result:{
      rowKey:param.rowKey
    }
  });
  // Put
// var table = client.table('emp');
// table.create('personal info',function(err,success){
//   this
//     .row('3')
//     .put('personal info:name','wang',function(err,success){
//        console.log('insert one column');
//        console.log(success);
//      });
//  });

// Get
//   var myRow = client.table(param.hbaseTable).row(param.rowKey);
//   myRow.exists(param.colFamily,function(err,exists){
//     if(exists){
//       this.get(param.colFamily,function(err,values){
//         console.log('get column family');
//         console.log(values);
//       });
//     }
//   });


});
/*
    Put json to hbase directly
*/
router.post("/hbasePut", function (req,res,next) {

  console.log('success');
  console.log(req.body);
  res.json({
    status:'0',
    msg:'',
    result:{
      rowKey:param.rowKey
    }
  });
});








module.exports = router;


