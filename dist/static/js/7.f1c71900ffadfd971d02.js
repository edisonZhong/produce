webpackJsonp([7],{"0Y6p":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"page"}},[a("div",{attrs:{id:"main"}},[a("router-link",{attrs:{to:"/choiceEmployee"}},[a("div",{staticClass:"jian"},[a("mt-field",{staticClass:"line",attrs:{label:"离职员工",placeholder:e.employeeName,disabled:""},model:{value:e.employeeName,callback:function(t){e.employeeName=t},expression:"employeeName"}},[a("img",{attrs:{src:n("vC+O"),height:"12px",width:"8px"}})])],1)]),e._v(" "),a("mt-field",{attrs:{label:"所属业务区",placeholder:"系统自动带出",disabled:""},model:{value:e.employeeArea,callback:function(t){e.employeeArea=t},expression:"employeeArea"}}),e._v(" "),a("mt-field",{attrs:{label:"客户工号",placeholder:"系统自动带出",disabled:""},model:{value:e.customerEmployeeNo,callback:function(t){e.customerEmployeeNo=t},expression:"customerEmployeeNo"}}),e._v(" "),a("mt-field",{attrs:{label:"入职日期",placeholder:"系统自动带出",disabled:""},model:{value:e.organizationalId,callback:function(t){e.organizationalId=t},expression:"organizationalId"}}),e._v(" "),a("div",{staticClass:"line",on:{click:function(t){return e.openPicker(0)}}},[a("mt-field",{attrs:{label:"离职日期",placeholder:"请选择",disabled:""},model:{value:e.entryAt,callback:function(t){e.entryAt=t},expression:"entryAt"}})],1),e._v(" "),a("mt-field",{attrs:{label:"离职原因",placeholder:"请填写"},model:{value:e.positionType,callback:function(t){e.positionType=t},expression:"positionType"}}),e._v(" "),a("div",{staticClass:"line",on:{click:function(t){return e.openPicker(1)}}},[a("mt-field",{attrs:{label:"开始缴纳社保月份",placeholder:"系统自动带出",disabled:""},model:{value:e.entryAt1,callback:function(t){e.entryAt1=t},expression:"entryAt1"}})],1),e._v(" "),a("div",{staticClass:"line",on:{click:function(t){return e.openPicker(2)}}},[a("mt-field",{attrs:{label:"最后缴纳社保月份",placeholder:"请选择",disabled:""},model:{value:e.entryAt2,callback:function(t){e.entryAt2=t},expression:"entryAt2"}})],1),e._v(" "),a("div",{staticClass:"footer"},[a("mt-button",{staticClass:"bottom-save",staticStyle:{"margin-left":".3rem"},on:{click:function(t){return e.handleSave(1)}}},[e._v("保存")]),e._v(" "),a("mt-button",{staticStyle:{width:"4rem",height:".88rem","margin-right":".5rem"},attrs:{type:"primary"},on:{click:function(t){return e.handleSave(0)}}},[e._v("保存并继续添加")])],1)],1),e._v(" "),a("mt-datetime-picker",{ref:"picker",attrs:{type:"date","year-format":"{value} 年","month-format":"{value} 月","date-format":"{value} 日"},on:{confirm:e.handleConfirm},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)},o=[],i={render:a,staticRenderFns:o};t.a=i},FTLn:function(e,t,n){var a=n("dpG9");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("3ca69080",a,!0,{})},Lzc9:function(e,t,n){"use strict";var a=n("Q8d1"),o=n("Au9i");n.n(o);t.a={name:"addEmployee",data:function(){return{employeeName:"",value:"",employeeArea:"",customerEmployeeNo:"",organizationalId:"",entryAt:"",entryAt1:"",entryAt2:"",customerId:"",positionType:"",nowDate:""}},created:function(){this.getUserData()},methods:{openPicker:function(e){switch(this.nowDate=e,this.$refs.picker.open(),this.nowDate){case 0:break;case 1:case 2:this.$refs.picker.$el.getElementsByClassName("picker-slot")[2].style.display="none"}},handleConfirm:function(e){switch(this.nowDate){case 0:this.entryAt=this.$utils.date(e,"4");break;case 1:this.entryAt1=this.$utils.date(e,"5");break;case 2:this.entryAt2=this.$utils.date(e,"5")}console.log(this.entryAt)},handleService:function(){this.$router.push({path:"/SelectService"})},getUserData:function(){var e=this.$route.params.id,t=this;Object(a.d)(e).then(function(e){o.Indicator.close();var n=e.data.data,a=n.employeeName,i=n.organizationName,l=n.customerEmployeeNo,r=n.entryAt,c=n.socialSecurityStartAt;r=t.$utils.date(r,"4"),c=null==c?"":t.$utils.date(c,"5"),200==e.data.code&&(t.employeeName=a,t.employeeArea=i,t.customerEmployeeNo=l,t.organizationalId=r,t.entryAt1=c)})},handleClient:function(){this.$router.push({path:"/ClientType"})},openlabour:function(){this.$refs.picker.open()},handleType:function(){console.log(1)},handleSave:function(e){var t=this.$route.params.id,n=this;this.entryAt,""===this.positionType?Object(o.MessageBox)({title:"提示",message:"请填写完信息"}):Object(a.b)({employee_id:t,resignationAt:this.entryAt,resignationReason:this.positionType,socialSecurityStartAt:this.entryAt1,socialSecurityEndAt:this.entryAt2}).then(function(t){console.log(t),200==t.data.code?(Object(o.MessageBox)({title:"提示",message:"离职信息登记成功"}),e&&n.$router.go(-1)):t.data.code,Object(o.MessageBox)({title:"提示",message:t.data.message})})}}}},Q8d1:function(e,t,n){"use strict";function a(e){return new m.a(function(t,n){Object(p.a)({url:"employee/getAllEmployeeInMobile",method:"post",data:e}).then(function(e){t(e)}).catch(function(e){console.log(e)})})}function o(e){return new m.a(function(t,n){Object(p.a)({url:"employeeDetail/addEmployeeSimpleDate",method:"post",data:e}).then(function(e){t(e)}).catch(function(e){console.log(e)})})}function i(e){return new m.a(function(t,n){Object(p.a)({url:"organizationalTree/pagingQueryOrganizationl",method:"post",data:e}).then(function(e){t(e)}).catch(function(e){console.log(e)})})}function l(e){return new m.a(function(e,t){Object(p.a)({url:"legalCompany/queryLegalTree",method:"get"}).then(function(t){e(t)}).catch(function(e){console.log(e)})})}function r(e){return new m.a(function(t,n){Object(p.a)({url:"/customer/paging",method:"post",data:e}).then(function(e){t(e)}).catch(function(e){console.log(e)})})}function c(e){return new m.a(function(t,n){Object(p.a)({url:"/dictionaryValues/list",method:"get",params:e}).then(function(e){t(e)}).catch(function(e){console.log(e)})})}function s(e){return new m.a(function(t,n){Object(p.a)({url:"employee/getAllEmployeeInMobile",method:"post",data:e}).then(function(e){t(e)}).catch(function(e){console.log(e)})})}function d(e){return new m.a(function(t,n){Object(p.a)({url:"employeeDetail/findById/"+e,method:"get"}).then(function(e){t(e)}).catch(function(e){console.log(e)})})}function A(e){return new m.a(function(t,n){Object(p.a)({url:"employeeDetail/addDepartureEmployee",method:"post",data:e}).then(function(e){t(e)}).catch(function(e){console.log(e)})})}t.e=a,t.a=o,t.h=i,t.g=l,t.i=r,t.f=c,t.c=s,t.d=d,t.b=A;var u=n("//Fk"),m=n.n(u),p=n("4Zyn")},dpG9:function(e,t,n){t=e.exports=n("FZ+f")(!0),t.push([e.i,"a[data-v-610859de]{color:#000}.mint-cell-value[data-v-610859de]{-webkit-box-flex:0!important;-ms-flex:0 0 73%!important;flex:0 0 73%!important}.mint-cell-wrapper[data-v-610859de]{padding-right:0}.mint-cell[data-v-610859de]:last-child{background-image:none}#page[data-v-610859de]{height:100%;position:relative;width:100%}#page #main[data-v-610859de]{width:100%;position:absolute;top:0;left:0;right:0;bottom:0;overflow-x:hidden;overflow-y:auto}#main>a[data-v-610859de],.line[data-v-610859de]{border-bottom:1px solid #d9d9d9}.bottom-save[data-v-610859de]{height:.88rem;width:1.6rem;background:#eb9f4b;color:#fff}.footer[data-v-610859de]{position:absolute;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;width:100%;height:1.58rem;background:#fff}","",{version:3,sources:["/Users/edison/Documents/code/ywwb_h5/src/vuepage/page/leaveEmployee.vue"],names:[],mappings:"AACA,mBACE,UAAa,CACd,AACD,kCACE,6BAA8B,AAC1B,2BAA4B,AACxB,sBAAwB,CACjC,AACD,oCACE,eAAmB,CACpB,AACD,uCACE,qBAAuB,CACxB,AACD,uBACE,YAAa,AACb,kBAAmB,AACnB,UAAY,CACb,AACD,6BACE,WAAY,AACZ,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,QAAS,AACT,SAAU,AACV,kBAAmB,AACnB,eAAiB,CAClB,AAID,gDACE,+BAAiC,CAClC,AACD,8BACE,cAAgB,AAChB,aAAc,AACd,mBAAoB,AACpB,UAAY,CACb,AACD,yBACE,kBAAmB,AACnB,SAAU,AACV,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,6BAA8B,AAClC,WAAY,AACZ,eAAgB,AAChB,eAAiB,CAClB",file:"leaveEmployee.vue",sourcesContent:["\na[data-v-610859de] {\n  color: black;\n}\n.mint-cell-value[data-v-610859de] {\n  -webkit-box-flex: 0!important;\n      -ms-flex: 0 0 73%!important;\n          flex: 0 0 73%!important;\n}\n.mint-cell-wrapper[data-v-610859de] {\n  padding-right: 0px;\n}\n.mint-cell[data-v-610859de]:last-child {\n  background-image: none;\n}\n#page[data-v-610859de] {\n  height: 100%;\n  position: relative;\n  width: 100%;\n}\n#page #main[data-v-610859de] {\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n#main > a[data-v-610859de] {\n  border-bottom: 1px solid #d9d9d9;\n}\n.line[data-v-610859de] {\n  border-bottom: 1px solid #d9d9d9;\n}\n.bottom-save[data-v-610859de] {\n  height: 0.88rem;\n  width: 1.6rem;\n  background: #eb9f4b;\n  color: #fff;\n}\n.footer[data-v-610859de] {\n  position: absolute;\n  bottom: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  width: 100%;\n  height: 1.58rem;\n  background: #fff;\n}\n"],sourceRoot:""}])},t726:function(e,t,n){"use strict";function a(e){n("FTLn")}Object.defineProperty(t,"__esModule",{value:!0});var o=(n("zaXQ"),n("Lzc9")),i=n("0Y6p"),l=n("VU/8"),r=a,c=l(o.a,i.a,!1,r,"data-v-610859de",null);t.default=c.exports},"vC+O":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAbRJREFUKBWFk0lLw0AUgN+bpOhdxQVc8aC4gVhNKaa2qSf/gP44f4D/QLBNGJfYutQVFDwJiiAuFw9qJhnfVEdSTekckhfm++a9mTfBEvfXpYR5M5Vay2fTl9BiMAC0iJkUInC3uD/VggcmQa4CwiNI6EKJLSVUK3K+Px5IcEnuQcAnYOgUbes8KRuVBJDLZa7AYDmC70nqhEiWS9uV6SShnkFPlHYOR2QUeFTeQLNMDYISy3u1wUh8kCSHSXpmBnMKiwtnetF6SfpDvZ3s7K3ZhjYg3lB5HVEYld2d6oxm/glqIm9Zd22YylF4/VdKFJRk23MP2M6WKLz8kTY9Kc2mAoFgmGZI+whVTKO+X/M7/v8sVSrd4dtnWQJMIMIrY7iSRxSJGXZ3a33wHnENI2KxsGgd/6aJr8/5Qf+nDF0AOUon9cIQlh07U9NMQ0mcV4eDb3hIwQBm0bHTJxpuyOD5/qgI0KWG9auGGSmjmM/On8ZhFdf34PlHYyIArmHV3SRYCYa3dzgZBoJqht6kq6Cg+GChEBvUmG6C1bUuxO9NHNSxSb9nlY6NLqhcXbYzF3qi2fsLr7W1RWcW1VQAAAAASUVORK5CYII="},zaXQ:function(e,t,n){"use strict";var a=(n("Q8d1"),n("Au9i"));n.n(a)}});
//# sourceMappingURL=7.f1c71900ffadfd971d02.js.map