(function(){var e={},a=function(){!function(e){var a;e.collectExtModules=function(e){var a=[],n=this,t=function(e){if(e.objCalls){var i=Object.keys(e.objCalls);i&&i.forEach(function(t){if(!n.definedInCtx(e,t)){var i={name:t,items:e.objCalls[t]};a.push(i)}}),e.subCtxList&&e.subCtxList.forEach(function(e){t(e)})}};return t(e),a},e.collectObjectStructure=function(e,a){var n={},t=this,i=function(e){if(e.objPropAccess&&!t.definedInCtx(e,a)){var r=e.objPropAccess;r&&r.forEach(function(e){e.objName==a&&(n[e.propName]=!0)}),e.subCtxList&&e.subCtxList.forEach(function(e){i(e,!0)})}};return i(e),n},e.definedInCtx=function(e,a){return e&&e.varDefs&&e.varDefs[a]?!0:e._parentCtx?this.definedInCtx(e._parentCtx,a):!1},e.findResultsOfFnCall=function(e,a){var n=[],t=function(e,i){if(e.varDefs&&(!i||!e.varDefs[a])){var r=Object.keys(e.varDefs);r&&r.forEach(function(t){var i=e.varDefs[t];"call"==i.type&&a&&i.fnCall&&i.fnCall.name==a&&n.push({name:t,varDef:i,callDef:i.fnCall})}),e.subCtxList&&e.subCtxList.forEach(function(e){t(e,!0)})}};return t(e),n},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(){}),e.localGuid=function(){return a||(a=0),a++},e.primaWalk=function(e,a,n,t,i){if(!e)return t;if(i||(i=1),t||(t={}),e.__didVisit==i)return t;if(e.__didVisit=i,"Literal"==e.type)return t;if("Identifier"==e.type)return t.identifiers||(t.identifiers=[]),t.identifiers.push({name:e.name,node:e}),t;var r=this;if("ReturnStatement"==e.type&&(t.returnStatements||(t.returnStatements=[]),t.returnStatements.push({node:e.argument})),"FunctionDeclaration"==e.type)if(e.id){t.declaredFns||(t.declaredFns={}),t.declaredFns[e.id.name]={node:e,name:e.id.name};var s={type:"function",name:e.id.name};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(s),s._parentCtx=t,t=s}else{t.declaredFns||(t.declaredFns={});{"$$anonymous_"+r.localGuid()}t.declaredFns["$$anonymous_"+r.localGuid()]={node:e,anonymous:!0};var s={type:"function"};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(s),s._parentCtx=t,t=s}if("AssignmentExpression"==e.type){if(t.assigments||(t.assigments=[]),"Identifier"==e.left.type){var l=e.left.name;t.aliases&&t.aliases.forEach(function(a){a.alias==l&&(a.volatile=!0,a.changesAt||(a.changesAt=[]),a.changesAt.push(e))})}t.assigments.push({left:e.left,right:e.right}),r.primaWalk(e.left,a,n,t,i),r.primaWalk(e.right,a,n,t,i)}if("MemberExpression"==e.type){t.objPropAccess||(t.objPropAccess=[]);var o={node:e};e.object&&("ThisExpression"==e.object.type&&(o.objName="this"),"Identifier"==e.object.type&&(o.objName=e.object.name)),e.property&&("Literal"==e.property.type&&(o.propName=e.property.value),"Identifier"==e.property.type&&(e.computed?o.propVarName=e.property.name:o.propName=e.property.name)),t.objPropAccess.push(o)}if("FunctionExpression"==e.type){t.declaredFns||(t.declaredFns={});{"$$anonymous_"+r.localGuid()}t.declaredFns["$$anonymous_"+r.localGuid()]={node:e,anonymous:!0};var s={type:"function"};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(s),s._parentCtx=t,t=s}if("VariableDeclaration"==e.type&&(t.varDefs||(t.varDefs={}),e.declarations.forEach(function(e){var s=e.id.name;t.varDefs[s]&&console.log("*** WARNING!!! Double delaration of "+s+" ***");var l=e.init;if("ThisExpression"==l.type&&(t.varDefs[s]={node:e,type:"this"},t.aliases||(t.aliases=[]),t.aliasesOf||(t.aliasesOf={}),t.aliases.push({alias:s,source:"this"}),t.aliasesOf["this"]||(t.aliasesOf["this"]={}),t.aliasesOf["this"][s]=!0),"Identifier"==l.type&&(t.varDefs[s]={node:e,type:"Identifier"},"Identifier"==e.id.type&&(t.aliases||(t.aliases=[]),t.aliases.push({alias:s,source:l.name}),t.aliasesOf||(t.aliasesOf={}),t.aliasesOf[l.name]||(t.aliasesOf[l.name]={}),t.aliasesOf[l.name][s]=!0),e.init&&r.primaWalk(e.init,a,n,t,i)),"MemberExpression"==l.type&&(t.varDefs[s]={node:e,type:"ObjectProperty"},e.init&&r.primaWalk(e.init,a,n,t,i)),"ObjectExpression"==l.type){var o={node:e,type:"Object",properties:{}};l.properties.forEach(function(e){e.computed||(o.properties[e.key.name]={node:e.value},e.value&&r.primaWalk(e.value,a,n,t,i))}),t.varDefs[s]=o}if("NewExpression"==l.type&&l.callee&&l.callee.name&&(t.varDefs[s]={node:e,type:"class",className:l.callee.name}),"Literal"==l.type&&(t.varDefs[s]={node:e,type:"literal",value:l.value}),"CallExpression"==l.type){var c={node:e,type:"call",init:l};l.callee.name?c.fnCall={name:l.callee.name,node:l.callee}:l.callee.object&&l.callee.property&&(c.objCall={objName:l.callee.object.name,propName:l.callee.property.name}),c.args=l.arguments,t.varDefs[s]=c,e.init&&r.primaWalk(e.init,a,n,t,i)}if("FunctionExpression"==l.type){t.varDefs[s]={node:e,type:"function",init:l},t.declaredFns||(t.declaredFns={}),t.declaredFns[s]={node:e,name:s};var f={type:"function",name:s};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(f),f._parentCtx=t,r.primaWalk(l.body,a,n,f,i)}})),"BinaryExpression"==e.type&&(r.primaWalk(e.left,a,n,t,i),r.primaWalk(e.right,a,n,t,i)),"IfStatement"==e.type&&(r.primaWalk(e.test,a,n,t,i),r.primaWalk(e.consequent,a,n,t,i)),"CallExpression"==e.type&&e.callee){if(e.callee&&e.callee.object&&e.callee.property){var c=e.callee.object;t.objCalls||(t.objCalls={});var f;f="ThisExpression"==c.type?"this":e.callee.object.name,t.objCalls[f]||(t.objCalls[f]=[]),t.objCalls[f].push(e.callee.computed?"Literal"==e.callee.property.type?{node:e,varName:f,fnName:e.callee.property.value}:{node:e,varName:f,fnVarName:e.callee.property.name}:"Literal"==e.callee.property.type?{node:e,varName:f,fnName:e.callee.property.value}:{node:e,varName:f,fnName:e.callee.property.name})}e.callee&&e.callee.name&&!e.callee.object&&(t.fnCalls||(t.fnCalls={}),t.fnCalls[e.callee.name]||(t.fnCalls[e.callee.name]=[]),t.fnCalls[e.callee.name].push({node:e,name:e.callee.name,type:e.callee.type})),e.arguments&&e.arguments.forEach(function(e){r.primaWalk(e,a,n,t,i)}),r.primaWalk(e.callee,a,n,t,i)}return e.expression?(r.primaWalk(e.expression,a,n,t,i),t):e.program?(r.primaWalk(e.program,a,n,t,i),t):e.body&&e.body instanceof Array?(e.body.forEach(function(e){r.primaWalk(e,a,n,t,i)}),t):(e.body&&(a(e.body)&&n(e.body),r.primaWalk(e.body,a,n,t,i)),e.node&&(a(e.node)&&n(e.node),r.primaWalk(e.node,a,n,t,i)),e._paths&&(a(e)&&n(e),e._paths.forEach(function(e){r.primaWalk(e,a,n,t,i)})),t)},e.rf_changeParamObj=function(e,a,n){var t=[],i=function(e){if(!(e&&e.varDefs&&e.varDefs[a])){var r=e.objPropAccess;r&&r.forEach(function(e){if(e.objName==a){var i=e.node.object;t.push({range:i.range,newValue:n})}}),e.identifiers&&e.identifiers.forEach(function(e){if(e.name==a){var i=e.node;t.push({range:i.range,newValue:n})}}),e.subCtxList&&e.subCtxList.forEach(function(e){e.varDefs&&e.varDefs[a]||i(e)})}};return i(e),t.sort(function(e,a){return a.range[0]-e.range[0]}),t}}(this)},n=function(e,a,t,i,r,s,l,o){var c,f=this;if(!(f instanceof n))return new n(e,a,t,i,r,s,l,o);var p=[e,a,t,i,r,s,l,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(e){c=e.apply(f,p)}),"function"==typeof c){if(c._classInfo.name!=n._classInfo.name)return new c(e,a,t,i,r,s,l,o)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(e){e.apply(f,p)}):"function"==typeof f.init&&f.init.apply(f,p)};n._classInfo={name:"AnalyzeFunc"},n.prototype=new a,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e.AnalyzeFunc=n,this.AnalyzeFunc=n):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.AnalyzeFunc=n:this.AnalyzeFunc=n}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());