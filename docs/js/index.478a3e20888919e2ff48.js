(()=>{"use strict";const e=(e,t)=>fetch(e,t).then((e=>function(e){if(!e.ok)throw e.status;return e}(e))).then((e=>function(e){const t=e.status,n=e.headers.get("content-type");return 200!==t?e.status:200===t&&n&&n.includes("application/json")?e.json():e}(e)));let t,n;"localhost"===window.location.hostname||"192.168."===window.location.hostname.substring(0,8)?(t=window.location.hostname,n=window.location.protocol):(t="movietoro.herokuapp.com",n="https:");const a=new URL(n+"//"+t);function c(e,t,n,c){this.init={body:c,credentials:"include",method:e},this.resource=t,this.url=a,this.url.search=n}function o(e){this.name=e}function l(e){return new o(e)}c.prototype.all=function(){return this.url.pathname=this.resource,e(this.url,this.init)},c.prototype.one=function(t){return this.url.pathname=this.resource+"/"+t,e(this.url,this.init)},o.prototype.delete=function(e){const t=e?new URLSearchParams(e).toString():"";return new c("DELETE",this.name,t)},o.prototype.get=function(e){const t=e?new URLSearchParams(e).toString():"";return new c("GET",this.name,t)},o.prototype.patch=function(e){const t=e?JSON.stringify(e):null;return new c("PATCH",this.name,"",t)},o.prototype.post=function(e){const t=e?JSON.stringify(e):null;return new c("POST",this.name,"",t)},o.prototype.put=function(e){const t=e?JSON.stringify(e):null;return new c("PUT",this.name,"",t)};const r=function(e){const[t,n]=React.useState("");return React.createElement("div",null,React.createElement("p",null,"Who are you?"),React.createElement("input",{onChange:e=>{const t=e.target.value.replace(/[^_a-z0-9]/g,"");n(t)},placeholder:"username",type:"text",value:t}),React.createElement("div",null,React.createElement("button",{onClick:()=>{(()=>{const n={username:t};l("logup").post(n).all().then((n=>{console.log("Post logup",n),localStorage.setItem("username",t),e.onLogup()})).catch((e=>{}))})()},type:"button"},"Remember Me")))},u=function(){return React.createElement("nav",null,React.createElement("a",{href:"/"},"Home")," | ",React.createElement("a",{href:"/profile"}," Profile"))};function s(){const[e,t]=React.useState(!0),[n,a]=React.useState(!1),[c,o]=React.useState([]),[s,i]=React.useState([]),[m,h]=React.useState(""),[p,R]=React.useState({});React.useEffect((()=>{d(),g()}),[]),React.useEffect((()=>{m?f():i([])}),[m]);const E=()=>{R({}),h("")},g=()=>{const e=!!localStorage.getItem("username");a(e)},f=()=>{l("predictions").get().one(m).then((e=>{i(e)})).catch((e=>{}))},d=()=>{l("home").get().all().then((e=>{console.log("Get home.",e),o([...e])})).catch((e=>{}))},y=React.createElement("section",null,React.createElement("h2",null,p.name),React.createElement("p",null,p.year),React.createElement("p",null,p.starring),React.createElement("button",{disabled:!n,onClick:()=>{(()=>{const e={username:localStorage.getItem("username")?localStorage.getItem("username"):"",...p};l("favorites").post(e).all().then((e=>{console.log("Post favorites",e),E(),d()})).catch((e=>{}))})()},type:"button"},"Add to Favorites"),React.createElement("button",{onClick:()=>{E()},type:"button"},"Cancel"),n?null:React.createElement(r,{onLogup:()=>{g()}})),S=React.createElement(React.Fragment,null,React.createElement("p",null,React.createElement("u",null,"Recently added to favorites:")),c.map((e=>React.createElement("article",{key:e.id,onClick:()=>(e=>{const t=e.asset.id,n=new URLSearchParams({id:t}).toString();location.assign("/title?"+n)})(e)},React.createElement("h2",null,e.asset.name),React.createElement("p",null,React.createElement("strong",null,e.user.username)," ",e.count?"+"+e.count:null))))),w=s.map((e=>React.createElement("article",{key:e.aid,onClick:()=>(e=>{R(e)})(e)},React.createElement("h2",null,e.name),React.createElement("p",null,e.year),React.createElement("p",null,e.starring)))),v=React.createElement("section",null,React.createElement("input",{onChange:e=>{h(e.target.value)},placeholder:"Search for movies",type:"text",value:m}),s.length?w:S);return React.createElement(React.Fragment,null,React.createElement(u,null),React.createElement("hr",null),p.name?y:v)}ReactDOM.render(React.createElement(s,null),document.getElementById("root"))})();