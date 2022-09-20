// used to restore selected options from local storage: first is the name of the variable
// in chrome local storage, second the html id of the checkbox
const puzzle_array = ['block_puzzle_streak', 'block_streak', 'block_puzzle_storm', 'block_storm', 'block_puzzle_racer', 'block_racer']

/* 
* This function saves the options to local storage.
*/ 

function save_options() {

    // check which box is checked and set value in storage
    var block_blitz;

    if(document.getElementById('block_blitz').checked) {
        block_blitz = true;
    } else if (document.getElementById('do_not_block_blitz').checked) {
        block_blitz = false;
    }
    
    // save puzzle variants: get which boxes have been checked by the user
    var block_racer = false;
    var block_streak = false;
    var block_storm = false;

    if(document.getElementById('block_racer').checked) {
      block_racer = true;
    }
    if(document.getElementById('block_streak').checked) {
      block_streak = true;
    }
    if(document.getElementById('block_storm').checked) {
      block_storm = true;
    }
    // update the options in storage
    chrome.storage.local.set({
      block_blitz_storage: block_blitz,
      block_puzzle_storm: block_storm,
      block_puzzle_racer: block_racer,
      block_puzzle_streak: block_streak,
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved. Refresh lichess to apply the changes.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  /*
  * This function determines which option to display as checked on the options page.
  * If options are opended, display the boxes so that currently selected options are checked.
  */
  function restore_options() {
    
    chrome.storage.local.get(['block_blitz_storage'] , function(item) {
      // current option is "yes"
      if (item['block_blitz_storage']){
        document.getElementById('block_blitz').checked = true;
        document.getElementById('do_not_block_blitz').checked = false;
      }
      // current option is "no"
      else{
          document.getElementById('block_blitz').checked = false;
          document.getElementById('do_not_block_blitz').checked = true;
      }
    });
    // restore puzzle variants
    for (i=0; i<5; i+=2){
      restore_puzzles(puzzle_array[i], puzzle_array[i+1])
    }
  }

  // get the current options for puzzles from storage
  function restore_puzzles(storage_var, element_id){
    chrome.storage.local.get([storage_var] , function(item) {
      // current option is selected
      if (item[storage_var]){
        document.getElementById(element_id).checked = true;
      }
      // current option is not selected
      else{
        document.getElementById(element_id).checked = false;
      }
    });
  }
  
  /*
  * EventListener for the options page
  */
  document.addEventListener('DOMContentLoaded', restore_options);
  /*
  * EventListener for the save button
  */
  document.getElementById('save').addEventListener('click',
      save_options);
