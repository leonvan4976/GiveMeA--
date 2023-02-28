{OVERALL_GAME_HEADER}

<!-- 
--------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- GiveMeAPlusPlus implementation : © <Your name here> <Your email address here>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------

    givemeaplusplus_givemeaplusplus.tpl
    
    This is the HTML template of your game.
    
    Everything you are writing in this file will be displayed in the HTML page of your game user interface,
    in the "main game zone" of the screen.
    
    You can use in this template:
    _ variables, with the format {MY_VARIABLE_ELEMENT}.
    _ HTML block, with the BEGIN/END format
    
    See your "view" PHP file to check how to set variables and control blocks
    
    Please REMOVE this comment before publishing your game on BGA
-->

<div class="whole_container">
    <div class="mainboard1">
        <div class="mainboard2">
            <div class="game_cover"></div>
            <div class="scoreboard"></div>
        </div>
        <div class="seats">
            <div class="cardinseat cardinseat1" id="cardsinseat_1">
                <div class="theCard" id="Card1">
                    <div class="card_front" id="card_1_front"></div>
                    <div class="card_back" id="card_1_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat2" id="cardsinseat_2">
                <div class="theCard" id="Card2">
                    <div class="card_front" id="card_2_front"></div>
                    <div class="card_back" id="card_2_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat3" id="cardsinseat_3">
                <div class="theCard" id="Card3">
                    <div class="card_front" id="card_3_front"></div>
                    <div class="card_back" id="card_3_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat4" id="cardsinseat_4">
                <div class="theCard" id="Card4">
                    <div class="card_front" id="card_4_front"></div>
                    <div class="card_back" id="card_4_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat5" id="cardsinseat_5">
                <div class="theCard" id="Card5">
                    <div class="card_front" id="card_5_front"></div>
                    <div class="card_back" id="card_5_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat6" id="cardsinseat_6">
                <div class="theCard" id="Card6">
                    <div class="card_front" id="card_6_front"></div>
                    <div class="card_back" id="card_6_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat7" id="cardsinseat_7">
                <div class="theCard" id="Card7">
                    <div class="card_front" id="card_7_front"></div>
                    <div class="card_back" id="card_7_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat8" id="cardsinseat_8">
                <div class="theCard" id="Card8">
                    <div class="card_front" id="card_8_front"></div>
                    <div class="card_back" id="card_8_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat9" id="cardsinseat_9">
                <div class="theCard" id="Card9">
                    <div class="card_front" id="card_9_front"></div>
                    <div class="card_back" id="card_9_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat10" id="cardsinseat_10">
                <div class="theCard" id="Card10">
                    <div class="card_front" id="card_10_front"></div>
                    <div class="card_back" id="card_10_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat11" id="cardsinseat_11">
                <div class="theCard" id="Card11">
                    <div class="card_front" id="card_11_front"></div>
                    <div class="card_back" id="card_11_back"></div>
                </div>
            </div>
            <div class="cardinseat cardinseat12" id="cardsinseat_12">
                <div class="theCard" id="Card12">
                    <div class="card_front" id="card_12_front"></div>
                    <div class="card_back" id="card_12_back"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="hand_piles">
        <!-- BEGIN player -->
            <div class="whiteblock" style="color:#{PLAYER_COLOR}">
                <h3>{PLAYER_NAME}'s Discard Pile {PLAYER_COLORADD}</h3>
                <div id="player_{PLAYER_COLORADD}"></div>
            </div>
        <!-- END player -->

        <div id="MyHand" class="whiteblock">
            <h3>My Hand</h3>   
            <!-- 
            <div class="cards-container">
                <div id="playertablecard" class="tablecard_restroom"></div>
                <div id="playertablecard" class="tablecard_yell"></div>
                <div id="playertablecard" class="tablecard_tryhard1"></div>
                <div id="playertablecard" class="tablecard_tryhard2"></div>
                <div id="playertablecard" class="tablecard_report_frontback"></div>
                <div></div>
                <div id="playertablecard" class="tablecard_report_leftright"></div>
                <div id="playertablecard" class="tablecard_peek_front"></div>
                <div id="playertablecard" class="tablecard_peek_back"></div>
                <div id="playertablecard" class="tablecard_peek_left"></div>
                <div id="playertablecard" class="tablecard_peek_right"></div>
            </div>
            -->
            <div id="myhand"></div>
        </div>
        <div class="popup-image">
            <span>&times</span>
            <div id="pop-id" class="tablecard_restroom"></div>
        </div>
    </div>
        
</div>



<script type="text/javascript">

// Javascript HTML templates

/*
// Example:
var jstpl_some_game_item='<div class="my_game_item" id="my_game_item_${MY_ITEM_ID}"></div>';
*/

document.querySelectorAll('.cards-container #playertablecard').forEach(playertablecard => {
    playertablecard.oncontextmenu = function(event){
        document.querySelector('.popup-image').style.display = 'block';
        document.querySelector('.popup-image div').className = playertablecard.getAttribute("class");
        event.preventDefault();
    }
}); 

document.querySelector('.popup-image span').onclick = () =>{
    document.querySelector('.popup-image').style.display = 'none';
}




var jstpl_cardontable = '<div class="cardontable" id="cardontable_${location}" style="background-position: -${x}px -${y}px">\
                        </div>';
var jstpl_cardback = '<div class="cardback" id="cardback_${color}_${location}" style="background-position: -${x}px -0px">\
                      </div>';


</script>  

{OVERALL_GAME_FOOTER}
