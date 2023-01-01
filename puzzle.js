/* Remove Puzzle Storm, Streak and Racer if selected */

// get all links on the page
let links = document.getElementsByTagName('a'),
    holdarray = [];

/* check all href for links to puzzle variants */ 
Array.from(links, elem => {
  if(elem.getAttribute('href') == "/storm"){
    // get current option
    chrome.storage.local.get(['block_puzzle_storm'], function(result) {
        // check if puzzle is blocked
        // if it's a "button" -> remove it
        if (result['block_puzzle_storm']){
            if(elem.parentElement.role == "group" || elem.className == "storm-play-again button"){
                elem.style.display = 'none';
            }
            // if it's just "text", remove href and styling, but still display
            else{
                removeHref(elem);
            }
        }  
    });
  }
  else if (elem.getAttribute('href') == "/racer"){
    // get current option
    chrome.storage.local.get(['block_puzzle_racer'], function(result) {
        // check puzzle racer is blocked
        if (result['block_puzzle_racer']){
            if (elem.parentElement.role == "group"){
                elem.style.display = 'none';
            }   
            else{
                removeHref(elem);
                // remove small icon next to span on left menu bar
                if (elem.children[1]){
                    elem.children[1].remove();
                }
            } 
        }
    });
  }
  else if (elem.getAttribute('href') == "/streak"){
    // get current option
    chrome.storage.local.get(['block_puzzle_streak'], function(result) {
        // check if puzzle streak blocked
        if (result['block_puzzle_streak']){
            if (elem.parentElement.role == "group"){
                elem.style.display = 'none';
            }
            else{
                removeHref(elem);
                // remove small icon next to span on left menu bar
                if (elem.children[1]){
                    elem.children[1].remove();
                }
            }
        }
    });
  }
});

/* This function is used to remove the href attribute, and styles for elements that should be
 * blocked, but not removed from the screen (Displayed, but just as plain text).
 * @param element: html element where attributes are removed
 */
function removeHref(element){
    element.removeAttribute('href');
    // change styling to plain text
    element.style.color = "inherit";
    element.style.pointerEvents = "none";
}