
// Example 객체가 이미 존재한다면 그대로 사용하고, 아니라면 빈 객체를 생성
// 이렇게 함으로써 Example 객체가 이미 다른 곳에서 정의되었을 경우에도 코드 충돌을 방지할 수 있음
var Example = Example || {};

// 시뮬레이션을 생성하고 시간의 흐름을 조절
Example.timescale = function() {
    // Matter.js의 여러 모듈을 변수에 할당합니다.
    // 이렇게 함으로써 해당 모듈의 기능을 사용할 수 있습니다.
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Events = Matter.Events,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // Matter.Engine.create() 함수를 사용하여 엔진을 생성합니다.
    // Matter.Engine.create() 함수는 Matter.Engine 객체를 반환합니다.
    // 생성한 엔진을 변수 engine에 할당하고, engine.world를 변수 world에 할당합니다.
    // engine.world는 시뮬레이션에 필요한 객체들을 포함하는 컨테이너입니다.
    // create engine
    let engine = Engine.create(),
        world = engine.world;



    // Matter.Render.create() 함수를 사용하여 렌더러를 생성합니다.
    // 렌더러는 시뮬레이션을 그래픽으로 표시하는 역할을 합니다.
    // 생성한 렌더러를 변수 render에 할당하고, Render.run() 함수를 사용하여 렌더러를 실행합니다.
    // 이렇게 함으로써 시뮬레이션 결과가 화면에 표시됩니다.
    let render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 1000,
            wireframes: false
        }
    });

    Render.run(render);

    // 러너는 엔진을 실행시키는 역할을 합니다.
    // 생성한 러너를 변수 runner에 할당하고, Runner.run() 함수를 사용하여 러너를 실행합니다.
    let runner = Runner.create();
    Runner.run(runner, engine);

    // Matter.World.add() 함수를 사용하여 객체들을 월드에 추가합니다.
    // 사각형으로 이루어진 테두리를 만든다. (없으면 안에 객체들이 밖으로 날아감)
    // 월드는 시뮬레이션의 공간을 나타내는 객체입니다.
    World.add(world, [
        // isStatic으로 상호작용할지 말지를 결정할수 있음
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // 폭발을 일으키는 함수 구현
    let explosion = function(engine) {
        // Composite.allBodies() 함수는 엔진의 월드에서 모든 바디(body)를 가져옵니다.
        let bodies = Composite.allBodies(engine.world);

        // 가져온 바디들을 순회하면서 특정 조건을 만족하는 바디에 힘을 가합니다.
        // 특정 조건은 바디가 정적이지 않고, y 좌표가 500 이상인 경우입니다.
        // 힘의 크기와 방향은 무작위로 결정되며, applyForce() 함수를 사용하여 바디에 힘을 가합니다.
        for (let i = 0; i < bodies.length; i++) {
            let body = bodies[i];

            if (!body.isStatic && body.position.y >= 500) {
                let forceMagnitude = 0.05 * body.mass;

                Body.applyForce(body, body.position, {
                    x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
                    y: -forceMagnitude + Common.random() * -forceMagnitude
                });
            }
        }
    };

    let timeScaleTarget = 1,
        counter = 0;

    // 업데이트 이벤트가 발생한 후에 실행되는 콜백 함수를 등록합니다.
    // 콜백 함수는 시간 비율을 조절하고 일정 주기마다 폭발 효과를 생성합니다.
    Events.on(engine, 'afterUpdate', function(event) {
        // tween the timescale for bullet time slow-mo
        engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05;

        counter += 1;

        // every 1.5 sec
        if (counter >= 60 * 1.5) {
            // flip the timescale
            if (timeScaleTarget < 1) {
                timeScaleTarget = 1;
            } else {
                timeScaleTarget = 0.05;
            }
            // create some random forces
            explosion(engine);
            // reset counter
            counter = 0;
        }
    });

    // 바디에 적용될 옵션을 설정합니다.
    // 여기서는 마찰력과 반발력을 조정합니다.
    let bodyOptions = {
        frictionAir: 0,
        friction: 0.0001,
        restitution: 0.8
    };

    // Matter.Composites.stack() 함수를 사용하여 월드에 원형 바디들을 추가합니다.
    // stack() 함수는 주어진 범위 내에서 바디들을 격자 형태로 쌓아서 반환합니다.
    // 여기서는 원형 바디들이 쌓여 있는 구조를 생성합니다.
    World.add(world, Composites.stack(20, 100, 15, 3, 20, 40, function(x, y) {
        return Bodies.circle(x, y, Common.random(10, 20), bodyOptions);
    }));

    // Matter.Composites.stack() 함수를 사용하여 다른 형태의 바디들을 추가합니다.
    // 여기서는 사각형과 다각형 바디들이 쌓여 있는 구조를 생성합니다.
    World.add(world, Composites.stack(50, 50, 8, 3, 0, 0, function(x, y) {
        switch (Math.round(Common.random(0, 1))) {

        case 0:
            if (Common.random() < 0.8) {
                return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50), bodyOptions);
            } else {
                return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30), bodyOptions);
            }
        case 1:
            return Bodies.polygon(x, y, Math.round(Common.random(4, 8)), Common.random(20, 50), bodyOptions);

        }
    }));

    // 마우스 제약을 추가합니다.
    // Matter.Mouse.create() 함수를 사용하여 마우스 객체를 생성하고, Matter.MouseConstraint.create() 함수를 사용하여 마우스 제약을 생성합니다.
    // 마우스 제약은 마우스와 바디 간의 상호작용을 제어하는 역할을 합니다.
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // 렌더러의 mouse 속성을 설정하여 마우스와 렌더러를 연결합니다.
    // 이렇게 함으로써 마우스 움직임이 렌더러에 반영되어 시뮬레이션 상호작용이 가능해집니다.
    render.mouse = mouse;

    // 렌더러의 시각적 표시를 조정하여 시뮬레이션 영역을 화면에 맞춥니다.
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });
    
    // Example.timescale 함수가 반환하는 객체를 생성하여 반환합니다.
    // 이 객체는 생성한 엔진, 러너, 렌더러 등을 포함하고 있으며, 시뮬레이션을 멈추는 함수도 제공합니다.
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

// create demo interface
// not required to use Matter.js

// MatterTools.Demo.create({
//   toolbar: {
//     title: 'matter-js',
//     url: 'https://github.com/liabru/matter-js',
//     reset: true,
//     source: true,
//     fullscreen: true,
//     exampleSelect: true
//   },
//   preventZoom: true,
//   resetOnOrientation: true,
//   examples: [
//     {
//       name: 'Time Scaling',
//       id: 'timescale',
//       init: Example.timescale,
//       sourceLink: 'https://github.com/liabru/matter-js/blob/master/examples/timescale.js'
//     }
//   ]
// });
