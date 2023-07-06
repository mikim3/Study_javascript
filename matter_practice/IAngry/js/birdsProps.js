const getRandomBird = () => {

    const birds = [
        {
            name: 'Pigeon',
            radius: 30,
            posX: 300,
            posY: 400,
            physics: {
                density: 0.9,
                frictionAir: 0.05
            }
        },
        {
            name: 'mikim3',
            radius: 10,
            posX: 300,
            posY: 400,
            grow: 1.1,
            maxGrow: 30,
            physics: {
                density: 0.01,
                frictionAir: 0.01
            }
        }
    ]

    return birds[Math.floor(Math.random() * birds.length)]
}
