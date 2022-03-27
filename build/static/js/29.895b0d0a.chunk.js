(this["webpackJsonp@flyby-auction/interface"]=this["webpackJsonp@flyby-auction/interface"]||[]).push([[29],{2429:function(e,t,a){"use strict";a.r(t),a.d(t,"fields",(function(){return l}));var n,l,r=a(2),c=a.n(r),u=a(21),o=a(19),m=a(0),i=a.n(m),s=a(38),d=a(1225),E=a.n(d),b=a(1313),g=a(24),j=a(1127),O=a(30),T=a(31),f=a(1278),v=a(177),p=a(1385),N=a(176),S=a(1386),h=a(1226),D=a(1174),C=a(7),A=a(1173),y=a(1387),I=a.n(y),w=a(8).c.img(n||(n=Object(C.a)(["\n    max-width: 60px;\n    max-height: 80px;\n    width: 100%!important;\n    height: 100%!important;\n"]))),k=function(e){var t,a=e.handleSelectAuctionType,n=Object(N.a)(),l=Object(o.a)(n,1)[0];return i.a.createElement(i.a.Fragment,null,i.a.createElement(D.o,{style:{justifyContent:"center"},gap:"10%"},i.a.createElement(D.d,null,i.a.createElement(w,{width:"149",height:"204",src:I.a,alt:"batch auction icon"}),i.a.createElement(D.n,{onClick:function(){return a("crowdsale")}},i.a.createElement(D.m,{id:"crowdsale-option",type:"radio",defaultChecked:!0}),i.a.createElement(D.k,{htmlFor:"crowdsale-option"}),i.a.createElement(D.h,{className:"check"}),i.a.createElement(A.a,{size:"1.2rem",style:{marginTop:0}},null===(t=l.language)||void 0===t?void 0:t.CROW_SALE)))))},x=function(e){var t,a,n,l,r,c,u,m=e.addressErr,s=e.address,d=e.handleSelectToken,E=e.amountErr,b=e.amount,g=e.onInputAmount,j=e.allowance,O=e.symbol,T=e.name,f=e.balance,v=e.handleApprove,p=Object(N.a)(),S=Object(o.a)(p,1)[0];return i.a.createElement(i.a.Fragment,null,i.a.createElement(D.b,null,i.a.createElement(D.c,null,i.a.createElement(A.a,{size:"2rem"},null===(t=S.language)||void 0===t?void 0:t.CROW_SALE_TOKEN),i.a.createElement(D.p,{err:!!m,type:"text",value:s,placeholder:"Paste the address of token you would like to crow sale",required:!0,onChange:function(e){d(e.target.value)}}),m?i.a.createElement(D.u,null,m):"",i.a.createElement(A.a,{size:"2rem"},null===(a=S.language)||void 0===a?void 0:a.TOKEN_AMOUNT),i.a.createElement(D.a,{value:b,onChange:function(e){return g(e.target.value.replace(/,/g,"."))},disabled:!(!m&&s),type:"text",placeholder:"0.000000 ".concat(O),required:!0}),E?i.a.createElement(D.u,null,E):"",b&&Number(b)>j?i.a.createElement(D.e,{onClick:v},null===(n=S.language)||void 0===n?void 0:n.APPROVE_TOKEN):i.a.createElement(i.a.Fragment,null)),i.a.createElement(D.c,{style:{display:"flex",alignItems:"center"}},i.a.createElement(D.C,null,i.a.createElement(A.a,null,null===(l=S.language)||void 0===l?void 0:l.TOKENINFO),s?i.a.createElement(D.n,null,i.a.createElement(A.a,null,null===(r=S.language)||void 0===r?void 0:r.TOKEN,": "),i.a.createElement(A.a,null,T," ( ",O," )")):"",i.a.createElement(D.n,null,i.a.createElement(A.a,null,null===(c=S.language)||void 0===c?void 0:c.YOUR_TOKEN_BALANCE,": "),i.a.createElement(A.a,null,f)),i.a.createElement(D.n,null,i.a.createElement(A.a,null,null===(u=S.language)||void 0===u?void 0:u.YOUR_TOKEN_ALLOWANCE,": "),i.a.createElement(A.a,null,j))))))},U=a(1708),_=function(e){var t,a,n,l,r=e.paymentCurrency,c=e.minPrice,u=e.handleChangeMinPrice,m=e.setPaymentCurrency,s=e.rate,d=e.handleSetTime,E=e.handleGetTime,b=e.timeValid,g=e.setRate,j=(e.tokensPaymentInTokensSale,e.setTokensPaymentInTokensSale,e.symbol),f=(e.amount,Object(N.a)()),v=Object(o.a)(f,1)[0],p=Object(O.b)().chainId;return i.a.createElement(i.a.Fragment,null,i.a.createElement(D.t,null,i.a.createElement(D.s,{className:"left"},i.a.createElement(A.a,{size:"2rem"},null===(t=v.language)||void 0===t?void 0:t.PAYMENT_CURRENCY),i.a.createElement(D.A,null,i.a.createElement(D.i,{className:r===T.j.NATIVE.address[p]?"active":"",onClick:function(){return m(T.j.NATIVE.address[p])}},i.a.createElement(D.j,{src:T.j.NATIVE.logo[p]}),"\xa0\xa0",T.j.NATIVE.symbol[p]),i.a.createElement(D.i,{className:r===T.j.USDC.address[p]?"active":"",onClick:function(){return m(T.j.USDC.address[p])}},i.a.createElement(D.j,{src:T.j.USDC.logo[p]}),"\xa0\xa0",T.j.USDC.symbol[p]),i.a.createElement(D.i,{className:r===T.j.USDT.address[p]?"active":"",onClick:function(){return m(T.j.USDT.address[p])}},i.a.createElement(D.j,{src:T.j.USDT.logo[p]}),"\xa0\xa0",T.j.USDT.symbol[p]),i.a.createElement(D.i,{className:r===T.j.DAI.address[p]?"active":"",onClick:function(){return m(T.j.DAI.address[p])}},i.a.createElement(D.j,{src:T.j.DAI.logo[p]}),"\xa0\xa0",T.j.DAI.symbol[p])),i.a.createElement(D.r,null)),i.a.createElement(D.s,{className:"right"},i.a.createElement(D.r,null),i.a.createElement(A.a,{size:"2rem"},null===(a=v.language)||void 0===a?void 0:a.CROW_SALE_SETTING),i.a.createElement(A.a,{size:"1rem"},null===(n=v.language)||void 0===n?void 0:n.MIN_PRICE),i.a.createElement(D.l,{type:"text",placeholder:"0.000000 ".concat(r===T.j.NATIVE.address[p]?T.j.NATIVE.symbol[p]:r===T.j.USDC.address[p]?"USDC":r===T.j.USDT.address[p]?"USDT":"DAI"),value:c,onChange:function(e){u(e.target.value.replace(/,/g,"."))},pattern:"^[0-9]*[.,]?[0-9]*$",inputMode:"decimal",autoComplete:"off",autoCorrect:"off",minLength:1,maxLength:79}),i.a.createElement(D.r,null),i.a.createElement(A.a,{size:"1rem"},null===(l=v.language)||void 0===l?void 0:l.RATE),i.a.createElement(D.l,{type:"text",placeholder:"Number of token units a buyer gets per wei or token",value:s,pattern:"^[0-9]*[.,]?[0-9]*$",inputMode:"decimal",autoComplete:"off",autoCorrect:"off",minLength:1,maxLength:79,onChange:function(e){g(e.target.value.replace(/,/g,"."))}}),i.a.createElement(D.r,null),s&&0!==Number(s)?i.a.createElement("p",null,"Your token will have a ratio of 1 ".concat(r===T.j.NATIVE.address[p]?T.j.NATIVE.symbol[p]:r===T.j.USDC.address[p]?"USDC":r===T.j.USDT.address[p]?"USDT":"DAI"," for ").concat(1/s," ").concat(j)):i.a.createElement(i.a.Fragment,null),i.a.createElement(D.r,null),i.a.createElement(U.a,{setTime:d,getTime:E}),b?i.a.createElement(D.u,null,b):i.a.createElement(i.a.Fragment,null))))},P=a(1388),R=function(e){var t,a,n,l,r,c,u,m,s,d,E=e.name,b=e.address,g=e.symbol,j=e.amount,f=e.rate,v=e.paymentCurrency,p=e.account,S=e.minPrice,h=e.startDate,C=e.startTime,A=e.endDate,y=e.endTime,I=Object(N.a)(),w=Object(o.a)(I,1)[0],k=Object(O.b)().chainId;return i.a.createElement(i.a.Fragment,null,i.a.createElement(D.B,null,i.a.createElement(D.z,null,i.a.createElement(D.q,null,i.a.createElement(D.w,null,null===(t=w.language)||void 0===t?void 0:t.AUCTION_TYPE),i.a.createElement(D.x,null,null===(a=w.language)||void 0===a?void 0:a.CROW_SALE)),i.a.createElement(D.q,null,i.a.createElement(D.w,null,null===(n=w.language)||void 0===n?void 0:n.AUCTION_TOKEN),i.a.createElement(D.x,null,b),i.a.createElement(D.x,null,E," (",g,")")),i.a.createElement(D.q,null,i.a.createElement(D.w,null,null===(l=w.language)||void 0===l?void 0:l.AUCTION_TOKEN_AMOUNT),i.a.createElement(D.x,null,j)),i.a.createElement(D.q,null,i.a.createElement(D.w,null,null===(r=w.language)||void 0===r?void 0:r.CROWD_SALE_RATE),i.a.createElement(D.x,null,f)),i.a.createElement(D.q,null,i.a.createElement(D.x,null,"Your token will have a ratio of 1 ".concat(v===T.j.NATIVE.address[k]?T.j.NATIVE.symbol[k]:v===T.j.USDC.address[k]?"USDC":v===T.j.USDT.address[k]?"USDT":"DAI"," for ").concat(1/f," ").concat(g)))),i.a.createElement(D.z,null,i.a.createElement(D.q,null,i.a.createElement(D.w,null,null===(c=w.language)||void 0===c?void 0:c.PAYMENT_CURRENCY),i.a.createElement(D.x,null,v===T.j.NATIVE.address[k]?T.j.NATIVE.fullName[k]:v===T.j.USDT.address[k]?"Tether (USDT)":v===T.j.USDC.address[k]?"USD Coin (USDC)":"Dai (DAI)")),i.a.createElement(D.q,null,i.a.createElement(D.w,null,null===(u=w.language)||void 0===u?void 0:u.FUND_WALLET),i.a.createElement(D.x,null,p)),i.a.createElement(D.q,null,i.a.createElement(D.w,null,null===(m=w.language)||void 0===m?void 0:m.PRICE_SETTING),i.a.createElement(D.x,null,null===(s=w.language)||void 0===s?void 0:s.MIN_PRICE),i.a.createElement(D.x,null,S," ",v===T.j.NATIVE.address[k]?T.j.NATIVE.symbol[k]:v===T.j.USDT.address[k]?"USDT":v===T.j.USDC.address[k]?"USDC":"DAI")),i.a.createElement(D.q,null,i.a.createElement(D.w,null,null===(d=w.language)||void 0===d?void 0:d.AUCTION_START_AND_END),i.a.createElement(D.x,null,new Date("".concat(h," ").concat(C)).toString()),i.a.createElement(D.x,null,new Date("".concat(A," ").concat(y)).toString()))),i.a.createElement(P.a,null)))};!function(e){e.startDate="startDate",e.startTime="startTime",e.endDate="endDate",e.endTime="endTime"}(l||(l={}));var V=new Date;t.default=function(){var e,t,a=Object(m.useState)(1),n=Object(o.a)(a,2),r=n[0],d=n[1],C=Object(m.useState)("crowdsale"),A=Object(o.a)(C,2),y=A[0],I=A[1],w=Object(O.b)().account,U=Object(m.useState)(""),P=Object(o.a)(U,2),Y=P[0],F=P[1],L=Object(m.useState)(0),M=Object(o.a)(L,2),q=M[0],W=M[1],z=Object(m.useState)(0),K=Object(o.a)(z,2),B=K[0],G=K[1],H=Object(m.useState)(""),J=Object(o.a)(H,2),$=J[0],X=J[1],Q=Object(m.useState)(""),Z=Object(o.a)(Q,2),ee=Z[0],te=Z[1],ae=Object(m.useState)(""),ne=Object(o.a)(ae,2),le=ne[0],re=ne[1],ce=Object(m.useState)(""),ue=Object(o.a)(ce,2),oe=ue[0],me=ue[1],ie=Object(m.useState)(""),se=Object(o.a)(ie,2),de=se[0],Ee=se[1],be=Object(m.useState)(""),ge=Object(o.a)(be,2),je=ge[0],Oe=ge[1],Te=Object(m.useState)(""),fe=Object(o.a)(Te,2),ve=fe[0],pe=fe[1],Ne=Object(m.useState)(""),Se=Object(o.a)(Ne,2),he=Se[0],De=Se[1],Ce=Object(m.useState)(E.a.utc(V.getTime()+1728e5).format("YYYY-MM-DD")),Ae=Object(o.a)(Ce,2),ye=Ae[0],Ie=Ae[1],we=Object(m.useState)("00:00:00"),ke=Object(o.a)(we,2),xe=ke[0],Ue=ke[1],_e=Object(m.useState)(E.a.utc(V.getTime()+7776e5).format("YYYY-MM-DD")),Pe=Object(o.a)(_e,2),Re=Pe[0],Ve=Pe[1],Ye=Object(m.useState)("00:00:00"),Fe=Object(o.a)(Ye,2),Le=Fe[0],Me=Fe[1],qe=Object(m.useState)(""),We=Object(o.a)(qe,2),ze=We[0],Ke=We[1],Be=Object(N.a)(),Ge=Object(o.a)(Be,2),He=Ge[0],Je=Ge[1],$e=Object(m.useState)(""),Xe=Object(o.a)($e,2),Qe=Xe[0],Ze=Xe[1],et=Object(s.g)(),tt=Object(O.f)(),at=Object(O.g)(),nt=Object(f.a)(),lt=Object(p.a)().createCrowSale,rt=Object(O.d)(Y,w),ct=rt.getBalance,ut=rt.getAllowance,ot=rt.getName,mt=rt.getSymbol,it=Object(O.b)().chainId,st=Object(O.d)(je,w).getDecimals,dt=function(){var e=Object(u.a)(c.a.mark((function e(t){var a,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Object(g.e)(t)){e.next=10;break}return e.next=3,tt(t);case 3:return a=e.sent,e.next=6,at(t);case 6:n=e.sent,a?n?(F(t),X("")):X("Token is not decimals 18"):X("Token not found"),e.next=11;break;case 10:X("Invalid address");case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Et=function(){var e=Object(u.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,nt(Y,T.d[it],j.b);case 2:return t=e.sent,e.next=5,Je.updateTransactionPending(!0);case 5:return e.next=7,t.wait();case 7:Je.updateTransactionPending(!1),ut(T.d[it]).then((function(e){G(e)}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),bt=function(){var e=Object(u.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(""===t||v.c.test(Object(v.b)(t)))&&pe(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),gt=function(){var e=Object(u.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(""===t||v.c.test(Object(v.b)(t)))&&De(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),jt=function(){var e=!1;if(1!==r||y||(e=!0),2!==r||Y&&le&&0!==B&&0!==Number(le)||(e=!0),3===r){"crowdsale"!==y||je&&ve&&he&&!(Number(ve)>Number(le)*Number(he))||(e=!0,console.log("aa"));var t=new Date("".concat(ye," ").concat(xe)).getTime()/1e3,a=new Date("".concat(Re," ").concat(Le)).getTime()/1e3;Number(ve)>Number(le)*Number(he)&&Ke("Amount of FBS and "),Number(t)>=Number(a)||Number(t)<=Number(V.getTime())/1e3?(Ke("Please check your setting time"),e=!0):Ke("")}return He.transactionPending&&(e=!0),console.log(Number(ve),Number(le)*Number(he),Number(ve)>Number(le)*Number(he)),i.a.createElement(i.a.Fragment,null,i.a.createElement(D.f,{disabled:e,onClick:function(){r<4&&d(r+1),4===r&&!1===e&&Ot()}},4===r?"DEPLOY":3===r?"REVIEW":"NEXT"))},Ot=function(){var e=Object(u.a)(c.a.mark((function e(){var t,a,n,l,r,u,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("crowdsale"!==y){e.next=20;break}if(t=Object(v.e)(le,18),a=b.a.BigNumber.from(t.toString()).toHexString(),je!==T.j.NATIVE.address[it]){e.next=7;break}e.t0=18,e.next=10;break;case 7:return e.next=9,st();case 9:e.t0=e.sent;case 10:return n=e.t0,Object(v.e)(ve,n),l=b.a.utils.parseUnits(he,n),r=Object(v.e)(he,18),u=b.a.BigNumber.from(r.toString()).toHexString(),e.next=17,lt(1,Y,a,[T.d[it],Y,je,a,new Date("".concat(ye," ").concat(xe)).getTime()/1e3,new Date("".concat(Re," ").concat(Le)).getTime()/1e3,u,l,w,T.a,w]);case 17:return(o=e.sent)&&et.push("/auctions/".concat(o)),e.abrupt("return",o);case 20:return e.abrupt("return");case 21:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(m.useEffect)((function(){Y&&(ct().then((function(e){W(e)})),ut(T.d[it]).then((function(e){G(e)})),ot().then((function(e){me(e)})),mt().then((function(e){Ee(e)})))}),[Y,ut,ct,ot,mt,B]),i.a.createElement(D.y,null,i.a.createElement(h.a,null),4!==r?i.a.createElement(D.v,null,null===(e=He.language)||void 0===e?void 0:e.CREATE_CROW_SALE):i.a.createElement(D.v,null,null===(t=He.language)||void 0===t?void 0:t.CONFIRM_CROW_SALE),i.a.createElement(S.a,{percent:r}),1===r?i.a.createElement(i.a.Fragment,null,i.a.createElement(k,{handleSelectAuctionType:function(e){I(e)}})):2===r?i.a.createElement(i.a.Fragment,null,i.a.createElement(x,{addressErr:$,address:Y,handleSelectToken:dt,amountErr:ee,amount:le,onInputAmount:function(e){""===e||v.c.test(Object(v.b)(e))?Number(e)<=q?(re(e),te("")):te("Insufficient Balance"):te("Input number")},allowance:B,symbol:de,name:oe,balance:q,handleApprove:Et})):3===r?i.a.createElement(i.a.Fragment,null,i.a.createElement(_,{paymentCurrency:je,minPrice:ve,handleChangeMinPrice:bt,setPaymentCurrency:Oe,rate:he,handleSetTime:function(e,t){t===l.startDate&&Ie(e),t===l.startTime&&Ue(e),t===l.endDate&&Ve(e),t===l.endTime&&Me(e)},handleGetTime:function(e){return e===l.startDate?ye:e===l.startTime?xe:e===l.endDate?Re:e===l.endTime?Le:void 0},timeValid:ze,setRate:gt,tokensPaymentInTokensSale:Qe,setTokensPaymentInTokensSale:Ze,symbol:de,amount:le})):i.a.createElement(i.a.Fragment,null,i.a.createElement(R,{name:oe,address:Y,symbol:de,amount:le,rate:he,paymentCurrency:je,account:w,minPrice:ve,startDate:ye,startTime:xe,endDate:Re,endTime:Le})),i.a.createElement(D.o,{className:"button-group"},i.a.createElement(D.g,{disabled:1===r,onClick:function(){r>1&&d(r-1)}},"PREVIOUS"),i.a.createElement(jt,null)))}}}]);
//# sourceMappingURL=29.895b0d0a.chunk.js.map