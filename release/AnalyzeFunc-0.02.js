// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  // let the private classes out

  var AnalyzeFunc_prototype = function AnalyzeFunc_prototype() {
    // Then create the traits and subclasses for this class here...

    (function (_myTrait_) {
      var _cnt;

      // Initialize static variables here...

      /**
       * Collects list of external module calls, for example Math.sqrt() or similar calls.
       * @param Object ctx  - Context
       */
      _myTrait_.collectExtModules = function (ctx) {
        var rList = [];
        var collectCtx = function collectCtx(ctx) {

          if (!ctx.objCalls) return;

          var rr = Object.keys(ctx.objCalls);
          if (rr) rr.forEach(function (keyName) {
            if (ctx.varDefs && ctx.varDefs[keyName]) return;

            var extDef = {
              name: keyName,
              items: rr[keyName]
            };
            rList.push(extDef);
          });

          if (ctx.subCtxList) ctx.subCtxList.forEach(function (c) {
            collectCtx(c);
          });
        };
        collectCtx(ctx);

        return rList;
      };

      /**
       * Collects Object structure for object for a given parameter name...
       * @param Object ctx  - Context to use
       * @param String objName  - Name of the Object variable to look for
       */
      _myTrait_.collectObjectStructure = function (ctx, objName) {
        var objDef = {};

        var collectCtx = function collectCtx(ctx, subScope) {

          if (!ctx.objPropAccess) return;

          if (subScope && ctx.varDefs && ctx.varDefs[objName]) return;

          var rr = ctx.objPropAccess;
          if (rr) rr.forEach(function (pInfo) {
            if (pInfo.objName == objName) {
              // might search for the type of the property also here...
              objDef[propName] = true;
            }
          });
          if (ctx.subCtxList) ctx.subCtxList.forEach(function (c) {
            if (c.varDefs && c.varDefs[currentName]) return;
            collectCtx(c, true);
          });
        };
        collectCtx(ctx);

        return objDef;
      };

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (t) {});

      /**
       * @param float t
       */
      _myTrait_.localGuid = function (t) {
        if (!_cnt) _cnt = 0;
        return _cnt++;
      };

      /**
       * @param Object node
       * @param float filter
       * @param float cb
       * @param float ctx
       * @param float visitCnt
       */
      _myTrait_.primaWalk = function (node, filter, cb, ctx, visitCnt) {

        if (!node) return ctx;
        if (!visitCnt) visitCnt = 1;
        if (!ctx) ctx = {};

        if (node.__didVisit == visitCnt) return ctx;
        node.__didVisit = visitCnt;

        if (node.type == "Literal") {
          return ctx;
        }

        if (node.type == "Identifier") {
          if (!ctx.identifiers) ctx.identifiers = [];
          ctx.identifiers.push({
            name: node.name,
            node: node
          });
          return ctx;
        }

        var me = this;

        if (node.type == "ReturnStatement") {
          // node.argument
          if (!ctx.returnStatements) {
            ctx.returnStatements = [];
          }
          ctx.returnStatements.push({
            node: node.argument
          });
        }

        // function declaration...
        if (node.type == "FunctionDeclaration") {

          if (node.id) {
            if (!ctx.declaredFns) ctx.declaredFns = {};
            ctx.declaredFns[node.id.name] = {
              node: node,
              name: node.id.name
            };
            var subCtx = {
              type: "function",
              name: node.id.name
            };
            if (!ctx.subCtxList) ctx.subCtxList = [];
            ctx.subCtxList.push(subCtx);
            subCtx._parentCtx = ctx;
            ctx = subCtx;
          } else {
            if (!ctx.declaredFns) ctx.declaredFns = {};
            var ffName = "$$anonymous_" + me.localGuid();
            ctx.declaredFns["$$anonymous_" + me.localGuid()] = {
              node: node,
              anonymous: true
            };
            var subCtx = {
              type: "function"
            };
            if (!ctx.subCtxList) ctx.subCtxList = [];
            ctx.subCtxList.push(subCtx);
            subCtx._parentCtx = ctx;
            ctx = subCtx;
          }
        }

        if (node.type == "AssignmentExpression") {
          if (!ctx.assigments) ctx.assigments = [];

          if (node.left.type == "Identifier") {
            var varName = node.left.name;
            if (ctx.aliases) {
              ctx.aliases.forEach(function (a) {
                if (a.alias == varName) {
                  a.volatile = true;
                  if (!a.changesAt) a.changesAt = [];
                  a.changesAt.push(node);
                }
              });
            }
          }

          ctx.assigments.push({
            left: node.left,
            right: node.right
          });

          me.primaWalk(node.left, filter, cb, ctx, visitCnt);
          me.primaWalk(node.right, filter, cb, ctx, visitCnt);
        }

        if (node.type == "MemberExpression") {
          if (!ctx.objPropAccess) ctx.objPropAccess = [];
          var pp = {
            node: node
          };
          if (node.object) {
            if (node.object.type == "ThisExpression") {
              pp.objName = "this";
            }
            if (node.object.type == "Identifier") {
              pp.objName = node.object.name;
            }
          }
          if (node.property) {
            if (node.property.type == "Literal") {
              pp.propName = node.property.value;
            }
            if (node.property.type == "Identifier") {
              if (node.computed) {
                pp.propVarName = node.property.name;
              } else {
                pp.propName = node.property.name;
              }
            }
          }
          ctx.objPropAccess.push(pp);
        }

        if (node.type == "FunctionExpression") {
          if (!ctx.declaredFns) ctx.declaredFns = {};
          var ffName = "$$anonymous_" + me.localGuid();
          ctx.declaredFns["$$anonymous_" + me.localGuid()] = {
            node: node,
            anonymous: true
          };
          var subCtx = {
            type: "function"
          };
          if (!ctx.subCtxList) ctx.subCtxList = [];
          ctx.subCtxList.push(subCtx);
          subCtx._parentCtx = ctx;
          ctx = subCtx;
        }

        if (node.type == "VariableDeclaration") {
          if (!ctx.varDefs) {
            ctx.varDefs = {};
          }

          console.log("Checking variable declaration");

          node.declarations.forEach(function (dec) {
            var varName = dec.id.name;
            if (ctx.varDefs[varName]) {
              console.log("*** WARNING!!! Double delaration of " + varName + " ***");
            }
            var init = dec.init;
            if (init.type == "ThisExpression") {
              ctx.varDefs[varName] = {
                node: dec,
                type: "this"
              };
              if (!ctx.aliases) ctx.aliases = [];
              ctx.aliases.push({
                alias: varName,
                source: "this"
              });
            }

            if (init.type == "Identifier") {
              ctx.varDefs[varName] = {
                node: dec,
                type: "Identifier"
              };
              if (dec.id.type == "Identifier") {
                // aliases
                if (!ctx.aliases) ctx.aliases = [];
                ctx.aliases.push({
                  alias: varName,
                  source: init.name
                });
              }
              if (dec.init) {
                me.primaWalk(dec.init, filter, cb, ctx, visitCnt);
              }
            }

            if (init.type == "MemberExpression") {
              ctx.varDefs[varName] = {
                node: dec,
                type: "ObjectProperty"
              };
              if (dec.init) {
                me.primaWalk(dec.init, filter, cb, ctx, visitCnt);
              }
            }

            if (init.type == "ObjectExpression") {
              var oDef = {
                node: dec,
                type: "Object",
                properties: {}
              };
              init.properties.forEach(function (p) {
                if (!p.computed) {
                  oDef.properties[p.key.name] = {
                    node: p.value
                  };
                  if (p.value) me.primaWalk(p.value, filter, cb, ctx, visitCnt);
                }
                // TODO: when is the property computed?
              });
              ctx.varDefs[varName] = oDef;
            }
            // Again - easy case - in most cases at least...
            if (init.type == "NewExpression" && init.callee && init.callee.name) {
              ctx.varDefs[varName] = {
                node: dec,
                type: "class",
                className: init.callee.name
              };
            }
            if (init.type == "Literal") {
              ctx.varDefs[varName] = {
                node: dec,
                type: "literal",
                value: init.value
              };
            }
            if (init.type == "CallExpression") {
              // Might be able to find out what is called
              ctx.varDefs[varName] = {
                node: dec,
                type: "call",
                init: init
              };
              if (dec.init) {
                me.primaWalk(dec.init, filter, cb, ctx, visitCnt);
              }
            }
            if (init.type == "FunctionExpression") {
              // Might be able to find out what is called
              ctx.varDefs[varName] = {
                node: dec,
                type: "function",
                init: init
              };

              // defines a function in the context...
              if (!ctx.declaredFns) ctx.declaredFns = {};
              ctx.declaredFns[varName] = {
                node: dec,
                name: varName
              };
              var subCtx = {
                type: "function",
                name: varName
              };
              if (!ctx.subCtxList) ctx.subCtxList = [];
              ctx.subCtxList.push(subCtx);
              subCtx._parentCtx = ctx;
              me.primaWalk(init.body, filter, cb, subCtx, visitCnt);
            }
          });
        }

        if (node.type == "BinaryExpression") {
          me.primaWalk(node.left, filter, cb, ctx, visitCnt);
          me.primaWalk(node.right, filter, cb, ctx, visitCnt);
        }
        if (node.type == "IfStatement") {
          me.primaWalk(node.test, filter, cb, ctx, visitCnt);
          me.primaWalk(node.consequent, filter, cb, ctx, visitCnt);
        }

        // --> push this information to some database possibly...
        if (node.type == "CallExpression") {
          if (node.callee) {
            if (node.callee && node.callee.object && node.callee.property) {
              var obj = node.callee.object;
              if (!ctx.objCalls) {
                ctx.objCalls = {};
              }

              var objName;
              if (obj.type == "ThisExpression") {
                objName = "this";
              } else {
                objName = node.callee.object.name;
              }
              if (!ctx.objCalls[objName]) ctx.objCalls[objName] = [];

              // easy to detect static function call:
              if (node.callee.computed) {
                // me.getThing();
                if (node.callee.property.type == "Literal") {
                  ctx.objCalls[objName].push({
                    node: node,
                    varName: objName,
                    fnName: node.callee.property.value
                  });
                } else {
                  ctx.objCalls[objName].push({
                    node: node,
                    varName: objName,
                    fnVarName: node.callee.property.name
                  });
                }
              } else {
                if (node.callee.property.type == "Literal") {
                  ctx.objCalls[objName].push({
                    node: node,
                    varName: objName,
                    fnName: node.callee.property.value
                  });
                } else {
                  // This variable should be evaluated...
                  ctx.objCalls[objName].push({
                    node: node,
                    varName: objName,
                    fnName: node.callee.property.name
                  });
                }
              }
              //
            }
            if (node.callee && node.callee.name && !node.callee.object) {
              if (!ctx.fnCalls) {
                ctx.fnCalls = {};
              }
              // collect all the calls for some function
              ctx.fnCalls[node.callee.name] = {
                node: node,
                name: node.callee.name,
                type: node.callee.type
              };
            }

            // Walk also arguments, they may have contexts like subfunctions etc.
            if (node.arguments) {
              node.arguments.forEach(function (argNode) {
                me.primaWalk(argNode, filter, cb, ctx, visitCnt);
              });
            }
            me.primaWalk(node.callee, filter, cb, ctx, visitCnt);
          }
        }

        // ---> if you are about to collect expressions...
        if (node.expression) {
          me.primaWalk(node.expression, filter, cb, ctx, visitCnt);
          return ctx;
        }

        if (node.program) {
          me.primaWalk(node.program, filter, cb, ctx, visitCnt);
          return ctx;
        }
        if (node.body && node.body instanceof Array) {
          node.body.forEach(function (node) {
            me.primaWalk(node, filter, cb, ctx, visitCnt);
          });
          return ctx;
        }
        if (node.body) {
          if (filter(node.body)) cb(node.body);
          me.primaWalk(node.body, filter, cb, ctx, visitCnt);
        }
        if (node.node) {
          if (filter(node.node)) cb(node.node);
          me.primaWalk(node.node, filter, cb, ctx, visitCnt);
        }
        if (node._paths) {
          if (filter(node)) cb(node);
          node._paths.forEach(function (np) {
            me.primaWalk(np, filter, cb, ctx, visitCnt);
          });
        }
        return ctx;
      };

      /**
       * Replace all occurrences of object to some other name
       * @param Object ctx  - Context object
       * @param String currentName  - Current name of the Object
       * @param String newName  - New name of the object
       */
      _myTrait_.rf_changeParamObj = function (ctx, currentName, newName) {
        var rList = [];
        var collectCtx = function collectCtx(ctx) {

          // if the variable has been declared in this scope, it can not be changed
          if (ctx && ctx.varDefs && ctx.varDefs[currentName]) return;

          var rr = ctx.objPropAccess;
          if (rr) rr.forEach(function (pInfo) {
            if (pInfo.objName == currentName) {
              var objNode = pInfo.node.object;
              rList.push({
                range: objNode.range,
                newValue: newName
              });
            }
          });
          if (ctx.identifiers) ctx.identifiers.forEach(function (pInfo) {
            if (pInfo.name == currentName) {
              var objNode = pInfo.node;
              rList.push({
                range: objNode.range,
                newValue: newName
              });
            }
          });
          if (ctx.subCtxList) ctx.subCtxList.forEach(function (c) {
            if (c.varDefs && c.varDefs[currentName]) return;
            collectCtx(c);
          });
        };
        collectCtx(ctx);

        // sort results according the range
        rList.sort(function (a, b) {
          return b.range[0] - a.range[0];
        });

        return rList;
      };
    })(this);
  };

  var AnalyzeFunc = function AnalyzeFunc(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof AnalyzeFunc) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != AnalyzeFunc._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new AnalyzeFunc(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  AnalyzeFunc._classInfo = {
    name: "AnalyzeFunc"
  };
  AnalyzeFunc.prototype = new AnalyzeFunc_prototype();

  (function () {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
      __amdDefs__["AnalyzeFunc"] = AnalyzeFunc;
      this.AnalyzeFunc = AnalyzeFunc;
    } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
      module.exports["AnalyzeFunc"] = AnalyzeFunc;
    } else {
      this.AnalyzeFunc = AnalyzeFunc;
    }
  }).call(new Function("return this")());

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());