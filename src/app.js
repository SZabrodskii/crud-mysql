const {createSQLConnection} = require("./db/mysql");
const express = require("express");
const bodyParser = require("body-parser");
const {UserService} = require("./user/user.service");

function createApp() {
  const db = createSQLConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'userdb',
  });
  const app = express();
  const port = 3000;
  const userService = new UserService(db);

  app.use(bodyParser.json());
  app.post('/', async (req, res) => {
    const {name, email} = req.body;

    const user = await userService.create(name, email);

    res.json(user)
  });
  app.get('/', async (req, res) => {
    const result = await userService.getAll()
    res.json(result)
  });

  app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userService.getByID(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

  app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await userService.delete(id);
    res.sendStatus(204);
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });


}

module.exports = {createApp};





