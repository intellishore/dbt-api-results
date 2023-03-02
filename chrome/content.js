// This script injects an element at the top of the page.
// It doesn't work yet. To make it work, handle the TODO.

// Create an image
const element = document.createElement("img");
element.src = "https://i.giphy.com/media/Elr7sRhF0iByw/giphy.webp";

// Add it to the top of the document
// document.body.prepend(element);
// TODO: Un-comment the line above.
// loadJSON method to open the JSON file.
function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // console.log(xhr.responseText)
        success(JSON.parse(xhr.responseText));
      }
      else {
        error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}

loadJSON("https://raw.githubusercontent.com/intellishore/dbt-api-results/main/manifest.json", myData,'jsonp');

function myData(data) {
  // console.log("HEJ")
  console.log(data.nodes);
  var obj = data.nodes;
  for (var prop in data.nodes) {
    if (prop.includes("model"))
      console.log("Key:" + prop);
      if (data.nodes[prop].description)
        console.log(data.nodes[prop].description)
  }

function getElementByXPath(xpath) {
  return new XPathEvaluator()
    .createExpression(xpath)
    .evaluate(document, XPathResult.FIRST_ORDERED_NODE_TYPE)
    .singleNodeValue
}

//console.log( getElementById("__layer24") );
//*[@id="__layer24"]/div/div[2]/div[2]
// #reactRoot > div:nth-child(3)

document.getElementById("reactRoot").addEventListener("click", myFunction);

function myFunction() {
  console.log("Hello World!");
  var test = document.querySelector("[data-testid=worksheets-object-explorer-tree]");
  //var test = document.querySelectorAll('body')
  //var test = document.querySelector("body > div:nth-child(2)");
  console.log(test)
}
// console.log(test)


  for (var i = 0; i < data.nodes.length; i++){
  document.write("<br><br>array index: " + i);
  var obj = data.nodes[i];
  for (var key in obj){
    var value = obj[key];
    console.log("<br> - " + key + ": " + value);
    // document.write("<br> - " + key + ": " + value);
  }
}
}

