"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../users/user.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(userDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        let isPasswordCorrect = false;
        if (user) {
            isPasswordCorrect = await bcrypt.compare(userDto.password, user === null || user === void 0 ? void 0 : user.password);
        }
        if (isPasswordCorrect) {
            return await this.generateToken(user);
        }
        throw new common_1.UnauthorizedException({
            message: "The email or password you entered isn't correct.",
        });
    }
    async signUp(user, file) {
        const candidate = await this.userService.getUserByEmail(user.email);
        if (candidate) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(user.password, 5);
        const fileB64 = file.buffer.toString('base64');
        const avatar = {
            fileB64,
            mimetype: file.mimetype,
        };
        const newUser = await this.userService.createUser(Object.assign(Object.assign({}, user), { avatar, password: hashPassword }));
        return await this.generateToken(newUser);
    }
    async generateToken(user) {
        const payload = { email: user.email, id: user.id, role: user.role };
        const refresh_token = this.jwtService.sign(payload, {
            expiresIn: '24h',
            secret: 'refresh',
        });
        const access_token = this.jwtService.sign(payload, {
            expiresIn: '10h',
        });
        return {
            access_token,
            refresh_token,
        };
    }
    async refreshToken(refresh_token) {
        try {
            const payload = await this.jwtService.decode(refresh_token);
            if (payload) {
                const user = await this.userService.getUserByEmail(payload['email']);
                return this.generateToken(user);
            }
        }
        catch (e) {
            throw new common_1.HttpException('Cannot get refresh token', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map