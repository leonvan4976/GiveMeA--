/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * GiveMeAPlusPlus implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * givemeaplusplus.js
 *
 * GiveMeAPlusPlus user interface script
 * 
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter",
    "ebg/stock"
],
function (dojo, declare) {
    return declare("bgagame.givemeaplusplus", ebg.core.gamegui, {
        constructor: function(){
            console.log('givemeaplusplus constructor');
            // Here, you can init the global variables of your user interface
            // Example:
            // this.myGlobalValue = 0;
            this.cardwidth = 72; 
            this.cardheight = 100;

            this.currentSelectedSeat = null;
            this.seatsTaken = [];
            for (var i = 0; i <= 12; i++){
                this.seatsTaken[i] = false;
            }
            this.discardPile = [];          
            this.total_cards_on_board = 0; 
        },
        
        /*
            setup:
            
            This method must set up the game user interface according to current game situation specified
            in parameters.
            
            The method is called each time the game interface is displayed to a player, ie:
            _ when the game starts
            _ when a player refreshes the game page (F5)
            
            "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
        */
        
        setup: function( gamedatas )
        {
            console.log( "Starting game setup" );
            
            // Setting up player boards
            for( var player_id in gamedatas.players )
            {
                var player = gamedatas.players[player_id];
                      
                // TODO: Setting up players boards if needed
                //Setup Discard Pile
                //this.discardPile[player.name] = new ebg.stock();
                //this.discardPile[player.name].create(this, $(player.name), this.cardwidth, this.cardheight);
            }

            //get the number of player and calculate the required cards on board to end round
            var num_of_players = Object.keys(gamedatas.players).length;
            if (num_of_players == 2 || num_of_players == 4){
                this.cards_to_end_round = 8;
            } else if (num_of_players == 3){
                this.cards_to_end_round = 9;
            } 
            // TODO: Set up your game interface here, according to "gamedatas"
            //Player Hand
            this.playerHand = new ebg.stock();
            this.playerHand.create(this, $('myhand'), this.cardwidth, this.cardheight);

            //Discard Piles
            for (var i = 1; i <= num_of_players; i++){
                this.discardPile[i] = new ebg.stock();
                this.discardPile[i].create(this, $('player_' + i), this.cardwidth, this.cardheight);
            }

            
            //Use Dojo event handler to control cards interaction
            dojo.connect( this.playerHand, 'onChangeSelection', this, 'onPlayerHandSelectionChanged' );
            for (let i = 1; i <= 12; i++){
                dojo.connect(dojo.byId('cardsinseat_' + i), 'onclick', this, function(e){
                    this.SelectSeat(i);
                });
                dojo.connect(dojo.byId('cardsinseat_' + i), 'onmouseover', this, function(e){
                    this.MouseOnSeat(i);
                });
                dojo.connect(dojo.byId('cardsinseat_' + i), 'onmouseout', this, function(e){
                    this.MouseOutSeat(i);
                });
                
            }

            //Create card types:
            this.playerHand.image_items_per_row = 10;
            for (var color = 1; color <= 4; color++) {
                for (var value = 1; value <= 10; value++) {
                    // Build card type id (from 0 to 39)
                    var card_type_id = this.getCardUniqueId(color, value) + 1;
                    this.playerHand.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/A++_image_reverse.jpg', card_type_id);
                    if (color <= num_of_players){
                        this.discardPile[color].addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/A++_image_reverse.jpg', card_type_id);
                    }
                }
            }
            
            // Cards in player's hand
            for ( var i in this.gamedatas.hand) {
                var card = this.gamedatas.hand[i];
                var color = card.type;
                var value = card.type_arg;
                this.playerHand.addToStockWithId(this.getCardUniqueId(color, value), card.id);
            }

            // Cards played on table
            for (i in this.gamedatas.cardsontable) {
                var card = this.gamedatas.cardsontable[i];
                var color = card.type;
                var value = card.type_arg;
                var location = card.location_arg;
                var player_id = this.player_id;
                console.log(card);
                console.log('player_id: ' + player_id);
                console.log('color: ' + color);
                console.log('value: ' + value);
                console.log('card_id: ' + card.id);
                console.log('location: ' + card.location);
                console.log('location_arg: ' + location);
                this.playCardOnTable(player_id, color, value, card.id, location);
            }
            
            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
        },
       

        ///////////////////////////////////////////////////
        //// Game & client states
        
        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args )
        {
            console.log( 'Entering state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Show some HTML block at this game state
                dojo.style( 'my_html_block_id', 'display', 'block' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( 'Leaving state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Hide the HTML block we are displaying only during this game state
                dojo.style( 'my_html_block_id', 'display', 'none' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }               
        }, 

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //        
        onUpdateActionButtons: function( stateName, args )
        {
            console.log( 'onUpdateActionButtons: '+stateName );
                      
            if( this.isCurrentPlayerActive() )
            {            
                switch( stateName )
                {
/*               
                 Example:
 
                 case 'myGameState':
                    
                    // Add 3 action buttons in the action status bar:
                    
                    this.addActionButton( 'button_1_id', _('Button 1 label'), 'onMyMethodToCall1' ); 
                    this.addActionButton( 'button_2_id', _('Button 2 label'), 'onMyMethodToCall2' ); 
                    this.addActionButton( 'button_3_id', _('Button 3 label'), 'onMyMethodToCall3' ); 
                    break;
*/
                }
            }
        },        

        ///////////////////////////////////////////////////
        //// Utility methods
        
        /*
        
            Here, you can defines some utility methods that you can use everywhere in your javascript
            script.
        
        */
        //Generates card ID
        getCardUniqueId : function(color, value) {
            return (color - 1) * 10 + (value - 1);
        },
        //Card moves from either (player panel or hand) to the corresponding seat
        playCardOnTable : function(player_id, color, value, card_id, location) {
            //set a flag indicating the seat has been taken
            this.seatsTaken[location] = true;

            this.total_cards_on_board = this.seatsTaken.filter(value => value == true).length;
            // player_id => direction
            console.log('player_id: ' + player_id); 
            console.log('value:' + value);
            console.log('color:' + color);
            console.log('card_id:' + card_id);
            console.log('location:' + location);
            /*
            dojo.place(this.format_block('jstpl_cardontable', {
                x : this.cardwidth * 1.75 *(value - 1),
                y : this.cardheight * 1.75 * (color - 1),
                location : location
            }), 'cardsinseat_' + location);
            */
            
            dojo.place(this.format_block('jstpl_cardback', {
                x : this.cardwidth * 1.75 * (color - 1),
                color : color,
                location : location
            }), 'card_' + location + '_front');

            dojo.place(this.format_block('jstpl_cardontable', {
                x : this.cardwidth * 1.75 *(value - 1),
                y : this.cardheight * 1.75 * (color - 1),
                location : location
            }), 'card_' + location + '_back');
            

            if (player_id != this.player_id) {
                // Some opponent played a card
                // Move card from player panel
                this.placeOnObject('cardback_' + color + '_' + location, 'overall_player_board_' + player_id);
                //this.placeOnObject('cardontable_' + location, 'overall_player_board_' + player_id);
                console.log('move from player panel to table');
            } else {
                // You played a card. If it exists in your hand, move card from there and remove
                // corresponding item

                if ($('myhand_item_' + card_id)) {
                    this.placeOnObject('cardback_' + color + '_' + location, 'myhand_item_' + card_id);
                    //this.placeOnObject('cardontable_' + location, 'myhand_item_' + card_id);
                    this.playerHand.removeFromStockById(card_id);
                    console.log('move from hand to table');
                }
            }

            // In any case: move it to its final destination
            this.slideToObject('cardback_' + color + '_' + location, 'card_' + location + '_front').play();
            //this.slideToObject('cardontable_' + location, 'cardsinseat_' + location).play();

              
        },

        //Event handler of a player click on a card
        onPlayerHandSelectionChanged : function() {
            var items = this.playerHand.getSelectedItems();

            if (items.length > 0) {
                if (this.checkAction('playCard', true)) {
                    //check if seat is selected
                    if (this.currentSelectedSeat == null){
                        this.showMessage(_('You must declare a seat first!'), 'warning');
                        this.playerHand.unselectAll();
                    } else{
                        // Can play a card
                        var card_id = items[0].id;
                        var end_round = false;
                        
                        //console.log("total card on board: " + this.total_cards_on_board);
                        //console.log("cards to end round: " + this.cards_to_end_round);
                        //check if the round ends after this action
                        if (this.total_cards_on_board == this.cards_to_end_round - 1){
                            end_round = true;
                            this.total_cards_on_board = 0;
                        }
                        this.ajaxcall("/" + this.game_name + "/" + this.game_name + "/" + "playCard" + ".html", {
                            id : card_id,
                            location: this.currentSelectedSeat,
                            endRound: end_round,
                            lock : true
                        }, this, function(result) {
                        }, function(is_error) {
                        });
                        
                        //reset this.currentSelectedSeat
                        this.currentSelectedSeat = null;
                        this.changeSeatBorderHelper(0);
                        
                        // type is (color - 1) * 13 + (value - 2)
                        //var type = items[0].type;
                        //var color = Math.floor(type / 10) + 1;
                        //var value = type % 10 + 1;

                        //console.log("player_ID: " + this.player_id);
                        //console.log("color: " + color);
                        //console.log("value: " + value);
                        //console.log("card_id: " + card_id);
                        //console.log("currentSelectedSeat: " + this.currentSelectedSeat);
                        this.playerHand.unselectAll();
                    }
                } 
                else {
                    this.playerHand.unselectAll();
                }
            }
        },
        //Event handler of a player places cursor on a seat
        MouseOnSeat : function(i){
            //alert('mouse on seat 1');
            if (this.checkAction('playCard', true)) {
                if (this.seatsTaken[i] != true && this.currentSelectedSeat != i){
                    dojo.style("cardsinseat_" + i, {
                        "box-sizing": "border-box",
                        "border": "4px solid rgb(255, 215, 0)",
                        "border-radius": "10px"
                    });
                }
            }
        },
        //Event handler of a player places cursor out of a seat
        MouseOutSeat : function(i){
            //alert('mouse on seat 1');
            if (this.checkAction('playCard', true)) {
                if (this.currentSelectedSeat != i){
                    dojo.removeAttr("cardsinseat_" + i, "style");
                }
            }
        },
        //Event handler of a player clicks on a seat
        SelectSeat : function(i){
            if (this.checkAction('playCard', true)) {
                if (this.seatsTaken[i] == false){
                    this.currentSelectedSeat = i;    
                    this.changeSeatBorderHelper(this.currentSelectedSeat);
                } else{
                    //show error message for illegal move
                    this.showMessage(_('Seat #') + i + (' has been taken. Pick somewhere else!'), 'warning');
                }
            }
        },

        //Helper funtions for event handler
        changeSeatBorderHelper : function(seat){
            for (let i = 1; i <= 12; i++){
                if (i == seat){
                    dojo.style("cardsinseat_" + i, {
                        "box-sizing": "border-box",
                        "border": "4px solid rgb(0, 255, 220)",
                        "border-radius": "10px"
                    });
                } else{
                    var obj = {};
                    dojo.removeAttr("cardsinseat_" + i, "style");
                }
            }
        },
        setAllSeatsAvaliableHelper : function(){
            for (var i = 0; i <= 12; i++){
                this.seatsTaken[i] = false;
            }
        },
        

        

        ///////////////////////////////////////////////////
        //// Player's action
        
        /*
        
            Here, you are defining methods to handle player's action (ex: results of mouse click on 
            game objects).
            
            Most of the time, these methods:
            _ check the action is possible at this game state.
            _ make a call to the game server
        
        */
        
        /* Example:
        
        onMyMethodToCall1: function( evt )
        {
            console.log( 'onMyMethodToCall1' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'myAction' ) )
            {   return; }

            this.ajaxcall( "/givemeaplusplus/givemeaplusplus/myAction.html", { 
                                                                    lock: true, 
                                                                    myArgument1: arg1, 
                                                                    myArgument2: arg2,
                                                                    ...
                                                                 }, 
                         this, function( result ) {
                            
                            // What to do after the server call if it succeeded
                            // (most of the time: nothing)
                            
                         }, function( is_error) {

                            // What to do after the server call in anyway (success or failure)
                            // (most of the time: nothing)

                         } );        
        },        
        
        */

        
        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        /*
            setupNotifications:
            
            In this method, you associate each of your game notifications with your local method to handle it.
            
            Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                  your givemeaplusplus.game.php file.
        
        */
        setupNotifications: function()
        {
            console.log( 'notifications subscriptions setup' );
            
            // TODO: here, associate your game notifications with local methods
            
            // Example 1: standard notification handling
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            
            // Example 2: standard notification handling + tell the user interface to wait
            //            during 3 seconds after calling the method in order to let the players
            //            see what is happening in the game.
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            // this.notifqueue.setSynchronous( 'cardPlayed', 3000 );
            // 
            dojo.subscribe('playCard', this, "notif_playCard");
            this.notifqueue.setSynchronous( 'playCard', 1);


            dojo.subscribe('scoring', this, "notif_scoring");
            this.notifqueue.setSynchronous( 'scoring', 10000);

            dojo.subscribe('discard', this, "notif_discard");
            this.notifqueue.setSynchronous( 'discard', 100);
        },  
        
        // TODO: from this point and below, you can write your game notifications handling methods
        notif_playCard : function(notif) {
            // Play a card on the table
            this.playCardOnTable(notif.args.player_id, notif.args.color, notif.args.value, notif.args.card_id, notif.args.location);
        },

        notif_scoring : function(notif) {
            //cards flip animation
            for (let i = 1; i <= 12; i++){
                if(this.seatsTaken[i] == true){
                    dojo.style("Card" + i, {
                        "transform": "rotateY(180deg)"
                    });
                }
            }
            
            this.ajaxcall("/" + this.game_name + "/" + this.game_name + "/" + "gotoDiscard" + ".html", {
                lock : true
            }, this, function(result) {
            }, function(is_error) {
            });
            
        },

        notif_discard : function(notif) {
            
        },
        
        /*
        Example:
        
        
        notif_cardPlayed: function( notif )
        {
            console.log( 'notif_cardPlayed' );
            console.log( notif );
            
            // Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
            
            // TODO: play the card in the user interface.
        },    
        
        */
   });             
});
