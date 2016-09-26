	
function EventEmitter(){};
EventEmitter.prototype.on=function(type,fn){
	if(!this["aEmitter"+type]){
		this["aEmitter"+type]=[];
	}
	var a=this["aEmitter"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return this;	
	}
	a.push(fn);
	return this;
};
EventEmitter.prototype.run=function(e,systemEvent){
	var a=this["aEmitter"+e.type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,systemEvent,e);	
			}else{
				a.splice(i,1);	
				i--;
			}
		}
	}
	
};
EventEmitter.prototype.off=function(type,fn){
	var a=this["aEmitter"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return this;	
			}
		}
			
	}
	return this;
};

	function Drag(ele){
		this.x=null;
		this.y=null;
		this.mx=null;
		this.my=null;
		
		this.ele=ele;
		this.DOWN=processThis(this.down,this);
		
		on(ele,"mousedown",this.DOWN);
		this.MOVE=processThis(this.move,this);
		this.UP=processThis(this.up,this);
	}
	Drag.prototype=new EventEmitter;//

	
	Drag.prototype.down=function(e){
		this.x=this.ele.offsetLeft;
		this.y=this.ele.offsetTop;
		this.mx=e.pageX;
		this.my=e.pageY;
		if(this.ele.setCapture){
			this.ele.setCapture();
			on(this.ele,"mousemove",this.MOVE);
			on(this.ele,"mouseup",this.UP);
		}else{
			on(document,"mousemove",this.MOVE);
			on(document,"mouseup",this.UP);
		}
		e.preventDefault();
		this.run({type:"dragstart"},e);
	};
	Drag.prototype.move=function(e){
		this.ele.style.left=this.x+e.pageX-this.mx+"px";
		this.ele.style.top=this.y+e.pageY-this.my+"px";
		this.run({type:"dragging"},e);
	};
	Drag.prototype.up=function(e){
		if(this.ele.releaseCapture){
			this.ele.releaseCapture();
			off(this.ele,"mousemove",this.MOVE);
			off(this.ele,"mouseup",this.UP);	
		}else{
			off(document,"mousemove",this.MOVE);
			off(document,"mouseup",this.UP);
		}
		this.run({type:"dragend"},e);
	};
	

	
	Drag.prototype.range=function(oRange){
		this.range=oRange;
		this.on("dragging",this.addRange);
		
	};
	
	
	Drag.prototype.addRange=function(e){
		if(this.range){
			var currentX=this.x+e.pageX-this.mx;
			var currentY=this.y+e.pageY-this.my;
			if(currentX>=this.range.r){
				this.ele.style.left=this.range.r+"px";	
			}else if(currentX<=this.range.l){
				this.ele.style.left=this.range.l+"px";
			}else{
				this.ele.style.left=currentX+"px";	
			}
			
			if(currentY>=this.range.b){
				this.ele.style.top=this.range.b+"px";	
			}else if(currentY<=this.range.t){
				this.ele.style.top=this.range.t+"px";
			}else{
				this.ele.style.top=current+"px";	
			}
		}
	};
	
	Drag.prototype.border=function(){
		this.on("dragstart",this.addBorder);
		this.on("dragend",this.removeBorder);
	};
	
	Drag.prototype.addBorder=function(){
		this.ele.style.border="2px dashed green";	
	};
	Drag.prototype.removeBorder=function(){
		this.ele.style.border="none";	
	};