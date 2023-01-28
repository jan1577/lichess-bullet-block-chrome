/* Remove Puzzle Storm, Streak and Racer if selected */

// get all links on the page
let links = document.getElementsByTagName('a'),
    holdarray = [];

/* check all href for links to puzzle variants */ 
Array.from(links, link => {
  if(link.getAttribute('href') == "/storm"){
    // get current option
    chrome.storage.local.get(['block_puzzle_storm'], function(result) {
        // check if puzzle is blocked
        // if it's a "button" -> remove it
        if (result['block_puzzle_storm']){
            if(link.parentElement.role == "group" || link.className == "storm-play-again button"){
                link.style.display = 'none';
            }
            // if it's just "text", remove href and styling, but still display
            else{
                removeHref(link);
            }
        }  
    });
  }
  else if (link.getAttribute('href') == "/racer"){
    // get current option
    chrome.storage.local.get(['block_puzzle_racer'], function(result) {
        // check puzzle racer is blocked
        if (result['block_puzzle_racer']){
            if (link.parentElement.role == "group"){
                link.style.display = 'none';
            }   
            else{
                removeHref(link);
                // remove small icon next to span on left menu bar
                if (link.children[1]){
                    link.children[1].remove();
                }
            } 
        }
    });
  }
  else if (link.getAttribute('href') == "/streak"){
    // get current option
    chrome.storage.local.get(['block_puzzle_streak'], function(result) {
        // check if puzzle streak blocked
        if (result['block_puzzle_streak']){
            if (link.parentElement.role == "group"){
                link.style.display = 'none';
            }
            else{
                removeHref(link);
                // remove small icon next to span on left menu bar
                if (link.children[1]){
                    link.children[1].remove();
                }
            }
        }
    });
  }
  return
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