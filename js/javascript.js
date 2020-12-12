$(function() {
    var mySpan = $('.number');
    var headWin = $('.win');
    var buttonRestart = $('.button');
    var mainBlock = $('.container');

    function mixNumbers() {
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        for (var i = 0 ; i < mySpan.length ; i++) {
            var randomNumber = numbers[Math.floor( Math.random() * numbers.length)];
            mySpan.eq(i).text(randomNumber);
            mySpan.eq(i).addClass(randomNumber); 
            numbers.splice( numbers.indexOf(randomNumber), 1);
        }
    }

    mixNumbers();

    mainBlock.find('div').on('click',function() {
    	$(this).css('background-color','#40E0D0');
        $(this).find('.number').css('opacity','1');
        var active = $('.active');
        var currentNumber = $(this).find('.number').text();       

        if (!$(this).siblings().hasClass('active') && !$(this).hasClass('disabled')) {
            $(this).addClass('active');                      
        }
        else {
        	if (currentNumber == active.find('span').text()) {
                $(this).addClass('disabled');
                active.addClass('disabled');
                $(this).removeClass('active').siblings().removeClass('active');                
            }     
            else {
                if (!$(this).hasClass('disabled')) {
                    $(this).find('span').animate({opacity:"0"}, 1000, function() { 
                        $(this).parent().css('background-color','#AFEEEE'); 
                    });

                    active.find('span').animate({opacity:"0"}, function() {
        	        $(this).parent().css('background-color','#AFEEEE'); 
                    });

                    active.removeClass('active');                    
                }               
            }
            textWin()
        }
    });  

    function textWin() {    	
        if ( $('.disabled').length == mainBlock.find('div').length) {
            headWin.text("Win!").css('color','green')
            buttonRestart.fadeIn();
        }
    }

    var count = 0;
    buttonRestart.on('click', function() {
        mixNumbers();
        $(this).fadeOut();       
        headWin.text("");       
        mainBlock.find('div').each(function() {
            $(this).find('span').css('opacity','0');
            $(this).css('background-color','#AFEEEE');
            $(this).removeClass('disabled');
            $(this).removeClass('active');
        });
        
        count++;  
        if (count < 2) {
        	localStorage.setItem('you-restarted:', count + ' time');
        }
        else {    	
        	localStorage.setItem('you-restarted:', count + ' times');
        }
        localStorage.getItem('you-restarted:');
    });
});