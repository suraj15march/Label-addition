const fs = require('fs');

const inputFilePath = 'data.json';
const outputFilePath = 'output.json';

fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    var test_baseURL = "https://"+jsonData.payload.configurations.test.baseURL+"/status";
    // console.log("Ping "+test_baseURL+" from");
    var id = jsonData.id;

    var new_json = {"id":id};

    var abc = jsonData.payload.defaults;
    // abc["id"]=id;
    // abc.unshift("id",id);
    abc.url = test_baseURL;
    abc.description = "Ping "+test_baseURL+" from";

    abc["pops"] = jsonData.payload.configurations.test.pops;

    delete abc["tokens"]
    delete abc["token"]

    Object.assign(new_json,abc);
    console.log(new_json);
    // Here you can process the jsonData or modify it as needed
    // For this example, we'll simply write it to a new file.

    const outputData = JSON.stringify(new_json, null, 2); // Indent with 2 spaces for readability

    fs.writeFile(outputFilePath, outputData, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to output file:', writeErr);
      } else {
        console.log('Output saved to output.json successfully!');
      }
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});