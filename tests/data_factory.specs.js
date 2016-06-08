describe('Data factory',function () {
    
    var dataFactory,$httpBackend;
    
    var drinksData = [
			{name: 'Alcohol X'},
			{name: 'Alcohol Y'},
			{name: 'Alcohol Z'}
		];
        
    // var query='https://cloudplatform.coveo.com/rest/search?callback=JSON_CALLBACK'+"&access_token="+
	// 					'6318103b-f9da-437c-854b-9e6f1f44e27b';
                        
     beforeEach(module('app'));
    
    beforeEach(inject(function(_dataFactory_,_$httpBackend_,API_BASE_URL){
        dataFactory=_dataFactory_;
        $httpBackend=_$httpBackend_;
        $httpBackend.expectPOST(API_BASE_URL).respond(drinksData);
        
    }));
    
    //  Verify that there are no outstanding expectations or requests after each test
    // afterEach(function () {
    //     $httpBackend.verifyNoOutstandingExpectation();
    //     $httpBackend.verifyNoOutstandingRequest();
    // });
    
    // Add a custom equality tester before each test
    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });
    
    describe('getData',function(){
        
        it('should return empty data when getting data for the first time',function(){
            var result=dataFactory.getData();
            expect(result).toEqual([]);
            
            // $httpBackend.flush();
            
            // expect(result).toEqual(drinksData);
        })
    });
});