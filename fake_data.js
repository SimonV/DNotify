function get_day_summaries(year,month){
  var result = []

  var firstDay = new Date(year, month, 1);
  var lastDay = new Date(year, month + 1, 0);

  var i = 0;

  for (var dt = new Date(firstDay); dt <= lastDay; dt.setDate(dt.getDate() + 1)) {
      var tomorrow = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1);

      result.push({
                    "title": 'free 30',
                    "start": new Date(dt),
                    "end": tomorrow,
                    "id": i
                    });
      i++;
  }

  return result;
}