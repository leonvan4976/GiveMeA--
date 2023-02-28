<?php
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * GiveMeAPlusPlus implementation : © <Your name here> <Your email address here>
 * 
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * material.inc.php
 *
 * GiveMeAPlusPlus game material description
 *
 * Here, you can describe the material of your game with PHP variables.
 *   
 * This file is loaded in your game logic class constructor, ie these variables
 * are available everywhere in your game logic code.
 *
 */


/*

Example:

$this->card_types = array(
    1 => array( "card_name" => ...,
                ...
              )
);

*/

$this->colors = array(
  1, 
  2, 
  3, 
  4
);

$this->labels = array(
  1 => "Hall Pass",
  2 => "Troublemaker",
  3 => "The A student",
  4 => "The A student",
  5 => "Snitch (up-down)",
  6 => "Snitch (left-right)",
  7 => "Sneak a peek (up)",
  8 => "Sneak a peek (down)",
  9 => "Sneak a peek (left)",
  10 => "Sneak a peek (right)"
);



