(() => {
	// plugins
	Matter.use(MatterAttractors);

	// constants
	const PATHS = {
		DOME: '0 0 0 250 19 250 20 231.9 25.7 196.1 36.9 161.7 53.3 129.5 74.6 100.2 100.2 74.6 129.5 53.3 161.7 36.9 196.1 25.7 231.9 20 268.1 20 303.9 25.7 338.3 36.9 370.5 53.3 399.8 74.6 425.4 100.2 446.7 129.5 463.1 161.7 474.3 196.1 480 231.9 480 250 500 250 500 0 0 0',
		DROP_LEFT: '0 0 20 0 70 100 20 150 0 150 0 0',
		DROP_RIGHT: '50 0 68 0 68 150 50 150 0 100 50 0',
		APRON_LEFT: '0 0 180 120 0 120 0 0',
		APRON_RIGHT: '180 0 180 120 0 120 180 0'
	};
	const COLOR = {
		BACKGROUND: '#212529',
		OUTER: '#495057',
		INNER: '#15aabf',
		BUMPER: '#fab005',
		BUMPER_LIT: '#fff3bf',
		PADDLE: '#e64980',
		PINBALL: '#dee2e6'
	};
	const GRAVITY = 0.75;
	const WIREFRAMES = false;
	const BUMPER_BOUNCE = 1.5;
	const PADDLE_PULL = 0.002;
	const MAX_VELOCITY = 50;

	// score elements
	let $currentScore = $('.current-score span');
	let $highScore = $('.high-score span');

	// shared variables
	let currentScore, highScore;
	let engine, world, render, pinball, stopperGroup;
	let leftPaddle, leftUpStopper, leftDownStopper, isLeftPaddleUp;
	let rightPaddle, rightUpStopper, rightDownStopper, isRightPaddleUp;

	function load() {
		init();
		createStaticBodies();
		createPaddles();
		createPinball();
		createEvents();
	}

	// 게임 초기화 함수
	function init() {
		// Matter.js 엔진 생성
		engine = Matter.Engine.create();

		// Matter.js 월드 생성
		world = engine.world;
		world.bounds = {
			min: { x: 0, y: 0},
			max: { x: 500, y: 800 }
		};
		world.gravity.y = GRAVITY; // 경사진 테이블에서 공을 굴리기 위한 중력 설정

		// Matter.js 렌더러 생성
		render = Matter.Render.create({
			element: $('.container')[0],
			engine: engine,
			options: {
				width: world.bounds.max.x,
				height: world.bounds.max.y,
				wireframes: WIREFRAMES,
				background: COLOR.BACKGROUND
			}
		});
		Matter.Render.run(render);

		// Matter.js 실행
		let runner = Matter.Runner.create();
		Matter.Runner.run(runner, engine);

		// 충돌 필터링을 위한 그룹 설정
		stopperGroup = Matter.Body.nextGroup(true);

		// 초기 점수 설정
		currentScore = 0;
		highScore = 0;
		isLeftPaddleUp = false;
		isRightPaddleUp = false;
	}

	// 정적 바디 생성
	function createStaticBodies() {
		Matter.World.add(world, [
			// 테이블 경계 (위, 아래, 왼쪽, 오른쪽)
			boundary(250, -30, 500, 100),
			boundary(250, 830, 500, 100),
			boundary(-30, 400, 100, 800),
			boundary(530, 400, 100, 800),

			// 돔
			path(239, 86, PATHS.DOME),

			// 핀볼을 반사시키는 장애물 (왼쪽, 중간, 오른쪽)
			wall(140, 140, 20, 40, COLOR.INNER),
			wall(225, 140, 20, 40, COLOR.INNER),
			wall(310, 140, 20, 40, COLOR.INNER),

			// 상단 범퍼 (왼쪽, 중간, 오른쪽)
			bumper(105, 250),
			bumper(225, 250),
			bumper(345, 250),

			// 하단 범퍼 (왼쪽, 오른쪽)
			bumper(165, 340),
			bumper(285, 340),

			// 슈터 레인 벽
			wall(440, 520, 20, 560, COLOR.OUTER),

			// 드롭 (왼쪽, 오른쪽)
			path(25, 360, PATHS.DROP_LEFT),
			path(425, 360, PATHS.DROP_RIGHT),

			// 슬링샷 (왼쪽, 오른쪽)
			wall(120, 510, 20, 120, COLOR.INNER),
			wall(330, 510, 20, 120, COLOR.INNER),

			// 아웃 레인 벽 (왼쪽, 오른쪽)
			wall(60, 529, 20, 160, COLOR.INNER),
			wall(390, 529, 20, 160, COLOR.INNER),

			// 플리퍼 벽 (왼쪽, 오른쪽)
			wall(93, 624, 20, 98, COLOR.INNER, -0.96),
			wall(357, 624, 20, 98, COLOR.INNER, 0.96),

			// 애프런 (왼쪽, 오른쪽)
			path(79, 740, PATHS.APRON_LEFT),
			path(371, 740, PATHS.APRON_RIGHT),

			// 재시작 영역 (가운데, 오른쪽)
			reset(225, 50),
			reset(465, 30)
		]);
	}

	// 패들 생성
	function createPaddles() {
		// 이 패들은 핀볼 튕김을 제한하지만 핀볼은 통과할 수 있도록 함
		leftUpStopper = stopper(160, 591, 'left', 'up');
		leftDownStopper = stopper(140, 743, 'left', 'down');
		rightUpStopper = stopper(290, 591, 'right', 'up');
		rightDownStopper = stopper(310, 743, 'right', 'down');
		Matter.World.add(world, [leftUpStopper, leftDownStopper, rightUpStopper, rightDownStopper]);

		// 패들 간에 서로 겹칠 수 있도록 하는 그룹 설정
		let paddleGroup = Matter.Body.nextGroup(true);

		// 왼쪽 패들
		let paddleLeft = {};
		paddleLeft.paddle = Matter.Bodies.trapezoid(170, 660, 20, 80, 0.33, {
			label: 'paddleLeft',
			angle: 1.57,
			chamfer: {},
			render: {
				fillStyle: COLOR.PADDLE
			}
		});
		paddleLeft.brick = Matter.Bodies.rectangle(172, 672, 40, 80, {
			angle: 1.62,
			chamfer: {},
			render: {
				visible: false
			}
		});
		paddleLeft.comp = Matter.Body.create({
			label: 'paddleLeftComp',
			parts: [paddleLeft.paddle, paddleLeft.brick]
		});
		paddleLeft.hinge = Matter.Bodies.circle(142, 660, 5, {
			isStatic: true,
			render: {
				visible: false
			}
		});
		Object.values(paddleLeft).forEach((piece) => {
			piece.collisionFilter.group = paddleGroup
		});
		paddleLeft.con = Matter.Constraint.create({
			bodyA: paddleLeft.comp,
			pointA: { x: -29.5, y: -8.5 },
			bodyB: paddleLeft.hinge,
			length: 0,
			stiffness: 0
		});
		Matter.World.add(world, [paddleLeft.comp, paddleLeft.hinge, paddleLeft.con]);
		Matter.Body.rotate(paddleLeft.comp, 0.57, { x: 142, y: 660 });

		// 오른쪽 패들
		let paddleRight = {};
		paddleRight.paddle = Matter.Bodies.trapezoid(280, 660, 20, 80, 0.33, {
			label: 'paddleRight',
			angle: -1.57,
			chamfer: {},
			render: {
				fillStyle: COLOR.PADDLE
			}
		});
		paddleRight.brick = Matter.Bodies.rectangle(278, 672, 40, 80, {
			angle: -1.62,
			chamfer: {},
			render: {
				visible: false
			}
		});
		paddleRight.comp = Matter.Body.create({
			label: 'paddleRightComp',
			parts: [paddleRight.paddle, paddleRight.brick]
		});
		paddleRight.hinge = Matter.Bodies.circle(308, 660, 5, {
			isStatic: true,
			render: {
				visible: false
			}
		});
		Object.values(paddleRight).forEach((piece) => {
			piece.collisionFilter.group = paddleGroup
		});
		paddleRight.con = Matter.Constraint.create({
			bodyA: paddleRight.comp,
			pointA: { x: 29.5, y: -8.5 },
			bodyB: paddleRight.hinge,
			length: 0,
			stiffness: 0
		});
		Matter.World.add(world, [paddleRight.comp, paddleRight.hinge, paddleRight.con]);
		Matter.Body.rotate(paddleRight.comp, -0.57, { x: 308, y: 660 });
	}

	// 핀볼 생성
	function createPinball() {
		pinball = Matter.Bodies.circle(0, 0, 14, {
			label: 'pinball',
			collisionFilter: {
				group: stopperGroup
			},
			render: {
				fillStyle: COLOR.PINBALL
			}
		});
		Matter.World.add(world, pinball);
		launchPinball();
	}

	// 이벤트 생성
	function createEvents() {
		// 핀볼이 물체에 닿았을 때의 이벤트 처리
		Matter.Events.on(engine, 'collisionStart', function(event) {
			let pairs = event.pairs;
			pairs.forEach(function(pair) {
				if (pair.bodyB.label === 'pinball') {
					switch (pair.bodyA.label) {
						case 'reset':
							launchPinball();
							break;
						case 'bumper':
							pingBumper(pair.bodyA);
							break;
					}
				}
			});
		});

		// 핀볼 조절
		Matter.Events.on(engine, 'beforeUpdate', function(event) {
			// 범퍼로 인해 속도가 급격히 증가할 수 있으므로 제한
			Matter.Body.setVelocity(pinball, {
				x: Math.max(Math.min(pinball.velocity.x, MAX_VELOCITY), -MAX_VELOCITY),
				y: Math.max(Math.min(pinball.velocity.y, MAX_VELOCITY), -MAX_VELOCITY),
			});

			// 핀볼이 다시 슈터 레인으로 돌아가는 것을 방지하기 위한 처리
			if (pinball.position.x > 450 && pinball.velocity.y > 0) {
				Matter.Body.setVelocity(pinball, { x: 0, y: -10 });
			}
		});

		// 핀볼을 잡기 위한 마우스 드래그 이벤트
		Matter.World.add(world, Matter.MouseConstraint.create(engine, {
			mouse: Matter.Mouse.create(render.canvas),
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		}));

		// 키보드 패들 이벤트
		$('body').on('keydown', function(e) {
			if (e.which === 37) { // 왼쪽 화살표 키
				isLeftPaddleUp = true;
			} else if (e.which === 39) { // 오른쪽 화살표 키
				isRightPaddleUp = true;
			}
		});
		$('body').on('keyup', function(e) {
			if (e.which === 37) { // 왼쪽 화살표 키
				isLeftPaddleUp = false;
			} else if (e.which === 39) { // 오른쪽 화살표 키
				isRightPaddleUp = false;
			}
		});

		// 클릭/터치 패들 이벤트
		$('.left-trigger')
			.on('mousedown touchstart', function(e) {
				isLeftPaddleUp = true;
			})
			.on('mouseup touchend', function(e) {
				isLeftPaddleUp = false;
			});
		$('.right-trigger')
			.on('mousedown touchstart', function(e) {
				isRightPaddleUp = true;
			})
			.on('mouseup touchend', function(e) {
				isRightPaddleUp = false;
			});
	}

	// 핀볼 발사
	function launchPinball() {
		updateScore(0);
		Matter.Body.setPosition(pinball, { x: 465, y: 765 });
		Matter.Body.setVelocity(pinball, { x: 0, y: -25 + rand(-2, 2) });
		Matter.Body.setAngularVelocity(pinball, 0);
	}

	// 범퍼에 부딪혔을 때의 처리
	function pingBumper(bumper) {
		updateScore(currentScore + 10);

		// 색상 깜빡임
		bumper.render.fillStyle = COLOR.BUMPER_LIT;
		setTimeout(function() {
			bumper.render.fillStyle = COLOR.BUMPER;
		}, 100);
	}

	// 점수 업데이트
	function updateScore(newCurrentScore) {
		currentScore = newCurrentScore;
		$currentScore.text(currentScore);

		highScore = Math.max(currentScore, highScore);
		$highScore.text(highScore);
	}

	// 범위 내의 랜덤한 숫자 생성
	function rand(min, max) {
		return Math.random() * (max - min) + min;
	}

	// 핀볼 테이블의 외부 경계
	function boundary(x, y, width, height) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			isStatic: true,
			render: {
				fillStyle: COLOR.OUTER
			}
		});
	}

	// 벽 세그먼트
	function wall(x, y, width, height, color, angle = 0) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			angle: angle,
			isStatic: true,
			chamfer: { radius: 10 },
			render: {
				fillStyle: color
			}
		});
	}

	// SVG 경로로부터 생성된 바디
	function path(x, y, path) {
		let vertices = Matter.Vertices.fromPath(path);
		return Matter.Bodies.fromVertices(x, y, vertices, {
			isStatic: true,
			render: {
				fillStyle: COLOR.OUTER,

				// 빈 공간을 채우기 위해 스트로크와 선 두께 추가
				strokeStyle: COLOR.OUTER,
				lineWidth: 1
			}
		});
	}

	// 핀볼을 반사시키는 둥근 바디
	function bumper(x, y) {
		let bumper = Matter.Bodies.circle(x, y, 25, {
			label: 'bumper',
			isStatic: true,
			render: {
				fillStyle: COLOR.BUMPER
			}
		});

		// 반발력 설정
		bumper.restitution = BUMPER_BOUNCE;

		return bumper;
	}

	// 패들을 제한하는 보이지 않는 바디
	function stopper(x, y, side, position) {
		let attracteeLabel = (side === 'left') ? 'paddleLeftComp' : 'paddleRightComp';

		return Matter.Bodies.circle(x, y, 40, {
			isStatic: true,
			render: {
				visible: false,
			},
			collisionFilter: {
				group: stopperGroup
			},
			plugin: {
				attractors: [
					function(a, b) {
						if (b.label === attracteeLabel) {
							let isPaddleUp = (side === 'left') ? isLeftPaddleUp : isRightPaddleUp;
							let isPullingUp = ('pull' in position) ? position.pull === 'up' : false;
							let isPullingDown = ('pull' in position) ? position.pull === 'down' : false;

							// 패들이 위로 끌리는 경우
							if (isPaddleUp && isPullingUp) {
								return {
									x: (a.position.x - b.position.x) * PADDLE_PULL,
									y: (a.position.y - b.position.y) * PADDLE_PULL
								};
							}

							// 패들이 아래로 끌리는 경우
							if (!isPaddleUp && isPullingDown) {
								return {
									x: (b.position.x - a.position.x) * PADDLE_PULL,
									y: (b.position.y - a.position.y) * PADDLE_PULL
								};
							}
						}
					}
				]
			}
		});
	}

	// 게임 로드
	$(document).ready(function() {
		load();
	});
})();