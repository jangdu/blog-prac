"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const users_1 = __importDefault(require("./users"));
const comments_1 = __importDefault(require("./comments"));
const like_1 = __importDefault(require("./like"));
class Posts extends sequelize_1.Model {
    static initiate(sequelize) {
        Posts.init({
            postId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.default.INTEGER,
            },
            UserId: sequelize_1.default.INTEGER,
            title: sequelize_1.default.STRING,
            content: sequelize_1.default.STRING,
        }, {
            sequelize,
            modelName: "Posts",
        });
    }
    static associate() {
        // define association here
        Posts.belongsTo(users_1.default, {
            targetKey: "userId",
            foreignKey: "UserId",
        });
        Posts.hasMany(comments_1.default, {
            sourceKey: "postId",
            foreignKey: "PostId",
        });
        Posts.hasMany(like_1.default, {
            sourceKey: "postId",
            foreignKey: "postId",
        });
    }
}
exports.default = Posts;
