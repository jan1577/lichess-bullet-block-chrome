function save_options() {
  let block_blitz = false;
  if (document.getElementById('block_blitz').checked) {
    block_blitz = true;
  }

  // save puzzle variants: get which boxes have been checked by the user
  let block_racer = false;
  let block_streak = false;
  let block_storm = false;

  if (document.getElementById('block_racer').checked) {
    block_racer = true;
  }
  if (document.getElementById('block_streak').checked) {
    block_streak = true;
  }
  if (document.getElementById('block_storm').checked) {
    block_storm = true;
  }

  enable_quotes = false;
  if (document.getElementById('enable-quotes').checked) {
    enable_quotes = true;
  }

  chrome.storage.local.set({
    block_blitz_storage: block_blitz,
    block_puzzle_storm: block_storm,
    block_puzzle_racer: block_racer,
    block_puzzle_streak: block_streak,
    enable_quotes: enable_quotes
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved. Refresh lichess to apply the changes.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}


/* Restore selected options from local storage */
function restore_options() {

  chrome.storage.local.get(['block_blitz_storage'], function (item) {
    if (item['block_blitz_storage']) {
      document.getElementById('block_blitz').checked = true;
      document.getElementById('do_not_block_blitz').checked = false;
    }
    else {
      document.getElementById('block_blitz').checked = false;
      document.getElementById('do_not_block_blitz').checked = true;
    }
  });

  for (let i = 0; i < 5; i += 2) {
    restore_puzzles(puzzle_array[i], puzzle_array[i + 1])
  }

  chrome.storage.local.get(['enable_quotes'], function (item) {
    if (item['enable_quotes']) {
      document.getElementById('enable-quotes').checked = true;
      document.getElementById('disable-quotes').checked = false;
    } else {
      document.getElementById('enable-quotes').checked = false;
      document.getElementById('disable-quotes').checked = true;
    }
  });
}


function restore_puzzles(storage_var, element_id) {
  chrome.storage.local.get([storage_var], function (item) {
    if (item[storage_var]) {
      document.getElementById(element_id).checked = true;
    } else {
      document.getElementById(element_id).checked = false;
    }
  });
}


// used to restore selected options from local storage: first is the name of the variable
// in chrome local storage, second the html id of the checkbox
const puzzle_array = ['block_puzzle_streak', 'block_streak', 'block_puzzle_storm', 'block_storm', 'block_puzzle_racer', 'block_racer']

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click',
  save_options);
