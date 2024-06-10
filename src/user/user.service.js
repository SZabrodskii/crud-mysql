const {promisify} = require('util');

class UserService {
  db;

  constructor(db) {
    this.db = db;
    this.db.query = promisify(this.db.query);
  }

  async create(name, email) {
    const result = { id: 0, name, email };

    try {
      const res = await this.db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
      result.id = res.insertId;
    } catch (err) {
      throw err;
    }

    return result;
  }

  async getAll() {
    try {
      return await this.db.query('SELECT * FROM users');
    } catch (err) {
      throw err;
    }
  }

  async getByID(id) {
    try {
      const results = await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async delete(id) {
    try {
      await this.db.query('DELETE FROM users WHERE id = ?', [id]);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {UserService};


