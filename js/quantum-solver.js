/**
 * Quantum-Inspired Route Optimization Solver
 * Implements TSP solving via QUBO formulation and Simulated Annealing.
 */

class QuantumInspiredSolver {
    constructor(nodes, fillLevels) {
        this.nodes = nodes; // [{lat, lng, id}]
        this.fillLevels = fillLevels; // {id: level}
        this.distanceMatrix = this.createDistanceMatrix();
    }

    createDistanceMatrix() {
        const matrix = {};
        this.nodes.forEach(n1 => {
            matrix[n1.id] = {};
            this.nodes.forEach(n2 => {
                if (n1.id === n2.id) {
                    matrix[n1.id][n2.id] = 0;
                } else {
                    // Simple Haversine or Euclidean distance for simulation
                    const d = Math.sqrt(Math.pow(n1.lat - n2.lat, 2) + Math.pow(n1.lng - n2.lng, 2));
                    matrix[n1.id][n2.id] = d;
                }
            });
        });
        return matrix;
    }

    /**
     * QUBO Objective Function for TSP
     * Energy = A * Constraints + B * Distance
     * Constraints: Each city visited exactly once, each time step has exactly one city.
     */
    calculateEnergy(route) {
        let distance = 0;
        for (let i = 0; i < route.length - 1; i++) {
            distance += this.distanceMatrix[route[i]][route[i + 1]];
        }
        // Return to start
        distance += this.distanceMatrix[route[route.length - 1]][route[0]];

        // In QAOA/QUBO, we apply penalties for constraint violations.
        // Here, the permutation 'route' naturally satisfies constraints, 
        // so we focus on the objective (Distance) weighted by Priority (Fill Levels).

        // Priority weighting: High fill bins should be visited earlier (or just ensure they are in the route)
        // For simplicity, we optimize for shortest distance among urgent bins.

        return distance;
    }

    /**
     * Simulated Annealing (Classical Simulation of Quantum Annealing / QAOA result search)
     */
    async solve() {
        let currentRoute = this.nodes.map(n => n.id);
        // Shuffle for random start
        currentRoute.sort(() => Math.random() - 0.5);

        let currentEnergy = this.calculateEnergy(currentRoute);
        let bestRoute = [...currentRoute];
        let bestEnergy = currentEnergy;

        let temp = 100;
        const coolingRate = 0.999;

        // Simulate "Thinking" time for UI
        return new Promise((resolve) => {
            let iterations = 0;
            const maxIterations = 5000;

            const step = () => {
                for (let i = 0; i < 50; i++) { // Process in chunks to avoid freezing main thread
                    if (temp <= 0.01 || iterations > maxIterations) break;

                    const newRoute = [...currentRoute];
                    const i1 = Math.floor(Math.random() * newRoute.length);
                    const i2 = Math.floor(Math.random() * newRoute.length);
                    [newRoute[i1], newRoute[i2]] = [newRoute[i2], newRoute[i1]];

                    const newEnergy = this.calculateEnergy(newRoute);

                    if (newEnergy < currentEnergy || Math.random() < Math.exp((currentEnergy - newEnergy) / temp)) {
                        currentRoute = newRoute;
                        currentEnergy = newEnergy;

                        if (currentEnergy < bestEnergy) {
                            bestRoute = [...currentRoute];
                            bestEnergy = currentEnergy;
                        }
                    }

                    temp *= coolingRate;
                    iterations++;
                }

                if (temp > 0.01 && iterations < maxIterations) {
                    setTimeout(step, 0);
                } else {
                    resolve({
                        route: bestRoute,
                        distance: bestEnergy,
                        iterations: iterations
                    });
                }
            };

            step();
        });
    }
}

window.QuantumInspiredSolver = QuantumInspiredSolver;
