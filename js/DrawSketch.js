let arcCurve = new THREE.ArcCurve(xArray[pointIndex["ox"]], zArray[pointIndex["oz"]], arcRadius, 0, -0.5 * Math.PI, true);
let arcCurvePianyi = new THREE.ArcCurve(xArray[pointIndex["ox"]] + offset, zArray[pointIndex["oz"]] - offset, arcRadius, 0, -0.5 * Math.PI, true);

// 第一步 画轮廓线

//多边形线
function DrawOutline() {
    let lines = [
        new LineObj(getPointVector3("a"), getPointVector3("b")),//1
        new LineObj(getPointVector3("b"), getPointVector3("c")),//2
        new LineObj(getPointVector3("c"), getPointVector3("d")),//3
        new LineObj(getPointVector3("d"), getPointVector3("e")),//4
        new LineObj(getPointVector3("e"), getPointVector3("f")),//5
        new LineObj(getPointVector3("f"), getPointVector3("a")),//6
    ]

    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }

    //绘制圆角
    // let arcCurve = new THREE.ArcCurve(-arcRadius, arcRadius, arcRadius, 0, -0.5 * Math.PI, true);
    // let arcLine = new LineObj();
    // arcLine.getManyMesh(arcCurve.getPoints(50));
    // arcLine.draw();
}

function DrawLiangLine() {
    for (let liangInfoElement of liangInfo) {
        createRectangleByInfo(liangInfoElement);
    }
    for (let gebanElement of gebanInfo) {
        createRectangleByInfo(gebanElement);
    }
}

//圆角
function DrawYuanjiao() {
    let arcLine = new LineObj();
    let arcPoints = arcCurve.getPoints(50)
    arcLine.getManyMesh(arcPoints);
    arcLine.draw();

    let lines = [
        new LineObj(getPointVector3("a"), getPointVector3("b")),//1
        new LineObj(getPointVector3("b"), getPointVector3("c")),//2
        new LineObj(getPointVector3("c"), getPointVector3("d")),//3
        new LineObj(getPointVector3("d"), getPointVector3("e1")),//4
        new LineObj(getPointVector3("e2"), getPointVector3("f")),//5
        new LineObj(getPointVector3("f"), getPointVector3("a")),//6
    ]
    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }
}

//偏移
function DrawPianyi() {
    //DrawYuanjiao();
    let arcLine = new LineObj();
    let arcPoints = arcCurvePianyi.getPoints(50);
    arcLine.getManyMesh(arcPoints);
    // arcLine.draw();

    let lines = [
        new LineObj(getPointPianyi("a"), getPointPianyi("b")),//1
        new LineObj(getPointPianyi("b"), getPointPianyi("c")),//2
        new LineObj(getPointPianyi("c"), getPointPianyi("d")),//3
        // new LineObj(getPointPianyi("d"), getPointPianyi("e1")),//4
        // new LineObj(getPointPianyi("e2"), getPointPianyi("f")),//5
        new LineObj(getPointPianyi("d"), getPointPianyi("e")),//4
        new LineObj(getPointPianyi("e"), getPointPianyi("f")),//5
        new LineObj(getPointPianyi("f"), getPointPianyi("a")),//6
    ]
    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }
}

//画墙
function Drawwall() {

    let arcCurve1 = arcCurve;
    let arcCurve2 = arcCurvePianyi;
    let arcPointArray = arcCurve1.getPoints(50);

    arcPointArray.push(new THREE.Vector2(xArray[3], zArray[1] - offset));
    arcPointArray.push(...arcCurve2.getPoints(50).reverse());
    arcPointArray.push(new THREE.Vector2(xArray[1] + offset, zArray[3]));
    // createArcWall(arcPointArray, height, 0.5, matArrayC, "墙面");

    let CubeWall = [];
    CubeWall.push(createCubeWallByIndx(wallInfo[0]));//0
    CubeWall.push(createCubeWallByIndx(wallInfo[1]));//1
    CubeWall.push(createCubeWallByIndx(wallInfo[2]));//2
    // CubeWall.push(createCubeWallByIndx(wallInfo[3]));//3
    // CubeWall.push(createCubeWallByIndx(wallInfo[4]));//4
    CubeWall.push(createCubeWallByIndx(wallInfo[6]));//2
    CubeWall.push(createCubeWallByIndx(wallInfo[7]));//3
    CubeWall.push(createCubeWallByIndx(wallInfo[5]));//5
    walls = CubeWall;
    DrawLiang();
}

function DrawLiang() {
    let liangMeshInfo = getLiangMeshInfo(liangInfo);
    let gebanMeshInfo = getLiangMeshInfo(gebanInfo);

    for (let liangMeshInfoElement of liangMeshInfo) {
        createCubeWallByIndx(liangMeshInfoElement);
    }
    for (let gebanInfoElement of gebanMeshInfo) {
        let gebanWall = createCubeWallByIndx(gebanInfoElement);
        walls.push(gebanWall);
    }
}

