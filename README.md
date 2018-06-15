# Viewer_4DBIM_GUI_Trial
A beta version of the GUI for auto 4D breakdown consisting of location based display. The location breakdown will take the form of a local json. User will be able to import json for local parsing as well as make changes to these json.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1) Register an app on autodesk forge viewer to secure clientID and clientSecret, refer to https://developer.autodesk.com/en/docs/oauth/v2/tutorials/create-app/

2) Secure bucket key with Oauth transaction, refer to <br />
https://developer.autodesk.com/en/docs/data/v2/tutorials/upload-file/

### Installing

A step by step series of examples that tell you how to get a development env running

1) Clone Construction-Material-Recognition to local repo 
```
git git@github.com:yangdihan/Construction-Material-Recognition.git
```

2) Navigate to local Construction-Material-Recognition folder
```
cd Construction-Material-Recognition
```

3) Install node and node dependencies
```
npm install
```
4) Export clientID and clientSecret into viewer
```
export FORGE_CLIENT_ID=<your clientID>
export FORGE_CLIENT_SECRET=<your clientSecret>
```

4) Run local server 
```
node start.js
```

## Deployment

1) Upload model into bucket by double clicking on the bucket

2) Start backprojection from BIM using myAwsomeExtention button 


## Versioning

Viewer_4DBIM_GUI_Trial is currently in beta version


## Authors

* **Yumo Chi** - *Initial work* - https://github.com/yumochi

## Acknowledgments

* Amir Ibrahim
* Wilfredo Torres
* Augusto Goncalves - viewer-javascript-extract.spreadsheet
