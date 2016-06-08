describe('Data factory',function () {
    
    var dataFactory,$httpBackend;
    
    var drinksData = [
			{name: 'Alcohol X'},
			{name: 'Alcohol Y'},
			{name: 'Alcohol Z'}
		];
        
        
     beforeEach(module('app'));
    
    beforeEach(inject(function(_dataFactory_,_$httpBackend_,API_BASE_URL){
        dataFactory=_dataFactory_;
        $httpBackend=_$httpBackend_;
        $httpBackend.expectPOST(API_BASE_URL).respond(drinksData);
        
    }));
    
    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });
    
    describe('getData',function(){
        
        it('should return empty data when getting data for the first time',function(){
            var result=dataFactory.getData();
            expect(result).toEqual([]);
            
        })
        
    });
    
    describe('updateData',function(){
        it('should return list of drinks after update',function(){
            var result=dataFactory.getData();
            expect(result).toEqual([]);
            
            dataFactory.updateData();
            $httpBackend.flush(); 
            
            result=dataFactory.getData();
            expect(result).toEqual(drinksData);
        })
    });
});