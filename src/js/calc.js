$(document).ready( function() {

    var total = [null, null, null];

	var vars = ['place', 'square', 'room'];

    var square = [
        [
            '23000',
            '46000',
            '69000',
            '92000'
        ],
        [
            '25100',
            '50200',
            '75300',
            '104000'
        ]
    ];
    
    
	$(document).on('change', '#service', function() {
	    
		var thisValue = $(this).val();

		if( !thisValue ) {
		    
			$('#square').attr('disabled', true);
			
		} else {
		    
	        $('#square').attr('disabled', false);
	        
	        for (var i = square[thisValue-1].length; i > 0; i--) {
	            document.getElementById("square").options[i].value = square[thisValue-1][i-1];
	        }
		}
	});
	
    //////////////////////////////
    
	$(document).on('change', '.form-select', function() {
		
		for (var i = 0; i < vars.length; i++) {
		    
		    var e   = document.getElementById(vars[i]);
		    var val = e.options[e.selectedIndex].value;
		    
    		if ( !val ) {
    			total[i] = null;
    		} else {
    		    total[i] = val;
    		}
		}
		
		
		if ( document.getElementById("service").selectedIndex === 0 ) {
		    total[1] = null;
		}
		
		
	    var check = 0;
	    
        for (var i = 0; i < total.length; i++) {
            if ( total[i] !== null ) {
                check = check + parseInt(total[i]);
            } else {
                check = 0;
                break;
            }
        }
        
        
		if ( check !== 0 ) {
			if ( Number.isInteger(parseInt(check)) ) {
			    document.getElementById("result").textContent = check + ' руб.';
			}
		} else {
		    document.getElementById("result").textContent = 'Выберите поля...';
		}
	});
	
});
