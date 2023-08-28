class Card {
	constructor(name, cost) {
		this.name = name;
		this.cost = cost;
	}
}

class Unit extends Card {
	constructor(name, cost, power, res) {
		super(name, cost);
		this.power = power;
		this.res = res;
	}

	attack(target) {
    console.log(`${this.name} attacks ${target.name}`)
		target.res -= this.power;
    target.res > 0 ? console.log(`${target.name} resilience now ${target.res}\n`) : console.log(`${target.name} is defeated!\n`)
	}
}

class Effect extends Card {
	constructor(name, cost, text, stat, magnitude) {
		super(name, cost);
		this.text = text;
		this.stat = stat;
		this.magnitude = magnitude;
	}

	play(target) {
		if (target instanceof Unit) {
			if (this.stat == "resilience") {
				console.log(
					`${this.name} played on ${target.name}. Resilience ${
						this.magnitude > 0 ? "increased" : "decreased"
					} by ${this.magnitude}`
				);
				target.res += this.magnitude;
				console.log(`Resilience now ${target.res}\n`);
			} else {
				console.log(
					`${this.name} played on ${target.name}. Power ${
						this.magnitude > 0 ? "increased" : "decreased"
					} by ${Math.abs(this.magnitude)}`
				);
				target.power += this.magnitude;
				console.log(`Power now ${target.power}\n`);
			}
		} else {
			throw new Error("Target must be a unit!");
		}
	}
}

// Unit Cards
const redBeltNinja = new Unit("Red Belt Ninja", 3, 3, 4);
const blackBeltNinja = new Unit("Black Belt Ninja", 4, 5, 4);

// Effect Cards
const hardAlgorithm = new Effect("Hard Algorithm", 2, "increase target's resilience by 3", "resilience", 3);
const unhandledPromise = new Effect(
	"Unhandled Promise Rejection",
	1,
	"reduce target's resilience by 2",
	"resilience",
	-2
);
const pairProgramming = new Effect("Pair Programming", 3, "increase target's power by 2", "power", 2);

hardAlgorithm.play(redBeltNinja);
unhandledPromise.play(redBeltNinja);
pairProgramming.play(redBeltNinja)
redBeltNinja.attack(blackBeltNinja)
