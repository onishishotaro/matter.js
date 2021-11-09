var Engine = Matter.Engine, //物理シュミレーションおよびレンダリングを管理するコントローラーとなるメソッド
  World = Matter.World, //物理演算領域の作成・操作するメソッドを含む
  Body = Matter.Body, //剛体のモデルを作成・操作するメソッドを含む
  Bodies = Matter.Bodies, //一般的な剛体モデルを作成するメソッドを含む
  Constraint = Matter.Constraint, //制約を作成・操作するメソッドを含む
  Composites = Matter.Composites,
  Common = Matter.Common,
  Vertices = Matter.Vertices, //頂点のセットを作成・操作するメソッドを含む
  MouseConstraint = Matter.MouseConstraint; //マウスの制約を作成するためのメソッドが含む

let width = window.innerWidth * 2; //windowの幅(床のためのやつ)
let widthX = window.innerWidth; //windowの幅
let height = window.innerHeight; //windowの高さ
let items = 15; //itemの数

console.log(width);
console.log(height);

//ランダムな値を作る
let getRandomParameter = (max, min) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

// Matter.jsのEngineを作成
var container = document.getElementById("canvas-container");
var engine = Engine.create(container, {
  render: {
    //レンダリングの設定
    options: {
      wireframes: false, //ワイヤーフレームモードをoff
      width: width, //canvasのwidth(横幅)
      height: height, //canvasのheight(高さ)
      background: "rgba(0, 0, 0, 0)",
    },
  },
});

// マウス操作を追加
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

//床を作る
World.add(engine.world, [
  Bodies.rectangle(0, height, width, 2, {
    isStatic: true, //固定する
    render: {
      fillStyle: "#977559", // 塗りつぶす色: CSSの記述法で指定
      strokeStyle: "rgba(0, 0, 0, 0)", // 線の色: CSSの記述法で指定
      lineWidth: 0,
    },
  }),
]);

//物体を追加する
for (var i = 0; i < items; i++) {
  var rnd = parseInt(Math.random() * widthX);
  var x = getRandomParameter(widthX, 0);
  var y = getRandomParameter(-1500, -500);

  console.log(x);
  console.log(y);

  World.add(engine.world, [
    Bodies.circle(x, y, 50, {
      //ボールを追加
      density: 0.0005, // 密度: 単位面積あたりの質量
      frictionAir: 0.04, // 空気抵抗(空気摩擦)
      restitution: 2.4, // 弾力性
      friction: 0.01, // 本体の摩擦
      render: {
        //画像にしたいときはここ
        //ボールのレンダリングの設定
        // sprite: {
        //   //スプライトの設定
        //   texture: "/../img/7.png", //スプライトに使うテクスチャ画像を指定
        // },
      },
      timeScale: 1, //時間の倍率を設定(1で1倍速)
    }),
  ]);
}

// 物理シュミレーションを実行
Engine.run(engine);
