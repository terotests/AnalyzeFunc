
















   

 


   
#### Class Matrix3D


- [applyTransformations](README.md#Matrix3D_applyTransformations)
- [copyFrom](README.md#Matrix3D_copyFrom)
- [createCopy](README.md#Matrix3D_createCopy)
- [createIdentity](README.md#Matrix3D_createIdentity)
- [createThreeMatrix](README.md#Matrix3D_createThreeMatrix)
- [createTransformCopy](README.md#Matrix3D_createTransformCopy)
- [det](README.md#Matrix3D_det)
- [dragTransformation](README.md#Matrix3D_dragTransformation)
- [get2DTransform](README.md#Matrix3D_get2DTransform)
- [get3DTransform](README.md#Matrix3D_get3DTransform)
- [getCSSMatrix2D](README.md#Matrix3D_getCSSMatrix2D)
- [getCSSMatrix3D](README.md#Matrix3D_getCSSMatrix3D)
- [getRotation2D](README.md#Matrix3D_getRotation2D)
- [getSVGTransform](README.md#Matrix3D_getSVGTransform)
- [intersectPlane](README.md#Matrix3D_intersectPlane)
- [inverse](README.md#Matrix3D_inverse)
- [isValidMatrix](README.md#Matrix3D_isValidMatrix)
- [log](README.md#Matrix3D_log)
- [matMul](README.md#Matrix3D_matMul)
- [normalize](README.md#Matrix3D_normalize)
- [normalizeVector3D](README.md#Matrix3D_normalizeVector3D)
- [projectVector](README.md#Matrix3D_projectVector)
- [rotate](README.md#Matrix3D_rotate)
- [scale](README.md#Matrix3D_scale)
- [screenProjection](README.md#Matrix3D_screenProjection)
- [setCanvasContext](README.md#Matrix3D_setCanvasContext)
- [setDomContext](README.md#Matrix3D_setDomContext)
- [systemHas3D](README.md#Matrix3D_systemHas3D)
- [translate](README.md#Matrix3D_translate)
- [updateFromParams](README.md#Matrix3D_updateFromParams)



   
    
##### trait matrixFn

- [addChangeListener](README.md#matrixFn_addChangeListener)
- [addToBatch](README.md#matrixFn_addToBatch)
- [guid](README.md#matrixFn_guid)
- [isArray](README.md#matrixFn_isArray)
- [m00](README.md#matrixFn_m00)
- [m01](README.md#matrixFn_m01)
- [m02](README.md#matrixFn_m02)
- [m03](README.md#matrixFn_m03)
- [m10](README.md#matrixFn_m10)
- [m11](README.md#matrixFn_m11)
- [m12](README.md#matrixFn_m12)
- [m13](README.md#matrixFn_m13)
- [m20](README.md#matrixFn_m20)
- [m21](README.md#matrixFn_m21)
- [m22](README.md#matrixFn_m22)
- [m23](README.md#matrixFn_m23)
- [m30](README.md#matrixFn_m30)
- [m31](README.md#matrixFn_m31)
- [m32](README.md#matrixFn_m32)
- [m33](README.md#matrixFn_m33)
- [onChange](README.md#matrixFn_onChange)
- [removeListener](README.md#matrixFn_removeListener)
- [setBatching](README.md#matrixFn_setBatching)


    
    


   
      
    





   
# Class Matrix3D


The class has following internal singleton variables:
        
* _initDone
        
* _m3dSupport
        
        
### <a name="Matrix3D_applyTransformations"></a>Matrix3D::applyTransformations(obj, parentMatrix, getChildItems, camera)
`obj` Object containing the 3D matrixes
 
`parentMatrix` Matrix of the parent or null
 
`getChildItems` Function which
 
`camera` Camera object
 

Example function of how to create full 3D transformation for object.

The object is defined as:
```javascript
var obj = {
  _scaleMatrix : Matrix3D(),
  _rotMatrix : Matrix3D(),
  _transMatrix : Matrix3D(),
}
```

Optionally can be given `_pivotPoint` to adjust the center of the rotation.


```javascript

if(!obj._scaleMatrix && !obj._rotMatrix && !obj._transMatrix) {
    if(getChildItems) {
        var list = getChildItems(obj);
        if(list) {
            var me = this;
            list.forEach( function(i) {
                me.applyTransformations( i, parentMatrix, getChildItems, camera );
            });
        }
    }    
}

// new local transformation matrix
var local = Matrix3D();

if(!obj._localTransform) obj._localTransform = Matrix3D();

// important to create a copy of the parent matrix first.
if(!parentMatrix) {
    parentMatrix = Matrix3D();
} else {
    parentMatrix = parentMatrix.createCopy();
}

if(!obj._lastParentMatrix) {
    obj._lastParentMatrix = parentMatrix.createCopy();
} else {
    obj._lastParentMatrix.copyFrom(parentMatrix);
}

// if object has a pivot point, adjust transformation 
if(obj._pivotPoint) {
    var adjustPivot = Matrix3D();
    adjustPivot.translate( { x: -1*obj._pivotPoint.x,  y: -1*obj._pivotPoint.y, z:-1*( obj._pivotPoint.z || 0) });
    
}

if(obj._transMatrix) {
    local.matMul(obj._transMatrix);
    var beforeRot = parentMatrix.createCopy();
    beforeRot.matMul( obj._transMatrix );
    obj._beforeRot = beforeRot;
}

if(obj._scaleMatrix) local.matMul( obj._scaleMatrix);
if(obj._rotMatrix)   local.matMul( obj._rotMatrix);

if(adjustPivot) local.matMul(adjustPivot);

// set transformation of the object

obj._localTransform.copyFrom(local);

parentMatrix.matMul( local );
if(!obj._renderMatrix) obj._renderMatrix = new Matrix3D();

obj._renderMatrix.copyFrom( parentMatrix );

// if there is projection
if(camera) {
    var project = camera._renderMatrix.createCopy().inverse(); // the final matrix of the camera
    project.matMul( obj._renderMatrix );
    if(!obj._projectionMatrix) obj._projectionMatrix = new Matrix3D();
    obj._projectionMatrix.copyFrom( project );
}

if(getChildItems) {
    var list = getChildItems(obj);
    if(list) {
        var rm = obj._renderMatrix, me = this;
        list.forEach( function(i) {
            me.applyTransformations( i, rm, getChildItems, camera );
        });
    }
}

```

### <a name="Matrix3D_copyFrom"></a>Matrix3D::copyFrom(matrix)
`matrix` Other matrix object, copy data from the object
 

Copies data from other Matrix3D object
```javascript
var mm = matrix._data;

this.m00( mm.m00 );
this.m01( mm.m01 );
this.m02( mm.m02 );
this.m03( mm.m03 );

this.m10( mm.m10 );
this.m11( mm.m11 );
this.m12( mm.m12 );
this.m13( mm.m13 );

this.m20( mm.m20 );
this.m21( mm.m21 );
this.m22( mm.m22 );
this.m23( mm.m23 );

this.m30( mm.m30 );
this.m31( mm.m31 );
this.m32( mm.m32 );
this.m33( mm.m33 );

return this;

```

### <a name="Matrix3D_createCopy"></a>Matrix3D::createCopy(t)

Returns a copy of current Matrix3D Object
```javascript
var newM = this.createIdentity();
newM.updateFromParams( 
        this.m00(),
        this.m01(),
        this.m02(),
        this.m03(),
        
        this.m10(),
        this.m11(),
        this.m12(),
        this.m13(),
        
        this.m20(),
        this.m21(),
        this.m22(),
        this.m23(),
        
        this.m30(),
        this.m31(),
        this.m32(),
        this.m33()
    );
    
return newM;
```

### <a name="Matrix3D_createIdentity"></a>Matrix3D::createIdentity(t)

Creates a new idendity matrix.
```javascript
return Matrix3D();
```

### <a name="Matrix3D_createThreeMatrix"></a>Matrix3D::createThreeMatrix(t)

Creates a Three.js matrix to be used for the library.
```javascript
var m = new THREE.Matrix4();
m.set(  this.m00(),
        this.m10(),
        this.m20(),
        this.m30(),
        this.m01(),
        this.m11(),
        this.m21(),
        this.m31(),
        this.m02(),
        this.m12(),
        this.m22(),
        this.m32(),
        this.m03(),
        this.m13(),
        this.m23(),
        this.m33());
return m;
```

### <a name="Matrix3D_createTransformCopy"></a>Matrix3D::createTransformCopy(t)

Creates a copy of the current translate (move) matrix.
```javascript

var newM = Matrix3D();

newM.m30( this.m30() );
newM.m31( this.m31() );
newM.m32( this.m32() );

return newM;
```

### <a name="Matrix3D_det"></a>Matrix3D::det(t)

Calculates determinant of the matrix - it should be the volume of the unit space cube the matrix is spanning.
```javascript
var m00 = this.m00(), m01 = this.m01(), m02 = this.m02(), m03 = this.m03(),
    m10 = this.m10(), m11 = this.m11(), m12 = this.m12(), m13 = this.m13(),
    m20 = this.m20(), m21 = this.m21(), m22 = this.m22(), m23 = this.m23(),
    m30 = this.m30(), m31 = this.m31(), m32 = this.m32(), m33 = this.m33();
    
    var a0 = m00 * m11 - m10 * m01;
    var a1 = m00 * m21 - m20 * m01;
    var a2 = m00 * m31 - m30 * m01;
    var a3 = m10 * m21 - m20 * m11;
    var a4 = m10 * m31 - m30 * m11;
    var a5 = m20 * m31 - m30 * m21;
    var b0 = m02 * m13 - m12 * m03;
    var b1 = m02 * m23 - m22 * m03;
    var b2 = m02 * m33 - m32 * m03;
    var b3 = m12 * m23 - m22 * m13;
    var b4 = m12 * m33 - m32 * m13;
    var b5 = m22 * m33 - m32 * m23;
 
 return   a0 * b5 - a1 * b4 + a2 * b3 + a3 * b2 - a4 * b1 + a5 * b0;
```

### <a name="Matrix3D_dragTransformation"></a>Matrix3D::dragTransformation(dv, projectionState)
`dv` Object containing information about the drag vector
 

Projection state has the 3D area view fustrum, basicly the screen dimensions and perspective value. The `offset` has (x,y) indicating the view element position.

```javascript
{
  screenWidth : 1000,
  screenHeight : 1000,
  perspective : 600,
  offset : {
      x : 100
      y : 100
  }
}
```

The function will return Object with (x,y) which is current location, (sx,sy) the start location and (dx,dy) the relative location in the object&#39;s own space.
```javascript
var point = {};
var interS = this.intersectPlane( {
 x : projectionState.screenWidth / 2,
 y : projectionState.screenHeight / 2,
 z : projectionState.perspective
},{
 x :  dv.mx - projectionState.offset.x,
 y :  dv.my - projectionState.offset.y,
 z : 0
});  
var totInv = this.createCopy().inverse();
var inSpace = totInv.projectVector({
  x : interS.x,
  y : interS.y,
  z : interS.z,
  w : 1
})    
if(dv.start) {
    dv.spaceSx = inSpace.x;
    dv.spaceSy = inSpace.y;
}
dv.spaceDx = parseInt( inSpace.x - dv.spaceSx ) ;
dv.spaceDy = parseInt( inSpace.y - dv.spaceSy );  
point.sx = dv.spaceSx;
point.sy = dv.spaceSy;
point.x = dv.spaceSx  + dv.spaceDx;
point.y = dv.spaceSy  + dv.spaceDy;
point.dx = dv.spaceDx;
point.dy = dv.spaceDy;  

return point;

```

### <a name="Matrix3D_get2DTransform"></a>Matrix3D::get2DTransform(t)
`t` Accuracy of decimals used
 

get CSS transform value
```javascript
var nn= t || 3;
return "matrix("+this.m00().toFixed(nn)+", "+this.m01().toFixed(nn)+", " 
       +this.m10().toFixed(nn)+", "+this.m11().toFixed(nn)+", "  
       +this.m30().toFixed(nn)+", "+this.m31().toFixed(nn)+")";
```

### <a name="Matrix3D_get3DTransform"></a>Matrix3D::get3DTransform(t)
`t` Accuracy of decimals used, default 3
 


```javascript
var nn = t || 3;
return "matrix3d("+this.m00().toFixed(nn)+", "+this.m01().toFixed(nn)+", "+this.m02().toFixed(nn)+", "+this.m03().toFixed(nn)+"," 
           +this.m10().toFixed(nn)+", "+this.m11().toFixed(nn)+", "+this.m12().toFixed(nn)+", "+this.m13().toFixed(nn)+","   
           +this.m20().toFixed(nn)+", "+this.m21().toFixed(nn)+", "+this.m22().toFixed(nn)+", "+this.m23().toFixed(nn)+","   
           +this.m30().toFixed(nn)+", "+this.m31().toFixed(nn)+", "+this.m32().toFixed(nn)+", "+this.m33().toFixed(nn)+")";
```

### <a name="Matrix3D_getCSSMatrix2D"></a>Matrix3D::getCSSMatrix2D(t)


```javascript
var nn=3;
var tStr = this.get2DTransform();
       
return "transform:"+tStr+";-webkit-transform:"+tStr+";-ms-transform:"+tStr+";-webkit-transform-origin:0 0;-ms-transform-origin:0 0;";    

```

### <a name="Matrix3D_getCSSMatrix3D"></a>Matrix3D::getCSSMatrix3D(t)

Returns transformation matrix, matrix3d if CSS3D is supported, otherwise it will return matrix(...)
```javascript

_m3dSupport = this.systemHas3D();
var nn=3;

if(_m3dSupport) {
    var tStr = this.get3DTransform();
    return "transform:"+tStr+";-webkit-transform:"+tStr+";-ms-transform:"+tStr+";-webkit-transform-origin:0 0;-ms-transform-origin:0 0;";
} else {
    return getCSSMatrix2D();
}
  

```

### <a name="Matrix3D_getRotation2D"></a>Matrix3D::getRotation2D(t)

Returns the current 2D rotation angle in radians. Calculated from the direction of the x -axis of the matrix.
```javascript

var i = this.m00(),
    j = this.m01(),
    r;
    
if(j>=0) {
    r = Math.acos( i );
} else {
    r = -1 * Math.acos( i );
}
return r;
```

### <a name="Matrix3D_getSVGTransform"></a>Matrix3D::getSVGTransform(t)

Returns 2x2 matrix to be used with SVG transformations.
```javascript

return "matrix("+this.m00().toFixed(5)+","+this.m01().toFixed(5)+","+
        this.m10().toFixed(5)+","+this.m11().toFixed(5)+","+this.m30().toFixed(5)+","+ this.m31().toFixed(5)+")";
```

### <a name="Matrix3D_intersectPlane"></a>Matrix3D::intersectPlane(startPoint, endPoint, origo)
`startPoint` Vector (x,y,z)
 
`endPoint` Vector (x,y,z)
 
`origo` Not required - Vector (x,y,z)
 

Calculate intersection point of plane defined by z-axis of this Matrix and &quot;origo&quot; which is defined by the transformation matrix translate, Vector or ray for the intersection stesti is defined by `startPoint` and `endPoint`. If the vector is parallel to the plane undefined is returned.
```javascript

var np = this.normalizeVector3D({
     x : this.m20(),
     y : this.m21(),
     z : this.m22()
});

if(origo) {
    var startToPlane = {
            x : origo.x - startPoint.x,
            y : origo.y - startPoint.y,
            z : origo.z - startPoint.z 
        }    
} else {
    var startToPlane = {
        x : this.m30() - startPoint.x,
        y : this.m31() - startPoint.y,
        z : this.m32() - startPoint.z 
    }
}

// distance from the starting point to the plane
var totalDist =  startToPlane.x * np.x + startToPlane.y * np.y + startToPlane.z * np.z;

var v = {
    x : endPoint.x - startPoint.x,
    y : endPoint.y - startPoint.y,
    z : endPoint.z - startPoint.z
}

var partialDist = v.x * np.x + v.y * np.y + v.z * np.z;

if( ( Math.abs( totalDist ) > 0 ) && ( Math.abs( partialDist) > 0 ) ) {
    
    var t = totalDist / partialDist;

    if( Math.abs( t ) > 0 ) {
        
        var isect = {
            x : startPoint.x + v.x * t,
            y : startPoint.y + v.y * t,
            z : startPoint.z + v.z * t
        };
        
        return isect;
        
    }
    
}
```

### <a name="Matrix3D_inverse"></a>Matrix3D::inverse(t)

Will transform the matrix into it&#39;s inverse representation. This will effectively inverse the whole transformation. Create a copy of the Matrix first if you want to preserve the original matrix.
```javascript

    var m00 = this.m00(), m01 = this.m01(), m02 = this.m02(), m03 = this.m03(),
        m10 = this.m10(), m11 = this.m11(), m12 = this.m12(), m13 = this.m13(),
        m20 = this.m20(), m21 = this.m21(), m22 = this.m22(), m23 = this.m23(),
        m30 = this.m30(), m31 = this.m31(), m32 = this.m32(), m33 = this.m33();

    var a0 = m00 * m11 - m10 * m01;
    var a1 = m00 * m21 - m20 * m01;
    var a2 = m00 * m31 - m30 * m01;
    var a3 = m10 * m21 - m20 * m11;
    var a4 = m10 * m31 - m30 * m11;
    var a5 = m20 * m31 - m30 * m21;
    var b0 = m02 * m13 - m12 * m03;
    var b1 = m02 * m23 - m22 * m03;
    var b2 = m02 * m33 - m32 * m03;
    var b3 = m12 * m23 - m22 * m13;
    var b4 = m12 * m33 - m32 * m13;
    var b5 = m22 * m33 - m32 * m23;
 
    var divider =  (a0 * b5 - a1 * b4 + a2 * b3 + a3 * b2 - a4 * b1 + a5 * b0);
    
    if(divider==0) return;
    
    var invDet = 1 / divider;

    this.m00( (m11 * b5 - m21 * b4 + m31 * b3) * invDet );
    this.m01( (-m01 * b5 + m21 * b2 - m31 * b1) * invDet );
    this.m02( (m01 * b4 - m11 * b2 + m31 * b0) * invDet );
    this.m03( (-m01 * b3 + m11 * b1 - m21 * b0) * invDet );
 
    this.m10( (-m10 * b5 + m20 * b4 - m30 * b3) * invDet );
    this.m11( (m00 * b5 - m20 * b2 + m30 * b1) * invDet );
    this.m12( (-m00 * b4 + m10 * b2 - m30 * b0) * invDet );
    this.m13( (m00 * b3 - m10 * b1 + m20 * b0) * invDet );
 
    this.m20( (m13 * a5 - m23 * a4 + m33 * a3) * invDet );
    this.m21( (-m03 * a5 + m23 * a2 - m33 * a1) * invDet );
    this.m22( (m03 * a4 - m13 * a2 + m33 * a0) * invDet );
    this.m23( (-m03 * a3 + m13 * a1 - m23 * a0) * invDet );
 
    this.m30( (-m12 * a5 + m22 * a4 - m32 * a3) * invDet );
    this.m31( (m02 * a5 - m22 * a2 + m32 * a1) * invDet );
    this.m32( (-m02 * a4 + m12 * a2 - m32 * a0) * invDet );
    this.m33( (m02 * a3 - m12 * a1 + m22 * a0) * invDet );
    
    return this;
```

### <a name="Matrix3D_isValidMatrix"></a>Matrix3D::isValidMatrix()


```javascript
var mm = this._data;

if(isNaN(mm.m00)) return false;
if(isNaN(mm.m01)) return false;
if(isNaN(mm.m02)) return false;
if(isNaN(mm.m03)) return false;

if(isNaN(mm.m10)) return false;
if(isNaN(mm.m11)) return false;
if(isNaN(mm.m12)) return false;
if(isNaN(mm.m13)) return false;

if(isNaN(mm.m20)) return false;
if(isNaN(mm.m21)) return false;
if(isNaN(mm.m22)) return false;
if(isNaN(mm.m23)) return false;

if(isNaN(mm.m30)) return false;
if(isNaN(mm.m31)) return false;
if(isNaN(mm.m32)) return false;
if(isNaN(mm.m33)) return false;

return true;
```

### <a name="Matrix3D_log"></a>Matrix3D::log(t)


```javascript
console.log(this._data);
```

### <a name="Matrix3D_matMul"></a>Matrix3D::matMul(other)

Multiplies this matrix with other matrix. The result is saved into this matrix. Use createCopy to create new matrixes.
```javascript
var m00 = this.m00(), m01 = this.m01(), m02 = this.m02(), m03 = this.m03(),
    m10 = this.m10(), m11 = this.m11(), m12 = this.m12(), m13 = this.m13(),
    m20 = this.m20(), m21 = this.m21(), m22 = this.m22(), m23 = this.m23(),
    m30 = this.m30(), m31 = this.m31(), m32 = this.m32(), m33 = this.m33();
    
var t00 = other.m00(), t01 = other.m01(), t02 = other.m02(), t03 = other.m03(),
    t10 = other.m10(), t11 = other.m11(), t12 = other.m12(), t13 = other.m13(),
    t20 = other.m20(), t21 = other.m21(), t22 = other.m22(), t23 = other.m23(),
    t30 = other.m30(), t31 = other.m31(), t32 = other.m32(), t33 = other.m33();    
    

this.updateFromParams(     m00 * t00 + m10 * t01 + m20 * t02 + m30 * t03,
    m01 * t00 + m11 * t01 + m21 * t02 + m31 * t03,
    m02 * t00 + m12 * t01 + m22 * t02 + m32 * t03,
    m03 * t00 + m13 * t01 + m23 * t02 + m33 * t03,
 
    m00 * t10 + m10 * t11 + m20 * t12 + m30 * t13,
    m01 * t10 + m11 * t11 + m21 * t12 + m31 * t13,
    m02 * t10 + m12 * t11 + m22 * t12 + m32 * t13,
    m03 * t10 + m13 * t11 + m23 * t12 + m33 * t13,
 
    m00 * t20 + m10 * t21 + m20 * t22 + m30 * t23,
    m01 * t20 + m11 * t21 + m21 * t22 + m31 * t23,
    m02 * t20 + m12 * t21 + m22 * t22 + m32 * t23,
    m03 * t20 + m13 * t21 + m23 * t22 + m33 * t23,
 
    m00 * t30 + m10 * t31 + m20 * t32 + m30 * t33,
    m01 * t30 + m11 * t31 + m21 * t32 + m31 * t33,
    m02 * t30 + m12 * t31 + m22 * t32 + m32 * t33,
    m03 * t30 + m13 * t31 + m23 * t32 + m33 * t33 );
    
return this;
```

### <a name="Matrix3D_normalize"></a>Matrix3D::normalize(t)

Will transform this matrix into normal matrix.
```javascript

this.copyFrom( new Matrix3D() );
```

### <a name="Matrix3D_normalizeVector3D"></a>Matrix3D::normalizeVector3D(v)

Normalizes given Vector (x,y,z) into unit -vector
```javascript

var len = Math.sqrt( v.x*v.x + v.y*v.y + v.z*v.z );

if(len == 0 || isNaN(len)) return {
    x : 1,
    y : 0,
    z : 0
};

return {
    x : v.x / len,
    y : v.y / len,
    z : v.z / len
};

```

### <a name="Matrix3D_projectVector"></a>Matrix3D::projectVector(v)

Projects a vector `v`  (x,y,z,w)  - usually w = 1 - into 3D space using this matrix. Will return new vector with (x,y,z,w)
```javascript
var m00 = this.m00(), m01 = this.m01(), m02 = this.m02(), m03 = this.m03(),
    m10 = this.m10(), m11 = this.m11(), m12 = this.m12(), m13 = this.m13(),
    m20 = this.m20(), m21 = this.m21(), m22 = this.m22(), m23 = this.m23(),
    m30 = this.m30(), m31 = this.m31(), m32 = this.m32(), m33 = this.m33();
        
return {    
   x : m00 * v.x + m10 * v.y + m20 * v.z + m30 * v.w,
   y:  m01 * v.x + m11 * v.y + m21 * v.z + m31 * v.w,
   z:  m02 * v.x + m12 * v.y + m22 * v.z + m32 * v.w,
   w:  m03 * v.x + m13 * v.y + m23 * v.z + m33 * v.w
};
```

### <a name="Matrix3D_rotate"></a>Matrix3D::rotate(axis, radAngle)
`axis` Vector (x,y,z) to rotate around
 
`radAngle` Radians to rotate
 

Rotate the Matrix around axis (x,y,z) 
```javascript
  
var axis = this.normalizeVector3D( axis );
var ax = axis.x,
    ay = axis.y,
    az = axis.z;
    
var cosA = Math.cos(radAngle);
var sinA = Math.sin(radAngle);

this.updateFromParams(
      cosA + ax * ax * (1 - cosA), ay * ax * (1 - cosA) + az * sinA, az * ax * (1 - cosA) - ay * sinA, 0,
      ay * ax * (1 - cosA) - az * sinA, cosA + ay * ay * (1 - cosA), az * ay * (1 - cosA) + ax * sinA, 0,
      az * ax * (1 - cosA) + ay * sinA, ay * az * (1 - cosA) - ax * sinA, cosA + az * az * (1 - cosA), 0,
      0, 0, 0, 1
    );
return this;
```

### <a name="Matrix3D_scale"></a>Matrix3D::scale(s)
`s` The scaling amount.
 

Creates a new scaling matrix to be used in 3D transformation.
```javascript

this.updateFromParams(
    s, 0, 0, 0,
    0, s, 0, 0,
    0, 0, s, 0,
    0, 0, 0, 1
  );
  
return this;
```

### <a name="Matrix3D_screenProjection"></a>Matrix3D::screenProjection(worldVector, camera)
`worldVector` Transformed vector (x,y,z) into the view system coordinate space
 
`camera` Camera
 

Projects a view space vector into camera space. Camera has center (cx,cy) coordinates, which should be positioned into center of the screen. The projection distance &quot;d&quot; is the distance of the imaginary eye from the projection plane. If &quot;d&quot; is not given, x and y coordinates are used as they are.
```javascript

var vector = this.projectVector(worldVector);

// if perspective projection
if(camera.d) {
    var dist = camera.d - vector.z,
        x = vector.x - (camera.cx || 500),
        y = vector.y - (camera.cy || 500);
    if(dist>0 ) {
        // console.log("Scale factor ", camera.d / dist);
        return {
            x : camera.cx + x * camera.d / dist,
            y : camera.cy + y * camera.d / dist
        }
    }    
} else {
    x = vector.x;// - (camera.cx || 500),
    y = vector.y;// - (camera.cy || 500);    
    return {
        x : x,
        y : y
    }    
}



```

### <a name="Matrix3D_setCanvasContext"></a>Matrix3D::setCanvasContext(ctx)
`ctx` HTML Canvas context
 

The Canvas context to correspond to the transformation defined by the Matrix.
```javascript
ctx.setTransform(this.m00(),this.m01(),this.m10(), this.m11(), this.m30(), this.m31());
```

### <a name="Matrix3D_setDomContext"></a>Matrix3D::setDomContext(ctx)


```javascript
this.setCanvasContext(ctx);
```

### <a name="Matrix3D_systemHas3D"></a>Matrix3D::systemHas3D(t)

Tests if the running system has CSS3D support enabled.
```javascript

if(typeof(_m3dSupport) != "undefined") return _m3dSupport;

if(typeof(window) == "undefined") return false;

if (!window.getComputedStyle) {
    return false;
}

var el = document.createElement('p'), 
    has3d,
    transforms = {
        'webkitTransform':'-webkit-transform',
        'OTransform':'-o-transform',
        'msTransform':'-ms-transform',
        'MozTransform':'-moz-transform',
        'transform':'transform'
    };

// Add it to the body to get the computed style.
document.body.insertBefore(el, null);

for (var t in transforms) {
    if (el.style[t] !== undefined) {
        el.style[t] = "translate3d(1px,1px,1px)";
        has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
    }
}

document.body.removeChild(el);

return (has3d !== undefined && has3d.length > 0 && has3d !== "none");

```

### <a name="Matrix3D_translate"></a>Matrix3D::translate(v)
`v` Vector (x,y,z) to translate with
 

Creates a matrix with translate (move) according to given vector (x,y,z)
```javascript
this.updateFromParams(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    v.x, v.y, v.z, 1
  );
return this;
```

### <a name="Matrix3D_updateFromParams"></a>Matrix3D::updateFromParams(t)

Updates the matrix values from a function arguments, 16 argumens can be given.
```javascript

var i=0;

this.m00( arguments[i++] );
this.m01( arguments[i++] );
this.m02( arguments[i++] );
this.m03( arguments[i++] );

this.m10( arguments[i++] );
this.m11( arguments[i++] );
this.m12( arguments[i++] );
this.m13( arguments[i++] );

this.m20( arguments[i++] );
this.m21( arguments[i++] );
this.m22( arguments[i++] );
this.m23( arguments[i++] );

this.m30( arguments[i++] );
this.m31( arguments[i++] );
this.m32( arguments[i++] );
this.m33( arguments[i++] );

```



   
    
## trait matrixFn

The class has following internal singleton variables:
        
* _transformBatches
        
* _batchListeners
        
* _batchOn
        
* _batchInited
        
* _subBatches
        
        
### <a name="matrixFn_addChangeListener"></a>matrixFn::addChangeListener(fn)


```javascript

if(!this._chListeners) this._chListeners = [];
this._chListeners.push(fn);

```

### <a name="matrixFn_addToBatch"></a>matrixFn::addToBatch(t)


```javascript
if(_batchOn) _transformBatches[this._id] = this;
```

### <a name="matrixFn_guid"></a>matrixFn::guid(t)


```javascript
return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
```

### matrixFn::constructor( options )

```javascript

this._data = {
    m00 : 1, m01 : 0, m02 : 0, m03:0,
    m10 : 0, m11 : 1, m12 : 0, m13:0,
    m20 : 0, m21 : 0, m22 : 1, m23:0,
    m30 : 0, m31 : 0, m32 : 0, m33:1
};

if(!_transformBatches) {
    _transformBatches = {};
    _subBatches = {};
}

if(this.isArray(options)) {
    // list of matrixes to listen and then calculate the result based on them
    this._subMatrixes = options;
    var me = this;
    for(var i=0; i<options.length; i++) {
        var subM = options[i];
        subM.onChange( function() {
            _subBatches[me._id] = me;
        });
    }
    this._id = this.guid();
} else {
    var noBatching = options;
    if(noBatching) {
        this._id = "t";
    } else {
        this._id = this.guid();
    }
}

if(!_batchInited) {
    _batchInited = true;
    if(typeof(later) != "undefined") {
        
        later().onFrame( function() {
            for(var n in _subBatches) {
                var m = _subBatches[n];
                var list = m._subMatrixes;
                m.normalize();
                list.forEach( function(sub) {
                    m.matMul(sub);
                });
                delete _subBatches[n];
            }
            for(var n in _transformBatches) {
                var m = _transformBatches[n];
                if(m._chListeners) {
                    m._chListeners.forEach( function(fn) {
                        fn( m );
                    });
                }
                delete _transformBatches[n];
            } 
        });
        _batchOn = true;
    } else {
        _batchOn = false;
    }
}

```
        
### <a name="matrixFn_isArray"></a>matrixFn::isArray(someVar)
`someVar` Variable to test
 


```javascript
return Object.prototype.toString.call( someVar ) === '[object Array]';
```

### <a name="matrixFn_m00"></a>matrixFn::m00(t)


```javascript

if(typeof(t)!="undefined") {
    if(this._data.m00 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m00 = t;
    return this;
}
return this._data.m00;
```

### <a name="matrixFn_m01"></a>matrixFn::m01(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m01 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m01 = t;
    return this;
}
return this._data.m01;
```

### <a name="matrixFn_m02"></a>matrixFn::m02(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m02 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m02 = t;
    return this;
}
return this._data.m02;
```

### <a name="matrixFn_m03"></a>matrixFn::m03(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m03 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m03 = t;
    return this;
}
return this._data.m03;
```

### <a name="matrixFn_m10"></a>matrixFn::m10(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m10 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m10 = t;
    return this;
}
return this._data.m10;
```

### <a name="matrixFn_m11"></a>matrixFn::m11(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m11 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m11 = t;
    return this;
}
return this._data.m11;
```

### <a name="matrixFn_m12"></a>matrixFn::m12(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m12 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m12 = t;
    return this;
}
return this._data.m12;
```

### <a name="matrixFn_m13"></a>matrixFn::m13(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m13 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m13 = t;
    return this;
}
return this._data.m13;
```

### <a name="matrixFn_m20"></a>matrixFn::m20(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m20 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m20 = t;
    return this;
}
return this._data.m20;
```

### <a name="matrixFn_m21"></a>matrixFn::m21(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m21 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m21 = t;
    return this;
}
return this._data.m21;
```

### <a name="matrixFn_m22"></a>matrixFn::m22(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m22 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    };
    this._data.m22 = t;
    return this;
}
return this._data.m22;
```

### <a name="matrixFn_m23"></a>matrixFn::m23(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m23 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m23 = t;
    return this;
}
return this._data.m23;
```

### <a name="matrixFn_m30"></a>matrixFn::m30(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m30 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m30 = t;
    return this;
}
return this._data.m30;
```

### <a name="matrixFn_m31"></a>matrixFn::m31(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m31 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m31 = t;
    return this;
}
return this._data.m31;
```

### <a name="matrixFn_m32"></a>matrixFn::m32(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m32 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m32 = t;
    return this;
}
return this._data.m32;
```

### <a name="matrixFn_m33"></a>matrixFn::m33(t)


```javascript
if(typeof(t)!="undefined") {
    if(this._data.m33 != t) {
        this._dirty = true;
        if(_batchOn) _transformBatches[this._id] = this;
    }
    this._data.m33 = t;
    return this;
}
return this._data.m33;
```

### <a name="matrixFn_onChange"></a>matrixFn::onChange(fn)


```javascript
if(!this._chListeners) this._chListeners = [];
this._chListeners.push(fn);

```

### <a name="matrixFn_removeListener"></a>matrixFn::removeListener(fn)
`fn` Function to remove
 


```javascript
if(!this._chListeners) return;
var i = this._chListeners.indexOf(fn);
if(i>=0) this._chListeners.splice(i,1);
```

### <a name="matrixFn_setBatching"></a>matrixFn::setBatching(onOff)
`onOff` true or false
 

Enable / Disable matrix batching
```javascript
_batchOn  = onOff;
```


    
    


   
      
    




