"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[428],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),f=s(n),m=a,d=f["".concat(l,".").concat(m)]||f[m]||c[m]||i;return n?r.createElement(d,o(o({ref:t},u),{},{components:n})):r.createElement(d,o({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=f;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},1656:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return p},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return u},default:function(){return f}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],p={sidebar_position:2},l="Pipeline",s={unversionedId:"sql-package/pipeline",id:"sql-package/pipeline",title:"Pipeline",description:"Pipelines help you to structure your Spark jobs with ease.",source:"@site/../docs/sql-package/pipeline.md",sourceDirName:"sql-package",slug:"/sql-package/pipeline",permalink:"/zio-spark/sql-package/pipeline",editUrl:"https://github.com/univalence/zio-spark/edit/master/docs/../docs/sql-package/pipeline.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/zio-spark/sql-package/overview"},next:{title:"TryAnalysis",permalink:"/zio-spark/sql-package/try-analysis"}},u=[],c={toc:u};function f(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"pipeline"},"Pipeline"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Pipelines")," help you to structure your Spark jobs with ease."),(0,i.kt)("p",null,"If you are building simple pipelines using Dataset, we can see a pipeline as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a function reading a Dataset using a SparkSession."),(0,i.kt)("li",{parentName:"ul"},"some transformations to obtain our output Dataset."),(0,i.kt)("li",{parentName:"ul"},"an action to output the result from the transformed Dataset.")),(0,i.kt)("p",null,"So to build a pipeline you will need to provide three functions describing the three steps above."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'import zio.spark.sql._\n\nval pipeline = Pipeline(\n    load      = SparkSession.read.inferSchema.withHeader.withDelimiter(";").csv("test.csv"),\n    transform = _.withColumn("new", $"old" + 1).limit(2),\n    action    = _.count()\n)\n')),(0,i.kt)("p",null,"It creates a description of our job, you can then transform it into a ZIO effect using ",(0,i.kt)("inlineCode",{parentName:"p"},"run"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"val job: Spark[Long] = pipeline.run\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Spark[Long]")," is an alias for ",(0,i.kt)("inlineCode",{parentName:"p"},"ZIO[SparkSession, Throwable, Long]")," meaning that it returns an effect that need a SparkSession and will return a Long (the number of rows of the DataFrame)."))}f.isMDXComponent=!0}}]);