MWF.xApplication.Setting.mobile = MWF.xApplication.Setting.mobile || {};
MWF.require("MWF.widget.Mask", null, false);
MWF.xApplication.Setting.mobile.CheckOnline = new Class({
    Implements: [Options, Events],

    initialize: function(explorer){
        this.explorer = explorer;
        this.app = this.explorer.app;
        this.actions = this.app.actions;
        this.css = this.app.css;
        this.content = this.explorer.checkOnlineContent;
        this.page = this.app.mobilePage;
        this.load();
    },
    load: function(){
        this.inforNode = new Element("div", {"styles": this.css.mobileCheckInforNode}).inject(this.content);
        this.actionNode = new Element("div", {"styles": this.css.mobileCheckActionNode}).inject(this.content);

        this.centerOnlineNode = new Element("div", {"styles": this.css.mobileCenterOnlineNode}).inject(this.inforNode);
        this.centerIconNode = new Element("div", {"styles": this.css.mobileCenterIconNode}).inject(this.centerOnlineNode);
        this.centerOnlineLineNode = new Element("div", {"styles": this.css.mobileCenterOnlineLineNode}).inject(this.centerOnlineNode);
        this.server1IconNode = new Element("div", {"styles": this.css.mobileServer1IconNode}).inject(this.centerOnlineNode);
        this.centerOnlineStatusNode = new Element("div", {"styles": this.css.mobileCenterOnlineStatusNode}).inject(this.centerOnlineNode);
        this.centerOnlineTextNode = new Element("div", {"styles": this.css.mobileCenterOnlineTextNode}).inject(this.centerOnlineNode);

        this.computerOnlineNode = new Element("div", {"styles": this.css.mobileComputerOnlineNode}).inject(this.inforNode);
        this.computerIconNode = new Element("div", {"styles": this.css.mobileComputerIconNode}).inject(this.computerOnlineNode);
        this.computerOnlineLineNode = new Element("div", {"styles": this.css.mobileComputerOnlineLineNode}).inject(this.computerOnlineNode);
        this.server2IconNode = new Element("div", {"styles": this.css.mobileServer2IconNode}).inject(this.computerOnlineNode);
        this.computerOnlineStatusNode = new Element("div", {"styles": this.css.mobileComputerOnlineStatusNode}).inject(this.computerOnlineNode);
        this.computerOnlineTextNode = new Element("div", {"styles": this.css.mobileComputerOnlineTextNode}).inject(this.computerOnlineNode);

        this.centerOnlineTextNode.set("text", this.app.lp.checkCenterToCollect);
        this.computerOnlineTextNode.set("text", this.app.lp.checkComputerToCollect);

        this.checkAction = new Element("div", {"styles": this.css.mobileReCheckActionNode}).inject(this.actionNode);
        this.checkAction.set("text", this.app.lp.reCheck);
        this.checkAction.addEvent("click", this.check.bind(this));

        //this.nextAction = new Element("div", {"styles": this.css.mobileNextActionNode}).inject(this.actionNode);
        //this.nextAction.set("text", this.app.lp.next);
        //this.nextAction.addEvent("click", this.nextStep.bind(this));

        this.check();
    },
    check: function(){
        this.mask = new MWF.widget.Mask({"style": "desktop"});
        this.mask.loadNode(this.explorer.contentAreaNode);

        this.checkCenterConnectFailure();
        this.checkComputerConnectFailure();

        this.actions.checkConnect(function(json){
            if (json.data.value){
                this.checkCenterConnectSuccess();
            }else{
                this.checkCenterConnectFailure();
            }
        }.bind(this), function(){
            this.checkCenterConnectFailure();
        }.bind(this));

        this.actions.connectCollect(function(json){
            if (json.data.servletContextName=="o2_collect"){
                this.checkComputerConnectSuccess();
            }else{
                this.checkComputerConnectFailure();
            }
        }.bind(this), function(){
            this.checkComputerConnectFailure();
        }.bind(this));
    },
    nextStep: function(){

    },
    checkCenterConnectReset: function(){
        this.centerOnlineStatusNode.set("text", "");
        this.centerOnlineStatusNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/failure.png) no-repeat left center");
        this.centerIconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/center.png) no-repeat center center");
        this.centerOnlineLineNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/line.png) no-repeat center center");
        this.server1IconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/server.png) no-repeat center center");
        this.centerOnlineStatusNode.setStyle("color", "#666");
        this.centerOnline = false;
        this.centerCheck = true;
    },
    checkComputerConnectReset: function(){
        this.computerOnlineStatusNode.set("text", "");
        this.computerOnlineStatusNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/failure.png) no-repeat left center");
        this.computerIconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/computer.png) no-repeat center center");
        this.computerOnlineLineNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/line.png) no-repeat center center");
        this.server2IconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/server.png) no-repeat center center");
        this.computerOnlineStatusNode.setStyle("color", "#666");
        this.computerOnline = false;
        this.computerCheck = true;
    },
    checkCenterConnectSuccess: function(){
        this.centerOnlineStatusNode.set("text", this.app.lp.success);
        this.centerOnlineStatusNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/success.png) no-repeat left center");
        this.centerIconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/center_ok.png) no-repeat center center");
        this.centerOnlineLineNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/line_ok.png) no-repeat center center");
        this.server1IconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/server_ok.png) no-repeat center center");
        this.centerOnlineStatusNode.setStyle("color", "#3498db");
        this.centerOnline = true;
        this.centerCheck = true;
        this.checkCompleted();
    },
    checkCenterConnectFailure: function(){
        this.centerOnlineStatusNode.set("text", this.app.lp.failure);
        this.centerOnlineStatusNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/failure.png) no-repeat left center");
        this.centerIconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/center.png) no-repeat center center");
        this.centerOnlineLineNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/line.png) no-repeat center center");
        this.server1IconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/server.png) no-repeat center center");
        this.centerOnlineStatusNode.setStyle("color", "#666");
        this.centerOnline = false;
        this.centerCheck = true;
        this.checkCompleted();
    },
    checkComputerConnectSuccess: function(){
        this.computerOnlineStatusNode.set("text", this.app.lp.success);
        this.computerOnlineStatusNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/success.png) no-repeat left center");
        this.computerIconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/computer_ok.png) no-repeat center center");
        this.computerOnlineLineNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/line_ok.png) no-repeat center center");
        this.server2IconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/server_ok.png) no-repeat center center");
        this.computerOnlineStatusNode.setStyle("color", "#3498db");
        this.computerOnline = true;
        this.computerCheck = true;
        this.checkCompleted();
    },
    checkComputerConnectFailure: function(){
        this.computerOnlineStatusNode.set("text", this.app.lp.failure);
        this.computerOnlineStatusNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/failure.png) no-repeat left center");
        this.computerIconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/computer.png) no-repeat center center");
        this.computerOnlineLineNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/line.png) no-repeat center center");
        this.server2IconNode.setStyle("background", "url(/x_component_Setting/$Main/"+this.app.options.style+"/mobile/server.png) no-repeat center center");
        this.computerOnlineStatusNode.setStyle("color", "#666");
        this.computerOnline = false;
        this.computerCheck = true;
        this.checkCompleted();
    },
    checkCompleted: function(){
        if (this.centerCheck && this.computerCheck){
            if (this.centerOnline && this.computerOnline){
                this.checkConnectSuccess();
            }else{
                this.checkConnectFailure();
            }
            if (this.mask) this.mask.hide();
        }
    },

    destroy: function(){
        this.content.destroy();
        MWF.release(this);
    },

    checkConnectSuccess: function(){
        this.checkConnectStatus = true;
    },
    checkConnectFailure: function(){
        this.checkConnectStatus = false;
    }


});