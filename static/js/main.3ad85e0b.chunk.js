(this["webpackJsonpcrypton-studio-test"]=this["webpackJsonpcrypton-studio-test"]||[]).push([[0],{16:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n(8),s=n.n(a),c=n(4),l=n(5),i=n(6),u=n(10),o=n(9),h=n(1),d=n.n(h),p=n(3),j=function(){function e(){var t=this;Object(l.a)(this,e),this.state={planets:[]},this._transformPerson=function(e){return{id:t._extractId(e),name:e.name,gender:e.gender,birthYear:e.birth_year,liked:!1,homeworld:e.homeworld}},this.getAllPlanets=function(){var e=Object(p.a)(d.a.mark((function e(n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getResource("/planets/?page=".concat(n));case 2:return r=e.sent,e.abrupt("return",r.results.map(t._transformPlanet));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this._transformPlanet=function(e){return{name:e.name,url:e.url}}}return Object(i.a)(e,[{key:"getResource",value:function(){var e=Object(p.a)(d.a.mark((function e(t){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://swapi.dev/api".concat(t));case 2:if((n=e.sent).ok){e.next=5;break}throw new Error("Could not fetch ".concat(t," received ").concat(n.status));case 5:return e.next=7,n.json();case 7:return r=e.sent,e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"getPeoplesNumber",value:function(){var e=Object(p.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getResource("/people/");case 2:return t=e.sent,e.abrupt("return",this._getNumber(t));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getPlanetsNumber",value:function(){var e=Object(p.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getResource("/planets/");case 2:return t=e.sent,e.abrupt("return",this._getNumber(t));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_getNumber",value:function(e){return{num:e.count}}},{key:"getAllPeople",value:function(){var e=Object(p.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getResource("/people/?page=".concat(t));case 2:return n=e.sent,e.abrupt("return",n.results.map(this._transformPerson));case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"_extractId",value:function(e){return e.url.match(/\/([0-9]*)\/$/)[1]}}]),e}(),f=(n(16),n(0)),b=function(){return Object(f.jsx)("div",{className:"lds-css",children:Object(f.jsxs)("div",{className:"lds-double-ring",children:[Object(f.jsx)("div",{}),Object(f.jsx)("div",{})]})})},m=(n(18),function(e){Object(u.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(l.a)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).swapiService=new j,e.state={peopleListPage:[],currentPage:1,peoplesPerPage:12,likedCharacters:[],visible:!0,term:"",gender:"all",planets:[],allPeopleCount:null,allPlanetsCount:null},e.charFilter=function(e,t){return e.id-t.id},e}return Object(i.a)(n,[{key:"search",value:function(e){var t=e.target.value;this.setState({term:t})}},{key:"componentDidMount",value:function(){var e=this;this.swapiService.getPeoplesNumber().then((function(t){e.setState({allPeopleCount:t.num})})).then((function(){for(var t=1;t<=Math.ceil(e.state.allPeopleCount/10);t++)e.swapiService.getAllPeople(t).then((function(t){e.setState((function(n){return{peopleListPage:[].concat(Object(c.a)(n.peopleListPage),Object(c.a)(t)).sort(e.charFilter)}}))}))})),this.swapiService.getPlanetsNumber().then((function(t){e.setState({allPlanetsCount:t.num})})).then((function(){for(var t=1;t<=Math.ceil(e.state.allPlanetsCount/10);t++)e.swapiService.getAllPlanets(t).then((function(t){e.setState((function(e){return{planets:[].concat(Object(c.a)(e.planets),Object(c.a)(t))}}))}))})).catch((function(){alert("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u0434\u0430\u043d\u043d\u044b\u0445 \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430! \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443!")}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.peopleListPage,r=t.peoplesPerPage,a=t.currentPage,s=t.likedCharacters,c=t.visible,l=t.term,i=t.gender;if(!n)return null;var u=a*r,o=u-r,h=n.slice(o,u),d=function(t){var n=e.state.likedCharacters,r=Object(f.jsx)("span",{children:"\ud83e\udde1"}),a=Object(f.jsx)("span",{children:"\ud83d\udc99"});try{return t.map((function(t){return Object(f.jsxs)("div",{className:"char",children:[Object(f.jsx)("img",{className:"charImg",alt:t.name,src:"https://starwars-visualguide.com/assets/img/characters/".concat(t.id,".jpg")}),Object(f.jsx)("br",{}),Object(f.jsx)("h1",{children:t.name}),Object(f.jsx)("button",{id:"likeButton",className:"likeButton",onClick:function(){return function(t){if(t.liked)alert('\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u0443\u0436\u0435 \u0431\u044b\u043b \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d \u0432 \u0440\u0430\u0437\u0434\u0435\u043b "\u041b\u044e\u0431\u0438\u043c\u044b\u0435"!');else{var r=n;r.push(t),e.setState({likedCharacters:r}),t.liked=!t.liked}}(t)},children:t.liked?r:a})]},t.id)}))}catch(s){}},p=d(h),j=d(n),m=function(e,t,n){return 0===t.length||" "===t?n:e.filter((function(e){return e.props.children[2].props.children.toLowerCase().indexOf(t.toLowerCase())>-1}))},v=0!==s.length?function(t){try{return t.map((function(t){return Object(f.jsxs)("div",{className:"charLiked",children:[Object(f.jsx)("img",{className:"charImg",alt:t.name,src:"https://starwars-visualguide.com/assets/img/characters/".concat(t.id,".jpg")}),Object(f.jsx)("br",{}),Object(f.jsx)("h1",{style:{color:"rgb(155, 14, 14)"},children:t.name}),Object(f.jsxs)("h1",{children:["Gender: ",t.gender]}),Object(f.jsxs)("h1",{children:["Birth year: ",t.birthYear]}),Object(f.jsxs)("h1",{style:{fontSize:"22px"},children:["Homeworld:"," ",e.state.planets.find((function(e){return e.url===t.homeworld})).name]})]},t.id)}))}catch(n){console.log(n)}}(function(e,t){return["male","female","n/a","none"].includes(t)?e.filter((function(e){return e.gender===t})):e}(s,i)):s,g=c?"\u041b\u044e\u0431\u0438\u043c\u044b\u0435 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0438":"\u0413\u043b\u0430\u0432\u043d\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430",x=c?m(j,l,c?p:v):m(v,l,v),O=0!==x.length?x:Object(f.jsxs)("h1",{className:"title",children:[" ","\u041a\u0430\u0436\u0435\u0442\u0441\u044f, \u043d\u0430 \u044d\u0442\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u043f\u0443\u0441\u0442\u043e!",Object(f.jsx)("br",{})," \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u043d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u044f \u0438\u043c\u0435\u043d\u0438 \u0438\u043b\u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0438\u0441\u043a\u0430\u0442\u044c \u043d\u0430 \u0434\u0440\u0443\u0433\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435!"]}),k=Object(f.jsxs)("div",{className:"footer",children:[Object(f.jsx)("button",{className:"lovedButton",onClick:function(){return 1===a?alert("\u0423\u043f\u0441! \u041a\u0430\u0436\u0435\u0442\u0441\u044f, \u0442\u0443\u0434\u0430 \u043d\u0435\u043b\u044c\u0437\u044f!"):e.setState({currentPage:a-1}),a},children:"\u041f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430"}),Object(f.jsx)("button",{disabled:!0,className:"lovedButton",children:a}),Object(f.jsx)("button",{className:"lovedButton",onClick:function(){return a===Math.ceil(e.state.allPeopleCount/e.state.peoplesPerPage)?alert("\u0423\u043f\u0441! \u041a\u0430\u0436\u0435\u0442\u0441\u044f, \u0442\u0443\u0434\u0430 \u043d\u0435\u043b\u044c\u0437\u044f!"):e.setState({currentPage:a+1}),a},children:"\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430"})]}),P="male"===i?"lovedButtonChosen":"lovedButtonReset",w="female"===i?"lovedButtonChosen":"lovedButtonReset",C="n/a"===i?"lovedButtonChosen":"lovedButtonReset",N=c?null:Object(f.jsxs)("div",{children:[Object(f.jsx)("button",{className:P,onClick:function(){return e.setState({gender:"male"})},children:"\u041c\u0443\u0436\u0447\u0438\u043d\u044b"}),Object(f.jsx)("button",{className:w,onClick:function(){return e.setState({gender:"female"})},children:"\u0416\u0435\u043d\u0449\u0438\u043d\u044b"}),Object(f.jsx)("button",{className:C,onClick:function(){return e.setState({gender:"n/a"})},children:"\u0418\u043d\u043e\u0435"}),Object(f.jsx)("button",{className:"lovedButtonReset",onClick:function(){return e.setState({gender:"all"})},children:"\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c"})]}),y=!c||""!==l&&" "!==l?null:k,S=c?"lovedCharButton":"generalPageButton";return 0===x.length&&""===l&&c?Object(f.jsx)(b,{}):Object(f.jsxs)("div",{className:"general",children:[Object(f.jsxs)("div",{className:"header",children:[Object(f.jsx)("button",{className:S,onClick:function(){return e.setState({visible:!c,gender:"all"})},children:g}),Object(f.jsx)("input",{className:"searchPanel",type:"text",placeholder:"Search",onChange:this.search.bind(this)})]}),Object(f.jsxs)("div",{className:"charBlock",children:[N,O]}),y]})}}]),n}(r.Component));s.a.render(Object(f.jsx)(m,{}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.3ad85e0b.chunk.js.map