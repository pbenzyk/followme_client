(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{100:function(e,t,r){"use strict";var n=r(1),o=r(184);n.a.use(o.a),t.a=new o.a.Store({state:{},mutations:{},actions:{},modules:{}})},185:function(e,t,r){"use strict";var n=r(1);n.a.prototype.$ccc="text-4xl bg-green-600 p-6",n.a.prototype.$home={card:"text-4xl bg-green-600 p-6"},n.a.prototype.$url="https://admin.nectec-followme.tk/"},232:function(e,t,r){var content=r(440);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(27).default)("dc093880",content,!0,{sourceMap:!1})},388:function(e,t,r){var content=r(522);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(27).default)("5ea66c73",content,!0,{sourceMap:!1})},396:function(e,t,r){"use strict";var n=r(6),o=(r(28),r(55),r(58),r(93)),c=r(79),l={name:"DefaultLayout",data:function(){return{response:!1,user:{}}},created:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.checkToken();case 2:return t.next=4,o.a.setUser();case 4:return t.next=6,e.checkUser();case 6:return e.user=o.a.user,t.next=9,e.getUser();case 9:e.response=!0;case 10:case"end":return t.stop()}}),t)})))()},computed:{},methods:{logout:function(){return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.logout();case 2:return e.next=4,location.reload();case 4:case"end":return e.stop()}}),e)})))()},checkUser:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.getUser();case 2:if(t.sent.pk){t.next=8;break}return t.next=6,e.$router.replace("/authen/login");case 6:t.next=8;break;case 8:case"end":return t.stop()}}),t)})))()},getUser:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.a.getHttp("/api/v1/account/userprofile/".concat(e.user.pk,"/"));case 2:e.user=t.sent;case 3:case"end":return t.stop()}}),t)})))()}}},f=r(66),h=r(91),d=r.n(h),m=r(532),j=r(536),v=r(537),k=r(538),y=r(533),x=r(525),w=r(534),R=r(535),O=r(189),component=Object(f.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",{attrs:{dark:""}},[r("v-app-bar",{staticClass:"bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",attrs:{fixed:"",app:""}},[r("v-toolbar-title",[r("span",{staticClass:"fl text-white text-2xl"},[r("v-icon",{staticClass:"text-2xl text-white"},[e._v("mdi-dance-pole")]),e._v(" Follow Me")],1),e._v(" "),r("v-btn",{staticClass:"ml-1",attrs:{"x-small":"",elevation:"2"}},[e._v("Alpha 1.5")])],1),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{staticClass:"ml-2",attrs:{dark:"",text:""},on:{click:function(t){return e.$router.push("/")}}},[e._v("หน้าแรก")]),e._v(" "),r("v-btn",{staticClass:"ml-2",attrs:{dark:"",text:""},on:{click:function(t){return e.$router.push("/courses")}}},[e._v("ห้องเรียน")]),e._v(" "),e.user.is_staff?r("v-btn",{staticClass:"ml-2",attrs:{dark:"",text:""},on:{click:function(t){return e.$router.push("/mycourse")}}},[e._v("บทเรียนของฉัน")]):e._e(),e._v(" "),r("v-btn",{staticClass:"ml-2",attrs:{dark:"",text:""},on:{click:function(t){return e.$router.push("/profile")}}},[e._v("โปรไฟล์")]),e._v(" "),r("v-btn",{staticClass:"ml-2",attrs:{dark:"",text:""},on:{click:function(t){return e.logout()}}},[e._v("ออกจากระบบ")])],1),e._v(" "),r("v-main",[e.response?r("v-container",[r("Nuxt")],1):e._e()],1),e._v(" "),r("v-footer",{attrs:{app:""}},[r("span",[e._v("© "+e._s((new Date).getFullYear()))])])],1)}),[],!1,null,null,null);t.a=component.exports;d()(component,{VApp:m.a,VAppBar:j.a,VBtn:v.a,VContainer:k.a,VFooter:y.a,VIcon:x.a,VMain:w.a,VSpacer:R.a,VToolbarTitle:O.a})},397:function(e,t,r){"use strict";var n={name:"RootLayout"},o=(r(521),r(66)),c=r(91),l=r.n(c),f=r(532),component=Object(o.a)(n,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("v-app",[t("Nuxt")],1)],1)}),[],!1,null,null,null);t.a=component.exports;l()(component,{VApp:f.a})},40:function(e,t,r){"use strict";(function(e){var n=r(393),o=r.n(n),c={baseURL:e.env.baseURL||e.env.apiUrl||"https://admin.nectec-followme.tk"},l=o.a.create(c);t.a=l}).call(this,r(154))},409:function(e,t,r){r(410),e.exports=r(411)},439:function(e,t,r){"use strict";r(232)},440:function(e,t,r){var n=r(26)(!1);n.push([e.i,"h1[data-v-35e10596]{font-size:20px}",""]),e.exports=n},480:function(e,t,r){var map={"./af":242,"./af.js":242,"./ar":243,"./ar-dz":244,"./ar-dz.js":244,"./ar-kw":245,"./ar-kw.js":245,"./ar-ly":246,"./ar-ly.js":246,"./ar-ma":247,"./ar-ma.js":247,"./ar-sa":248,"./ar-sa.js":248,"./ar-tn":249,"./ar-tn.js":249,"./ar.js":243,"./az":250,"./az.js":250,"./be":251,"./be.js":251,"./bg":252,"./bg.js":252,"./bm":253,"./bm.js":253,"./bn":254,"./bn-bd":255,"./bn-bd.js":255,"./bn.js":254,"./bo":256,"./bo.js":256,"./br":257,"./br.js":257,"./bs":258,"./bs.js":258,"./ca":259,"./ca.js":259,"./cs":260,"./cs.js":260,"./cv":261,"./cv.js":261,"./cy":262,"./cy.js":262,"./da":263,"./da.js":263,"./de":264,"./de-at":265,"./de-at.js":265,"./de-ch":266,"./de-ch.js":266,"./de.js":264,"./dv":267,"./dv.js":267,"./el":268,"./el.js":268,"./en-au":269,"./en-au.js":269,"./en-ca":270,"./en-ca.js":270,"./en-gb":271,"./en-gb.js":271,"./en-ie":272,"./en-ie.js":272,"./en-il":273,"./en-il.js":273,"./en-in":274,"./en-in.js":274,"./en-nz":275,"./en-nz.js":275,"./en-sg":276,"./en-sg.js":276,"./eo":277,"./eo.js":277,"./es":278,"./es-do":279,"./es-do.js":279,"./es-mx":280,"./es-mx.js":280,"./es-us":281,"./es-us.js":281,"./es.js":278,"./et":282,"./et.js":282,"./eu":283,"./eu.js":283,"./fa":284,"./fa.js":284,"./fi":285,"./fi.js":285,"./fil":286,"./fil.js":286,"./fo":287,"./fo.js":287,"./fr":288,"./fr-ca":289,"./fr-ca.js":289,"./fr-ch":290,"./fr-ch.js":290,"./fr.js":288,"./fy":291,"./fy.js":291,"./ga":292,"./ga.js":292,"./gd":293,"./gd.js":293,"./gl":294,"./gl.js":294,"./gom-deva":295,"./gom-deva.js":295,"./gom-latn":296,"./gom-latn.js":296,"./gu":297,"./gu.js":297,"./he":298,"./he.js":298,"./hi":299,"./hi.js":299,"./hr":300,"./hr.js":300,"./hu":301,"./hu.js":301,"./hy-am":302,"./hy-am.js":302,"./id":303,"./id.js":303,"./is":304,"./is.js":304,"./it":305,"./it-ch":306,"./it-ch.js":306,"./it.js":305,"./ja":307,"./ja.js":307,"./jv":308,"./jv.js":308,"./ka":309,"./ka.js":309,"./kk":310,"./kk.js":310,"./km":311,"./km.js":311,"./kn":312,"./kn.js":312,"./ko":313,"./ko.js":313,"./ku":314,"./ku.js":314,"./ky":315,"./ky.js":315,"./lb":316,"./lb.js":316,"./lo":317,"./lo.js":317,"./lt":318,"./lt.js":318,"./lv":319,"./lv.js":319,"./me":320,"./me.js":320,"./mi":321,"./mi.js":321,"./mk":322,"./mk.js":322,"./ml":323,"./ml.js":323,"./mn":324,"./mn.js":324,"./mr":325,"./mr.js":325,"./ms":326,"./ms-my":327,"./ms-my.js":327,"./ms.js":326,"./mt":328,"./mt.js":328,"./my":329,"./my.js":329,"./nb":330,"./nb.js":330,"./ne":331,"./ne.js":331,"./nl":332,"./nl-be":333,"./nl-be.js":333,"./nl.js":332,"./nn":334,"./nn.js":334,"./oc-lnc":335,"./oc-lnc.js":335,"./pa-in":336,"./pa-in.js":336,"./pl":337,"./pl.js":337,"./pt":338,"./pt-br":339,"./pt-br.js":339,"./pt.js":338,"./ro":340,"./ro.js":340,"./ru":341,"./ru.js":341,"./sd":342,"./sd.js":342,"./se":343,"./se.js":343,"./si":344,"./si.js":344,"./sk":345,"./sk.js":345,"./sl":346,"./sl.js":346,"./sq":347,"./sq.js":347,"./sr":348,"./sr-cyrl":349,"./sr-cyrl.js":349,"./sr.js":348,"./ss":350,"./ss.js":350,"./sv":351,"./sv.js":351,"./sw":352,"./sw.js":352,"./ta":353,"./ta.js":353,"./te":354,"./te.js":354,"./tet":355,"./tet.js":355,"./tg":356,"./tg.js":356,"./th":357,"./th.js":357,"./tk":358,"./tk.js":358,"./tl-ph":359,"./tl-ph.js":359,"./tlh":360,"./tlh.js":360,"./tr":361,"./tr.js":361,"./tzl":362,"./tzl.js":362,"./tzm":363,"./tzm-latn":364,"./tzm-latn.js":364,"./tzm.js":363,"./ug-cn":365,"./ug-cn.js":365,"./uk":366,"./uk.js":366,"./ur":367,"./ur.js":367,"./uz":368,"./uz-latn":369,"./uz-latn.js":369,"./uz.js":368,"./vi":370,"./vi.js":370,"./x-pseudo":371,"./x-pseudo.js":371,"./yo":372,"./yo.js":372,"./zh-cn":373,"./zh-cn.js":373,"./zh-hk":374,"./zh-hk.js":374,"./zh-mo":375,"./zh-mo.js":375,"./zh-tw":376,"./zh-tw.js":376};function n(e){var t=o(e);return r(t)}function o(e){if(!r.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}n.keys=function(){return Object.keys(map)},n.resolve=o,e.exports=n,n.id=480},521:function(e,t,r){"use strict";r(388)},522:function(e,t,r){var n=r(26)(!1);n.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Itim&display=swap);"]),n.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap);"]),n.push([e.i,"@import url(https://fonts.googleapis.com/css2?family=Lobster&display=swap);"]),n.push([e.i,'*{font-family:"Noto Sans Thai",sans-serif!important}.fx{font-family:"Itim",cursive!important}.fl{font-family:"Lobster",cursive!important}',""]),e.exports=n},79:function(e,t,r){"use strict";r.d(t,"a",(function(){return F}));r(56);var n=r(6),o=r(16),c=r(17),l=r(29),f=r(23),h=r(11),d=r(12),m=(r(58),r(24),r(7),r(155),r(64)),j=r(40),v=r(394),k=r.n(v),y=r(183),x=r.n(y),w=r(100);function R(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Object(h.a)(e);if(t){var o=Object(h.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(f.a)(this,r)}}var O=function(e,t,r,desc){var n,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(c=(o<3?n(c):o>3?n(t,r,c):n(t,r))||c);return o>3&&c&&Object.defineProperty(t,r,c),c},_=function(e){Object(l.a)(k,e);var t,r,f,h,d,m,j,v=R(k);function k(){var e;return Object(o.a)(this,k),(e=v.apply(this,arguments)).loading=!1,e.loadTxt="Loading..",e.snackTxt="",e.snacking=!1,e.snackColor="success",e}return Object(c.a)(k,[{key:"onSnack",value:(j=Object(n.a)(regeneratorRuntime.mark((function e(t){var r,n=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.length>1&&void 0!==n[1]?n[1]:"success",e.next=3,this.offSnack();case 3:this.snacking=!0,this.snackTxt=t,this.snackColor=r;case 6:case"end":return e.stop()}}),e,this)}))),function(e){return j.apply(this,arguments)})},{key:"offSnack",value:(m=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.snacking=!1;case 1:case"end":return e.stop()}}),e,this)}))),function(){return m.apply(this,arguments)})},{key:"switchLoad",value:(d=Object(n.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.loading=t;case 1:case"end":return e.stop()}}),e,this)}))),function(e){return d.apply(this,arguments)})},{key:"onLoad",value:(h=Object(n.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.loadTxt=t,this.loading=!0;case 2:case"end":return e.stop()}}),e,this)}))),function(e){return h.apply(this,arguments)})},{key:"offLoad",value:(f=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.loading=!1;case 1:case"end":return e.stop()}}),e,this)}))),function(){return f.apply(this,arguments)})},{key:"alert",value:(r=Object(n.a)(regeneratorRuntime.mark((function e(){var title,t,text,r=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return title=r.length>0&&void 0!==r[0]?r[0]:"OK",t=r.length>1&&void 0!==r[1]?r[1]:"success",text=r.length>2&&void 0!==r[2]?r[2]:"",e.next=5,x.a.fire({icon:t,title:title,text:text,confirmButtonText:"OK"});case 5:case"end":return e.stop()}}),e)}))),function(){return r.apply(this,arguments)})},{key:"confirm",value:(t=Object(n.a)(regeneratorRuntime.mark((function e(){var title,t,r=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return title=r.length>0&&void 0!==r[0]?r[0]:"Are you sure ?",e.next=3,x.a.fire({title:title,showCancelButton:!0,confirmButtonText:"OK",cancelButtonText:"Cancel"}).then((function(e){return e.isConfirmed}));case 3:return t=e.sent,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})}]),k}(m.b),z=new(_=O([Object(m.a)({generateMutationSetters:!0})],_))({store:w.a,name:"Web"}),T=r(0),C=r.n(T);function S(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Object(h.a)(e);if(t){var o=Object(h.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(f.a)(this,r)}}var A=function(e,t,r,desc){var n,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(c=(o<3?n(c):o>3?n(t,r,c):n(t,r))||c);return o>3&&c&&Object.defineProperty(t,r,c),c},U=function(e){Object(l.a)(O,e);var t,r,f,h,d,m,v,y,x,w,R=S(O);function O(){var e;return Object(o.a)(this,O),(e=R.apply(this,arguments)).token=null,e.url=j.a.defaults.baseURL,e}return Object(c.a)(O,[{key:"getHttp",value:(w=Object(n.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.get(t).then((function(e){return e.data})).catch((function(e){return e.response.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),function(e){return w.apply(this,arguments)})},{key:"postHttpAlert",value:(x=Object(n.a)(regeneratorRuntime.mark((function e(t,form){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.post(t,form).then((function(e){return z.alert("Successfully Saved"),e.data})).catch((function(e){return z.alert("Failed to save data","error"),console.log(e),e.response.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),function(e,t){return x.apply(this,arguments)})},{key:"postHttp",value:(y=Object(n.a)(regeneratorRuntime.mark((function e(t,form){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.post(t,form).then((function(e){return e.data})).catch((function(e){return e.response.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),function(e,t){return y.apply(this,arguments)})},{key:"putHttp",value:(v=Object(n.a)(regeneratorRuntime.mark((function e(t,form){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.put(t,form).then((function(e){return e.data})).catch((function(e){return e.response.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),function(e,t){return v.apply(this,arguments)})},{key:"putHttpAlert",value:(m=Object(n.a)(regeneratorRuntime.mark((function e(t,form){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.confirm("Are you sure you want to edit the information?");case 2:if(!e.sent){e.next=7;break}return e.next=6,j.a.put(t,form).then((function(e){return z.alert("Successfully edited"),e.data})).catch((function(e){return z.alert("Failed to edit data","error"),e.response.data}));case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)}))),function(e,t){return m.apply(this,arguments)})},{key:"deleteHttp",value:(d=Object(n.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.delete(t).then((function(e){return e.data})).catch((function(e){return e.response.data}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),function(e){return d.apply(this,arguments)})},{key:"deleteHttpAlert",value:(h=Object(n.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.confirm("Are you sure you want to delete the data?");case 2:if(!e.sent){e.next=7;break}return e.next=6,j.a.delete(t).then((function(e){return z.alert("Successfully deleted"),e.data})).catch((function(e){return z.alert("Failed to delete data","error"),e.response.data}));case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)}))),function(e){return h.apply(this,arguments)})},{key:"putFileHttpAlert",value:(f=Object(n.a)(regeneratorRuntime.mark((function e(t,form){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.confirm("Are you sure you want to edit the information?");case 2:if(!e.sent){e.next=7;break}return e.next=6,j.a.put(t,form,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){return z.alert("Successfully edited"),e.data})).catch((function(e){return z.alert("Failed to edit data","error"),e.response.data}));case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)}))),function(e,t){return f.apply(this,arguments)})},{key:"postFileHttpAlert",value:(r=Object(n.a)(regeneratorRuntime.mark((function e(t,form){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.confirm("Are you sure you want to Upload the information?");case 2:if(!e.sent){e.next=7;break}return e.next=6,j.a.post(t,form,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){return z.alert("Successfully Upload"),e.data})).catch((function(e){return z.alert("Failed to Upload data","error"),e.response.data}));case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)}))),function(e,t){return r.apply(this,arguments)})},{key:"fillData",value:function(e,t,r){return k.a.find(e,(function(e){return e[t]==r}))}},{key:"convertDate",value:function(e){return C()(e).format("DD/MM/YYYY")}},{key:"getBase64",value:(t=Object(n.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,r){var n=new FileReader;n.readAsDataURL(t),n.onload=function(){return e(n.result)},n.onerror=function(e){return r(e)}})));case 1:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})}]),O}(m.b),F=new(U=A([Object(m.a)({generateMutationSetters:!0})],U))({store:w.a,name:"Core"})},80:function(e,t,r){"use strict";var n={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},o=(r(439),r(66)),c=r(91),l=r.n(c),f=r(532),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",{attrs:{dark:""}},[404===e.error.statusCode?r("h1",[e._v("\n    "+e._s(e.pageNotFound)+"\n  ")]):r("h1",[e._v("\n    "+e._s(e.otherError)+"\n  ")]),e._v(" "),r("NuxtLink",{attrs:{to:"/"}},[e._v("\n    Home page\n  ")])],1)}),[],!1,null,"35e10596",null);t.a=component.exports;l()(component,{VApp:f.a})},93:function(e,t,r){"use strict";r.d(t,"a",(function(){return R}));var n=r(6),o=r(16),c=r(17),l=r(29),f=r(23),h=r(11),d=r(12),m=(r(58),r(24),r(7),r(56),r(64)),j=r(79),v=r(40),k=r(100);function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Object(h.a)(e);if(t){var o=Object(h.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(f.a)(this,r)}}var x=function(e,t,r,desc){var n,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(c=(o<3?n(c):o>3?n(t,r,c):n(t,r))||c);return o>3&&c&&Object.defineProperty(t,r,c),c},w=function(e){Object(l.a)(_,e);var t,r,f,h,d,m,k,x,w,R,O=y(_);function _(){var e;return Object(o.a)(this,_),(e=O.apply(this,arguments)).token=localStorage.getItem("token"),e.user=null,e}return Object(c.a)(_,[{key:"setUser",value:(R=Object(n.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.getHttp("/api/v1/auth/user/");case 2:return t=e.sent,this.user=t,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e,this)}))),function(){return R.apply(this,arguments)})},{key:"getUser",value:(w=Object(n.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.getHttp("/api/v1/auth/user/");case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),function(){return w.apply(this,arguments)})},{key:"register",value:(x=Object(n.a)(regeneratorRuntime.mark((function e(form){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.reToken();case 2:return e.next=4,j.a.postHttp("/api/v2/auth/register/",form);case 4:if(!(t=e.sent).id){e.next=9;break}return e.abrupt("return",t);case 9:return e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e,this)}))),function(e){return x.apply(this,arguments)})},{key:"login",value:(k=Object(n.a)(regeneratorRuntime.mark((function e(form){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.reToken();case 2:return e.next=4,j.a.postHttp("/api/v1/auth/login/",form);case 4:if(!(t=e.sent).key){e.next=15;break}return r=t.key,console.log(r),e.next=10,this.storeToken(r);case 10:return e.next=12,this.storeTokenToStorage(r);case 12:return e.abrupt("return",r);case 15:alert("ไม่สามารถเข้าสู่ระบบได้กรุณาตรวจสอบข้อมูลให้ถูกต้อง");case 16:case"end":return e.stop()}}),e,this)}))),function(e){return k.apply(this,arguments)})},{key:"reToken",value:(m=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:v.a.defaults.headers.common.Authorization="";case 1:case"end":return e.stop()}}),e)}))),function(){return m.apply(this,arguments)})},{key:"storeToken",value:(d=Object(n.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t),v.a.defaults.headers.common.Authorization=null!=t?"Token ".concat(t):"";case 2:case"end":return e.stop()}}),e)}))),function(e){return d.apply(this,arguments)})},{key:"storeTokenToStorage",value:(h=Object(n.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:localStorage.setItem("token",t);case 1:case"end":return e.stop()}}),e)}))),function(e){return h.apply(this,arguments)})},{key:"checkToken",value:(f=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null==this.token){e.next=3;break}return e.next=3,this.storeToken(this.token);case 3:case"end":return e.stop()}}),e,this)}))),function(){return f.apply(this,arguments)})},{key:"checkUser",value:(r=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),function(){return r.apply(this,arguments)})},{key:"logout",value:(t=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return localStorage.clear(),e.next=3,j.a.postHttp("/api/v1/auth/logout/",{});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})}]),_}(m.b),R=new(w=x([Object(m.a)({generateMutationSetters:!0})],w))({store:k.a,name:"Auth"})}},[[409,19,4,20]]]);