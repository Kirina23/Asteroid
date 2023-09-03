const NASA_API_KEY = '2PflO9dBi3AT6O9N35vVDKdNXTbki2E7qH3RGSVz';

export const getAsteroids = async (page: number, endDate: string) => {
   const currentDate = new Date().toISOString().split('T')[0];
   endDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
   const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${endDate}&detailed=false&page=${page}&api_key=${NASA_API_KEY}&random=${Math.random()}`;

   try {
      const response = await fetch(url);
      const data = await response.json();
      const asteroidData = data?.near_earth_objects[currentDate] || [];

      // Форматируем данные в соответствии с вашими требованиями
      const formattedAsteroids = asteroidData.map((asteroid: any) => ({
         name: asteroid.name,
         size: parseFloat(asteroid.estimated_diameter.kilometers.estimated_diameter_max),
         isPotentiallyHazardous: asteroid.is_potentially_hazardous_asteroid,
         closeApproachDate: asteroid.close_approach_data[0].close_approach_date,
         distanceToEarthKilometers: parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers),
         distanceToEarthMiles: parseFloat(asteroid.close_approach_data[0].miss_distance.miles),
      }));

      return formattedAsteroids;
   } catch (error) {
      console.error('Error fetching asteroids:', error);
      return [];
   }
};