function Drawdiban() {
    let arcCurve1 = new THREE.ArcCurve(xArray[pointIndex["ox"]], zArray[pointIndex["oz"]], arcRadius, 0, -0.5 * Math.PI, true);
    let arcPointArray = arcCurve1.getPoints(50);

    let lines = [
        getPointVector2("a"), getPointVector2("b"),//1
        getPointVector2("b"), getPointVector2("c"),//2
        getPointVector2("c"), getPointVector2("d"),//3
        getPointVector2("d"), getPointVector2("e"),//3
        // getPointVector2("d"), getPointVector2("e1"),//4
        //  ...arcCurve1.getPoints(50),
        // getPointVector2("e2"), getPointVector2("f"),//5
        getPointVector2("e"), getPointVector2("f"),//5
        getPointVector2("f"), getPointVector2("a"),//6
    ]
    createDimian(lines, 0.5, 0.2, dimianMat, "地面");
}

//绘制门的区域
function DrawDigArea() {
    let lines = [
        new LineObj(new THREE.Vector3(-100, 0, -60), new THREE.Vector3(-100, 36, -60)),//1
        new LineObj(new THREE.Vector3(-100, 36, -60), new THREE.Vector3(-100, 36, -40)),//2
        new LineObj(new THREE.Vector3(-100, 36, -40), new THREE.Vector3(-100, 0, -40)),//3
        new LineObj(new THREE.Vector3(-100, 0, -40), new THREE.Vector3(-100, 0, -60)),//4
    ]

    for (let i = 0; i < lines.length; i++) {
        let l = lines[i];
        l.draw();
    }
}

//挖门和窗
function DigWall() {
    //创建洞口
    let holeonEveryWall = [];
    // //D1和D2
    // hole.push(returnWallObjectByIndex(holeInfo[0]));
    // hole.push(returnWallObjectByIndex(holeInfo[1]));
    // //C1和C2
    // hole.push(returnWallObjectByIndex(holeInfo[4]));
    // hole.push(returnWallObjectByIndex(holeInfo[5]));
    //
    // createResultBsp(walls[holeInfo[0].belong], hole[0]);
    // createResultBsp(walls[holeInfo[1].belong], hole[1]);
    // createResultBsp(walls[holeInfo[4].belong], hole[2]);
    // createResultBsp(walls[holeInfo[5].belong], hole[3]);

    for (let wallsKey in walls) {
        holeonEveryWall[wallsKey] = [];
    }
    for (let i = 0; i < holeInfo.length; i++) {
        let mesh = returnWallObjectByIndex(holeInfo[i]);
        holeonEveryWall[holeInfo[i].belong].push(mesh);
        // scene.add(mesh);
    }
    for (let i = 0; i < holeonEveryWall.length; i++) {
        if (holeonEveryWall[i].length > 0) {
            createResultBsp(walls[i], holeonEveryWall[i]);
        }
    }
}

//创建门和窗
function CreatDoor() {
    //D0
    createDoor_leftByInfo(doorsInfo[0]);
    createDoor_rightByInfo(doorsInfo[1]);
    //D1
    createDoor_leftByInfo(doorsInfo[2]);
    createDoor_rightByInfo(doorsInfo[3]);
    //D2
    createDoor_leftByInfo(doorsInfo[4]);
    createDoor_rightByInfo(doorsInfo[5]);
    //D3
    createDoor_rightByInfo(doorsInfo[6]);
    //D4
    createDoor_rightByInfo(doorsInfo[7]);

    //D5
    createDoor_rightByInfo(doorsInfo[8]);


    // createWindowByInfo(windowsInfo[0]);
    // createWindowByInfo(windowsInfo[1]);
    // createWindowByInfo(windowsInfo[2]);
    // createWindowByInfo(windowsInfo[3]);
}

