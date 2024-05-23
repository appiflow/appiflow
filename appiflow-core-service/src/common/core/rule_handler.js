const jq = require('node-jq')

export async function process_rule(filter, data){
    var filter = filter.replace('${','');
    var filter = filter.replace('}','');
    console.log("in process_rule "+ filter)
    var result = null
    await jq.run(filter, data, { input: 'string' })
    .then((output) => {
        console.log("within process_rule output "+ output)
        result=  output;
    })
    return result;
    
}

module.exports = {process_rule};

