const Converter = (data) => {
  var first = data[0].close;
  var last = data[data.length -1].close;
  var change = (last - first) / last * 100;

  var obj = [];
  data.forEach((a, i) => {
    /*
    var day = new Date(a.time *1000);
    var hours = day.getHours();
    var minutes = "0" + day.getMinutes();
    var seconds = "0" + day.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    */

    obj.push({
      x : i,
      y : a.close
    });

  });

  console.log('----------------------------------------------------------');
  //console.log(change.toFixed(2));
  var obj2 = [];
  obj2.push(obj);
  return {
    data: obj2,
    change: change
  };
};

export default Converter;




