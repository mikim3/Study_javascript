// Matter modules
// Matter.js 모듈을 가져옵니다.
const { Render,
    Runner, Engine, Bodies, Composite, Composites, Constraint, Mouse, MouseConstraint, Events, Body } = Matter;

// Bird specs
// getRandomBird() 함수를 사용하여 새의 사양을 가져옵니다.
const { name, posX, posY, radius, physics, grow, maxGrow } = getRandomBird();

// characterName 요소에 새의 이름을 표시합니다.
characterName.textContent = name;

// Game distribution
// 게임의 크기를 정의합니다.
const gameSize = { w: window.innerWidth, h: window.innerHeight };

// 베이스와 벽돌의 초기 속성을 정의합니다.
const baseProps = { w: 150, h: 20, posX: gameSize.w - 300, posY: gameSize.h - 200 };
const bricksProps = { w: baseProps.w / 5, h: 30, posX: baseProps.posX - baseProps.w / 2, posY: 50, cols: 5, rows: 10 };

// 엔진과 렌더러를 생성합니다.
const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine,
    options: { width: gameSize.w, height: gameSize.h }
});

// 베이스를 생성합니다.
const base = Bodies.rectangle(baseProps.posX, baseProps.posY, baseProps.w, baseProps.h, { isStatic: true });

// 벽돌을 생성합니다.
const bricks = Composites.stack(bricksProps.posX, bricksProps.posY, bricksProps.cols, bricksProps.rows, 0, 0, (x, y) => {
    return Bodies.rectangle(x, y, bricksProps.w, bricksProps.h);
});

// 새를 생성합니다.
const bird = Bodies.circle(posX, posY, radius, physics);

// 새와 발사기를 연결합니다.
const shooter = Constraint.create({
    pointA: { x: posX, y: posY },
    bodyB: bird
});

// 마우스와의 상호작용을 위한 마우스와 제약 조건을 생성합니다.
const mouse = Mouse.create(render.canvas);
const mouseContraint = MouseConstraint.create(engine, { mouse });

// 발사 여부를 나타내는 변수입니다.
let isFiring = false;

// 드래그가 끝나면 발사 여부를 true로 설정합니다.
Events.on(mouseContraint, 'enddrag', () => isFiring = true);

// 업데이트 이후에 실행되는 이벤트입니다.
Events.on(engine, 'afterUpdate', () => {
    if (isFiring) {
        // 발사 중인 경우 발사기를 엔진에서 제거합니다.
        Composite.remove(engine.world, shooter, true);

        // 새가 커지는 옵션이 활성화되어 있고 최대 크기보다 작은 경우에만 새를 확대합니다.
        if (grow && bird.circleRadius < maxGrow) {
            Body.scale(bird, grow, grow);
        }
    }

    // 화면 아래로 떨어진 벽돌의 개수를 점수로 표시합니다.
   score.textContent = bricks.bodies.filter(elm => elm.position.y > gameSize.h).length;
});

// 엔진의 월드에 베이스, 벽돌, 새, 발사기, 마우스 상호작용을 추가합니다.
Composite.add(engine.world, [base, bricks, bird, shooter, mouseContraint]);

// 엔진과 렌더러를 실행합니다.
Runner.run(engine);
Render.run(render);
