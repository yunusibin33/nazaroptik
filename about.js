function countTo500k() {
    var counterElement = document.getElementById("counter");
    var count = 0;
    var interval = setInterval(function() {
      counterElement.innerHTML = "+" + count.toLocaleString();
      count += 2500;
      if (count > 500000) {
        clearInterval(interval);
      }
    }, 5);
  }
  
  countTo500k();
  
  
  function countTo100k() {
    var counterElement = document.getElementById("counter2");
    var count = 0;
    var interval = setInterval(function() {
      counterElement.innerHTML = "+" + count.toLocaleString();
      count += 1;
      if (count > 10) {
        clearInterval(interval);
      }
    }, 16);
  }
  
  countTo100();
  
    
  function countTo100() {
    var counterElement = document.getElementById("counter3");
    var count = 0;
    var interval = setInterval(function() {
      counterElement.innerHTML = "+" + count.toLocaleString();
      count += 10000;
      if (count > 1000000) {
        clearInterval(interval);
      }
    }, 16);
  }
  
  countTo100k();
  