//添加设备模型
function addEquipment() {

    //M0
    let j = 0;
    for (let i = 0; i < equipmentGroupPosition[j].length; i++) {
        let e = equipmentGroupPosition[j][i];
        if (i < equipmentGroupPosition[j].length / 2) {
            addFbxModelByInfo(equipmentInfo[1], 0, e);
        } else {
            addFbxModelByInfo(equipmentInfo[3], 0, e);
        }
    }

    //M1
    j = 1;
    for (let i = 0; i < equipmentGroupPosition[j].length; i++) {
        let e = equipmentGroupPosition[j][i];
        if (i < equipmentGroupPosition[j].length / 2) {
            addFbxModelByInfo(equipmentInfo[2], 1, e);
        } else {
            addFbxModelByInfo(equipmentInfo[4], 1, e);
        }
    }
    //M2
    j = 2;
    for (let i = 0; i < equipmentGroupPosition[j].length; i++) {
        let e = equipmentGroupPosition[j][i];
        if (i < equipmentGroupPosition[j].length / 2) {
            addFbxModelByInfo(equipmentInfo[5], 0, e);
        } else {
            addFbxModelByInfo(equipmentInfo[6], 0, e);
        }
    }
    //M3
    j = 3;
    for (let i = 0; i < equipmentGroupPosition[j].length; i++) {
        let e = equipmentGroupPosition[j][i];
        if (i < equipmentGroupPosition[j].length / 2) {
            addFbxModelByInfo(equipmentInfo[3], 1, e);
        } else {
            addFbxModelByInfo(equipmentInfo[1], 1, e);
        }
    }
    //M4
    j = 4;
    for (let i = 0; i < equipmentGroupPosition[j].length; i++) {
        let e = equipmentGroupPosition[j][i];
        if (i < equipmentGroupPosition[j].length / 2) {
            addFbxModelByInfo(equipmentInfo[3], 0, e);
        } else {
            addFbxModelByInfo(equipmentInfo[1], 0, e);
        }
    }
    //M5
    addFbxModelByInfo(equipmentInfo[0], 0.5, equipmentGroupPosition[5][0]);
    addFbxModelByInfo(equipmentInfo[0], 0.5, equipmentGroupPosition[5][1]);
    addFbxModelByInfo(equipmentInfo[0], 0, equipmentGroupPosition[5][2]);

    // addFbxModelByInfo(equipmentInfo[7], 0, equipmentGroupPosition[6][0]);
    //温度传感器
    let p = {
        "x": -150.711927179769546,
        "y": 20.46193351949664,
        "z": -144.95028569551505
    }
    //温度传感器
    let e = equipmentInfo[7]
    addFbxModel(e.type, e.modelname, e.size, p.x, p.y, p.z, e.name);
    p = {
        "x": -30.711927179769546,
        "y": 20.46193351949664,
        "z": -144.95028569551505
    }
    addFbxModel(e.type, e.modelname, e.size, p.x, p.y, p.z, e.name);
    //风机
    e = equipmentInfo[8]
    p = {
        "x": -20.25961423399457,
        "y": -24.172836060329104,
        "z": -195.89755600649542
    }
    addFbxModel(e.type, e.modelname, e.size, p.x, p.y, p.z, e.name);
    //空调
    e = equipmentInfo[9]
    p = {
        "x": -20.25961423399457,
        "y": 24.172836060329104,
        "z": -195.89755600649542
    }
    // addFbxModel(e.type,e.modelname, e.size,p.x,p.y,p.z,e.name);
    //烟感
    e = equipmentInfo[10]
    p = {
        "x": 23.22749358193221,
        "y": 40.15238654472409,
        "z": -76.86699163646628
    }
    let s = {
        "x": 0.05,
        "y": 0.05,
        "z": 0.05
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name);
    p = {
        "x": -163.0089747305485,
        "y": 43.426140956996996,
        "z": -73.74981850004687
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name);


    //摄像头1
    e = equipmentInfo[11]
    p = {
        "x": -233.47670733635314,
        "y": 37.65408038725088,
        "z": -144.98900821664375
    }
    s = {
        "x": 50,
        "y": 50,
        "z": 50
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name);
    p = {
        "x": -238.33960901117723,
        "y": 37.78554830454834,
        "z": -3.9216343866301946
    }
    let r = {
        "x": -1.4141721093609165,
        "y": -0.032409257247008307,
        "z": 2.0360198776106087,
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name, r);
    p = {
        "x": 142.28700476546774,
        "y": 39.091383817812854,
        "z": 88.23133966279056
    }
    r = {
        "x": -1.300770416753791,
        "y": -0.11147260583811065,
        "z": 3.1167630399553024,
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name, r);
    p = {
        "x": 4.692451909012396,
        "y": 37.2492219111234,
        "z": 87.4427221092594
    }
    r = {
        "x": -1.6687075139733536,
        "y": -0.27512371124406754,
        "z": 1.5811733788773068,
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name, r);

    //摄像头2
    e = equipmentInfo[12]
    p = {
        "x": 60.52954863301963,
        "y": 40.15976875459982,
        "z": -145.53963785015813
    }
    s = {
        "x": 30,
        "y": 30,
        "z": 30
    }
    r = {
        "x": -1.5707963115561197,
        "y": -1.7418021208692823e-7,
        "z": 1.658062692652161,
    }
    addFbxModel(e.type, e.modelname, s, p.x, p.y, p.z, e.name, r);
}

