describe('format seconds  filter', function () {
  'use strict'; 

  var $filter;

  beforeEach(function () {
    module('app');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('should convert milliseconds to seconds in readable number with sec at the end', function () {
    var millisecs = 1340, result;

    result = $filter('secs')(millisecs);

    expect(result).toEqual('1.34 sec');
  });
});