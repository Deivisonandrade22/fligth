const API_URL='http://localhost:3000';

export async function createFlightPlan(data) {
    const response = await fetch ( `${API_URL}/fligtplan`, {
        method: 'Post',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

    export async function listaFlightPlans() {
       const response = await fetch(`${API_URL}/flightplan`);
       return response.json();  
    }

    export async function listAirports() {
        const response = await fetch ( `${API_URL}/airports`);
        return response.json();
    }
