!function(n,l,e){"use strict";var A,b,I="ht",B=n[I],S=B.Default,J=["transitionend","webkitTransitionEnd"],L=null,d=n.parseInt,f=n.isNaN,U={linear:"cubic-bezier(0.250, 0.250, 0.750, 0.750)",ease:"cubic-bezier(0.250, 0.100, 0.250, 1.000)","ease-in":"cubic-bezier(0.420, 0.000, 1.000, 1.000)","ease-out":"cubic-bezier(0.000, 0.000, 0.580, 1.000)","ease-in-out":"cubic-bezier(0.420, 0.000, 0.580, 1.000)","ease-in-quad":"cubic-bezier(0.550, 0.085, 0.680, 0.530)","ease-in-cubic":"cubic-bezier(0.550, 0.055, 0.675, 0.190)","ease-in-quart":"cubic-bezier(0.895, 0.030, 0.685, 0.220)","ease-in-quint":"cubic-bezier(0.755, 0.050, 0.855, 0.060)","ease-in-sine":"cubic-bezier(0.470, 0.000, 0.745, 0.715)","ease-in-expo":"cubic-bezier(0.950, 0.050, 0.795, 0.035)","ease-in-circ":"cubic-bezier(0.600, 0.040, 0.980, 0.335)","ease-in-back":"cubic-bezier(0.600, -0.280, 0.735, 0.045)","ease-out-quad":"cubic-bezier(0.250, 0.460, 0.450, 0.940)","ease-out-cubic":"cubic-bezier(0.215, 0.610, 0.355, 1.000)","ease-out-quart":"cubic-bezier(0.165, 0.840, 0.440, 1.000)","ease-out-quint":"cubic-bezier(0.230, 1.000, 0.320, 1.000)","ease-out-sine":"cubic-bezier(0.390, 0.575, 0.565, 1.000)","ease-out-expo":"cubic-bezier(0.190, 1.000, 0.220, 1.000)","ease-out-circ":"cubic-bezier(0.075, 0.820, 0.165, 1.000)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1.275)","ease-in-out-quad":"cubic-bezier(0.455, 0.030, 0.515, 0.955)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1.000)","ease-in-out-quart":"cubic-bezier(0.770, 0.000, 0.175, 1.000)","ease-in-out-quint":"cubic-bezier(0.860, 0.000, 0.070, 1.000)","ease-in-out-sine":"cubic-bezier(0.445, 0.050, 0.550, 0.950)","ease-in-out-expo":"cubic-bezier(1.000, 0.000, 0.000, 1.000)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.150, 0.860)","ease-in-out-back":"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},k=S.animate=function(G){var K=this;return K instanceof k?("string"==typeof G&&(G=document.querySelector(G)),A===e&&(A=function(){var F={webkitTransform:"-webkit-transform",msTransform:"-ms-transform",transform:"transform"},M=document.createElement("p");for(var $ in F)if(L!=M.style[$])return F[$];return L}()),b===e&&(b=function(){var A=document.body.style;return"transition"in A||"webkitTransition"in A}()),K._el=G,K.$1m={},K.$2m=[],K.$3m=[],K.duration(),K.$4m=new B.Notifier,void 0):new k(G)};S.def(k,l,{transform:function(f){var U=this;return U.$3m.push(f),"-webkit-transform"===A?(U.$5m(A,U.$3m.join(" ")),U.$6m(A),U.$5m("transform",U.$3m.join(" ")),U.$6m("transform")):(U.$5m(A,U.$3m.join(" ")),U.$6m(A)),U},translate:function(l,Q){l=l==L?0:l,Q=Q==L?0:Q;var u=f(l)?l:l+"px",m=f(Q)?Q:Q+"px";return this.transform("translate("+u+", "+m+")")},translateX:function(R){return R=R==L?0:R,R=f(R)?R:R+"px",this.transform("translateX("+R+")")},tx:function(t){this.translateX(t)},translateY:function(h){return h=h==L?0:h,h=f(h)?h:h+"px",this.transform("translateY("+h+")")},ty:function(q){this.translateY(q)},scale:function(F,D){return F=f(F)?1:F,D=D==L||f(D)?F:D,this.transform("scale("+F+", "+D+")")},scaleX:function(l){return l=f(l)?1:l,this.transform("scaleX("+l+")")},scaleY:function(I){return I=f(I)?1:I,this.transform("scaleY("+I+")")},rotate:function(B){return B=d(B)||0,this.transform("rotate("+B+"deg)")},skew:function(l,$){return l=d(l)||0,$=d($)||0,this.transform("skew("+l+"deg, "+$+"deg)")},skewX:function(c){return c=d(c)||0,this.transform("skewX("+c+"deg)")},skewY:function(y){return y=d(y)||0,this.transform("skewY("+y+"deg)")},$7m:function(G){this._el.$17m=G;for(var a=0;a<J.length;a++)this._el.addEventListener(J[a],G)},$8m:function(g){for(var F=0;F<J.length;F++)this._el.removeEventListener(J[F],g);delete this._el.$17m},$9m:function(R){function m(){t.$8m(m),R.apply(F,arguments)}var t=this,F=t._el;F.$17m&&t.$8m(F.$17m),t.$7m(m)},$5m:function(W,z){this.$1m[W]=z},$10m:function(){var c=this.$1m,n=this._el.style;for(var X in c){var G=c[X];if(X.indexOf("transition-property")>=0){var I=n.getPropertyValue(X);I&&(I.indexOf(G)>=0?G=I:G.indexOf(I)>=0||(G=I+", "+G))}n.setProperty(X,G)}},$11m:function(i,V){this.$5m("-webkit-"+i,V),this.$5m(i,V)},$12m:function(){var $=this._el.style;$.webkitTransition=$.transition=""},duration:function(M){return f(M)&&(M=200),this.$14m=M,this.$11m("transition-duration",M+"ms"),this},delay:function(V){return V=d(V)||0,this.$11m("transition-delay",V+"ms"),this},ease:function(F){return F=U[F]||F||"ease",this.$11m("transition-timing-function",F),this},$6m:function(d){this.$2m.indexOf(d)<0&&this.$2m.push(d)},set:function(O,x){return this.$5m(O,x),this.$6m(O),this},then:function(K){var N=this,J=this.$4m;if(!(K instanceof k)){var b=new k(N._el);return b.$3m=this.$3m.slice(0),N.then(b),b.$15m=N,N.$16m=b,b}return J.add(function(j){"end"===j.kind&&K.end(N.$13m)}),this},pop:function(){return this.$15m},end:function(k){var f=this,Z=f.$4m;f.$11m("transition-property",f.$2m.join(", ")),f.$10m(),k&&(f.$13m=k);var u=function(u){f.$12m(),Z.fire({kind:"end"}),f.$16m||f.$13m&&f.$13m.call(f,u)};0!==f.$14m&&b?f.$9m(function(f){S.callLater(function(){u(f)},L,L,0)}):u({target:f._el,mock:1})}})}(this,Object);