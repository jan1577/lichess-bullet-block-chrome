// Saves options to chrome.storage
function save_options() {
    // check which box is checked and change value in storage
    var block_blitz;
    if(document.getElementById('block_blitz').checked) {
        block_blitz = true;
      }else if(document.getElementById('do_not_block_blitz').checked) {
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
  
  // If options are opended, display the boxes so that the current option is checked
  function restore_options() {
    // Use default value block_blitz = false
    chrome.storage.local.get(['block_blitz_storage'] , function(item) {
        // if true
    if (item['block_blitz_storage']){
      document.getElementById('block_blitz').checked = true;
      document.getElementById('do_not_block_blitz').checked = false;
    }
    else{
        document.getElementById('block_blitz').checked = false;
        document.getElementById('do_not_block_blitz').checked = true;
    }
    });
  }
  
  // eventlistener
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);
