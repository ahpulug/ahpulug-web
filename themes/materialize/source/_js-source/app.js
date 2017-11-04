'use strict';

require(['jquery', 'loadCss', 'share-post', 'lightbox-on-articles', 'lightbox'], function ($) {

  $('.button-collapse').sideNav();

  $('.circle-progress').each(function () {

    $(this).circleProgress({
      value: this.dataset.value / 100,
      size: 100,
      startAngle: - Math.PI / 2,
      fill: {
        gradient: ["white", 'white']
      }
    }).on('circle-animation-progress', function(event, progress, stepValue) {
      $(this).find('strong').text( (stepValue * 100 ).toFixed(0) );
    });

  });

});

