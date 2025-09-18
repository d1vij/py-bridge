import { execute,pythonPath } from "../../dist/ts/execute.js";
pythonPath.set("/home/divij/coding/repos/py-bridge/examples/weather/.venv/bin/python")
execute("api.py", "get_weather", {city:"Pune"}).then(console.log);
// Output
// {
//   success: true,
//   payload: {
//     city: 'Pune',
//     temperature: '23',
//     description: 'Moderate or heavy rain shower'
//   }
// }
