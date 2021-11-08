// Time
var dataTime = d3.range(0, 129).map(function(d) {
    return new Date(2021, 2, 14, 15+d);
  });

var dataTimeTicks=d3.range(0, 5).map(function(d) {
    return new Date(2021, 2, 15+d, 0);
  });
  var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 )
    .width(400)
    .ticks(6)
    .tickFormat(d3.timeFormat('%d'))
    .tickValues(dataTimeTicks)
    .default(new Date(2021, 2, 15, 15))
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%d-%H')(val));
    });

  var gTime = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTime.call(sliderTime);

  d3.select('p#value-time').text(d3.timeFormat('%d-%H')(sliderTime.value()));

   