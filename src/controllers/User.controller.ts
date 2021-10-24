import UserModel from '../models/User.model';

export default class UserController {
    static async createSession(pseudo: String) {
        try {
            const user = await UserModel.create({
                pseudo: pseudo,
            });
            console.log('create session');
            console.log(user);

            return user._id;
        } catch {
            console.log('create session error');
        }
    }

    static async loadSession(token: String) {
        try {
            const user = await UserModel.findById(token);
            console.log('load session');
            console.log(user);

            return user;
        } catch {
            console.log('load session error');
        }
    }
    static deleteSession() {}
}
