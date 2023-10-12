const { connect } = require('../../config/db.config');
const logger = require('../logger/api.logger');

class UserRepository {

    db = {};
    constructor() {
        this.db = connect();
        // For Development
        // this.db.sequelize.sync({ force: true }).then(() => {
        //     console.log("Drop and re-sync dbaaaa");
        // });
    }

    async getUsers() {
        try {
            const users = await this.db.users.findAll();
            console.log('users:::', users);
            return users;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createUser(user) {
        let data = {};
        try {
            data = this.db.users.create(user)
        } catch(err) {
            console.log('Error::' + err)
        }
        return data;
    }

}

module.exports = new UserRepository();