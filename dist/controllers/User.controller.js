"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../models/User.model"));
class UserController {
    static createSession(pseudo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_model_1.default.create({
                    pseudo: pseudo,
                });
                console.log('create session');
                console.log(user);
                return user._id;
            }
            catch (_a) {
                console.log('create session error');
            }
        });
    }
    static loadSession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_model_1.default.findById(token);
                console.log('load session');
                console.log(user);
                return user;
            }
            catch (_a) {
                console.log('load session error');
            }
        });
    }
    static deleteSession() { }
}
exports.default = UserController;
