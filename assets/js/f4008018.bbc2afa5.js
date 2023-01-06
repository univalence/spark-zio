"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[434],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,s=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=l(n),f=i,k=d["".concat(p,".").concat(f)]||d[f]||u[f]||s;return n?r.createElement(k,a(a({ref:t},c),{},{components:n})):r.createElement(k,a({ref:t},c))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=n.length,a=new Array(s);a[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,a[1]=o;for(var l=2;l<s;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4551:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return l},toc:function(){return c},default:function(){return d}});var r=n(7462),i=n(3366),s=(n(7294),n(3905)),a=["components"],o={sidebar_position:2},p="SparkSession in test",l={unversionedId:"testing/spark-session-in-test",id:"testing/spark-session-in-test",title:"SparkSession in test",description:"Spark needs a SparkSession to run the dataset jobs. ZIO Spark test provides helpers to",source:"@site/../docs/testing/spark-session-in-test.md",sourceDirName:"testing",slug:"/testing/spark-session-in-test",permalink:"/zio-spark/testing/spark-session-in-test",editUrl:"https://github.com/univalence/zio-spark/edit/master/docs/../docs/testing/spark-session-in-test.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Installing ZIO Spark Test",permalink:"/zio-spark/testing/installation"},next:{title:"Overview",permalink:"/zio-spark/experimental/overview"}},c=[{value:"One file SparkSession",id:"one-file-sparksession",children:[],level:2},{value:"Multi files SparkSession",id:"multi-files-sparksession",children:[],level:2},{value:"Overriding SparkSession configuration",id:"overriding-sparksession-configuration",children:[],level:2}],u={toc:c};function d(e){var t=e.components,n=(0,i.Z)(e,a);return(0,s.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"sparksession-in-test"},"SparkSession in test"),(0,s.kt)("p",null,"Spark needs a SparkSession to run the dataset jobs. ZIO Spark test provides helpers to\nget this SparkSession for free."),(0,s.kt)("h2",{id:"one-file-sparksession"},"One file SparkSession"),(0,s.kt)("p",null,"Any objects that implements ",(0,s.kt)("inlineCode",{parentName:"p"},"ZIOSparkSpecDefault")," trait is a runnable spark test.\nSo to start writing tests we need to extend ",(0,s.kt)("inlineCode",{parentName:"p"},"ZIOSparkSpecDefault"),", which requires a ",(0,s.kt)("inlineCode",{parentName:"p"},"Spec"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-scala"},'import zio.test._\nimport zio.spark.test._\nimport zio.spark.sql.implicits._\n\nobject MySpecs extends ZIOSparkSpecDefault {\n  override def sparkSpec =\n    suite("ZIOSparkSpecDefault can run spark job without providing layer")(\n      test("It can run Dataset job") {\n        for {\n          df    <- Dataset(1, 2, 3)\n          count <- df.count\n        } yield assertTrue(count == 3L)\n      }\n    )\n}\n')),(0,s.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"It is exactly the same thing as ",(0,s.kt)("a",{parentName:"p",href:"https://zio.dev/reference/test/writing-our-first-test"},"ZIOSpecDefault"),".\nIt just provides a custom SparkSession by default."))),(0,s.kt)("h2",{id:"multi-files-sparksession"},"Multi files SparkSession"),(0,s.kt)("p",null,"The issue with the above example is that it will try to run many SparkSession if you have\ntests in different files. Sadly, it is not correct since it will try to start many spark\nclusters at the same time. Hopefully, you can bypass it using ",(0,s.kt)("inlineCode",{parentName:"p"},"SharedZIOSparkSpecDefault"),"."),(0,s.kt)("p",null,"It is the same kind of code, however it will ensure that all the jobs from the different files\nare finished before closing a unique SparkSession:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-scala"},'import zio.test._\nimport zio.spark.test._\nimport zio.spark.sql.implicits._\n\nobject MySpecs extends SharedZIOSparkSpecDefault {\n  override def spec =\n    suite("SharedZIOSparkSpecDefault can run shared spark job without providing layer")(\n      test("It can run Dataset job") {\n        for {\n          df    <- Dataset(1, 2, 3)\n          count <- df.count\n        } yield assertTrue(count == 3L)\n      }\n    )\n}\n')),(0,s.kt)("h2",{id:"overriding-sparksession-configuration"},"Overriding SparkSession configuration"),(0,s.kt)("p",null,"By default, here is the SparkSession configuration:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-scala"},'import zio.spark._\n\nval defaultSparkSession: SparkSession.Builder =\nSparkSession.builder\n  .master("local[*]")\n  .config("spark.sql.shuffle.partitions", 1)\n  .config("spark.ui.enabled", value = false)\n')),(0,s.kt)("p",null,"You can override it simply as follows:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-scala"},'import zio.test._\nimport zio.spark.test._\nimport zio.spark.sql.implicits._\n\nabstract class ZIOSparkSpec extends ZIOSparkSpecDefault {\n  override def ss: SparkSession.Builder = super.ss.config("", "")\n}\n')),(0,s.kt)("p",null,"And uses it the same way :"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-scala"},"import zio.test._\nimport zio.spark.test._\nimport zio.spark.sql.implicits._\n\nobject MySpecs extends ZIOSparkSpec {\n  override def spec = ???\n}\n")))}d.isMDXComponent=!0}}]);