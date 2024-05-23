const jq = require('node-jq')
//import * as fs from 'fs';

//const filter = '.fruit.color'
//const filter = ".applicants | .age < 18"
var filter = "${.applicant | .gender == \"male\"}"
var filter = filter.replace('${','');
var filter = filter.replace('}','');
const jsonPath = '/Users/raghuveermb/Desktop/tech/workflow/code/repo/appiflow/data.json'
const options = {}
///const workflow_json = fs.readFileSync('/Users/raghuveermb/Desktop/tech/workflow/code/repo/appiflow/data.json', 'utf8');
workflow_json = "{\"applicant\": {\"age\": 25,\"gender\": \"male\",\"name\": \"John\"}}";
console.log(workflow_json)
jq.run(filter, workflow_json, { input: 'string' })
    .then((output) => {
        console.log(output)
})
.catch((err) => {
  console.error(err)
  // Something went wrong...
})
var filter = "${.applicant | .gender == \"male\"}"
//result = process_rule(filter, workflow_json);
//console.log("res "+ result)

/** 
jq.run(filter, jsonPath, options)
  .then((output) => {
    console.log(output)
})
.catch((err) => {
  console.error(err)
  // Something went wrong...
})*/

function process_rule(filter, data){
    var filter = filter.replace('${','');
    var filter = filter.replace('}','');
    result = null;

    jq.run(filter, data, { input: 'string' })
    .then((output) => {
        result = output;
        console.log("in output of rule2" + result)
        return result;
    })
    .catch((err) => {
        console.error(err)
        // Something went wrong...
      })
    

}


function process_rule2(filter, data){
  var filter = filter.replace('${','');
  var filter = filter.replace('}','');
  console.log("in process_rule "+ filter)
  jq.run(filter, data, { input: 'string' })
  .then((output) => {
      console.log("in process_rule output2 "+ output)
      return output;
  })
  
}
var filter = "${.applicant | .gender == \"male\"}"
var data_json = "{\"applicant\": {\"age\": 25,\"gender\": \"male\",\"name\": \"John\"}}";
//process_rule2(filter, data_json)

var filter ="${ .book.status == \"onloan\" }"
var data_json = "{\"applicant\": {\"age\": 25,\"gender\": \"male\",\"name\": \"John\"}}";
process_rule2(filter, data_json)