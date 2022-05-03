let lineColor = new THREE.Color(0, 0, 0);//黑色

class Obj {
    constructor() {
        this.mesh = null;
    }

    getMesh() {
        return this.mesh;
    }

    draw() {
        if (scene.children.indexOf(this.mesh) === -1) {
            scene.add(this.mesh);
        }
    }

    delete() {
        if (scene.children.indexOf(this.mesh) > -1) {
            scene.remove(this.mesh);
        }
    }
}

class LineObj extends Obj {
    constructor(start, end, color) {
        super();
        this.start = start;
        this.end = end;
        if (start && end) {
            this.mesh = this.getMesh(start, end, color);
        }
    }

    getMesh(start, end, color) {
        color = color ? color : lineColor;
        start = start ? start : this.start;
        end = end ? end : this.end;

        let geometry = new THREE.LineGeometry();
        let pointArr = [].concat(start.toArray(), end.toArray());
        geometry.setPositions(pointArr);
        let material = new THREE.LineMaterial({
            color: color,
            linewidth: 5
        })
        material.resolution.set(container.offsetWidth, container.offsetHeight)
        let line = new THREE.Line2(geometry, material)
        line.computeLineDistances()
        return line;
    }

    getManyMesh(p) {
        let color = lineColor;
        let geometry = new THREE.LineGeometry();
        let pArray = [];
        for (let i = 0; i < p.length; i++) {
            pArray.push(p[i].x, 0, p[i].y);
        }
        geometry.setPositions(pArray);
        let material = new THREE.LineMaterial({
            color: color,
            linewidth: 5
        })
        material.resolution.set(container.offsetWidth, container.offsetHeight)
        let line = new THREE.Line2(geometry, material)
        line.computeLineDistances()
        this.mesh = line;
        return line;
    }
}

function removeMesh(mesh) {
    if (scene.children.indexOf(mesh) > -1) {
        scene.remove(mesh);
    }
}

function createCubeWall(width, height, depth, angle, material, x, y, z, name) {
    var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
    var cube = new THREE.Mesh(cubeGeometry, material);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    cube.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
    cube.name = name;
    scene.add(cube);

    return cube;
}

function createCubeWallByIndx(info) {
    var cubeGeometry = new THREE.BoxGeometry(info.width, info.height, info.depth);
    var cube = new THREE.Mesh(cubeGeometry, info.material);
    cube.position.x = info.x;
    cube.position.y = info.y;
    cube.position.z = info.z;
    cube.rotation.y += info.angle * Math.PI; //-逆时针旋转,+顺时针
    cube.name = info.name;
    cube.castShadow = true;
    scene.add(cube);
    return cube;
}

function createArcWall(arcPointArray, height, angle, material, name) {
    let arcShape = new THREE.Shape(arcPointArray);
    const extrudeSettings = {
        steps: 2,
        depth: height,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1
    };
    let arcGeometry = new THREE.ExtrudeGeometry(arcShape, extrudeSettings);
    const mesh = new THREE.Mesh(arcGeometry, material);
    mesh.rotateX(angle * Math.PI);
    mesh.position.y += height;
    mesh.name = name;
    scene.add(mesh);
}

// function createDimian(pointArray, angle, y, material, name) {
//     let dimianShape = new THREE.Shape(pointArray);
//     let geometry = new THREE.ShapeGeometry(dimianShape);
//     var mesh = new THREE.Mesh(geometry, material);
//     mesh.rotateX(angle * Math.PI);
//     mesh.scale.y = -1;
//     mesh.position.y += y;
//     mesh.receiveShadow = true;
//     scene.add(mesh);
// }

function createDimian(pointArray, angle, y, material, name) {
    var loader = new THREE.TextureLoader();
    loader.load("img/floor.jpg", function (texture) {
        let dimianShape = new THREE.Shape(pointArray);
        let geometry = new THREE.ShapeGeometry(dimianShape);

        assignUVs(geometry);
        geometry.computeBoundingBox();
        var texture = texture;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 5);
        texture.y=-1;
        var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        material.opacity = 1.0;
        material.transparent = true;
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(angle * Math.PI);
        mesh.position.y += y;
        mesh.receiveShadow = true;
        scene.add(mesh);
    });
}
function assignUVs(geometry) {
    geometry.computeBoundingBox();
    var max = geometry.boundingBox.max,
        min = geometry.boundingBox.min;
    var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
    var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
    var faces = geometry.faces;
    geometry.faceVertexUvs[0] = [];
    for (var i = 0; i < faces.length ; i++) {
        var v1 = geometry.vertices[faces[i].a],
            v2 = geometry.vertices[faces[i].b],
            v3 = geometry.vertices[faces[i].c];
        geometry.faceVertexUvs[0].push([
            new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
            new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
            new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
        ]);
    }
    geometry.uvsNeedUpdate = true;
}
function returnWallObject(width, height, depth, angle, material, x, y, z, name) {
    var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
    var cube = new THREE.Mesh(cubeGeometry, material);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    cube.rotation.y += angle * Math.PI;
    cube.name = name;
    return cube;
}

