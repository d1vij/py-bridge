import {exec} from "@d1vij/py-bridge";

exec("api.py", "get_weather", {city:"Pune"}).then(console.log);
// Output
// {
//   success: true,
//   payload: {
//     city: 'Pune',
//     temperature: '23',
//     description: 'Moderate or heavy rain shower'
//   }
// }
