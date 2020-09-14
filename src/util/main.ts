import { exec } from 'child_process';

/**
 * generic function to get Enum key from a Enum value
 * @param enumType a typescript Type
 * @param enumValue string value
 */
export const getEnumKeyFromEnumValue = (enumType: any, enumValue: string | number): any => {
  const keys: string[] = Object.keys(enumType).filter((x) => enumType[x] === enumValue);
  if (keys.length > 0) {
    return keys[0];
  } else {
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
export const getEnumValueFromEnumKey = (enumType: any, enumKey: string | number): any => {
  // use getEnumKeyByEnumValue to get key from value
  const keys = Object.keys(enumType).filter((x) => getEnumKeyFromEnumValue(enumType, enumType[x]) === enumKey);
  if (keys.length > 0) {
    // return value from equality key
    return enumType[keys[0]];
  } else {
    // throw error to caller function
    throw new Error(`Invalid enum key '${enumKey}'! Valid enum key(s() are ${Object.keys(enumType)}`);
  }
};

/**
 * generate a fake clientId ex 'UNLICENCED5OMDOR'
 * used when client can't connect with lexActivatorApi
 */
export const getRandomLicenseKey = (prefix: string) => {
  const random: string = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `${prefix}${random}`;
};

/**
 * helper to convert string environment variable to boolean
 */
export const isTrue = (value: string): boolean => {
  return (value && value.toString().toLowerCase() === 'false' || !value || value === '0')
    ? false
    : true;
};

/*
 * compare 2 arrays
 * return true if they are "the same"
 */
export const listsAreEqual = (list1: [], list2: []) => {
  if (!list1 || !list2) return false;
  if (list1.length !== list2.length) return false;

  list1.sort();
  list2.sort();
  for (let i = 0; i < list1.length; ++i)
    if (list1[i] !== list2[i]) return false;
  return true;
};

// declare asyncForEach to work with forEach with async/await
export const asyncForEach = async (array: any, callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

// declare regExpExec function
export const regExpExec = (regex: RegExp, str: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      let m;
      const result: string[] = Array<string>();
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
    } catch (error) {
      // reject promise
      reject(error);
    }
  })
};
