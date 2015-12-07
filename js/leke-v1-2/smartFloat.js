(function(){
    var smartPosition={
        init:function(opt){
            this.allTitle=$(opt.elem);
            this.obj=this.allTitle.eq(0);
            this.amObj=this.allTitle.eq(1);
            this.pmObj=this.allTitle.eq(2);
            this.eveningObj=this.allTitle.eq(3);
            this.fixedShow=opt.fixedShow;   /*获得绝对定位的 display属性*/
            this.dateTop = this.obj.offset().top;
                /*获取布局定位的高度*/
            this.amTop = this.amObj.offset().top;
            this.pmTop = this.pmObj.offset().top;
            this.eveningTop = this.eveningObj.offset().top;
            /*获取各小计的高度*/
            this.objHeight=this.obj.outerHeight();
            this.amObjHeight=this.amObj.outerHeight();
            this.pmObjHeight=this.pmObj.outerHeight();
            this.eveningObjHeight=this.eveningObj.outerHeight();
            this.temp = this.obj.css("position");    /*获取布局的定位属性*/
            this.oldShow=this.obj.css('display');
            this.winScroll();

        },
        winScroll:function(){
            var self=this;
            var totalData=false,totalDataFix=false,amData=false,pmData=false,eveningData=false;
            $(window).scroll(function() {
                self.scrolls = $(this).scrollTop();
                if (self.scrolls > self.dateTop) {
                    if(!totalDataFix){
                        self.fixedPosition(self.obj,0);
                        totalDataFix=true;
                        totalData=false;
                    }
                }else {
                    if(!totalData){
                        self.showOldPosition(self.obj);
                        totalDataFix=false;
                        totalData=true;
                    }
                }
                /*早上的小节*/
                if(self.scrolls >= (self.amTop-self.objHeight) && self.scrolls< self.pmTop-(2*self.amObjHeight+self.objHeight)){
                    if(!amData){
                        self.fixedPosition(self.amObj,self.objHeight);
                        self.showOldPosition(self.pmObj);
                        amData=true;
                        pmData=false;
                        eveningData=false;
                    }
                }
                /*下午的小节*/
                else if(self.scrolls >= self.pmTop-(2*self.amObjHeight+self.objHeight) && self.scrolls< self.eveningTop-(2*self.pmObjHeight+self.objHeight)){
                    if(!pmData){
                        self.showOldPosition(self.amObj);
                        self.fixedPosition(self.pmObj,self.objHeight);
                        self.showOldPosition(self.eveningObj);
                        pmData=true;
                        amData=false;
                        eveningData=false;
                    }
                }
                /*晚上的小节*/
                else if(self.scrolls >= self.pmTop-(2*self.pmObjHeight+self.objHeight) ){
                    if(!eveningData){
                        self.showOldPosition(self.pmObj);
                        self.fixedPosition(self.eveningObj,self.objHeight);
                        eveningData=true;
                        amData=false;
                        pmData=false;
                    }
                }
                else{
                    self.showOldPosition(self.amObj);
                    self.showOldPosition(self.pmObj);
                    self.showOldPosition(self.eveningObj);
                    amData=false;
                    pmData=false;
                    eveningData=false;
                }
            });
        },
        fixedPosition:function($obj,height){
            $obj.css({
                position: "fixed",
                top: (0+height),
                display:this.fixedShow ||'block'
            });
        },
        showOldPosition:function($obj){
            $obj.css({
                position: this.temp,
                top:'none',
                display:this.oldShow
            });
            if(this.temp=='absolute'){
                 $obj.css({
                    top: this.dateTop,
                    display:this.oldShow
                });
            }
        }
    }
    window.smartPosition=smartPosition;
})();
smartPosition.init({
    'elem':'.table-tr-title',
    'fixedShow':'table'
});