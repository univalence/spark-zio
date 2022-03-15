"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[338],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(n),f=a,m=u["".concat(c,".").concat(f)]||u[f]||d[f]||o;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},334:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return p},default:function(){return u}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={sidebar_position:2},c="Code Generation",s={unversionedId:"for-developers/code-generation",id:"for-developers/code-generation",title:"Code Generation",description:"Like we already said, the main Spark classes are auto generated in Zio-Spark. We have to add our own classes because",source:"@site/../docs/for-developers/code-generation.md",sourceDirName:"for-developers",slug:"/for-developers/code-generation",permalink:"/zio-spark/for-developers/code-generation",editUrl:"https://github.com/univalence/zio-spark/edit/master/docs/../docs/for-developers/code-generation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/zio-spark/for-developers/overview"}},p=[{value:"Example",id:"example",children:[],level:2}],d={toc:p};function u(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"code-generation"},"Code Generation"),(0,o.kt)("p",null,"Like we already said, the main Spark classes are auto generated in Zio-Spark. We have to add our own classes because\nSpark is Impure and not ZIO aware."),(0,o.kt)("p",null,"A generated class is composed by three kind of codes:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The code automatically generated from Spark"),(0,o.kt)("li",{parentName:"ul"},"The scala version specific code written in Zio-Spark to add Zio-Spark functionalities"),(0,o.kt)("li",{parentName:"ul"},"The scala version non-specific code written in Zio-Spark to add Zio-Spark functionalities")),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("p",null,"Generally speaking here is the workflow that auto-generate a Zio-Spark class:"),(0,o.kt)("p",null,"Let's take Dataset as an example !"),(0,o.kt)("p",null,"Everything start with a GenerationPlan, the plan read sources from Spark and use them to generate the Zio-Spark sources.\nWe decided to store the generated file in ",(0,o.kt)("inlineCode",{parentName:"p"},"src")," directly. It allows us to compare the differences using git and it is\nclearer for people to understand what's happening."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"We read the Spark code source of the Dataset using SBT."),(0,o.kt)("li",{parentName:"ol"},"We use Scalameta to generate the automatically generated code.\n2. We group all class methods by type and wrapping them.\n3. We need to specify class specific import and folks."),(0,o.kt)("li",{parentName:"ol"},"We compile the project to generate the class.")),(0,o.kt)("p",null,"The generated code contains only one kind of code: the code automatically generated from Spark."),(0,o.kt)("p",null,"You can then use this code to generate an overlays. They allow us to add our scala version specific and non-specific\nfunctions."),(0,o.kt)("p",null,"These overlays can be found in ",(0,o.kt)("inlineCode",{parentName:"p"},"zio-spark-core/src/it/scala..."),"."),(0,o.kt)("p",null,"For Dataset, you will find four overlays:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"zio-spark-core/src/it/scala/DatasetOverlay.scala")," -> The code shared by all scala versions"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"zio-spark-core/src/it/scala-2.XX/DatasetOverlaySpecific.scala")," -> The code specific for all scala versions")),(0,o.kt)("p",null,"For non-specific code, the name must be ",(0,o.kt)("inlineCode",{parentName:"p"},"{ClassName}Overlay")," and for specific code, the name must be\n",(0,o.kt)("inlineCode",{parentName:"p"},"{ClassName}OverlaySpecific"),"."),(0,o.kt)("p",null,"If you recompile adding these overlays, the function between ",(0,o.kt)("inlineCode",{parentName:"p"},"template:on")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"template:off")," will be added to the\ngenerated code."))}u.isMDXComponent=!0}}]);