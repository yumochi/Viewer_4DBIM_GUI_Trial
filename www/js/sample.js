let testViewer = viewerApp;
console.log('viewer loaded');

let testModel = viewerApp.myCurrentViewer.model;
console.log('model loaded');

let testCameraParam = viewerApp.myCurrentViewer.autocamCamera;
console.log('camera param loaded');

let fs = new FramesSimulation(testViewer, testModel, testCameraParam);
console.log('FramesSimulation loaded');