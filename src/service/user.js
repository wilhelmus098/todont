const userRepository  = require('../repository/user');

class UserService {
    
    constructor() {}

    async getUsers() {
        return await userRepository.getUsers();
    }

    async createUser(user) {
        return await userRepository.createUser(user)
    }

    async getUserByUsername(username) {
        return await userRepository.getUserByUsername(username)
    }

    async updatePassword(user) {
        return await userRepository.updatePassword(user)
    }
}

module.exports = new UserService();