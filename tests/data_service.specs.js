describe('Data service',function () {
    
   
    var Drink,$httpBackend;
    
    var drinksData = [
			{name: 'Alcohol X'},
			{name: 'Alcohol Y'},
			{name: 'Alcohol Z'}
		];
        
    var query='https://cloudplatform.coveo.com/rest/search?callback=JSON_CALLBACK'+"&access_token="+
						'6318103b-f9da-437c-854b-9e6f1f44e27b';
                        
     beforeEach(module('data'));
    
    beforeEach(inject(function(_Drink_,_$httpBackend_){
        Drink=_Drink_;
        $httpBackend=_$httpBackend_;
        $httpBackend.expectGET(query).respond(drinksData);
        
    }));
    
     // Verify that there are no outstanding expectations or requests after each test
    // afterEach(function () {
    //     $httpBackend.verifyNoOutstandingExpectation();
    //     $httpBackend.verifyNoOutstandingRequest();
    // });
    
    // Add a custom equality tester before each test
    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });
    
    describe('Simple test',function(){
        it('1+1 should be 2',function(){
            expect(2).toBe(2);
        }),
        
        it('should call the Drink.list method',function(){
            var result=Drink.list();
            expect(result).toEqual([]);
            
            $httpBackend.flush();
            
            expect(result).toEqual(drinksData);
        })
    });
});