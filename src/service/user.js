const userRepository  = require('../repository/user');

class UserService {

    constructor() {}

    async getUsers() {
        return await userRepository.getUsers();
    }

    async createUser(user) {
        return await userRepository.createUser(user)
    }
}

module.exports = new UserService();