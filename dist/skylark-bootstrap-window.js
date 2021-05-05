/**
 * skylark-bootstrap-window - A version of bootstrap-window that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-bootstrap-window/
 * @license MIT
 */
!function(t,e){var i=e.define,require=e.require,n="function"==typeof i&&i.amd,s=!n&&"undefined"!=typeof exports;if(!n&&!i){var o={};i=e.define=function(t,e,i){"function"==typeof i?(o[t]={factory:i,deps:e.map(function(e){return function(t,e){if("."!==t[0])return t;var i=e.split("/"),n=t.split("/");i.pop();for(var s=0;s<n.length;s++)"."!=n[s]&&(".."==n[s]?i.pop():i.push(n[s]));return i.join("/")}(e,t)}),resolved:!1,exports:null},require(t)):o[t]={factory:null,resolved:!0,exports:i}},require=e.require=function(t){if(!o.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var module=o[t];if(!module.resolved){var i=[];module.deps.forEach(function(t){i.push(require(t))}),module.exports=module.factory.apply(e,i)||null,module.resolved=!0}return module.exports}}if(!i)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,require){t("skylark-bootstrap-window/windows",["skylark-langx-ns"],function(t){return t.attach("intg.bswin",{})}),t("skylark-bootstrap-window/Window",["skylark-langx/skylark","skylark-langx/langx","skylark-domx-browser","skylark-domx-data","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-velm","skylark-domx-query","skylark-domx-plugins","skylark-domx-interact/Movable","./windows"],function(t,e,i,n,s,o,a,l,r,d,h,c){var w=d.Plugin.inherit({klassName:"Window",pluginName:"domx.window",options:{selectors:{handle:".window-header",title:".window-title",body:".window-body",footer:".window-footer"},elements:{handle:null,title:null,body:null,footer:null},references:{body:r("body"),window:r(window)},effect:"fade",parseHandleForTitle:!0,maximized:!1,maximizable:!1,title:"No Title",bodyContent:"",footerContent:""},_construct:function(t,e){this.overrided(t,e),e=this.options;return this.$el=this.$(),this.$el.hasClass("window")||this.$el.addClass("window"),this.$el.data("window",this),this.$el.find(e.selectors.handle).length<=0&&this.$el.prepend('<div class="window-header"><h4 class="window-title"></h4></div>'),e.elements.handle=this.$el.find(e.selectors.handle),e.elements.title=this.$el.find(e.selectors.title),e.elements.body=this.$el.find(e.selectors.body),e.elements.footer=this.$el.find(e.selectors.footer),e.elements.title.html(e.title),e.maximizable&&(e.elements.buttons={},e.elements.buttons.maximize=r('<button data-maximize="window"><i class="glyphicon glyphicon-chevron-up"></i></button>'),e.elements.handle.prepend(e.elements.buttons.maximize),e.elements.buttons.restore=r('<button data-restore="window"><i class="glyphicon glyphicon-modal-window"></i></button>'),e.elements.handle.prepend(e.elements.buttons.restore)),this.$el.find("[data-dismiss=window]").length<=0&&e.elements.handle.prepend('<button type="button" class="close" data-dismiss="window" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>'),e.elements.body.html(e.bodyContent),e.elements.footer.html(e.footerContent),this.undock(),this.setSticky(e.sticky),this},undock:function(){var t=this;this.$el.css("visibility","hidden"),this.$el.appendTo("body"),this.centerWindow(),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&this.options.references.window.bind("orientationchange resize",function(e){t.centerWindow()}),this.$el.on("touchmove",function(t){t.stopPropagation()}),this.initHandlers(),this.$el.hide(),this.options.id?this.id=this.options.id:this.id="",this.show()},maximize:function(){this.$el.removeClass("minimized"),this.$el.addClass("maximized"),this.state="maximized";var t=0;this.options.window_manager&&(t=this.options.window_manager.getContainer().height()),this.$el.css({top:parseInt(r("body").css("padding-top"),10),left:0,right:0,bottom:t,maxWidth:"none",width:"auto",height:"auto"}),this.$el.trigger("bsw.maximize")},restore:function(){this.$el.removeClass("minimized"),this.$el.removeClass("maximized"),this.$el.removeAttr("style"),this.state=void 0,this.$el.css({top:this.window_info.top,left:this.window_info.left,width:this.window_info.width,height:this.window_info.height}),this.$el.removeProp("style"),this.$el.trigger("bsw.restore")},show:function(t){var e=this;this.$el.css("visibility","visible");var i=function(){e.$el.trigger("bsw.show"),t&&t.call(e,arguments)};"fade"===this.options.effect?this.$el.fadeIn(void 0,void 0,i):i.call(this.$el)},setEffect:function(t){this.options.effect=t},getEffect:function(){return this.options.effect},centerWindow:function(){var t,e,i,n=parseInt(this.options.references.body.position().top,10)+parseInt(this.options.references.body.css("paddingTop"),10);this.options.sticky,e=this.options.references.window.width()/2-this.$el.width()/2,(t=this.options.references.window.height()/2-this.$el.height()/2)<n&&(t=n),i=this.options.references.window.height()-n-(parseInt(this.options.elements.handle.css("height"),10)+parseInt(this.options.elements.footer.css("height"),10))-45,this.options.elements.body.css("maxHeight",i),this.$el.css("left",e),this.$el.css("top",t),this.$el&&this.$el.length>0&&(this.window_info={top:this.$el.position().top,left:this.$el.position().left,width:this.$el.outerWidth(),height:this.$el.outerHeight()}),this.$el.trigger("bsw.centerWindow")},close:function(t){var e=this;this.options.parent?(this.options.parent.clearBlocker(),this.options.window_manager&&this.options.window_manager.setFocused(this.options.parent)):this.options.window_manager&&this.options.window_manager.windows.length>0&&this.options.window_manager.setNextFocused();var i=function(){e.$el.trigger("bsw.close"),e.$el.remove(),t&&t.call(e)};"fade"===this.options.effect?this.$el.fadeOut(i):i.call(e.$el),this.$windowTab&&("fade"===this.options.effect?this.$windowTab.fadeOut(400,function(){e.$windowTab.remove()}):(this.$windowTab.hide(),this.$windowTab.remove()))},on:function(){this.$el.on.apply(this.$el,arguments)},sendToBack:function(){var t=!1;return this.options.window_manager&&(t=this.options.window_manager.sendToBack(this)),t},setActive:function(t){t?(this.$el.addClass("active"),this.$windowTab&&this.$windowTab.addClass("label-primary"),this.$el.trigger("active")):(this.$el.removeClass("active"),this.$windowTab&&(this.$windowTab.removeClass("label-primary"),this.$windowTab.addClass("label-default")),this.$el.trigger("inactive"))},setIndex:function(t){this.$el.css("zIndex",t)},setWindowTab:function(t){this.$windowTab=t},getWindowTab:function(){return this.$windowTab},getTitle:function(){return this.options.title},getElement:function(){return this.$el},setSticky:function(t){this.options.sticky=t,!1===t?this.$el.css({position:"absolute"}):this.$el.css({position:"fixed"})},getSticky:function(){return this.options.sticky},setManager:function(t){this.options.window_manager=t},initHandlers:function(){var t=this;this.$el.find("[data-dismiss=window]").on("click",function(e){e.stopPropagation(),e.preventDefault(),t.options.blocker||t.close()}),this.$el.find("[data-maximize=window]").on("click",function(e){e.stopPropagation(),e.preventDefault(),t.options.blocker||t.maximize()}),this.$el.find("[data-restore=window]").on("click",function(e){t.options.blocker||t.restore()}),this.moveable=new h(this.$el[0],{handle:this.options.elements.title[0]})},resize:function(t){(t=t||{}).top&&this.$el.css("top",t.top),t.left&&this.$el.css("left",t.left),t.height&&this.$el.css("height",t.height),t.width&&this.$el.css("width",t.width),this.$el.trigger("bsw.resize")},setBlocker:function(t){this.options.blocker=t,this.$el.find(".disable-shade").remove();var e='<div class="disable-shade"></div>';this.options.elements.body.append(e),this.options.elements.body.addClass("disable-scroll"),this.options.elements.footer.append(e),"fade"===this.options.effect?this.$el.find(".disable-shade").fadeIn():this.$el.find(".disable-shade").show(),this.options.blocker.getParent()||this.options.blocker.setParent(this)},getBlocker:function(){return this.options.blocker},clearBlocker:function(){this.options.elements.body.removeClass("disable-scroll"),"fade"===this.options.effect?this.$el.find(".disable-shade").fadeOut(function(){this.remove()}):(this.$el.find(".disable-shade").hide(),this.remove()),delete this.options.blocker},setParent:function(t){this.options.parent=t,this.options.parent.getBlocker()||this.options.parent.setBlocker(this)},getParent:function(){return this.options.parent},blink:function(){var t=this,e=this.$el.hasClass("active"),i=this.getWindowTab(),n=i?i.hasClass("label-primary"):void 0,s=setInterval(function(){t.$el.toggleClass("active"),i&&i.toggleClass("label-primary")},250);setTimeout(function(){clearInterval(s),e&&t.$el.addClass("active"),i&&n&&i.addClass("label-primary")},1e3)}});return n.window=function(t,e){var i=this.data(t,"sbswt.window");i||this.data(t,"sbswt.window",i=new w(t)),"string"==typeof option&&i[e]()},r("[data-window-target]").off("click"),r("[data-window-target]").on("click",function(){var t=r(this),e={selectors:{}};t.data("windowTitle")&&(e.title=t.data("windowTitle")),t.data("titleHandle")&&(e.selectors.title=t.data("titleHandle")),t.data("windowHandle")&&(e.selectors.handle=t.data("windowHandle")),t.data("clone")&&(e.clone=t.data("windowHandle")),r(t.data("windowTarget")).window(e)}),d.register(w),c.Window=w}),t("skylark-bootstrap-window/WindowManager",["skylark-langx/skylark","skylark-langx/langx","skylark-domx-browser","skylark-domx-data","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-velm","skylark-domx-query","skylark-domx-plugins","./windows","./Window"],function(t,e,i,n,s,o,a,l,r,d,h,c){var w=e.Emitter.inherit({klassName:"WindowManager",init:function(t){return this.windows=[],t=t||{},this.initialize(t),this},findWindowByID:function(t){var i=null;return e.each(this.windows,function(e,n){console.log(arguments),n.id===t&&(i=n)}),i},destroyWindow:function(t){var i=this,n=!1;return e.each(this.windows,function(e,s){s===t&&(t.close(),i.windows.splice(e,1),i.resortWindows(),n=!0)}),n},closeWindow:function(t){this.destroyWindow(t)},resortWindows:function(){e.each(this.windows,function(t,e){e.setIndex(900+t)})},setFocused:function(t){for(var i;t.getBlocker();)t=t.getBlocker();e.each(this.windows,function(e,n){n.setActive(!1),n===t&&(i=e)}),this.windows.push(this.windows.splice(i,1)[0]),t.setActive(!0),this.resortWindows()},sendToBack:function(t){var e=this.windows.splice(this.windows.indexOf(t),1)[0];return this.windows.unshift(e),this.resortWindows(),!0},initialize:function(t){this.options=t,this.elements={},this.options.container&&(this.elements.container=r(this.options.container),this.elements.container.addClass("window-pane"))},getContainer:function(){var t;return this.elements&&this.elements.container&&(t=this.elements.container),t},setNextFocused:function(){this.setFocused(this.windows[this.windows.length-1])},addWindow:function(t){var e=this;return t.getElement().on("focused",function(i){e.setFocused(t)}),t.getElement().on("close",function(){e.destroyWindow(t),t.getWindowTab()&&t.getWindowTab().remove()}),t.on("bsw.restore",function(){e.resortWindows()}),this.options.container&&(t.setWindowTab(r('<span class="label label-default">'+t.getTitle()+'<button class="close">x</button></span>')),t.getWindowTab().find(".close").on("click",function(e){var i=t.getBlocker();i?i.blink():t.close()}),t.getWindowTab().on("click",function(i){var n=t.getBlocker();n?n.blink():(e.setFocused(t),t.getSticky()&&window.scrollTo(0,t.getElement().position().top))}),r(this.options.container).append(t.getWindowTab())),this.windows.push(t),t.setManager(this),this.setFocused(t),t},createWindow:function(t){var i=e.mixin({},t);this.options.windowTemplate&&!i.template&&(i.template=this.options.windowTemplate);var n=new c(i.template,i);return this.addWindow(n)}});return c.WindowManager=w,h.WindowManager=w}),t("skylark-bootstrap-window/main",["./windows","./Window","./WindowManager"],function(t){return t}),t("skylark-bootstrap-window",["skylark-bootstrap-window/main"],function(t){return t})}(i),!n){var a=require("skylark-langx-ns");s?module.exports=a:e.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-bootstrap-window.js.map
