"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Button({ onClick, text, disabled }) {
    return (<button className="rounded-b border-white border-4 delay-100 bg-white hover:border-b-green-300 duration-300" onClick={onClick} disabled={disabled}>
      {text}
    </button>);
}
exports.default = Button;
