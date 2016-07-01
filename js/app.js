var default_delimiters = { 
  open: "*(",
  close: ")*" 
}

var template = function(template_text, new_delimiters) {
  template_text = template_text.replace(/[\r\n]/g,"");

  var strLimiter = "'"
  delimiters = new_delimiters || default_delimiters;
  
  var open = 0;
  
  while (template_text.indexOf(delimiters.open) != -1) {
    var open = template_text.indexOf(delimiters.open);
    var close = template_text.indexOf(delimiters.close);
    var varName = template_text.substring(open,close + delimiters.close.length);
    var templateWrapped = template_text.substring(open + delimiters.open.length + 1, close - 1);
    
    template_text = template_text.replace(varName, strLimiter + "+ obj." + templateWrapped + "+" + strLimiter);
    
  }

  var functionCode = "var result = " + strLimiter + template_text + strLimiter + "; for(var i = 0; i < times; i++) { console.log(result) }; return result;";
  
  return new Function("obj","times",functionCode);
}