//添加对设备模型的拖拽
function addDragControl() {
    // var transformControls = new THREE.TransformControls(camera, renderer.domElement);
    // scene.add(transformControls);

    let dragControls = new THREE.DragControls(equipmentsMesh, camera, renderer.domElement);

    // 鼠标略过事件
    // dragControls.addEventListener('hoveron', function (event) {
    //     // 让变换控件对象和选中的对象绑定
    //     transformControls.attach(event.object);
    // });

    dragControls.addEventListener('dragstart', function (event) {
        controls.enabled = false;
    });
    // 拖拽结束
    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true;
    });
}

function RemoveLine() {
    let line = [];
    for (let child of scene.children) {
        if (child.type === 'Line2') {
            line.push(child);
        }
    }
    for (let lineElement of line) {
        removeMesh(lineElement);
    }
}

function RemoveAll() {
    let obj = [];
    for (let child of scene.children) {
        if (child.type === 'Mesh') {
            obj.push(child);
        }
    }
    for (let b of obj) {
        removeMesh(b);
    }
}

//创建提示面板
function createCanvasTexture(dataContent = "this is a test", ctxName = "tile") {
    //let ctxName = ['title']
    if (dataContent[dataContent.length - 1] == '$') {
        dataContent = dataContent.split('$')[0]
    }
    let tips = document.createElement('canvas');
    tips.width = 500;
    tips.height = 500;
    let tipsTexture = tips.getContext('2d');
    tipsTexture.lineWidth = '8px'
    tipsTexture.strokeStyle = '#696969'
    tipsTexture.fillStyle = 'rgba(0,0,0,0.5)';
    tipsTexture.beginPath();

    //第二种面板样式
    tipsTexture.moveTo(0, 20);
    tipsTexture.moveTo(20, 0);
    tipsTexture.lineTo(256, 0);
    tipsTexture.lineTo(256, 200);
    tipsTexture.lineTo(256, 200);
    tipsTexture.lineTo(0, 200);
    tipsTexture.lineTo(0, 40);
    //------
    //			tipsTexture.moveTo(20, 40);
    //			tipsTexture.lineTo(256, 40)

    tipsTexture.closePath();
    tipsTexture.stroke()
    tipsTexture.fill()

    tipsTexture.font = '50px arial';

    tipsTexture.fillStyle = "#ff0909";

    tipsTexture.fillText(ctxName, 10, 90);

    drawText(dataContent, 20, 150, 150, tipsTexture)
    // drawText(ctxName, 20, 150, 100, tipsTexture)

    let texture1 = new THREE.Texture(tips)

    texture1.needsUpdate = true;
    return texture1

}

//创建提示面板文字
function drawText(t, x, y, w, ctx) {

    let chr = t.split('');

    let temp = "";
    let row = [];

    ctx.font = "18px arial";
    ctx.fillStyle = "#00c0ff";
    ctx.textBaseline = "bottom";

    for (let a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < w) {
            ;
        } else {
            row.push(temp);
            temp = "";
        }
        temp += chr[a];
    }

    row.push(temp);

    for (let b = 0; b < row.length; b++) {
        ctx.fillText(row[b], x, y + (b + 1) * 25);
    }
}

//点击物体切换视角
function rayBreathing() {

    container.addEventListener('mousemove', rayMove);
    // container.addEventListener('click', rayClick);

    function rayMove(event) {
        let intersects = getRayObj(event);
        let objs = []//所有异常模型的名称集合
        for (let i of scene.children) {
            if (i.name === "设备") {
                objs.push(i);
            }
        }
        for (let obj of objs) {
            obj.material.color.r = 0.5879999995231628;
        }
        if (intersects.length > 0) {
            let o = intersects[0].object;
            if (objs.includes(o)) {
                o.material.color.r = 60;
            }
        }
    }

    function rayClick(event) {
        let intersects = getRayObj(event);

        let objs = []//所有异常模型的名称集合
        for (let i of scene.children) {
            if (i.name === "设备") {
                objs.push(i);
            }
        }
        if (intersects.length > 0) {
            if (objs.includes(intersects[0].object)) {
                sensor(intersects[0].object);
            }
        }
    }
}

function sensor(obj) {
    moveCamera(obj, [obj.position.x, obj.position.y + 0.5 * height, obj.position.z - 20], [obj.position.x, obj.position.y + 0.5 * height, obj.position.z])
}

function moveCamera(target, pos, pos2) {

    new TWEEN.Tween(camera.position).to({
        x: pos[0],
        y: pos[1],
        z: pos[2]
    }, 1500)
        .easing(TWEEN.Easing.Linear.None).start().onUpdate(tweenHandler).onComplete(() => {
    })

    function tweenHandler() {
        camera.lookAt(...pos2)
    }
}
