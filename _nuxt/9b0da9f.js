(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{927:function(e,t,r){"use strict";r.r(t);var n=r(6),o=(r(28),r(55),r(58),r(79),r(93)),c={layout:"root",data:function(){return{form:{}}},created:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.checkUser();case 2:case"end":return t.stop()}}),t)})))()},methods:{login:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.login(e.form);case 2:return t.next=4,o.a.getUser();case 4:if(r=t.sent,console.log(r),!r.pk){t.next=11;break}return t.next=9,e.$router.replace("/");case 9:return t.next=11,location.reload();case 11:case"end":return t.stop()}}),t)})))()},checkUser:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.getUser();case 2:if(!t.sent.pk){t.next=6;break}return t.next=6,e.$router.replace("/");case 6:case"end":return t.stop()}}),t)})))()}}},l=r(66),m=r(91),f=r.n(m),d=r(537),v=r(915),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"h-screen flex"},[e._m(0),e._v(" "),r("div",{staticClass:"flex w-1/2 justify-center items-center bg-white"},[r("form",{staticClass:"bg-white"},[r("h1",{staticClass:"text-gray-800 font-bold text-2xl mb-1"},[e._v("Sign In")]),e._v(" "),r("p",{staticClass:"text-sm font-normal text-gray-600 mb-7"},[e._v("Welcome Back")]),e._v(" "),r("form",{on:{submit:function(t){return t.preventDefault(),e.login()}}},[r("v-text-field",{attrs:{required:"",outlined:"",name:"name",label:"Username",id:"id"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}}),e._v(" "),r("v-text-field",{attrs:{required:"",outlined:"",name:"name",label:"Password",id:"id"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e._v(" "),r("v-btn",{attrs:{block:"",type:"submit",color:"success"}},[e._v("เข้าสู่ระบบ")])],1),e._v(" "),r("span",{staticClass:"text-sm ml-2 hover:text-blue-500 cursor-pointer"},[e._v("Forgot Password ?")])])])])])}),[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center"},[r("div",[r("h1",{staticClass:"text-white font-bold text-4xl font-sans"},[e._v("Follow Me")]),e._v(" "),r("p",{staticClass:"text-white mt-1"},[e._v("ระบบการฝึกเคลื่อนไหวร่างกายแบบออนไลน์ by NECTEC")]),e._v(" "),r("button",{staticClass:"block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2",attrs:{type:"submit"}},[e._v("Alpha v.01a")])])])}],!1,null,null,null);t.default=component.exports;f()(component,{VBtn:d.a,VTextField:v.a})}}]);