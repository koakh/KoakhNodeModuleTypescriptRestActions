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
Object.defineProperty(exports, "__esModule", { value: true });
exports.regExpExec = exports.asyncForEach = exports.getEnumValueFromEnumKey = exports.getEnumKeyFromEnumValue = void 0;
/**
 * generic function to get Enum key from a Enum value
 * @param enumType a typescript Type
 * @param enumValue string value
 */
exports.getEnumKeyFromEnumValue = (enumType, enumValue) => {
    const keys = Object.keys(enumType).filter((x) => enumType[x] === enumValue);
    if (keys.length > 0) {
        return keys[0];
    }
    else {
        // throw error to caller function
        // throw new Error(`Invalid enum value '${enumValue}'! Valid enum values are ${Object.keys(myEnum)}`);
        throw new Error(`Invalid enum value '${enumValue}'! Valid enum value(s() are ${Object.values(enumType)}`);
    }
};
/**
 * generic function to get Enum value from a Enum key
 * @param enumType a typescript Type
 * @param enumValue string value
 */
exports.getEnumValueFromEnumKey = (enumType, enumKey) => {
    // use getEnumKeyByEnumValue to get key from value
    const keys = Object.keys(enumType).filter((x) => exports.getEnumKeyFromEnumValue(enumType, enumType[x]) === enumKey);
    if (keys.length > 0) {
        // return value from equality key
        return enumType[keys[0]];
    }
    else {
        // throw error to caller function
        throw new Error(`Invalid enum key '${enumKey}'! Valid enum key(s() are ${Object.keys(enumType)}`);
    }
};
// declare asyncForEach to work with forEach with async/await
exports.asyncForEach = (array, callback) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < array.length; index++) {
        yield callback(array[index], index, array);
    }
});
// declare regExpExec function
exports.regExpExec = (regex, str) => {
    return new Promise((resolve, reject) => {
        try {
            let m;
            const result = Array();
            // tslint:disable-next-line: no-conditional-assignment
            while ((m = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    // App.log(LogLevel.DEBUG, `Found match, group ${groupIndex}: ${match}`);
                    result.push(match);
                });
            }
            // resolve promise
            resolve(result);
        }
        catch (error) {
            // reject promise
            reject(error);
        }
    });
};
//# sourceMappingURL=main.js.map