function returnWallObjectByIndex(info) {
    var cubeGeometry = new THREE.BoxGeometry(info.width, info.height, info.depth);
    var cube = new THREE.Mesh(cubeGeometry, info.material);
    cube.position.x = info.x;
    cube.position.y = info.y;
    cube.position.z = info.z;
    cube.rotation.y += info.angle * Math.PI;
    cube.name = info.name;
    return cube;
}

//墙上挖门，通过两个几何体生成BSP对象
function createResultBsp(obj1, obj2) {
    var material = new THREE.MeshPhongMaterial({
        color: 0xb5b5b2,
        specular: 0xacacac,
        shininess: 30,
        transparent: true,
        opacity: 1
    });
    var BSP = new ThreeBSP(obj1);
    for (var i = 0; i < obj2.length; i++) {
        var less_bsp = new ThreeBSP(obj2[i]);
        BSP = BSP.subtract(less_bsp);
    }
    var result = BSP.toMesh(material);
    result.material.flatshading = THREE.FlatShading;
    result.geometry.computeFaceNormals(); //重新计算几何体侧面法向量
    result.geometry.computeVertexNormals();
    result.material.needsUpdate = true; //更新纹理
    result.geometry.buffersNeedUpdate = true;
    result.geometry.uvsNeedUpdate = true;
    scene.add(result);

    removeMesh(obj1);
}

//创建门_左侧
function createDoor_left(width, height, depth, angle, x, y, z, name) {
    var loader = new THREE.TextureLoader();
    loader.load("img/door4.png", function (texture) {
        var doorgeometry = new THREE.BoxGeometry(width, height, depth);
        doorgeometry.translate(50, 0, 0);
        var doormaterial = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0x000000
        });
        doormaterial.opacity = 1.0;
        doormaterial.transparent = true;
        var door = new THREE.Mesh(doorgeometry, doormaterial);
        door.position.set(x, y, z);
        door.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
        door.name = name;
        scene.add(door);
    });
}

//创建左门通过信息
function createDoor_leftByInfo(info) {
    var loader = new THREE.TextureLoader();
    loader.load("img/door4.png", function (texture) {
        var doorgeometry = new THREE.BoxGeometry(info.width, info.height, info.depth);
        // doorgeometry.translate(50, 0, 0);
        var doormaterial = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xffffff
        });
        doormaterial.opacity = 1.0;
        doormaterial.transparent = true;
        var door = new THREE.Mesh(doorgeometry, doormaterial);
        door.position.set(info.x, info.y, info.z);
        door.rotation.y += info.angle * Math.PI; //-逆时针旋转,+顺时针
        door.name = info.name;
        scene.add(door);
    });
}

//创建窗户
function createWindow(width, height, depth, angle, x, y, z, name) {
    var loader = new THREE.TextureLoader();
    loader.load("img/window.png", function (texture) {
        var windowgeometry = new THREE.BoxGeometry(width, height, depth);
        var windowmaterial = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0x000000
        });
        windowmaterial.opacity = 1.0;
        windowmaterial.transparent = true;
        var window = new THREE.Mesh(windowgeometry, windowmaterial);
        window.position.set(x, y, z);
        window.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
        window.name = name;
        scene.add(window);
    });
}//创建窗户ByInfo
function createWindowByInfo(info) {
    var loader = new THREE.TextureLoader();
    loader.load("img/window.png", function (texture) {
        var windowgeometry = new THREE.BoxGeometry(info.width, info.height, info.depth);
        var windowmaterial = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0x000000
        });
        windowmaterial.opacity = 1.0;
        windowmaterial.transparent = true;
        var window = new THREE.Mesh(windowgeometry, windowmaterial);
        window.position.set(info.x, info.y, info.z);
        window.rotation.y += info.angle * Math.PI; //-逆时针旋转,+顺时针
        window.name = name;
        scene.add(window);
    });
}

//创建门_右侧
function createDoor_right(width, height, depth, angle, x, y, z, name) {
    var loader = new THREE.TextureLoader();
    loader.load("img/door3.png", function (texture) {
        var doorgeometry = new THREE.BoxGeometry(width, height, depth);
        doorgeometry.translate(-50, 0, 0);
        var doormaterial = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0x000000
        });
        doormaterial.opacity = 1.0;
        doormaterial.transparent = true;
        var door = new THREE.Mesh(doorgeometry, doormaterial);
        door.position.set(x, y, z);
        door.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针8
        door.name = name;
        scene.add(door);
    });
}

