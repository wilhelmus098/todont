const { connect } = require('../../config/db.config');
const logger = require('../logger/api.logger');

class UserRepository {

    db = {};
    constructor() {
        this.db = connect();
        // For Development
        // this.db.sequelize.sync({ force: true }).then(() => {
        //     console.log("Drop and re-sync dbaaaa")
        // });
    }

    async getUsers() {
        try {
            const users = await this.db.users.findAll();
            console.log('users:::', users);
            return users
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async createUser(user) {
        let data = {}
        try {
            data = this.db.users.create(user)
        } catch(err) {
            console.log('Error::' + err)
        }
        return data
    }

    async getUserByUsername(username) {
        try {
            const userLogin = await this.db.users.findOne({
                where: {username: username}
            })
            return userLogin
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async updatePassword(user) {
        let data = {}
        try {
            await this.db.users.findOne({
                where: {email: user.email, username: user.username}
            }).then(record => {
                if(!record) {
                    return {message: "not found"}
                }

                console.log(`retrieved record ${JSON.stringify(record,null,2)}`)
                record.password = user.password
                record.save()
            })
            // let existingUser = await this.db.users.findOne({
            //     where: {email: user.email, username: user.username}
            // }).then(function(updatedUser) {
            //     existingUser.update(user)
            // })
            // data = this.db.users.create(user)
        } catch(err) {
            console.log('Error::' + err)
        }
        return data
    }
}

module.exports = new UserRepository();