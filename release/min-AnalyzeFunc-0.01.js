(function(){var e={},n=function(){!function(e){var n;e.__traitInit&&!e.hasOwnProperty("__traitInit")&&(e.__traitInit=e.__traitInit.slice()),e.__traitInit||(e.__traitInit=[]),e.__traitInit.push(function(){}),e.localGuid=function(){return n||(n=0),n++},e.primaWalk=function(e,n,a,t,i){if(!e)return t;if(i||(i=1),t||(t={}),e.__didVisit==i)return t;if(e.__didVisit=i,"Literal"==e.type)return t;if("Identifier"==e.type)return t.identifiers||(t.identifiers={}),t.identifiers[e.name]={node:e},t;var r=this;if("ReturnStatement"==e.type&&(t.returnStatements||(t.returnStatements=[]),t.returnStatements.push({node:e.argument})),"FunctionDeclaration"==e.type)if(e.id){t.declaredFns||(t.declaredFns={}),t.declaredFns[e.id.name]={node:e,name:e.id.name};var l={type:"function",name:e.id.name};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(l),l._parentCtx=t,t=l}else{t.declaredFns||(t.declaredFns={});{"$$anonymous_"+r.localGuid()}t.declaredFns["$$anonymous_"+r.localGuid()]={node:e,anonymous:!0};var l={type:"function"};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(l),l._parentCtx=t,t=l}if("AssignmentExpression"==e.type&&(t.assigments||(t.assigments=[]),t.assigments.push({left:e.left,right:e.right}),r.primaWalk(e.left,n,a,t,i),r.primaWalk(e.right,n,a,t,i)),"MemberExpression"==e.type){t.objPropAccess||(t.objPropAccess=[]);var o={node:e};e.object&&("ThisExpression"==e.object.type&&(o.objName="this"),"Identifier"==e.object.type&&(o.objName=e.object.name)),e.property&&("Literal"==e.property.type&&(o.propName=e.property.value),"Identifier"==e.property.type&&(e.computed?o.propVarName=e.property.name:o.propName=e.property.name)),t.objPropAccess.push(o)}if("FunctionExpression"==e.type){t.declaredFns||(t.declaredFns={});{"$$anonymous_"+r.localGuid()}t.declaredFns["$$anonymous_"+r.localGuid()]={node:e,anonymous:!0};var l={type:"function"};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(l),l._parentCtx=t,t=l}if("VariableDeclaration"==e.type&&(t.varDefs||(t.varDefs={}),console.log("Checking variable declaration"),e.declarations.forEach(function(e){var l=e.id.name;t.varDefs[l]&&console.log("*** WARNING!!! Double delaration of "+l+" ***");var o=e.init;if("ThisExpression"==o.type&&(t.varDefs[l]={node:e,type:"this"}),"ObjectExpression"==o.type){var s={node:e,type:"Object",properties:{}};o.properties.forEach(function(e){e.computed||(s.properties[e.key.name]={node:e.value},e.value&&r.primaWalk(e.value,n,a,t,i))}),t.varDefs[l]=s}if("NewExpression"==o.type&&o.callee&&o.callee.name&&(t.varDefs[l]={node:e,type:"class",className:o.callee.name}),"Literal"==o.type&&(t.varDefs[l]={node:e,type:"literal",value:o.value}),"CallExpression"==o.type&&(t.varDefs[l]={node:e,type:"call",init:o},e.init&&r.primaWalk(e.init,n,a,t,i)),"FunctionExpression"==o.type){t.varDefs[l]={node:e,type:"function",init:o},t.declaredFns||(t.declaredFns={}),t.declaredFns[l]={node:e,name:l};var p={type:"function",name:l};t.subCtxList||(t.subCtxList=[]),t.subCtxList.push(p),p._parentCtx=t,r.primaWalk(o.body,n,a,p,i)}})),"BinaryExpression"==e.type&&(r.primaWalk(e.left,n,a,t,i),r.primaWalk(e.right,n,a,t,i)),"IfStatement"==e.type&&(r.primaWalk(e.test,n,a,t,i),r.primaWalk(e.consequent,n,a,t,i)),"CallExpression"==e.type&&e.callee){if(e.callee&&e.callee.object&&e.callee.property){var s=e.callee.object;t.objCalls||(t.objCalls={});var p;p="ThisExpression"==s.type?"this":e.callee.object.name,t.objCalls[p]||(t.objCalls[p]=[]),t.objCalls[p].push(e.callee.computed?"Literal"==e.callee.property.type?{node:e,varName:p,fnName:e.callee.property.value}:{node:e,varName:p,fnVarName:e.callee.property.name}:"Literal"==e.callee.property.type?{node:e,varName:p,fnName:e.callee.property.value}:{node:e,varName:p,fnName:e.callee.property.name})}e.callee&&e.callee.name&&!e.callee.object&&(t.fnCalls||(t.fnCalls={}),t.fnCalls[e.callee.name]={node:e,name:e.callee.name,type:e.callee.type}),e.arguments&&e.arguments.forEach(function(e){r.primaWalk(e,n,a,t,i)}),r.primaWalk(e.callee,n,a,t,i)}return e.expression?(r.primaWalk(e.expression,n,a,t,i),t):e.program?(r.primaWalk(e.program,n,a,t,i),t):e.body&&e.body instanceof Array?(e.body.forEach(function(e){r.primaWalk(e,n,a,t,i)}),t):(e.body&&(n(e.body)&&a(e.body),r.primaWalk(e.body,n,a,t,i)),e.node&&(n(e.node)&&a(e.node),r.primaWalk(e.node,n,a,t,i)),e._paths&&(n(e)&&a(e),e._paths.forEach(function(e){r.primaWalk(e,n,a,t,i)})),t)}}(this)},a=function(e,n,t,i,r,l,o,s){var p,c=this;if(!(c instanceof a))return new a(e,n,t,i,r,l,o,s);var u=[e,n,t,i,r,l,o,s];if(c.__factoryClass)if(c.__factoryClass.forEach(function(e){p=e.apply(c,u)}),"function"==typeof p){if(p._classInfo.name!=a._classInfo.name)return new p(e,n,t,i,r,l,o,s)}else if(p)return p;c.__traitInit?c.__traitInit.forEach(function(e){e.apply(c,u)}):"function"==typeof c.init&&c.init.apply(c,u)};a._classInfo={name:"AnalyzeFunc"},a.prototype=new n,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(e.AnalyzeFunc=a,this.AnalyzeFunc=a):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.AnalyzeFunc=a:this.AnalyzeFunc=a}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(e)}).call(new Function("return this")());