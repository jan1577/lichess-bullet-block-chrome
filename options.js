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

    chrome.storage.local.set({
      block_blitz_storage: block_blitz,
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  /*
  * This function determines which option to display as checked on the option page.
  * If options are opended, display the boxes so that the current option is checked.
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
