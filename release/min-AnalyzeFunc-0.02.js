(function(){var e={},n=function(){!function(e){var n;e.collectExtModules=function(e){var n=[],a=this,t=function(e){if(e.objCalls){var i=Object.keys(e.objCalls);i&&i.forEach(function(t){if(!a.definedInCtx(e,t)){var r={name:t,items:i[t]};n.push(r)}}),e.subCtxList&&e.subCtxList.forEach(function(e){t(e)})}};return t(e),n},e.collectObjectStructure=function(e,n){var a={},t=this,i=function(e){if(e.objPropAccess&&!t.definedInCtx(n)){var r=e.objPropAccess;r&&r.forEach(function(e){e.objName==n&&(a[e.propName]=!0)}),e.subCtxList&&e.subCtxList.forEach(function(e){i(e,!0)})}};return i(e),a},e.definedInCtx=function(e,n){return e&&e.varDefs&&e.varDefs[n]?!0:e._parentCtx?this.definedInCtx(e._parentCtx,n):!1},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(){}),e.localGuid=function(){return n||(n=0),n++},e.primaWalk=function(e,n,a,t,i){if(!e)return t;if(i||(i=1),t||(t={}),e.__didVisit==i)return t;if(e.__didVisit=i,"Literal"==e.type)return t;if("Identifier"==e.type)return t.identifiers||(t.identifiers=[]),t.identifiers.push({name:e.name,node:e}),t;var r=this;if("ReturnStatement"==e.type&&(t.returnStatements||(t.returnStatements=[]),t.returnStatements.push({node:e.argument})),"FunctionDeclaration"==e.type)if(e.id){t.declaredFns||(t.declaredFns={}),t.declaredFns[e.id.name]={node:e,name:e.id.name};var s={type:"function",name:e.id.name};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(s),s._parentCtx=t,t=s}else{t.declaredFns||(t.declaredFns={});{"$$anonymous_"+r.localGuid()}t.declaredFns["$$anonymous_"+r.localGuid()]={node:e,anonymous:!0};var s={type:"function"};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(s),s._parentCtx=t,t=s}if("AssignmentExpression"==e.type){if(t.assigments||(t.assigments=[]),"Identifier"==e.left.type){var o=e.left.name;t.aliases&&t.aliases.forEach(function(n){n.alias==o&&(n.volatile=!0,n.changesAt||(n.changesAt=[]),n.changesAt.push(e))})}t.assigments.push({left:e.left,right:e.right}),r.primaWalk(e.left,n,a,t,i),r.primaWalk(e.right,n,a,t,i)}if("MemberExpression"==e.type){t.objPropAccess||(t.objPropAccess=[]);var l={node:e};e.object&&("ThisExpression"==e.object.type&&(l.objName="this"),"Identifier"==e.object.type&&(l.objName=e.object.name)),e.property&&("Literal"==e.property.type&&(l.propName=e.property.value),"Identifier"==e.property.type&&(e.computed?l.propVarName=e.property.name:l.propName=e.property.name)),t.objPropAccess.push(l)}if("FunctionExpression"==e.type){t.declaredFns||(t.declaredFns={});{"$$anonymous_"+r.localGuid()}t.declaredFns["$$anonymous_"+r.localGuid()]={node:e,anonymous:!0};var s={type:"function"};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(s),s._parentCtx=t,t=s}if("VariableDeclaration"==e.type&&(t.varDefs||(t.varDefs={}),console.log("Checking variable declaration"),e.declarations.forEach(function(e){var s=e.id.name;t.varDefs[s]&&console.log("*** WARNING!!! Double delaration of "+s+" ***");var o=e.init;if("ThisExpression"==o.type&&(t.varDefs[s]={node:e,type:"this"},t.aliases||(t.aliases=[]),t.aliases.push({alias:s,source:"this"})),"Identifier"==o.type&&(t.varDefs[s]={node:e,type:"Identifier"},"Identifier"==e.id.type&&(t.aliases||(t.aliases=[]),t.aliases.push({alias:s,source:o.name})),e.init&&r.primaWalk(e.init,n,a,t,i)),"MemberExpression"==o.type&&(t.varDefs[s]={node:e,type:"ObjectProperty"},e.init&&r.primaWalk(e.init,n,a,t,i)),"ObjectExpression"==o.type){var l={node:e,type:"Object",properties:{}};o.properties.forEach(function(e){e.computed||(l.properties[e.key.name]={node:e.value},e.value&&r.primaWalk(e.value,n,a,t,i))}),t.varDefs[s]=l}if("NewExpression"==o.type&&o.callee&&o.callee.name&&(t.varDefs[s]={node:e,type:"class",className:o.callee.name}),"Literal"==o.type&&(t.varDefs[s]={node:e,type:"literal",value:o.value}),"CallExpression"==o.type&&(t.varDefs[s]={node:e,type:"call",init:o},e.init&&r.primaWalk(e.init,n,a,t,i)),"FunctionExpression"==o.type){t.varDefs[s]={node:e,type:"function",init:o},t.declaredFns||(t.declaredFns={}),t.declaredFns[s]={node:e,name:s};var p={type:"function",name:s};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(p),p._parentCtx=t,r.primaWalk(o.body,n,a,p,i)}})),"BinaryExpression"==e.type&&(r.primaWalk(e.left,n,a,t,i),r.primaWalk(e.right,n,a,t,i)),"IfStatement"==e.type&&(r.primaWalk(e.test,n,a,t,i),r.primaWalk(e.consequent,n,a,t,i)),"CallExpression"==e.type&&e.callee){if(e.callee&&e.callee.object&&e.callee.property){var p=e.callee.object;t.objCalls||(t.objCalls={});var c;c="ThisExpression"==p.type?"this":e.callee.object.name,t.objCalls[c]||(t.objCalls[c]=[]),t.objCalls[c].push(e.callee.computed?"Literal"==e.callee.property.type?{node:e,varName:c,fnName:e.callee.property.value}:{node:e,varName:c,fnVarName:e.callee.property.name}:"Literal"==e.callee.property.type?{node:e,varName:c,fnName:e.callee.property.value}:{node:e,varName:c,fnName:e.callee.property.name})}e.callee&&e.callee.name&&!e.callee.object&&(t.fnCalls||(t.fnCalls={}),t.fnCalls[e.callee.name]={node:e,name:e.callee.name,type:e.callee.type}),e.arguments&&e.arguments.forEach(function(e){r.primaWalk(e,n,a,t,i)}),r.primaWalk(e.callee,n,a,t,i)}return e.expression?(r.primaWalk(e.expression,n,a,t,i),t):e.program?(r.primaWalk(e.program,n,a,t,i),t):e.body&&e.body instanceof Array?(e.body.forEach(function(e){r.primaWalk(e,n,a,t,i)}),t):(e.body&&(n(e.body)&&a(e.body),r.primaWalk(e.body,n,a,t,i)),e.node&&(n(e.node)&&a(e.node),r.primaWalk(e.node,n,a,t,i)),e._paths&&(n(e)&&a(e),e._paths.forEach(function(e){r.primaWalk(e,n,a,t,i)})),t)},e.rf_changeParamObj=function(e,n,a){var t=[],i=function(e){if(!(e&&e.varDefs&&e.varDefs[n])){var r=e.objPropAccess;r&&r.forEach(function(e){if(e.objName==n){var i=e.node.object;t.push({range:i.range,newValue:a})}}),e.identifiers&&e.identifiers.forEach(function(e){if(e.name==n){var i=e.node;t.push({range:i.range,newValue:a})}}),e.subCtxList&&e.subCtxList.forEach(function(e){e.varDefs&&e.varDefs[n]||i(e)})}};return i(e),t.sort(function(e,n){return n.range[0]-e.range[0]}),t}}(this)},a=function(e,n,t,i,r,s,o,l){var p,c=this;if(!(c instanceof a))return new a(e,n,t,i,r,s,o,l);var f=[e,n,t,i,r,s,o,l];if(c.__factoryClass)if(c.__factoryClass.forEach(function(e){p=e.apply(c,f)}),"function"==typeof p){if(p._classInfo.name!=a._classInfo.name)return new p(e,n,t,i,r,s,o,l)}else if(p)return p;c.__traitInit?c.__traitInit.forEach(function(e){e.apply(c,f)}):"function"==typeof c.init&&c.init.apply(c,f)};a._classInfo={name:"AnalyzeFunc"},a.prototype=new n,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e.AnalyzeFunc=a,this.AnalyzeFunc=a):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.AnalyzeFunc=a:this.AnalyzeFunc=a}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());