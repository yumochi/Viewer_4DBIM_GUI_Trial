// *******************************************
// My Awesome Extension
// *******************************************

function makeUL(activities) {
  // Create the list element:
  var list = document.createElement('ul');

  for(var propt in activities){
    // Create the list item:
    var item = document.createElement('li');

    // Create the input item in the list item
    // this represent the item name
    var itemName = document.createElement("INPUT");
    itemName.setAttribute("type", "text");
    itemName.setAttribute("value", propt);

    // Set its contents:
    item.appendChild(itemName);

    // for every subsequent property
    for(var subPropt in activities[propt]){

    // do the same an create an input item 
      itemChild = document.createElement("INPUT");

      itemChild.setAttribute("type", "text");

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
  var _this = this;

  // prepare to execute the button action
  var myAwesomeToolbarButton = new Autodesk.Viewing.UI.Button('runMyAwesomeCode');
  myAwesomeToolbarButton.onClick = function (e) {


    // wait until the document is ready...
    $.getJSON('/json/output.json', function(activities) {
    console.log(typeof(activities));

    var options = [
        set0 = ['Option 1','Option 2'],
        set1 = ['First Option','Second Option','Third Option']
    ];


    // Add the contents of options[0] to #foo:
    document.getElementById('foo').appendChild(makeUL(activities));

    });

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
