!function(Z){"use strict";var Y="ht",c=Z[Y],m=Math,E=m.max,I=m.min,A=m.abs,N=m.atan2,n=m.cos,R=m.sin,B=m.ceil,q=c.Default,g=q.getInternal(),j=c.List,$=g.Mat,d=g.getNodeRect,b=g.intersectionLineRect,O=q.getDistance,D=q.setEdgeType,e="left",w="right",P="top",L="bottom",l="edge.type",y="edge.gap",S="edge.center",G="edge.extend",_=function(w,z){return d(w,z).width},C=function(i,z){return d(i,z).height},J=function(o,C){var m=g.getPosition(C.s("edge.source.position"),d(o,C._40I));return m.x+=C.s("edge.source.offset.x"),m.y+=C.s("edge.source.offset.y"),m},f=function(L,Q){var f=g.getPosition(Q.s("edge.target.position"),d(L,Q._41I));return f.x+=Q.s("edge.target.offset.x"),f.y+=Q.s("edge.target.offset.y"),f},i=function(H,I){var Z=H.s(l),i=H.getEdgeGroup();if(i){var K=0;if(i.eachSiblingEdge(function(u){I.isVisible(u)&&u.s(l)==Z&&K++}),K>1)return H.s(y)*(K-1)/2}return 0},Q=function(n,E){var c=n.s(l),_=n.isLooped();if(!n.getEdgeGroup())return _?n.s(y):0;var g,f=0,F=0,K=0;return n.getEdgeGroup().getSiblings().each(function(p){p.each(function($){if($._40I===n._40I&&$.s(l)==c&&E.isVisible($)){var b=$.s(y);g?(F+=K/2+b/2,K=b):(g=$,K=b),$===n&&(f=F)}})}),_?F-f+K:f-F/2},K=function(h,r){var G=h.size(),a=r.s("edge.corner.radius");if(0===a)return{points:h,segments:new j([1,G])};if(0>a)return{points:h};var l,$=new j,m=new j,d=h.get(0);$.add(d),m.add(1);for(var A=1;G>A;A++)if(G>A+1){var b=h.get(A),u=h.get(A+1),P=d.x,L=d.y,w=b.x,H=b.y,S=H-L,o=w-P,Y=N(S,o);l=I(.99*O(d,b),a),$.add({x:w-l*n(Y),y:H-l*R(Y)}),$.add(b),P=b.x,L=b.y,w=u.x,H=u.y,S=H-L,o=w-P,Y=N(S,o),l=I(.99*O(b,u),a),d={x:P+l*n(Y),y:L+l*R(Y)},$.add(d),m.addAll([2,3])}else $.add(h.get(A)),m.add(2);return{points:$,segments:m}};g.addMethod(c.Style,{"edge.ripple.elevation":-20,"edge.ripple.size":1,"edge.ripple.both":!1,"edge.ripple.straight":!1,"edge.ripple.length":-1,"edge.corner.radius":-1,"edge.ortho":.5,"edge.flex":20,"edge.extend":20},!0),D("boundary",function(Y,R,n,H){H||(R=-R);var V,w=J(n,Y),h=f(n,Y),i=d(n,Y._40I),t=d(n,Y._41I),q=new $(N(h.y-w.y,h.x-w.x)),D=O(w,h),p=w.x,F=w.y;return V=q.tf(0,R),w={x:V.x+p,y:V.y+F},V=q.tf(D,R),h={x:V.x+p,y:V.y+F},V=b(w,h,i),V&&(w={x:V[0],y:V[1]}),V=b(w,h,t),V&&(h={x:V[0],y:V[1]}),{points:new j([w,h])}}),D("ripple",function(e,q,i,E){E||(q=-q);var X=J(i,e),F=f(i,e),W=O(X,F),A=I(e.s("edge.offset"),W/2),H=e.s("edge.ripple.size"),R=e.s("edge.ripple.length"),n=e.s("edge.ripple.both"),d=e.s(S),t=e.s("edge.ripple.elevation"),s=new j,G=e.s("edge.ripple.straight")?null:new j,C=new $(N(F.y-X.y,F.x-X.x));E||(t=-t),W-=2*A,R>0&&(H=B(W/R));var y=W/H;G&&G.add(1);for(var g=0;H>g;g++)G&&G.add(3),0===g?s.add({x:A+y*g,y:d?0:q}):s.add({x:A+y*g,y:q}),s.add({x:A+y*g+y/2,y:t+q}),n&&(t=-t);for(s.add({x:A+W,y:d?0:q}),g=0;g<s.size();g++){var M=C.tf(s.get(g));M.x+=X.x,M.y+=X.y,s.set(g,M)}return{points:s,segments:G}}),D("h.v",function(O,D,$){D=Q(O,$);var A=new j,P=O.s(S),E=J($,O),t=E.x,w=E.y,k=f($,O),x=k.x,U=k.y,z=0,q=0,G=x-t,F=U-w;return P||(z=_($,O._40I)/2,q=C($,O._41I)/2),G>=0&&0>=F?(A.add({x:t+z,y:w+D}),A.add({x:x+D,y:w+D}),A.add({x:x+D,y:U+q})):0>=G&&F>=0?(A.add({x:t-z,y:w+D}),A.add({x:x+D,y:w+D}),A.add({x:x+D,y:U-q})):G>=0&&F>=0?(A.add({x:t+z,y:w+D}),A.add({x:x-D,y:w+D}),A.add({x:x-D,y:U-q})):(A.add({x:t-z,y:w+D}),A.add({x:x-D,y:w+D}),A.add({x:x-D,y:U+q})),K(A,O)}),D("v.h",function(Z,p,W){p=Q(Z,W);var t=new j,m=Z.s(S),d=J(W,Z),x=d.x,P=d.y,s=f(W,Z),D=s.x,u=s.y,A=0,b=0,T=D-x,U=u-P;return m||(A=_(W,Z._41I)/2,b=C(W,Z._40I)/2),T>=0&&0>=U?(t.add({x:x+p,y:P-b}),t.add({x:x+p,y:u+p}),t.add({x:D-A,y:u+p})):0>=T&&U>=0?(t.add({x:x+p,y:P+b}),t.add({x:x+p,y:u+p}),t.add({x:D+A,y:u+p})):T>=0&&U>=0?(t.add({x:x-p,y:P+b}),t.add({x:x-p,y:u+p}),t.add({x:D-A,y:u+p})):(t.add({x:x-p,y:P-b}),t.add({x:x-p,y:u+p}),t.add({x:D+A,y:u+p})),K(t,Z)}),D("ortho",function(r,p,Y){var b=new j,R=r.s(S),q=r.s("edge.ortho"),Z=r._40I,O=r._41I,u=J(Y,r),x=u.x,k=u.y,G=f(Y,r),i=G.x,D=G.y,y=i-x,w=D-k,X=R?0:_(Y,Z)/2,W=R?0:C(Y,Z)/2,h=R?0:_(Y,O)/2,m=R?0:C(Y,O)/2,U=(y-(X+h)*(y>0?1:-1))*q,Q=(w-(W+m)*(w>0?1:-1))*q;return A(y)<A(w)?y>=0&&0>=w?(b.add({x:x+p,y:k-W}),b.add({x:x+p,y:k+Q+p-W}),b.add({x:i+p,y:k+Q+p-W}),b.add({x:i+p,y:D+m})):0>=y&&w>=0?(b.add({x:x+p,y:k+W}),b.add({x:x+p,y:k+Q+p+W}),b.add({x:i+p,y:k+Q+p+W}),b.add({x:i+p,y:D-m})):y>=0&&w>=0?(b.add({x:x+p,y:k+W}),b.add({x:x+p,y:k+Q-p+W}),b.add({x:i+p,y:k+Q-p+W}),b.add({x:i+p,y:D-m})):(b.add({x:x+p,y:k-W}),b.add({x:x+p,y:k+Q-p-W}),b.add({x:i+p,y:k+Q-p-W}),b.add({x:i+p,y:D+m})):y>=0&&0>=w?(b.add({x:x+X,y:k+p}),b.add({x:x+U+p+X,y:k+p}),b.add({x:x+U+p+X,y:D+p}),b.add({x:i-h,y:D+p})):0>=y&&w>=0?(b.add({x:x-X,y:k+p}),b.add({x:x+U+p-X,y:k+p}),b.add({x:x+U+p-X,y:D+p}),b.add({x:i+h,y:D+p})):y>=0&&w>=0?(b.add({x:x+X,y:k+p}),b.add({x:x+U-p+X,y:k+p}),b.add({x:x+U-p+X,y:D+p}),b.add({x:i-h,y:D+p})):(b.add({x:x-X,y:k+p}),b.add({x:x+U-p-X,y:k+p}),b.add({x:x+U-p-X,y:D+p}),b.add({x:i+h,y:D+p})),K(b,r)}),D("flex",function(X,o,q){var R=new j,$=X.s("edge.flex")+i(X,q),U=X.s(S),O=X._40I,x=X._41I,s=J(q,X),n=s.x,G=s.y,c=f(q,X),g=c.x,H=c.y,Z=g-n,W=H-G,l=U?0:_(q,O)/2,b=U?0:C(q,O)/2,k=U?0:_(q,x)/2,u=U?0:C(q,x)/2,d=Z>0?$:-$,P=W>0?$:-$;return A(Z)<A(W)?Z>=0&&0>=W?(R.add({x:n+o,y:G-b}),R.add({x:n+o,y:G+P+o-b}),R.add({x:g+o,y:H-P+o+u}),R.add({x:g+o,y:H+u})):0>=Z&&W>=0?(R.add({x:n+o,y:G+b}),R.add({x:n+o,y:G+P+o+b}),R.add({x:g+o,y:H-P+o-u}),R.add({x:g+o,y:H-u})):Z>=0&&W>=0?(R.add({x:n+o,y:G+b}),R.add({x:n+o,y:G+P-o+b}),R.add({x:g+o,y:H-P-o-u}),R.add({x:g+o,y:H-u})):(R.add({x:n+o,y:G-b}),R.add({x:n+o,y:G+P-o-b}),R.add({x:g+o,y:H-P-o+u}),R.add({x:g+o,y:H+u})):Z>=0&&0>=W?(R.add({x:n+l,y:G+o}),R.add({x:n+d+o+l,y:G+o}),R.add({x:g-d+o-k,y:H+o}),R.add({x:g-k,y:H+o})):0>=Z&&W>=0?(R.add({x:n-l,y:G+o}),R.add({x:n+d+o-l,y:G+o}),R.add({x:g-d+o+k,y:H+o}),R.add({x:g+k,y:H+o})):Z>=0&&W>=0?(R.add({x:n+l,y:G+o}),R.add({x:n+d-o+l,y:G+o}),R.add({x:g-d-o-k,y:H+o}),R.add({x:g-k,y:H+o})):(R.add({x:n-l,y:G+o}),R.add({x:n+d-o-l,y:G+o}),R.add({x:g-d-o+k,y:H+o}),R.add({x:g+k,y:H+o})),K(R,X)}),D("extend.east",function(N,W,q){var u=new j,U=N.s(G)+i(N,q),L=N.s(S),O=J(q,N),g=O.x+(L?0:_(q,N._40I)/2),Y=O.y,n=f(q,N),e=n.x+(L?0:_(q,N._41I)/2),X=n.y,y=E(g,e)+U;return Y>X?(u.add({x:g,y:Y+W}),u.add({x:y+W,y:Y+W}),u.add({x:y+W,y:X-W}),u.add({x:e,y:X-W})):(u.add({x:g,y:Y-W}),u.add({x:y+W,y:Y-W}),u.add({x:y+W,y:X+W}),u.add({x:e,y:X+W})),K(u,N)}),D("extend.west",function(Z,U,k){var H=new j,L=Z.s(G)+i(Z,k),x=Z.s(S),n=J(k,Z),$=n.x-(x?0:_(k,Z._40I)/2),Q=n.y,e=f(k,Z),c=e.x-(x?0:_(k,Z._41I)/2),W=e.y,l=I($,c)-L;return Q>W?(H.add({x:$,y:Q+U}),H.add({x:l-U,y:Q+U}),H.add({x:l-U,y:W-U}),H.add({x:c,y:W-U})):(H.add({x:$,y:Q-U}),H.add({x:l-U,y:Q-U}),H.add({x:l-U,y:W+U}),H.add({x:c,y:W+U})),K(H,Z)}),D("extend.north",function(b,$,z){var U=new j,B=b.s(G)+i(b,z),T=b.s(S),E=J(z,b),e=E.x,q=E.y-(T?0:C(z,b._40I)/2),W=f(z,b),d=W.x,A=W.y-(T?0:C(z,b._41I)/2),L=I(q,A)-B;return e>d?(U.add({y:q,x:e+$}),U.add({y:L-$,x:e+$}),U.add({y:L-$,x:d-$}),U.add({y:A,x:d-$})):(U.add({y:q,x:e-$}),U.add({y:L-$,x:e-$}),U.add({y:L-$,x:d+$}),U.add({y:A,x:d+$})),K(U,b)}),D("extend.south",function(e,Y,I){var V=new j,L=e.s(G)+i(e,I),b=e.s(S),t=J(I,e),x=t.x,d=t.y+(b?0:C(I,e._40I)/2),A=f(I,e),w=A.x,X=A.y+(b?0:C(I,e._41I)/2),B=E(d,X)+L;return x>w?(V.add({y:d,x:x+Y}),V.add({y:B+Y,x:x+Y}),V.add({y:B+Y,x:w-Y}),V.add({y:X,x:w-Y})):(V.add({y:d,x:x-Y}),V.add({y:B+Y,x:x-Y}),V.add({y:B+Y,x:w+Y}),V.add({y:X,x:w+Y})),K(V,e)});var r=function(Y,g,m,J,v){if(J.sort(function(M,i){var b=M.getSourceAgent()===g?M.getTargetAgent():M.getSourceAgent(),y=i.getSourceAgent()===g?i.getTargetAgent():i.getSourceAgent(),V=b.p(),z=y.p();if(m===e||m===w){if(V.y>z.y)return 1;if(V.y<z.y)return-1}else{if(V.x>z.x)return 1;if(V.x<z.x)return-1}return q.sortFunc(M.getId(),i.getId())}),v){for(var E,h,S,t=Y.getSourceAgent(),P=Y.getTargetAgent(),D=0;D<J.size();D++){var u=J.get(D);u.getSourceAgent()===t&&u.getTargetAgent()===P||u.getTargetAgent()===t&&u.getSourceAgent()===P?(h||(h=new j),h.add(u,0)):h?(S||(S=new j),S.add(u)):(E||(E=new j),E.add(u))}J.clear(),E&&J.addAll(E),h&&J.addAll(h),S&&J.addAll(S)}var I=J.indexOf(Y),n=J.size(),C=Y.s(y);return{side:m,index:I,size:n,offset:-C*(n-1)/2+C*I}},x=function(Q,h,b,T,B){var t=h.s(l);return r(h,b,T,b.getAgentEdges().toList(function(C){return Q.isVisible(C)&&C.s(l)===t}),B)},o=function(J,b){var s=J.getSourceAgent()===b?J.getTargetAgent():J.getSourceAgent(),E=b.p(),u=s.p(),q=u.x-E.x,x=u.y-E.y;return q>0&&A(x)<=q?w:0>q&&A(x)<=-q?e:x>0&&A(q)<=x?L:P},H=function(p,L,T){var G=L.s(l),E=o(L,T);return r(L,T,E,T.getAgentEdges().toList(function(Q){return p.isVisible(Q)&&Q.s(l)===G&&o(Q,T)===E}))},M=function(a,z){var f=a.getSourceAgent()===z,$=f?a.getTargetAgent():a.getSourceAgent(),g=z.p(),E=$.p();return f?g.y>E.y?P:L:g.x<E.x?w:e},u=function(R,c,D){var v=c.s(l),P=M(c,D);return r(c,D,P,D.getAgentEdges().toList(function(Y){return R.isVisible(Y)&&Y.s(l)===v&&M(Y,D)===P}),P===w||P===L)},v=function(k,s){var o=k.getSourceAgent()===s,M=o?k.getTargetAgent():k.getSourceAgent(),S=s.p(),v=M.p();return o?S.x<v.x?w:e:S.y>v.y?P:L},z=function(Q,E,K){var I=E.s(l),e=v(E,K);return r(E,K,e,K.getAgentEdges().toList(function(X){return Q.isVisible(X)&&X.s(l)===I&&v(X,K)===e}),e===w||e===L)},s=function(B,r,o){var N=B.getSourceAgent(),b=B.getTargetAgent(),G=N.getId()>b.getId(),T=G?b:N,A=G?N:b,p=T.p(),l=A.p(),q=o(r,B,T),R=o(r,B,A),t=B.s(S),s=t?0:_(r,T)/2,m=t?0:_(r,A)/2,Y=t?0:C(r,T)/2,h=t?0:C(r,A)/2,I=q.offset,y=R.offset,H=q.side,d=R.side,D=new j;return H===P?(D.add({x:p.x+I,y:p.y-Y}),D.add({x:p.x+I,y:l.y+y}),d===e?D.add({x:l.x-m,y:l.y+y}):D.add({x:l.x+m,y:l.y+y})):H===L?(D.add({x:p.x+I,y:p.y+Y}),D.add({x:p.x+I,y:l.y+y}),d===e?D.add({x:l.x-m,y:l.y+y}):D.add({x:l.x+m,y:l.y+y})):H===e?(D.add({x:p.x-s,y:p.y+I}),D.add({x:l.x+y,y:p.y+I}),d===L?D.add({x:l.x+y,y:l.y+h}):D.add({x:l.x+y,y:l.y-h})):H===w&&(D.add({x:p.x+s,y:p.y+I}),D.add({x:l.x+y,y:p.y+I}),d===L?D.add({x:l.x+y,y:l.y+h}):D.add({x:l.x+y,y:l.y-h})),G&&D.reverse(),K(D,B)};D("ortho2",function(i,x,f){var M,V,p=i.s(S),s=i.s("edge.ortho"),q=i.getSourceAgent(),R=i.getTargetAgent(),A=q.getId()>R.getId(),$=A?R:q,Y=A?q:R,u=$.p(),r=Y.p(),l=H(f,i,$),k=H(f,i,Y),Z=p?0:_(f,$)/2,n=p?0:C(f,$)/2,T=p?0:_(f,Y)/2,b=p?0:C(f,Y)/2,B=new j,I=l.offset,z=k.offset,t=l.side;return t===w?(M=r.y>u.y?-I:I,V=u.x+Z+(r.x-T-u.x-Z)*s,B.add({x:u.x+Z,y:u.y+I}),B.add({x:V+M,y:u.y+I}),B.add({x:V+M,y:r.y+z}),B.add({x:r.x-T,y:r.y+z})):t===e?(M=r.y>u.y?-I:I,V=u.x-Z-(u.x-Z-r.x-T)*s,B.add({x:u.x-Z,y:u.y+I}),B.add({x:V-M,y:u.y+I}),B.add({x:V-M,y:r.y+z}),B.add({x:r.x+T,y:r.y+z})):t===L?(M=r.x>u.x?-I:I,V=u.y+n+(r.y-b-u.y-n)*s,B.add({x:u.x+I,y:u.y+n}),B.add({x:u.x+I,y:V+M}),B.add({x:r.x+z,y:V+M}),B.add({x:r.x+z,y:r.y-b})):t===P&&(M=r.x>u.x?-I:I,V=u.y-n-(u.y-n-r.y-b)*s,B.add({x:u.x+I,y:u.y-n}),B.add({x:u.x+I,y:V-M}),B.add({x:r.x+z,y:V-M}),B.add({x:r.x+z,y:r.y+b})),A&&B.reverse(),K(B,i)},!0),D("flex2",function(A,q,z){var g,c=A.getSourceAgent(),I=A.getTargetAgent(),N=c.getId()>I.getId(),k=N?I:c,d=N?c:I,h=k.p(),D=d.p(),r=H(z,A,k),u=H(z,A,d),R=A.s(S),O=A.s("edge.flex")+(r.size-1)/2*A.s(y),F=R?0:_(z,k)/2,x=R?0:C(z,k)/2,n=R?0:_(z,d)/2,B=R?0:C(z,d)/2,i=new j,m=r.offset,T=u.offset,Q=r.side;return Q===w?(g=D.y>h.y?-m:m,i.add({x:h.x+F,y:h.y+m}),i.add({x:h.x+F+O+g,y:h.y+m}),i.add({x:D.x-n-O+g,y:D.y+T}),i.add({x:D.x-n,y:D.y+T})):Q===e?(g=D.y>h.y?-m:m,i.add({x:h.x-F,y:h.y+m}),i.add({x:h.x-F-O-g,y:h.y+m}),i.add({x:D.x+n+O-g,y:D.y+T}),i.add({x:D.x+n,y:D.y+T})):Q===L?(g=D.x>h.x?-m:m,i.add({x:h.x+m,y:h.y+x}),i.add({x:h.x+m,y:h.y+x+O+g}),i.add({x:D.x+T,y:D.y-B-O+g}),i.add({x:D.x+T,y:D.y-B})):Q===P&&(g=D.x>h.x?-m:m,i.add({x:h.x+m,y:h.y-x}),i.add({x:h.x+m,y:h.y-x-O-g}),i.add({x:D.x+T,y:D.y+B+O-g}),i.add({x:D.x+T,y:D.y+B})),N&&i.reverse(),K(i,A)},!0),D("extend.north2",function(r,p,Y){var a=r.getSourceAgent(),A=r.getTargetAgent(),s=a.getId()>A.getId(),m=s?A:a,M=s?a:A,V=m.p(),N=M.p(),L=x(Y,r,m,P),g=x(Y,r,M,P,!0),Z=r.s(S),k=Z?0:C(Y,m)/2,H=Z?0:C(Y,M)/2,X=L.offset,h=g.offset,q=r.s(G)+(L.size-1)/2*r.s(y),c=I(V.y-k,N.y-H)-q+(V.x<N.x?X:-X),T=new j;return T.add({x:V.x+X,y:V.y-k}),T.add({x:V.x+X,y:c}),T.add({x:N.x+h,y:c}),T.add({x:N.x+h,y:N.y-H}),s&&T.reverse(),K(T,r)},!0),D("extend.south2",function(m,d,Z){var X=m.getSourceAgent(),I=m.getTargetAgent(),P=X.getId()>I.getId(),l=P?I:X,g=P?X:I,k=l.p(),J=g.p(),h=x(Z,m,l,L),v=x(Z,m,g,L,!0),z=m.s(S),T=z?0:C(Z,l)/2,w=z?0:C(Z,g)/2,N=h.offset,M=v.offset,p=m.s(G)+(h.size-1)/2*m.s(y),F=E(k.y+T,J.y+w)+p+(k.x>J.x?N:-N),o=new j;return o.add({x:k.x+N,y:k.y+T}),o.add({x:k.x+N,y:F}),o.add({x:J.x+M,y:F}),o.add({x:J.x+M,y:J.y+w}),P&&o.reverse(),K(o,m)},!0),D("extend.west2",function(q,J,W){var Z=q.getSourceAgent(),D=q.getTargetAgent(),i=Z.getId()>D.getId(),$=i?D:Z,V=i?Z:D,u=$.p(),w=V.p(),E=x(W,q,$,P),U=x(W,q,V,P,!0),B=q.s(S),k=B?0:_(W,$)/2,l=B?0:_(W,V)/2,N=E.offset,n=U.offset,c=q.s(G)+(E.size-1)/2*q.s(y),Q=I(u.x-k,w.x-l)-c+(u.y<w.y?N:-N),g=new j;return g.add({x:u.x-k,y:u.y+N}),g.add({x:Q,y:u.y+N}),g.add({x:Q,y:w.y+n}),g.add({x:w.x-l,y:w.y+n}),i&&g.reverse(),K(g,q)},!0),D("extend.east2",function(Y,f,q){var M=Y.getSourceAgent(),R=Y.getTargetAgent(),D=M.getId()>R.getId(),U=D?R:M,p=D?M:R,e=U.p(),b=p.p(),o=x(q,Y,U,P),C=x(q,Y,p,P,!0),v=Y.s(S),u=v?0:_(q,U)/2,r=v?0:_(q,p)/2,N=o.offset,L=C.offset,I=Y.s(G)+(o.size-1)/2*Y.s(y),c=E(e.x+u,b.x+r)+I+(e.y>b.y?N:-N),n=new j;return n.add({x:e.x+u,y:e.y+N}),n.add({x:c,y:e.y+N}),n.add({x:c,y:b.y+L}),n.add({x:b.x+r,y:b.y+L}),D&&n.reverse(),K(n,Y)},!0),D("v.h2",function(F,H,K){return s(F,K,u)},!0),D("h.v2",function(A,l,H){return s(A,H,z)},!0)}(this,Object);