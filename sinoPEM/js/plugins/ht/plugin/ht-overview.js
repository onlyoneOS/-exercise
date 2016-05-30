!function(Q,m){"use strict";var s="ht",v=s+".graph.",G=Q[s],f=G.graph,e=G.Default,u=G.Color,U=null,W="px",z=e.getInternal(),$=z.getPinchDist,r=e.preventDefault,Y=e.getTouchCount,g=e.startDragging;z.addMethod(e,{overviewBackground:u.widgetBackground,overviewMaskBackground:u.transparent,overviewContentBorderColor:u.widgetBorder,overviewContentBackground:u.background},!0),f.Overview=function(W){var B=this,K=B._view=z.createDiv(1);B._canvas=z.createCanvas(K),K.style.background=e.overviewBackground,K.appendChild(B._mask=z.createDiv()),B.gv=W,B.redraw(),B.addListeners(),W.addViewListener(B.handleView,B)},e.def(v+"Overview",m,{ms_v:1,ms_fire:1,ms_listener:1,ms_ac:["maskBackground","contentBorderColor","contentBackground","autoUpdate"],_autoUpdate:!0,_rate:1,_scrollRect:{x:0,y:0,width:0,height:0},_maskBackground:e.overviewMaskBackground,_contentBorderColor:e.overviewContentBorderColor,_contentBackground:e.overviewContentBackground,getCanvas:function(){return this._canvas},getMask:function(){return this._mask},dispose:function(){var m=this;m.gv.removeViewListener(m.handleView,m)},onPropertyChanged:function(){this.redraw()},handleView:function(S){this._autoUpdate&&"validate"===S.kind&&this.redraw()},redraw:function(){var W=this;W._redraw||(W._redraw=1,W.iv(50))},validateImpl:function(){var $=this,A=$.gv,M=$._canvas,g=$._mask,h=g.style,j=$.getWidth(),V=$.getHeight(),R=A.getViewRect(),r=A.getScrollRect(),m=r.x,K=r.y,E=r.width,s=r.height,b=$._rate=Math.max(E/j,s/V),S=$._x=(j-E/b)/2,i=$._y=(V-s/b)/2,X=$._redraw;if(0!==R.width&&0!==R.height||$.hasRetry||(e.callLater($.iv,$,U),$.hasRetry=!0),(j!==M.clientWidth||V!==M.clientHeight)&&(z.setCanvas(M,j,V,1),X=1),z.isSameRect(r,$._scrollRect)||($._scrollRect=r,X=1),X){var u=z.initContext(M),I=$._contentBackground,t=$._contentBorderColor;u.clearRect(0,0,j,V),I&&z.fillRect(u,S,i,E/b,s/b,I),t&&z.drawBorder(u,t,S,i,E/b,s/b),u.translate(-m/b+S,-K/b+i),u.scale(1/b,1/b),A._42(u),u.restore()}h.background=$._maskBackground,h.left=S+(R.x-m)/b+W,h.top=i+(R.y-K)/b+W,h.width=R.width/b+W,h.height=R.height/b+W,delete $._redraw},center:function(w){var h=this,P=h.gv,A=P._zoom,s=P._29I,m=h._rate,K=h._scrollRect,d=e.getLogicalPoint(w,h._canvas),c=K.x+(d.x-h._x)*m,j=K.y+(d.y-h._y)*m;P.setTranslate((s.width/2-c)*A,(s.height/2-j)*A)},handle_mousedown:function($){this.handle_touchstart($)},handleWindowMouseUp:function(c){this.handleWindowTouchEnd(c)},handleWindowMouseMove:function(b){this.handleWindowTouchMove(b)},handle_mousewheel:function(z){this.handleScroll(z,z.wheelDelta)},handle_DOMMouseScroll:function(j){2===j.axis&&this.handleScroll(j,-j.detail)},handleScroll:function(Y,m){r(Y);var o=this.gv;m>0?o.scrollZoomIn():0>m&&o.scrollZoomOut()},handle_touchstart:function(h){if(r(h),e.isLeftButton(h)){var I=this,X=I.gv,P=Y(h);1===P?e.isDoubleClick(h)&&X.isResettable()?X.reset():(I.center(h),g(I,h)):2===P&&(I._dist=$(h),g(I,h))}},handleWindowTouchEnd:function(){delete this._dist},handleWindowTouchMove:function(V){var L=this,J=L._dist,e=Y(V);1===e?L.center(V):2===e&&J!=U&&L.gv.handlePinch(U,$(V),J)}})}(this,Object);