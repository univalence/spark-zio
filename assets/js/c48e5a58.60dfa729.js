"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[661],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),i=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=i(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=i(n),f=r,h=m["".concat(l,".").concat(f)]||m[f]||u[f]||o;return n?a.createElement(h,s(s({ref:t},p),{},{components:n})):a.createElement(h,s({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,s[1]=c;for(var i=2;i<o;i++)s[i]=n[i];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6343:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return i},toc:function(){return p},default:function(){return m}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),s=["components"],c={sidebar_position:3},l="Schemas",i={unversionedId:"sql-package/case-class-to-schema",id:"sql-package/case-class-to-schema",title:"Schemas",description:"A DataFrame in Spark always have a schema.",source:"@site/../docs/sql-package/case-class-to-schema.md",sourceDirName:"sql-package",slug:"/sql-package/case-class-to-schema",permalink:"/zio-spark/sql-package/case-class-to-schema",editUrl:"https://github.com/univalence/zio-spark/edit/master/docs/../docs/sql-package/case-class-to-schema.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"TryAnalysis",permalink:"/zio-spark/sql-package/try-analysis"},next:{title:"Installing ZIO Spark Test",permalink:"/zio-spark/testing/installation"}},p=[],u={toc:p};function m(e){var t=e.components,n=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"schemas"},"Schemas"),(0,o.kt)("p",null,"A DataFrame in Spark always have a schema. "),(0,o.kt)("p",null,"Generally, people have two ways to create it:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"They infer the schema from the source files (not recommended since the schema can change and because the inference can\nbe wrong)"),(0,o.kt)("li",{parentName:"ul"},"They create a StructType and provide it to the DataFrameReader")),(0,o.kt)("p",null,"Defining your schema is a best practice, and you should always do that. However, creating a StructType is annoying\nand this is even more true when you want to deal with a Dataset","[T]",". "),(0,o.kt)("p",null,"For example, imagine you have the following CSV:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-csv"},"name;age;phone\njohn;10;\nfella;30;+3360000000\n")),(0,o.kt)("p",null,"If you want to manipulate it as a Dataset","[Person]"," you will have to write something like:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'import zio.spark.sql._\nimport org.apache.spark.sql.types._\n\ncase class Person(name: String, age: Int, phone: Option[String])\n\nval schema =\n  StructType(\n    Seq(\n      StructField("name", StringType, nullable  = false),\n      StructField("age", IntegerType, nullable = false),\n      StructField("phone", StringType, nullable = true)\n    )\n  )\n  \nval ds Dataset[Person] = SparkSession.read.schema(schema).csv("path").as[Person].getOrThrow\n')),(0,o.kt)("p",null,"ZIO-Spark, using magnolia, allows you to derive the StructType from your case class automatically:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'import zio.spark.sql._\n\ncase class Person(name: String, age: Int, phone: Option[String])\n\nval ds Dataset[Person] = SparkSession.read.schema[Person].csv("path").as[Person].getOrThrow\n')))}m.isMDXComponent=!0}}]);