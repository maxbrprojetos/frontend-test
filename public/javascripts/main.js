(function app(){
  var req = new XMLHttpRequest();
  req.open("GET", "/fazenda.json", false);
  req.send();

  var response = JSON.parse(req.responseText);
  document.body.innerText = response.box_name;
})();
