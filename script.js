  var headers = [];
  var fileContents = [];

  function createtable(headers, json){    
  var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < headers.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = headers[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < json.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < headers.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = json[i][headers[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  }

   const csvToJson = (csvContent) => {

     var sliced = csvContent
     .trim()
     .split("\r\n")
     .map(line => line.split(','));

     headers = sliced.shift(0,1);
     var result = [];

     for(var i = 0; i < sliced.length; i++){
       var line = {};
       for(var j = 0; j < headers.length; j++){
         line[headers[j]] = sliced[i][j];
       }
       result.push(line);
     }
       return result;
   }

   function handleFileSelect(evt) {
       var files = evt.target.files;

       for(let i = 0; i < files.length;i++) {
      checkFiles(files[i]);

      function checkFiles(file) {
        var reader = new FileReader();

        reader.onload = function(e) {
          var contents = csvToJson(e.target.result); // itt convertalod at jsonre es rakot bele egy valtozoba
          fileContents.push(contents);
           // itt rakod bele az arraybe a contentet json formaba!!!
          if (!--i) {
            console.log("csá");
              // itt teljesul az a feltetel, amikor mar mindket file be van olvasva
              fileContents.forEach((content)=>{
                createtable(headers, content);
                console.log(content);
                console.log(headers);
              });
          }
       };
        reader.readAsText(file);
      }
    }

     }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