//创建门_右侧ByInfo
function createDoor_rightByInfo(info) {
    var loader = new THREE.TextureLoader();
    loader.load("img/door3.png", function (texture) {
        var doorgeometry = new THREE.BoxGeometry(info.width, info.height, info.depth);
        var doormaterial = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xffffff
        });
        doormaterial.opacity = 1.0;
        doormaterial.transparent = true;
        var door = new THREE.Mesh(doorgeometry, doormaterial);
        door.position.set(info.x, info.y, info.z);
        door.rotation.y += info.angle * Math.PI; //-逆时针旋转,+顺时针8
        door.name = info.name;
        scene.add(door);
    });
}


//加载fbx模型
function addFbxModel(type, modelname, size, x, y, z, name) {
    const loader = new THREE.FBXLoader();
    loader.load('model/' + type + "/" + modelname + ".FBX", function (object) {
        object = object.children[0];
        object.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        object.name = name;
        object.scale.setScalar(size);
        object.position.copy(new THREE.Vector3(x, y, z));
        equipmentsMesh.push(object);
        scene.add(object);
    });
}

//加载fbx模型ByInfo
function addFbxModelByInfo(info, angle, position) {
    const loader = new THREE.FBXLoader();

    loader.load('model/' + info.type + "/" + info.modelname + ".FBX", function (object) {
        object = object.children[0];
        object.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        object.name = name;
        object.scale.copy(new THREE.Vector3(info.size.x, info.size.y, info.size.z));
        if (!position) {
            object.position.copy(new THREE.Vector3(info.x, info.y, info.z));
        } else {
            object.position.copy(new THREE.Vector3(position.x, position.y, position.z));
        }
        if (angle !== null) {
            object.rotation.z += angle * Math.PI;
        }
        object.name = info.name;
        equipmentsMesh.push(object);
        scene.add(object);
    })
}

//创建二维矩形梁和隔板
function createRectangle(width, height, depth, angle, p, name) {
    let pointArray = [
        p.x - 0.5 * width, p.y, p.z - 0.5 * height,//a
        p.x + 0.5 * width, p.y, p.z - 0.5 * height,//b
        p.x + 0.5 * width, p.y, p.z + 0.5 * height,//c
        p.x - 0.5 * width, p.y, p.z + 0.5 * height,//d
        p.x - 0.5 * width, p.y, p.z - 0.5 * height,//a
    ]
    let color = lineColor;
    let geometry = new THREE.LineGeometry();
    geometry.setPositions(pointArray);
    let material = new THREE.LineMaterial({
        color: color,
        linewidth: 5
    })
    material.resolution.set(container.offsetWidth, container.offsetHeight)
    let line = new THREE.Line2(geometry, material)
    line.computeLineDistances()
    if (angle !== null) {
        line.rotation.y += angle * Math.PI;
    }
    line.name = name;
    scene.add(line);
}

//创建二维矩形梁和隔板ByInfo
function createRectangleByInfo(info) {
    let pointArray = [
        info.x - 0.5 * info.width, info.y, info.z - 0.5 * info.height,//a
        info.x + 0.5 * info.width, info.y, info.z - 0.5 * info.height,//b
        info.x + 0.5 * info.width, info.y, info.z + 0.5 * info.height,//c
        info.x - 0.5 * info.width, info.y, info.z + 0.5 * info.height,//d
        info.x - 0.5 * info.width, info.y, info.z - 0.5 * info.height,//a
    ]
    let color = lineColor;
    let geometry = new THREE.LineGeometry();
    geometry.setPositions(pointArray);
    let material = new THREE.LineMaterial({
        color: color,
        linewidth: 5
    })
    material.resolution.set(container.offsetWidth, container.offsetHeight)
    let line = new THREE.Line2(geometry, material)
    line.computeLineDistances()
    line.name = info.name;
    scene.add(line);
}

function getRayObj(event){
    let Sx = event.clientX-container.offsetLeft; //鼠标单击位置横坐标
    let Sy = event.clientY-container.offsetTop; //鼠标单击位置纵坐标
    //屏幕坐标转标准设备坐标
    let x = (Sx / container.offsetWidth) * 2 - 1; //标准设备横坐标
    let y = -(Sy / container.offsetHeight) * 2 + 1; //标准设备纵坐标
    let standardVector = new THREE.Vector3(x, y, 0.5); //标准设备坐标
    //标准设备坐标转世界坐标
    let worldVector = standardVector.unproject(camera);
    //射线投射方向单位向量(worldVector坐标减相机位置坐标)
    let ray = worldVector.sub(camera.position).normalize();
    //创建射线投射器对象
    let raycaster = new THREE.Raycaster(camera.position, ray);
    //返回射线选中的对象
    let intersects = raycaster.intersectObjects(scene.children);

    return intersects;
}

