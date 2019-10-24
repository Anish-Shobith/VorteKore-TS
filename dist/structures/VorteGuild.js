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
const guild_1 = __importDefault(require("../models/guild"));
class VorteGuild {
    constructor() {
        this.guild;
    }
    _load(g) {
        return __awaiter(this, void 0, void 0, function* () {
            this.guild = (yield guild_1.default.findOne({ guildID: g.id })) || new guild_1.default({
                guildID: g.id,
                case: 0,
                prefix: "!",
                autoRoles: [],
                staffRoles: [],
                welcome: {},
                leave: {},
                logs: {}
            });
            return this;
        });
    }
    increaseCase() {
        this.guild.case++;
        this.guild.save().catch(console.error);
        return this;
    }
    setPrefix(prefix) {
        this.guild.prefix = prefix;
        this.guild.save().catch(console.error);
        return this;
    }
    addRole(locale, role) {
        this.guild[locale].push(role);
        this.guild.save().catch(console.error);
        return this;
    }
    removeRole(whereToRemove, role) {
        const index = this.guild[whereToRemove].findIndex((x) => x === role);
        if (!index)
            return this;
        this.guild[whereToRemove].splice(index, 1);
        this.guild.save().catch(console.error);
        return this;
    }
    getLog(log) {
        return {
            enabled: this.guild.logs[log] ? this.guild.logs[log] : false,
            channel: this.guild.logs.channel
        };
    }
    get prefix() {
        return this.guild.prefix;
    }
    get case() {
        return this.guild.case;
    }
    get welcome() {
        return {
            enabled: this.guild.welcome.enabled,
            message: this.guild.welcome.message,
            channel: this.guild.welcome.channel
        };
    }
    get leave() {
        return {
            enabled: this.guild.leave.enabled,
            message: this.guild.leave.message,
            channel: this.guild.leave.channel
        };
    }
}
exports.VorteGuild = VorteGuild;