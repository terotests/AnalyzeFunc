
Test usage:

```javascript

    var pw = AnalyzeFunc();
    var pcc = esprima.parse(codeStr, { loc : true, range : true, comment : true});
    console.log(pcc);
    var ctx = pw.primaWalk( pcc, function() {
        return true
    }, function() {
           
    }, {});
    console.log(ctx);
            
``` 
















   

 


   
#### Class AnalyzeFunc


- [localGuid](README.md#AnalyzeFunc_localGuid)
- [primaWalk](README.md#AnalyzeFunc_primaWalk)



   


   





   
# Class AnalyzeFunc


The class has following internal singleton variables:
        
* _cnt
        
        
### AnalyzeFunc::constructor( t )

```javascript

```
        
### <a name="AnalyzeFunc_localGuid"></a>AnalyzeFunc::localGuid(t)


```javascript
if(!_cnt) _cnt = 0;
return _cnt++;

```

### <a name="AnalyzeFunc_primaWalk"></a>AnalyzeFunc::primaWalk(node, filter, cb, ctx, visitCnt)


```javascript

if(!node) return ctx;
if(!visitCnt) visitCnt = 1;
if(!ctx) ctx = {};

if(node.__didVisit == visitCnt) return ctx;
node.__didVisit = visitCnt;

if(node.type=="Literal") {
    return ctx;
}
if(node.type=="Identifier") {
    if(!ctx.identifiers) ctx.identifiers = {};
    ctx.identifiers[node.name] = {
        node : node
    }
    return ctx;
}

var me = this;

if(node.type=="ReturnStatement") {
    // node.argument
    if(!ctx.returnStatements) {
        ctx.returnStatements = [];
    }
    ctx.returnStatements.push({
        node : node.argument
    });
}

// function declaration...
if(node.type=="FunctionDeclaration") {
    
    if(node.id) {
        if(!ctx.declaredFns) ctx.declaredFns = {};
        ctx.declaredFns[node.id.name] = {
            node : node,
            name : node.id.name
        }
        var subCtx = {
            type : "function",
            name : node.id.name
        };
        if(!ctx.subCtxList) ctx.subCtxList = [];
        ctx.subCtxList.push( subCtx );
        subCtx._parentCtx = ctx;
        ctx = subCtx;
    } else {
        if(!ctx.declaredFns) ctx.declaredFns = {};
        var ffName = "$$anonymous_"+me.localGuid();
        ctx.declaredFns["$$anonymous_"+me.localGuid()] = {
            node : node,
            anonymous : true
        }
        var subCtx = {
            type : "function"
        };
        if(!ctx.subCtxList) ctx.subCtxList = [];
        ctx.subCtxList.push( subCtx );
        subCtx._parentCtx = ctx;
        ctx = subCtx;        
    }
}

if(node.type=="MemberExpression") {
    if(!ctx.objPropAccess) ctx.objPropAccess = [];
    var pp = {
        node : node
    };
    if(node.object) {
        if(node.object.type=="ThisExpression") {
            pp.objName = "this";
        } 
        if(node.object.type=="Identifier") {
            pp.objName = node.object.name;
        }
      
    }
    if(node.property) {
        if(node.property.type=="Literal") {
            pp.propName = node.property.value;
        }          
        if(node.property.type=="Identifier") {
            if(node.computed) {
                pp.propVarName = node.property.name;
            } else {
                pp.propName = node.property.name;
            }
        }
    }
    ctx.objPropAccess.push(pp);
}

if(node.type=="FunctionExpression") {
    if(!ctx.declaredFns) ctx.declaredFns = {};
    var ffName = "$$anonymous_"+me.localGuid();
    ctx.declaredFns["$$anonymous_"+me.localGuid()] = {
        node : node,
        anonymous : true
    }
    var subCtx = {
        type : "function"
    };
    if(!ctx.subCtxList) ctx.subCtxList = [];
    ctx.subCtxList.push( subCtx );
    subCtx._parentCtx = ctx;
    ctx = subCtx;       
}

if(node.type=="VariableDeclaration") {
    if(!ctx.varDefs) {
        ctx.varDefs = {};
    }
    
    console.log("Checking variable declaration");
    
    node.declarations.forEach( function(dec) {
        var varName = dec.id.name;
        if(ctx.varDefs[varName]) {
            console.log("*** WARNING!!! Double delaration of "+varName+" ***");
        }
        var init = dec.init;
        if(init.type=="ThisExpression") {
            ctx.varDefs[varName] = {
                node : dec,
                type : "this"
            };
        }
        
        if(init.type=="ObjectExpression") {
            var oDef = {
                node : dec,
                type : "Object",
                properties : {}
            };            
            init.properties.forEach( function(p) {
                if(!p.computed) {
                    oDef.properties[p.key.name] = {
                        node : p.value  
                    };
                    if(p.value) me.primaWalk(p.value, filter, cb, ctx, visitCnt) 
                } 
                // TODO: when is the property computed?
            })
            ctx.varDefs[varName] = oDef;
        }
        // Again - easy case - in most cases at least...
        if(init.type=="NewExpression" && init.callee && init.callee.name) {
            ctx.varDefs[varName] = {
                node : dec,
                type : "class",
                className : init.callee.name
            };
        }     
        if(init.type=="Literal") {
            ctx.varDefs[varName] = {
                node : dec,
                type : "literal",
                value : init.value
            };            
        }
        if(init.type=="CallExpression") {
            // Might be able to find out what is called
            ctx.varDefs[varName] = {
                node : dec,
                type : "call",
                init : init
            };              
            if(dec.init) {
                me.primaWalk(dec.init, filter, cb, ctx, visitCnt) 
            }            
        }
        if(init.type=="FunctionExpression") {
            // Might be able to find out what is called
            ctx.varDefs[varName] = {
                node : dec,
                type : "function",
                init : init
            };              
            
            // defines a function in the context...
            if(!ctx.declaredFns) ctx.declaredFns = {};
            ctx.declaredFns[varName] = {
                node : dec,
                name : varName
            }
            var subCtx = {
                type : "function",
                name : varName
            };
            if(!ctx.subCtxList) ctx.subCtxList = [];
            ctx.subCtxList.push( subCtx );
            subCtx._parentCtx = ctx;
            me.primaWalk(init.body, filter, cb, subCtx, visitCnt);
        }        
        
    })
}

if(node.type=="BinaryExpression") {
    me.primaWalk(node.left, filter, cb, ctx, visitCnt);
    me.primaWalk(node.right, filter, cb, ctx, visitCnt);
}
if(node.type=="IfStatement") {
    me.primaWalk(node.test, filter, cb, ctx, visitCnt);
    me.primaWalk(node.consequent, filter, cb, ctx, visitCnt);
}

// --> push this information to some database possibly...
if(node.type=="CallExpression") {
    if(node.callee) {
        if(node.callee && node.callee.object && node.callee.property) {
            var obj = node.callee.object;
            if(!ctx.objCalls) {
                ctx.objCalls = {};
            }   

            
            var objName;
            if(obj.type =="ThisExpression") {
                objName = "this";
            } else {
                objName = node.callee.object.name;   
            }
            if(!ctx.objCalls[objName])
                ctx.objCalls[objName] = [];           
                
            // easy to detect static function call:
            if(node.callee.computed) {
                // me.getThing();
                if(node.callee.property.type == "Literal") {
                    ctx.objCalls[objName].push({ 
                        node : node,
                        varName :  objName,
                        fnName : node.callee.property.value
                    });                     
                } else {
                    ctx.objCalls[objName].push({ 
                        node : node,
                        varName :  objName,
                        fnVarName : node.callee.property.name
                    });     
                }
            } else {
                if(node.callee.property.type == "Literal") {
                    ctx.objCalls[objName].push({ 
                        node : node,
                        varName :  objName,
                        fnName : node.callee.property.value
                    });                     
                } else {
                    // This variable should be evaluated...
                    ctx.objCalls[objName].push({ 
                        node : node,
                        varName :  objName,
                        fnName : node.callee.property.name
                    });                     
                }
            }
            // 

            
        }        
        if(node.callee && node.callee.name && !node.callee.object) {
            if(!ctx.fnCalls) {
                ctx.fnCalls = {};
            }
            // collect all the calls for some function
            ctx.fnCalls[node.callee.name] = { 
                node : node,
                name : node.callee.name,
                type : node.callee.type
            }
            
        }
        
        // Walk also arguments, they may have contexts like subfunctions etc.
        if(node.arguments) {
            node.arguments.forEach( function(argNode) {
                me.primaWalk(argNode, filter, cb, ctx, visitCnt) 
            })
        }
        me.primaWalk(node.callee, filter, cb, ctx, visitCnt) 
    }
}

// ---> if you are about to collect expressions...
if(node.expression) {
    me.primaWalk(node.expression, filter, cb, ctx, visitCnt) 
    return ctx;
}

if(node.program) {
    me.primaWalk(node.program, filter, cb, ctx, visitCnt)
    return ctx;
}
if(node.body && (node.body instanceof Array)) {
    node.body.forEach( function(node) {
        me.primaWalk(node, filter, cb, ctx, visitCnt)
    });
    return ctx;
}          
if(node.body) {
    if(filter(node.body)) cb( node.body );
    me.primaWalk(node.body, filter, cb, ctx, visitCnt)
}
if(node.node) {
    if(filter(node.node)) cb( node.node );
    me.primaWalk(node.node, filter, cb, ctx, visitCnt)
}
if(node._paths) {
    if(filter(node)) cb( node );
    node._paths.forEach( function(np) {
        me.primaWalk(np, filter, cb, ctx, visitCnt)
    });
}
return ctx;

```



   


   



