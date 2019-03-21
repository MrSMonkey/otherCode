(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-components-ImagePreview-ImagePreview-vue"],{"0b50":function(t,i,e){"use strict";i.__esModule=!0,i.default=void 0;var s=e("e07b"),o=e("d3eb"),n=e("0441"),a=(0,s.use)("swipe"),r=a[0],h=a[1],c=r({mixins:[n.TouchMixin],props:{width:Number,height:Number,autoplay:Number,vertical:Boolean,initialSwipe:Number,indicatorColor:String,loop:{type:Boolean,default:!0},touchable:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},duration:{type:Number,default:500}},data:function(){return{computedWidth:0,computedHeight:0,offset:0,active:0,deltaX:0,deltaY:0,swipes:[],swiping:!1}},mounted:function(){this.initialize(),this.$isServer||(0,o.on)(window,"resize",this.onResize,!0)},activated:function(){this.rendered&&this.initialize(),this.rendered=!0},destroyed:function(){this.clear(),this.$isServer||(0,o.off)(window,"resize",this.onResize,!0)},watch:{swipes:function(){this.initialize()},initialSwipe:function(){this.initialize()},autoplay:function(t){t?this.autoPlay():this.clear()}},computed:{count:function(){return this.swipes.length},delta:function(){return this.vertical?this.deltaY:this.deltaX},size:function(){return this[this.vertical?"computedHeight":"computedWidth"]},trackSize:function(){return this.count*this.size},activeIndicator:function(){return(this.active+this.count)%this.count},isCorrectDirection:function(){var t=this.vertical?"vertical":"horizontal";return this.direction===t},trackStyle:function(){var t,i=this.vertical?"height":"width",e=this.vertical?"width":"height";return t={},t[i]=this.trackSize+"px",t[e]=this[e]?this[e]+"px":"",t.transitionDuration=(this.swiping?0:this.duration)+"ms",t.transform="translate"+(this.vertical?"Y":"X")+"("+this.offset+"px)",t},indicatorStyle:function(){return{backgroundColor:this.indicatorColor}}},methods:{initialize:function(t){if(void 0===t&&(t=this.initialSwipe),clearTimeout(this.timer),this.$el){var i=this.$el.getBoundingClientRect();this.computedWidth=this.width||i.width,this.computedHeight=this.height||i.height}this.swiping=!0,this.active=t,this.offset=this.count>1?-this.size*this.active:0,this.swipes.forEach(function(t){t.offset=0}),this.autoPlay()},onResize:function(){this.initialize(this.activeIndicator)},onTouchStart:function(t){this.touchable&&(this.clear(),this.swiping=!0,this.touchStart(t),this.correctPosition())},onTouchMove:function(t){this.touchable&&this.swiping&&(this.touchMove(t),this.isCorrectDirection&&(t.preventDefault(),t.stopPropagation(),this.move(0,Math.min(Math.max(this.delta,-this.size),this.size))))},onTouchEnd:function(){if(this.touchable&&this.swiping){if(this.delta&&this.isCorrectDirection){var t=this.vertical?this.offsetY:this.offsetX;this.move(t>0?this.delta>0?-1:1:0)}this.swiping=!1,this.autoPlay()}},move:function(t,i){void 0===t&&(t=0),void 0===i&&(i=0);var e=this.delta,s=this.active,o=this.count,n=this.swipes,a=this.trackSize,r=0===s,h=s===o-1,c=!this.loop&&(r&&(i>0||t<0)||h&&(i<0||t>0));c||o<=1||(n[0]&&(n[0].offset=h&&(e<0||t>0)?a:0),n[o-1]&&(n[o-1].offset=r&&(e>0||t<0)?-a:0),t&&s+t>=-1&&s+t<=o&&(this.active+=t),this.offset=i-this.active*this.size)},swipeTo:function(t){var i=this;this.swiping=!0,this.resetTouchStatus(),this.correctPosition(),setTimeout(function(){i.swiping=!1,i.move(t%i.count-i.active)},30)},correctPosition:function(){this.active<=-1&&this.move(this.count),this.active>=this.count&&this.move(-this.count)},clear:function(){clearTimeout(this.timer)},autoPlay:function(){var t=this,i=this.autoplay;i&&this.count>1&&(this.clear(),this.timer=setTimeout(function(){t.swiping=!0,t.resetTouchStatus(),t.correctPosition(),setTimeout(function(){t.swiping=!1,t.move(1),t.autoPlay()},30)},i))},onTransitionend:function(t){t.currentTarget===this.$refs.track&&this.$emit("change",this.activeIndicator)}},render:function(t){var i=this,e=this.count,s=this.activeIndicator,o=this.slots("indicator")||this.showIndicators&&e>1&&t("div",{class:h("indicators",{vertical:this.vertical})},[Array.apply(void 0,Array(e)).map(function(e,o){return t("i",{class:h("indicator",{active:o===s}),style:o===s?i.indicatorStyle:null})})]);return t("div",{class:h()},[t("div",{ref:"track",style:this.trackStyle,class:h("track"),on:{touchstart:this.onTouchStart,touchmove:this.onTouchMove,touchend:this.onTouchEnd,touchcancel:this.onTouchEnd,transitionend:this.onTransitionend}},[this.slots()]),o])}});i.default=c},"13b6":function(t,i,e){},"2a89":function(t,i,e){"use strict";var s=e("13b6"),o=e.n(s);o.a},"4a15":function(t,i,e){"use strict";var s=e("d170");i.__esModule=!0,i.default=void 0;var o=s(e("32e7")),n=e("e07b"),a=e("3352"),r=e("0441"),h=s(e("0b50")),c=s(e("b0da")),u=(0,n.use)("image-preview"),l=u[0],d=u[1],v=3,f=1/3;function m(t){return Math.sqrt(Math.abs((t[0].clientX-t[1].clientX)*(t[0].clientY-t[1].clientY)))}var p=l({mixins:[a.PopupMixin,r.TouchMixin],props:{images:Array,className:null,lazyLoad:Boolean,asyncClose:Boolean,startPosition:Number,showIndicators:Boolean,loop:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},showIndex:{type:Boolean,default:!0},overlayClass:{type:String,default:"van-image-preview__overlay"},closeOnClickOverlay:{type:Boolean,default:!0}},data:function(){return{scale:1,moveX:0,moveY:0,moving:!1,zooming:!1,active:0}},computed:{imageStyle:function(){var t=this.scale,i={transition:this.zooming||this.moving?"":".3s all"};return 1!==t&&(i.transform="scale3d("+t+", "+t+", 1) translate("+this.moveX/t+"px, "+this.moveY/t+"px)"),i}},watch:{value:function(){this.active=this.startPosition},startPosition:function(t){this.active=t}},methods:{onWrapperTouchStart:function(){this.touchStartTime=new Date},onWrapperTouchEnd:function(t){t.preventDefault();var i=new Date-this.touchStartTime,e=this.$refs.swipe||{},s=e.offsetX,o=void 0===s?0:s,n=e.offsetY,a=void 0===n?0:n;if(i<300&&o<10&&a<10){var r=this.active;this.resetScale(),this.$emit("close",{index:r,url:this.images[r]}),this.asyncClose||this.$emit("input",!1)}},startMove:function(t){var i=t.currentTarget,e=i.getBoundingClientRect(),s=window.innerWidth,o=window.innerHeight;this.touchStart(t),this.moving=!0,this.startMoveX=this.moveX,this.startMoveY=this.moveY,this.maxMoveX=Math.max(0,(e.width-s)/2),this.maxMoveY=Math.max(0,(e.height-o)/2)},startZoom:function(t){this.moving=!1,this.zooming=!0,this.startScale=this.scale,this.startDistance=m(t.touches)},onTouchStart:function(t){var i=t.touches,e=this.$refs.swipe||{},s=e.offsetX,o=void 0===s?0:s;1===i.length&&1!==this.scale?this.startMove(t):2!==i.length||o||this.startZoom(t)},onTouchMove:function(t){var i=t.touches;if((this.moving||this.zooming)&&(t.preventDefault(),t.stopPropagation()),this.moving){this.touchMove(t);var e=this.deltaX+this.startMoveX,s=this.deltaY+this.startMoveY;this.moveX=(0,n.range)(e,-this.maxMoveX,this.maxMoveX),this.moveY=(0,n.range)(s,-this.maxMoveY,this.maxMoveY)}if(this.zooming&&2===i.length){var o=m(i),a=this.startScale*o/this.startDistance;this.scale=(0,n.range)(a,f,v)}},onTouchEnd:function(t){if(this.moving||this.zooming){var i=!0;this.moving&&this.startMoveX===this.moveX&&this.startMoveY===this.moveY&&(i=!1),t.touches.length||(this.moving=!1,this.zooming=!1,this.startMoveX=0,this.startMoveY=0,this.startScale=1,this.scale<1&&this.resetScale()),i&&(t.preventDefault(),t.stopPropagation())}},onChange:function(t){this.resetScale(),this.active=t},resetScale:function(){this.scale=1,this.moveX=0,this.moveY=0}},render:function(t){var i=this;if(this.value){var e=this.active,s=this.images,n=this.showIndex&&t("div",{class:d("index")},[e+1+"/"+s.length]),a=t(h.default,{ref:"swipe",attrs:{loop:this.loop,indicatorColor:"white",initialSwipe:this.startPosition,showIndicators:this.showIndicators},on:{change:this.onChange}},[s.map(function(s,n){var a={class:d("image"),style:n===e?i.imageStyle:null,on:{touchstart:i.onTouchStart,touchmove:i.onTouchMove,touchend:i.onTouchEnd,touchcancel:i.onTouchEnd}};return t(c.default,[i.lazyLoad?t("img",(0,o.default)([{directives:[{name:"lazy",value:s}]},a])):t("img",(0,o.default)([{attrs:{src:s}},a]))])})]);return t("transition",{attrs:{name:"van-fade"}},[t("div",{class:[d(),this.className],on:{touchstart:this.onWrapperTouchStart,touchend:this.onWrapperTouchEnd,touchcancel:this.onWrapperTouchEnd}},[n,a])])}}});i.default=p},aec4:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("section",{class:t.isFold?"imgfoldView":"imgView"},[e("div",[e("div",[e("ul",{staticClass:"viewImg"},[e("li",t._l(t.imgagesArr,function(i,s){return e("div",{directives:[{name:"lazy",rawName:"v-lazy:background-image",value:i+"?imageView2/1/w/100/h/100",expression:"img+'?imageView2/1/w/100/h/100'",arg:"background-image"}],key:s,staticClass:"img-box",on:{click:function(i){return t.showImagePreview(s)}}})}),0)])])])])},o=[],n=e("b8ea"),a=e.n(n),r=e("a585"),h=e("26cb"),c=e("fd86"),u=e("3d0b"),l=e("d26d"),d=e("3a61"),v=e("b2e6"),f=e("ccfe"),m=function(t){function i(){return Object(r["a"])(this,i),Object(c["a"])(this,Object(u["a"])(i).apply(this,arguments))}return Object(l["a"])(i,t),Object(h["a"])(i,[{key:"showImagePreview",value:function(t,i){var e=this.imgagesArr.map(function(t){return"".concat(t,"?imageView2/2/w/320")}),s=a()({images:e,startPosition:"number"===typeof t?t:0});i&&setTimeout(function(){s.close()},i)}}]),i}(f["a"]);d["a"]([Object(v["c"])({type:Array,default:function(){return[]}})],m.prototype,"imgagesArr",void 0),d["a"]([Object(v["c"])({type:Boolean,default:!1})],m.prototype,"isFold",void 0),m=d["a"]([Object(v["a"])({name:"ImagePreview"})],m);var p=m,g=p,w=(e("2a89"),e("8c9c")),y=Object(w["a"])(g,s,o,!1,null,null,null);i["default"]=y.exports},b0da:function(t,i,e){"use strict";var s=e("d170");i.__esModule=!0,i.default=void 0;var o=s(e("0564")),n=e("e07b"),a=(0,n.use)("swipe-item"),r=a[0],h=a[1],c=r({data:function(){return{offset:0}},beforeCreate:function(){this.$parent.swipes.push(this)},destroyed:function(){this.$parent.swipes.splice(this.$parent.swipes.indexOf(this),1)},render:function(t){var i=this.$parent,e=i.vertical,s=i.computedWidth,n=i.computedHeight,a={width:s+"px",height:e?n+"px":"100%",transform:"translate"+(e?"Y":"X")+"("+this.offset+"px)"};return t("div",{class:h(),style:a,on:(0,o.default)({},this.$listeners)},[this.slots()])}});i.default=c},b8ea:function(t,i,e){"use strict";var s=e("d170");i.__esModule=!0,i.default=void 0;var o,n=s(e("0564")),a=s(e("e8c7")),r=s(e("4a15")),h=e("e07b"),c={images:[],loop:!0,value:!0,className:"",lazyLoad:!1,showIndex:!0,asyncClose:!1,startPosition:0,showIndicators:!1},u=function(){o=new(a.default.extend(r.default))({el:document.createElement("div")}),document.body.appendChild(o.$el)},l=function(t,i){if(void 0===i&&(i=0),!h.isServer){o||u();var e=Array.isArray(t)?{images:t,startPosition:i}:t;return(0,n.default)(o,c,e),o.$once("input",function(t){o.value=t}),e.onClose&&o.$once("close",e.onClose),o}};l.install=function(){a.default.use(r.default)};var d=l;i.default=d}}]);
//# sourceMappingURL=view-components-ImagePreview-ImagePreview-vue.9fa6eac5.js.map