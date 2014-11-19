var fs = require("fs");
var express = require("express");
var applications = {};
var windows = []


module.exports = function(app,wss){
  fs.readdirSync(__root+"/apps").forEach(function(file){
    if(!fs.existsSync(__root+"/apps/"+file+"/window.json")){
      console.error(file+"'s window.json does not exist. Not loading.");
       return;
    }
    console.log(file+" to be loaded");
    try{
      var path = require.resolve(__root+"/apps/"+file);
      try{
        require(__root+"/apps/"+file);
      }catch(e){
        console.error("app["+file+"] could not be loaded");
        e.printStackTrace();
        //Could implement logic to wait for user input unless --force
        return;
      }
    }catch(e){
      console.log("this does not have serverside scripts. Thats ok though")
    }

    windows.push(JSON.parse(fs.readFileSync(__root+"/apps/"+file+"/window.json")));
    app.use("/"+file, express.static(__root+"/apps/"+file+"/public"));
  })

  methods.add({
    "silk/apps/list": function (data) {
      console.log("test");
      console.log("received: " + data);
      return "this is a vlue returned by the method"
    }
  });

  app.get("/windows.json",function(req,res,next){
    res.type("json").send(windows);
  });
  
  return windows;
}