var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
    mode: 'markers',
    marker: {
      size: [400, 600, 800, 1000],
      sizemode: 'area'
    }
  };
  
  var trace2 = {
    x: [1, 2, 3, 4],
    y: [14, 15, 16, 17],
    text: ['A</br>size: 40</br>sixeref: 0.2', 'B</br>size: 60</br>sixeref: 0.2', 'C</br>size: 80</br>sixeref: 0.2', 'D</br>size: 100</br>sixeref: 0.2'],
    mode: 'markers',
    marker: {
      size: [400, 600, 800, 1000],
      //setting 'sizeref' to lower than 1 decreases the rendered size
      sizeref: 2,
      sizemode: 'area'
    }
  };
  
  var trace3 = {
    x: [1, 2, 3, 4],
    y: [20, 21, 22, 23],
    text: ['A</br>size: 40</br>sixeref: 2', 'B</br>size: 60</br>sixeref: 2', 'C</br>size: 80</br>sixeref: 2', 'D</br>size: 100</br>sixeref: 2'],
    mode: 'markers',
    marker: {
      size: [400, 600, 800, 1000],
      //setting 'sizeref' to less than 1, increases the rendered marker sizes
      sizeref: 0.2,
      sizemode: 'area'
    }
  };
  
  // sizeref using above forumla
  var desired_maximum_marker_size = 40;
  var size = [400, 600, 800, 1000];
  var trace4 = {
    x: [1, 2, 3, 4],
    y: [26, 27, 28, 29],
    text: ['A</br>size: 40</br>sixeref: 1.25', 'B</br>size: 60</br>sixeref: 1.25', 'C</br>size: 80</br>sixeref: 1.25', 'D</br>size: 100</br>sixeref: 1.25'],
    mode: 'markers',
    marker: {
      size: size,
      //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
      sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size**2),
      sizemode: 'area'
    }
  };
  
  var data = [trace1, trace2, trace3, trace4];
  
  var layout = {
    title: 'Peak Power Outage 9 pm 2-15-21',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  Plotly.newPlot('myDiv', data, layout);