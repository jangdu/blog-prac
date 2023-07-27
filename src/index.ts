import App from "./app";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

const app = new App();
app.start();

// AppDataSource.initialize()
//   .then(async () => {})
//   .catch((error) => console.log(error));
