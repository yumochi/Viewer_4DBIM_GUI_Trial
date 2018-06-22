// *******************************************
// My Awesome Extension
// *******************************************

/*============================================================================
 * @author     : Yumo Chi (yumochi2@gmail.com)
 * @file       : myawesomeextension.js (will rename later)
 * @brief      : handels display and editing of building information
 * Copyright (c) Yumo Chi @ Reconstruct Inc.
 =============================================================================*/

let json = {};

/**
  * Filter an object of activities and return relevent information in relation to keywords
  * @param {object[]} activities - a object of activites and their location informations
  * @param {string} wordToMatch - key word to match against
  */
function findMatches(wordToMatch, activities) {
  // create variable to return
  let ret = {};
  // turn wordToMatch to a regex to match against 
  const regex = new RegExp(wordToMatch, 'gi');
  for (var activity in activities) {
    // if regex is found in the match
    if (activity.match(regex)){
      // add activity 
      ret[activity] = activities[activity];
    }
    else{
      // cycle through the rest of the properties to find relevent matches
      for (var propt in activities[activity]){
        if (activities[activity][propt][0].match(regex)){
          ret[activity] = activities[activity];
        }
      }
    }
  }
  return ret;
}

/**
  * A callback function to filter activities based on user input
  */
function filteredDisplay(){
  console.log(this.value);
  // find current unordered list 
  if (this.value){
    currentList = document.getElementById('foo');

    while (currentList.hasChildNodes()) {   
      currentList.removeChild(currentList.firstChild);
    }
    const matchResult = findMatches(this.value, json);
    // Add the contents to #foo:
    document.getElementById('foo').appendChild(makeUL(matchResult));
  }

}

/**
  * Create an unordered list based on activities and their location and return it
  * @param {object[]} activities - a object of activites and their location informations
  */
function makeUL(activities) {
  // Create the list element:
  var list = document.createElement('ul');

  for(var propt in activities){
    // Create the list item:
    var item = document.createElement('li');
    item.setAttribute("class", "activity");

    // Create the input item in the list item
    // this represent the item name
    var itemName = document.createElement("INPUT");
    itemName.setAttribute("type", "text");
    itemName.setAttribute("value", propt);
    // note that the id of the obj is name
    itemName.setAttribute("id", "name");

    // Set its contents:
    item.appendChild(itemName);

    // for every subsequent property
    for(var subPropt in activities[propt]){

    // do the same an create an input item 
      itemChild = document.createElement("INPUT");

      itemChild.setAttribute("type", "text");

      itemChild.setAttribute("id", subPropt)

      itemChild.setAttribute("value", activities[propt][subPropt]);

      item.appendChild(itemChild)

    };

    // Add it to the list:
    list.appendChild(item);
  };

  // Finally, return the constructed list:
  return list;
}

function MyAwesomeExtension(viewer, options) {
  Autodesk.Viewing.Extension.call(this, viewer, options);
}

MyAwesomeExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
MyAwesomeExtension.prototype.constructor = MyAwesomeExtension;

MyAwesomeExtension.prototype.load = function () {
  if (this.viewer.toolbar) {
    // Toolbar is already available, create the UI
    this.createUI();
  } else {
    // Toolbar hasn't been created yet, wait until we get notification of its creation
    this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
    this.viewer.addEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
  }
  return true;
};

MyAwesomeExtension.prototype.onToolbarCreated = function () {
  this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
  this.onToolbarCreatedBinded = null;
  this.createUI();
};

MyAwesomeExtension.prototype.createUI = function () {
  let _this = this;

  // prepare to execute the button action
  var myAwesomeToolbarButton = new Autodesk.Viewing.UI.Button('runMyAwesomeCode');
  myAwesomeToolbarButton.onClick = function (e) {

    // wait until the document is ready...
    $.getJSON('/json/output.json', function(activities) {
    json = activities;
    console.log(typeof(activities));
    console.log(typeof(json))

    var modal = document.getElementById('myModal');

    console.log('extension clicked');

    modal.style.display = "block";

    // Add the contents of options[0] to #foo:
    document.getElementById('foo').appendChild(makeUL(activities));

    // get saveBtn
    let saveBtn = document.getElementById('saveBtn');

    // When the user clicks the save button save the current info
      saveBtn.onclick = function() {
        
        let activities = document.getElementsByClassName('activity');

        for (let i = 1; i < activities.length; i++) {

          // retrieve key for activity
            let key = activities[i].children[0].value;

          // check if an entry has been changed
          for(let j = 0; j < activities[i].childElementCount; j++) {

            // retrieve subPropt
            let subPropt = activities[i].children[j].id

            if (subPropt !== "name"){

              // detect variation has been made
              if (json[key][subPropt] !== activities[i].children[j].value){
                json[key][subPropt] = activities[i].children[j].value;
              } 
            }
          }
        }

      // save the corrected json
      var stringifyData = JSON.stringify(json);
      var file = new File([stringifyData], {type: "text/plain;charset=utf-8"});
        saveAs(file, "test.json");
      }



  });

  // add in search result filter
  const searchInput = document.querySelector('.search');

  searchInput.addEventListener('change', filteredDisplay);
  searchInput.addEventListener('keyup', filteredDisplay);

  };
  // myAwesomeToolbarButton CSS class should be defined on your .css file
  // you may include icons, below is a sample class:
  myAwesomeToolbarButton.addClass('myAwesomeToolbarButton');
  myAwesomeToolbarButton.setToolTip('My Awesome extension');

  // SubToolbar
  this.subToolbar = (this.viewer.toolbar.getControl("MyAppToolbar") ?
    this.viewer.toolbar.getControl("MyAppToolbar") :
    new Autodesk.Viewing.UI.ControlGroup('MyAppToolbar'));
  this.subToolbar.addControl(myAwesomeToolbarButton);

  this.viewer.toolbar.addControl(this.subToolbar);
};

MyAwesomeExtension.prototype.unload = function () {
  this.viewer.toolbar.removeControl(this.subToolbar);
  return true;
};


// *******************************************
// expanding on My Awesome Extension
// *******************************************

Autodesk.Viewing.theExtensionManager.registerExtension('MyAwesomeExtension', MyAwesomeExtension);
