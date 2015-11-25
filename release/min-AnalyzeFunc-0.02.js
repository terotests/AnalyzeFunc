(function(){var e={},a=function(){!function(e){var a;e.collectObjectStructure=function(e){var a={},n=function(e){var a=e.objPropAccess;a&&a.forEach(function(e){if(e.objName==currentName){var a=e.node.object;rList.push({range:a.range,newValue:newName})}}),e.identifiers&&e.identifiers.forEach(function(e){if(e.name==currentName){var a=e.node;rList.push({range:a.range,newValue:newName})}}),e.subCtxList&&e.subCtxList.forEach(function(e){e.varDefs&&e.varDefs[currentName]||n(e)})};return n(e),a},e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(){}),e.localGuid=function(){return a||(a=0),a++},e.primaWalk=function(e,a,n,t,i){if(!e)return t;if(i||(i=1),t||(t={}),e.__didVisit==i)return t;if(e.__didVisit=i,"Literal"==e.type)return t;if("Identifier"==e.type)return t.identifiers||(t.identifiers=[]),t.identifiers.push({name:e.name,node:e}),t;var r=this;if("ReturnStatement"==e.type&&(t.returnStatements||(t.returnStatements=[]),t.returnStatements.push({node:e.argument})),"FunctionDeclaration"==e.type)if(e.id){t.declaredFns||(t.declaredFns={}),t.declaredFns[e.id.name]={node:e,name:e.id.name};var s={type:"function",name:e.id.name};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(s),s._parentCtx=t,t=s}else{t.declaredFns||(t.declaredFns={});{"$$anonymous_"+r.localGuid()}t.declaredFns["$$anonymous_"+r.localGuid()]={node:e,anonymous:!0};var s={type:"function"};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(s),s._parentCtx=t,t=s}if("AssignmentExpression"==e.type){if(t.assigments||(t.assigments=[]),"Identifier"==e.left.type){var o=e.left.name;t.aliases&&t.aliases.forEach(function(a){a.alias==o&&(a.volatile=!0,a.changesAt||(a.changesAt=[]),a.changesAt.push(e))})}t.assigments.push({left:e.left,right:e.right}),r.primaWalk(e.left,a,n,t,i),r.primaWalk(e.right,a,n,t,i)}if("MemberExpression"==e.type){t.objPropAccess||(t.objPropAccess=[]);var l={node:e};e.object&&("ThisExpression"==e.object.type&&(l.objName="this"),"Identifier"==e.object.type&&(l.objName=e.object.name)),e.property&&("Literal"==e.property.type&&(l.propName=e.property.value),"Identifier"==e.property.type&&(e.computed?l.propVarName=e.property.name:l.propName=e.property.name)),t.objPropAccess.push(l)}if("FunctionExpression"==e.type){t.declaredFns||(t.declaredFns={});{"$$anonymous_"+r.localGuid()}t.declaredFns["$$anonymous_"+r.localGuid()]={node:e,anonymous:!0};var s={type:"function"};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(s),s._parentCtx=t,t=s}if("VariableDeclaration"==e.type&&(t.varDefs||(t.varDefs={}),console.log("Checking variable declaration"),e.declarations.forEach(function(e){var s=e.id.name;t.varDefs[s]&&console.log("*** WARNING!!! Double delaration of "+s+" ***");var o=e.init;if("ThisExpression"==o.type&&(t.varDefs[s]={node:e,type:"this"},t.aliases||(t.aliases=[]),t.aliases.push({alias:s,source:"this"})),"Identifier"==o.type&&(t.varDefs[s]={node:e,type:"Identifier"},"Identifier"==e.id.type&&(t.aliases||(t.aliases=[]),t.aliases.push({alias:s,source:o.name})),e.init&&r.primaWalk(e.init,a,n,t,i)),"MemberExpression"==o.type&&(t.varDefs[s]={node:e,type:"ObjectProperty"},e.init&&r.primaWalk(e.init,a,n,t,i)),"ObjectExpression"==o.type){var l={node:e,type:"Object",properties:{}};o.properties.forEach(function(e){e.computed||(l.properties[e.key.name]={node:e.value},e.value&&r.primaWalk(e.value,a,n,t,i))}),t.varDefs[s]=l}if("NewExpression"==o.type&&o.callee&&o.callee.name&&(t.varDefs[s]={node:e,type:"class",className:o.callee.name}),"Literal"==o.type&&(t.varDefs[s]={node:e,type:"literal",value:o.value}),"CallExpression"==o.type&&(t.varDefs[s]={node:e,type:"call",init:o},e.init&&r.primaWalk(e.init,a,n,t,i)),"FunctionExpression"==o.type){t.varDefs[s]={node:e,type:"function",init:o},t.declaredFns||(t.declaredFns={}),t.declaredFns[s]={node:e,name:s};var p={type:"function",name:s};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(p),p._parentCtx=t,r.primaWalk(o.body,a,n,p,i)}})),"BinaryExpression"==e.type&&(r.primaWalk(e.left,a,n,t,i),r.primaWalk(e.right,a,n,t,i)),"IfStatement"==e.type&&(r.primaWalk(e.test,a,n,t,i),r.primaWalk(e.consequent,a,n,t,i)),"CallExpression"==e.type&&e.callee){if(e.callee&&e.callee.object&&e.callee.property){var p=e.callee.object;t.objCalls||(t.objCalls={});var c;c="ThisExpression"==p.type?"this":e.callee.object.name,t.objCalls[c]||(t.objCalls[c]=[]),t.objCalls[c].push(e.callee.computed?"Literal"==e.callee.property.type?{node:e,varName:c,fnName:e.callee.property.value}:{node:e,varName:c,fnVarName:e.callee.property.name}:"Literal"==e.callee.property.type?{node:e,varName:c,fnName:e.callee.property.value}:{node:e,varName:c,fnName:e.callee.property.name})}e.callee&&e.callee.name&&!e.callee.object&&(t.fnCalls||(t.fnCalls={}),t.fnCalls[e.callee.name]={node:e,name:e.callee.name,type:e.callee.type}),e.arguments&&e.arguments.forEach(function(e){r.primaWalk(e,a,n,t,i)}),r.primaWalk(e.callee,a,n,t,i)}return e.expression?(r.primaWalk(e.expression,a,n,t,i),t):e.program?(r.primaWalk(e.program,a,n,t,i),t):e.body&&e.body instanceof Array?(e.body.forEach(function(e){r.primaWalk(e,a,n,t,i)}),t):(e.body&&(a(e.body)&&n(e.body),r.primaWalk(e.body,a,n,t,i)),e.node&&(a(e.node)&&n(e.node),r.primaWalk(e.node,a,n,t,i)),e._paths&&(a(e)&&n(e),e._paths.forEach(function(e){r.primaWalk(e,a,n,t,i)})),t)},e.rf_changeParamObj=function(e,a,n){var t=[],i=function(e){if(!(e&&e.varDefs&&e.varDefs[a])){var r=e.objPropAccess;r&&r.forEach(function(e){if(e.objName==a){var i=e.node.object;t.push({range:i.range,newValue:n})}}),e.identifiers&&e.identifiers.forEach(function(e){if(e.name==a){var i=e.node;t.push({range:i.range,newValue:n})}}),e.subCtxList&&e.subCtxList.forEach(function(e){e.varDefs&&e.varDefs[a]||i(e)})}};return i(e),t.sort(function(e,a){return a.range[0]-e.range[0]}),t}}(this)},n=function(e,a,t,i,r,s,o,l){var p,c=this;if(!(c instanceof n))return new n(e,a,t,i,r,s,o,l);var u=[e,a,t,i,r,s,o,l];if(c.__factoryClass)if(c.__factoryClass.forEach(function(e){p=e.apply(c,u)}),"function"==typeof p){if(p._classInfo.name!=n._classInfo.name)return new p(e,a,t,i,r,s,o,l)}else if(p)return p;c.__traitInit?c.__traitInit.forEach(function(e){e.apply(c,u)}):"function"==typeof c.init&&c.init.apply(c,u)};n._classInfo={name:"AnalyzeFunc"},n.prototype=new a,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e.AnalyzeFunc=n,this.AnalyzeFunc=n):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.AnalyzeFunc=n:this.AnalyzeFunc=n}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());