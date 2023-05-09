const printStar = (n) => {
  var pattern = "";
  for (var i = 0; i < n; i++) {
    for (var j = i; j < n; j++) {
      pattern += "*";
    }
    console.log(pattern, "pattern");
    pattern += "\n";
  }
  // console.log(pattern);
};
printStar(5);
