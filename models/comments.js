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
const posts_1 = __importDefault(require("./posts"));
class Comments extends sequelize_1.Model {
    static initiate(sequelize) {
        Comments.init({
            UserId: sequelize_1.default.INTEGER,
            PostId: sequelize_1.default.INTEGER,
            comment: sequelize_1.default.STRING,
        }, {
            sequelize,
            modelName: "Comments",
        });
    }
    static associate() {
        // define association here
        this.belongsTo(users_1.default, {
            targetKey: "userId",
            foreignKey: "UserId",
        });
        this.belongsTo(posts_1.default, {
            targetKey: "postId",
            foreignKey: "PostId",
        });
    }
}
exports.default = Comments;
