(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{922:function(t,e,r){"use strict";r.r(e);var o=r(6),n=(r(37),r(39),r(58),r(93)),l=r(79),c={data:function(){return{course:{},lists:[],form:{},dialogUpload:!1,dialogResultView:!1,dialogViewTeacher:!1,result:{}}},computed:{user:function(){return n.a.user}},created:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.loadCourse();case 2:return e.next=4,t.loadResult();case 4:case"end":return e.stop()}}),e)})))()},methods:{loadCourse:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.getHttp("/api/v1/course/course/".concat(t.$route.query.id,"/"));case 2:t.course=e.sent;case 3:case"end":return e.stop()}}),e)})))()},loadResult:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.getHttp("/api/v1/course/coursestudentvideo/?user=".concat(t.user.pk,"&course").concat(t.$route.query.id,"/"));case 2:t.lists=e.sent;case 3:case"end":return e.stop()}}),e)})))()},saveResult:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var video,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return video=t.$refs.video_result.files[0],(r=new FormData).append("name",t.form.name),r.append("video",video),r.append("course",t.$route.query.id),r.append("user",t.user.pk),console.log(r),e.next=9,l.a.postFileHttpAlert("/api/v1/course/coursestudentvideo/",r);case 9:return e.sent,t.$refs.form_result.reset(),t.dialogUpload=!1,t.form={},e.next=15,t.loadResult();case 15:case"end":return e.stop()}}),e)})))()},deleteResult:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,l.a.deleteHttpAlert("/api/v1/course/coursestudentvideo/".concat(t,"/"));case 2:return r.sent,r.next=5,e.loadResult();case 5:case"end":return r.stop()}}),r)})))()},getResult:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:e.result=t,e.dialogResultView=!0;case 2:case"end":return r.stop()}}),r)})))()},dateConvert:function(data){return l.a.convertDate(data)}}},v=r(66),d=r(91),m=r.n(d),f=r(537),_=r(681),x=r(584),w=r(920),h=r(525),C=r(685),V=r(639),R=r(687),k=r(784),y=r(582),T=r(535),$=r(915),j=r(46),component=Object(v.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("Bg-Course"),t._v(" "),r("div",{staticClass:"relative pt-10"},[r("h3",{staticClass:"mb-4 text-3xl font-bold "},[t._v(t._s(t.course.name))]),t._v(" "),r("div",{staticClass:"relative px-8 lg:pr-0 lg:pl-12 2xl:pl-24 mb-14 lg:mb-40 bg-blue-600 rounded-xl overflow-hidden shadow-xl"},[r("div",{staticClass:"w-full lg:w-2/3 pt-12 lg:py-12"},[r("h3",{staticClass:"mb-4 text-xl font-bold text-white"},[t._v("รายละเอียด")]),t._v(" "),r("p",{staticClass:"text-base text-gray-300"},[t._v(t._s(t.course.detail)+" ")]),t._v(" "),r("span",{staticClass:"text-sm text-white"},[t._v("ผู้สอน "+t._s(t.course.user_full)+" ")]),r("br"),t._v(" "),r("span",{staticClass:"text-sm text-white"},[t._v(" "+t._s(t.dateConvert(t.course.created_at)))])]),t._v(" "),r("img",{staticClass:"lg:absolute top-0 right-0 bottom-0 h-full w-full lg:w-1/3 object-cover",attrs:{src:t.$url+t.course.image,alt:""}})]),t._v(" "),r("div",[r("v-toolbar",{attrs:{color:"transparent",flat:""}},[r("h2",{staticClass:"text-2xl font-bold"},[t._v("การฝึก")]),t._v(" "),r("v-spacer")],1),t._v(" "),r("div",[r("div",{staticClass:"flex w-full mt-2"},[r("div",{staticClass:"w-1/3  p-1"},[r("div",{staticClass:"shadow-xl rounded bg-blue-600   flex flex-col items-center justify-center p-4 ",on:{click:function(e){t.dialogViewTeacher=!0}}},[r("span",{staticClass:"mdi mdi-video-check text-6xl text-white ",attrs:{"aria-role":"presentation","aria-label":"REVOLVING HEARTS"}}),t._v(" "),r("span",{staticClass:"text-white font-semibold text-base mt-2"},[t._v("วีดีโอผู้สอน ")])])]),t._v(" "),r("div",{staticClass:"w-1/3  p-1"},[r("div",{staticClass:"shadow-xl rounded bg-purple-700   flex flex-col items-center justify-center p-4 ",on:{click:function(e){return t.$router.push("/video")}}},[r("span",{staticClass:"mdi mdi-message-video text-6xl text-white ",attrs:{"aria-role":"presentation","aria-label":"REVOLVING HEARTS"}}),t._v(" "),r("span",{staticClass:"text-white  font-semibold text-base mt-2"},[t._v("ทดลองฝึก ")])])])])])],1),t._v(" "),r("div",{staticClass:"mt-6"},[r("div",{staticClass:"w-full"},[r("v-toolbar",{attrs:{color:"transparent",flat:""}},[r("h2",{staticClass:"text-2xl font-bold"},[t._v("รายการผลการฝึก")]),t._v(" "),r("v-spacer"),t._v(" "),r("v-btn",{attrs:{color:"success"},on:{click:function(e){t.dialogUpload=!0}}},[r("v-icon",[t._v("mdi-video-plus")]),t._v(" ส่งผลการฝึก\r\n                    ")],1)],1),t._v(" "),r("v-list",t._l(t.lists,(function(e,o){return r("v-list-item",{key:o},[r("v-list-item-avatar",[r("v-icon",{attrs:{dark:""}})],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",[r("span",{staticClass:"text-base font-bold"},[t._v(t._s(e.name))])]),t._v(" "),r("v-list-item-subtitle",[r("span",{staticClass:"text-sm"},[t._v(t._s(t.dateConvert(e.created_at)))])])],1),t._v(" "),r("v-list-item-action",[r("div",{staticClass:"flex"},[r("v-btn",{staticClass:"mr-2",attrs:{small:"",color:"info",outlined:""},on:{click:function(r){return t.getResult(e)}}},[r("v-icon",[t._v("mdi-eye")]),t._v(" ดูผล\r\n                                ")],1),t._v(" "),r("v-btn",{attrs:{small:"",color:"error",outlined:""},on:{click:function(r){return t.deleteResult(e.id)}}},[r("v-icon",[t._v("mdi-delete")]),t._v(" ลบ\r\n                                ")],1)],1)])],1)})),1)],1)]),t._v(" "),t.dialogUpload?r("v-dialog",{attrs:{scrollable:"",persistent:"",overlay:!1,"max-width":"500px",transition:"dialog-transition"},model:{value:t.dialogUpload,callback:function(e){t.dialogUpload=e},expression:"dialogUpload"}},[r("v-card",[r("v-card-title",{attrs:{"primary-title":""}},[t._v("\r\n                    อัพโหลดวีดีโอ "),r("v-spacer"),t._v(" "),r("v-btn",{attrs:{fab:"",text:"",small:"",color:"error"},on:{click:function(e){(t.dialogUpload=!1)&&this.$refs.form_result.reset()}}},[r("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),r("v-card-text",[r("form",{ref:"form_result",on:{submit:function(e){return e.preventDefault(),t.saveResult()}}},[r("v-text-field",{attrs:{dense:"",outlined:"",label:"name"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),t._v(" "),r("br"),t._v(" "),r("input",{ref:"video_result",attrs:{accept:"video/*",type:"file"}}),r("br"),r("br"),t._v(" "),r("v-btn",{attrs:{type:"submit",color:"success"}},[t._v("บันทึก")])],1)])],1)],1):t._e(),t._v(" "),t.dialogResultView?r("v-dialog",{attrs:{scrollable:"",persistent:"",overlay:!1,"max-width":"500px",transition:"dialog-transition"},model:{value:t.dialogResultView,callback:function(e){t.dialogResultView=e},expression:"dialogResultView"}},[r("v-card",[r("v-card-title",{attrs:{"primary-title":""}},[t._v("\r\n                    ดูผล "),r("v-spacer"),t._v(" "),r("v-btn",{attrs:{fab:"",text:"",small:"",color:"error"},on:{click:function(e){(t.dialogResultView=!1)&&this.$refs.form_result.reset()}}},[r("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),r("v-card-text",[r("video",{attrs:{autoplay:"",controls:"",src:t.$url+t.result.video}})])],1)],1):t._e(),t._v(" "),t.dialogViewTeacher?r("v-dialog",{attrs:{scrollable:"",persistent:"",overlay:!1,"max-width":"500px",transition:"dialog-transition"},model:{value:t.dialogViewTeacher,callback:function(e){t.dialogViewTeacher=e},expression:"dialogViewTeacher"}},[r("v-card",[r("v-card-title",{attrs:{"primary-title":""}},[t._v("\r\n                    วีดีโอผู้สอน "),r("v-spacer"),t._v(" "),r("v-btn",{attrs:{fab:"",text:"",small:"",color:"error"},on:{click:function(e){(t.dialogViewTeacher=!1)&&this.$refs.form_result.reset()}}},[r("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),r("v-card-text",[r("video",{attrs:{autoplay:"",controls:"",src:t.$url+t.course.video}})])],1)],1):t._e()],1)],1)}),[],!1,null,null,null);e.default=component.exports;m()(component,{VBtn:f.a,VCard:_.a,VCardText:x.a,VCardTitle:x.b,VDialog:w.a,VIcon:h.a,VList:C.a,VListItem:V.a,VListItemAction:R.a,VListItemAvatar:k.a,VListItemContent:y.a,VListItemSubtitle:y.b,VListItemTitle:y.c,VSpacer:T.a,VTextField:$.a,VToolbar:j.a})}}]);