const monthsShort = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const monthsF = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];


/**
 * Запуск перевода Json в FormData
 * @param data
 * @returns {FormData}
 */
function jsonToFormData(data) {
    const formData = new FormData();

    buildFormData(formData, data);

    return formData;
}

/**
 * рекурсивно переводит элемент Json в FormData
 * @param formData
 * @param data
 * @param parentKey
 */
function buildFormData(formData, data, parentKey) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else {
        const value = data == null ? '' : data;

        formData.append(parentKey, value);
    }
}

/**
 * проверяет есть ли параметр в объекте
 * @returns {boolean}
 */
function has(_object, _key) {
    return Object.prototype.hasOwnProperty.call(_object, _key)
}

/**
 * Клонирует объект
 * @param _object
 * @returns {any}
 */
function cloneObject(_object) {
    return JSON.parse(JSON.stringify(_object))
}

/**
 * форматирует дату dateFormat(new Date(),'d-m-Y')
 * @param _date
 * @param _mask
 * @returns {string}
 */
function dateFormat(_date, _mask) {
    let result = _mask;
    result = result.replace('Y', _date.getFullYear());
    result = result.replace('m', ('0' + (_date.getMonth() + 1)).slice(-2));
    result = result.replace('M', monthsShort[_date.getMonth()]);
    result = result.replace('F', monthsF[_date.getMonth()]);
    result = result.replace('d', ('0' + _date.getDate()).slice(-2));
    result = result.replace('H', ('0' + _date.getHours()).slice(-2));
    result = result.replace('i', ('0' + _date.getMinutes()).slice(-2));
    result = result.replace('s', ('0' + _date.getSeconds()).slice(-2));

    return result;
}

/**
 * для склонения слов к числительным
 * @param number - число
 * @param words - массив из трех [числительное для одного, числительное для 2х, числительное для 5ти] (н-р )[заказ,заказа,заказов]
 * @returns {*}
 */
function pluralForm(number, words) {
    const cases = [2, 0, 1, 1, 1, 2];
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]];
}



export {
    has,
    cloneObject,
    dateFormat,
    pluralForm,
    jsonToFormData,
}
