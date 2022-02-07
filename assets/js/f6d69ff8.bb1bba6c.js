"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[463],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),f=c(r),m=o,d=f["".concat(s,".").concat(m)]||f[m]||p[m]||i;return r?n.createElement(d,a(a({ref:t},u),{},{components:r})):n.createElement(d,a({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},2264:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return u},default:function(){return f}});var n=r(7462),o=r(3366),i=(r(7294),r(3905)),a=["components"],l={slug:"/",sidebar_position:1},s="Introduction",c={unversionedId:"intro",id:"intro",title:"Introduction",description:"There are usual ways to improve the performances of spark jobs, in order of priority:",source:"@site/../docs/intro.md",sourceDirName:".",slug:"/",permalink:"/zio-spark/",editUrl:"https://github.com/univalence/zio-spark/edit/master/docs/../docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{slug:"/",sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Pipeline",permalink:"/zio-spark/sql-package/pipeline"}},u=[],p={toc:u};function f(e){var t=e.components,r=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"There are usual ways to improve the performances of spark jobs, in order of priority:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"less join"),(0,i.kt)("li",{parentName:"ul"},"less data (=> active location, streaming, ...)"),(0,i.kt)("li",{parentName:"ul"},"less udf/rdd"),(0,i.kt)("li",{parentName:"ul"},"better configuration"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"better resource allocation")," <-")),(0,i.kt)("p",null,"What zio-spark can do is to launch different spark jobs in the same ",(0,i.kt)("inlineCode",{parentName:"p"},"SparkSession"),", allowing to use more of the\nexecutors capacity. Eg. if you have 5 workers, and only 1 is working to finish the current job, and you wait before\nstarting another job, that's not what's best efficiency, and at the end not the best for the lead time."),(0,i.kt)("p",null,"On some pipeline, concurrent job launch speed up the pipeline by 2-10 times. It's not \"faster\", it's just the overall\nlead time (wall clock time) is better."),(0,i.kt)("p",null,"Spark is very good at optimizing the work on a single job, there is no issue with spark, but the imperative nature of\nthe API don't allow Spark to know for remaining jobs."))}f.isMDXComponent=!0}}]);