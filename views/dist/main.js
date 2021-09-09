/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./views/styles.css":
/*!**************************!*\
  !*** ./views/styles.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-webpack-project/./views/styles.css?");

/***/ }),

/***/ "./views/main.js":
/*!***********************!*\
  !*** ./views/main.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_booking_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/booking.js */ \"./views/modules/booking.js\");\n/* harmony import */ var _modules_requests_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/requests.js */ \"./views/modules/requests.js\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.css */ \"./views/styles.css\");\n\r\n\r\n\r\n\r\nvar booking;\r\n\r\nfunction OnPageLoad()\r\n{\r\n    let today = new Date();\r\n    let year = today.getFullYear();\r\n    let month = today.getMonth();\r\n\r\n    booking = new _modules_booking_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](year, month);\r\n\r\n    (0,_modules_requests_js__WEBPACK_IMPORTED_MODULE_1__.GetBookedRequest)(booking, year, month);\r\n\r\n    console.log(\"POST request to get reserved days sent.\");\r\n\r\n   // booking.Render();\r\n}\r\n\r\n\r\nOnPageLoad();\r\n\r\nwindow.booking = booking;\r\n\r\n\n\n//# sourceURL=webpack://my-webpack-project/./views/main.js?");

/***/ }),

/***/ "./views/modules/booking.js":
/*!**********************************!*\
  !*** ./views/modules/booking.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Booking)\n/* harmony export */ });\n/* harmony import */ var _calendar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calendar.js */ \"./views/modules/calendar.js\");\n/* harmony import */ var _requests_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./requests.js */ \"./views/modules/requests.js\");\n\r\n\r\n\r\nclass Booking\r\n{\r\n    constructor(year, month)\r\n    {    \r\n        this.weekdayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];\r\n        this.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',\r\n        'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];\r\n\r\n        this.labels = {\r\n            \"booked\": \"Забронировано\",\r\n            \"free\": \"Свободно\"\r\n        }\r\n\r\n        this.colors = {\r\n            \"booked\": \"red\",\r\n            \"free\": \"green\"\r\n        }\r\n\r\n        this.titleId = \"booking-title\";\r\n        this.headerId = \"booking-table-headers\";\r\n        this.bodyId = \"booking-table-body\";\r\n\r\n        this.reserved = [];\r\n        this.selected = [];\r\n\r\n        this.SetTitle(year, month);\r\n        this.RenderTitle();\r\n\r\n        this.calendar = new _calendar_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](year, month);\r\n\r\n        this.year = year;\r\n        this.month = month;\r\n    }\r\n\r\n    SetTitle(year, month)\r\n    {\r\n        this.title = this.monthNames[month] + \" \" + year;\r\n    }\r\n\r\n    Render()\r\n    {\r\n        const tableBody = document.getElementById(this.bodyId);\r\n        tableBody.innerHTML = \"\";\r\n        const headerRow = document.getElementById(this.headerId);\r\n        headerRow.innerHTML = \"\";\r\n\r\n        this.RenderHeaders();\r\n        this.RenderTable();\r\n    }\r\n\r\n    RenderTitle()\r\n    {\r\n        const titleElement = document.getElementById(this.titleId);\r\n        titleElement.innerText = this.title;\r\n    }\r\n\r\n    RenderHeaders()\r\n    {\r\n        const headerRow = document.getElementById(this.headerId);\r\n\r\n        for(let i = 0; i < this.weekdayNames.length; i++)\r\n        {\r\n            let header = document.createElement('th');\r\n            header.scope = \"col\";\r\n            header.innerText = this.weekdayNames[i];\r\n            header.style.textAlign = \"center\";\r\n            headerRow.appendChild(header);\r\n        }\r\n    }\r\n\r\n    RenderTable()\r\n    {\r\n        const tableBody = document.getElementById(this.bodyId);\r\n        const weeks = 6;\r\n        const days = 7;\r\n\r\n        for(let i = 0; i < weeks; i++)\r\n        {\r\n            let rowElement = document.createElement(\"tr\");\r\n\r\n            for(let j = i * days; j < (i + 1) * days; j++)\r\n            {\r\n                let cellElement = document.createElement(\"td\");\r\n                let cellLink = document.createElement(\"a\");\r\n\r\n                let day = this.calendar.days[j];\r\n\r\n                cellLink.style.textAlign = \"center\";\r\n\r\n                if(this.IsDayActive(day))\r\n                {\r\n                    cellLink.href = \"\";\r\n                    cellLink.className = \"link-dark\";\r\n                    cellLink.style.textDecoration = \"none\";\r\n                }\r\n                else\r\n                {\r\n                    cellElement.style.color = \"gray\";\r\n                }\r\n\r\n                cellLink.title = this.labels[\"free\"];\r\n\r\n                if(this.IsDayReserved(day))\r\n                {\r\n                    cellLink.style.color = \"white\";\r\n                    cellLink.title = this.labels[\"booked\"];\r\n                    cellElement.style.backgroundColor = this.colors[\"booked\"];\r\n                }\r\n                \r\n                if(this.IsDaySelected(day))\r\n                {\r\n                    cellLink.style.color = \"white\";\r\n                    cellElement.style.backgroundColor = this.colors[\"free\"];\r\n                }\r\n\r\n                let dayText = day.getDate();\r\n\r\n                cellLink.innerText = dayText;\r\n\r\n                cellLink.addEventListener('click', function (e)\r\n                {\r\n                    e.preventDefault();\r\n                    this.SelectDay(day);\r\n                }.bind(this));\r\n\r\n                cellElement.appendChild(cellLink);\r\n                rowElement.appendChild(cellElement);\r\n            }\r\n\r\n            tableBody.appendChild(rowElement);\r\n        }\r\n\r\n    }\r\n\r\n    IsDaySelected(day)\r\n    {\r\n        return this.selected.includes(day);\r\n    }\r\n\r\n    IsDayReserved(day)\r\n    {\r\n        let isReserved = this.reserved.filter(el => el.getTime() == day.getTime()).length > 0;\r\n        console.log(day + \" => \" + isReserved);\r\n        return isReserved;\r\n    }\r\n\r\n    IsDayActive(day)\r\n    {\r\n        let date = day;\r\n\r\n        let month = date.getMonth();\r\n        let year = date.getFullYear();\r\n\r\n        if(this.year != year || this.month != month)\r\n            return false;\r\n\r\n        return true;\r\n    }\r\n\r\n    RemoveFromSelected(day)\r\n    {\r\n        if(this.IsDaySelected(day))\r\n        {\r\n            let dayIndex = this.selected.findIndex(el => el == day);\r\n            this.selected.splice(dayIndex, 1);\r\n            return true;\r\n        }\r\n\r\n        return false;\r\n    }\r\n\r\n    SelectDay(selectedDay)\r\n    {\r\n        if(this.IsDayReserved(selectedDay))\r\n            return;\r\n\r\n        if(!this.IsDayActive(selectedDay))\r\n            return;\r\n\r\n        // If can't remove (can't find) => add.\r\n        if(!this.RemoveFromSelected(selectedDay))\r\n        {\r\n            this.selected.push(selectedDay);\r\n        }\r\n\r\n        // Re-render full table, it's not so expensive (only 42 days)\r\n\r\n        const tableBody = document.getElementById(\"booking-table-body\");\r\n        tableBody.innerHTML = \"\"; \r\n\r\n        this.RenderTable();\r\n    }\r\n\r\n    Book()\r\n    {\r\n        (0,_requests_js__WEBPACK_IMPORTED_MODULE_1__.SendBookedRequest)(this, this.year, this.month, this.selected);\r\n\r\n        console.log(\"It was sended (MAYBE).\");\r\n\r\n        return false;\r\n    }\r\n\r\n    ChangeResultField(state)\r\n    {\r\n        const button = document.getElementById(\"table-button-group\");\r\n        button.innerHTML = \"\";\r\n\r\n        let resultText = document.createElement(\"p\");\r\n\r\n        if(state)\r\n        {\r\n            resultText.style.color = \"green\";\r\n            resultText.innerText = \"Бронирование успешно завершено.\";\r\n        }\r\n        else \r\n        {\r\n            resultText.style.color = \"red\";\r\n            resultText.innerText = \"Ошибка при бронировании.\";\r\n        }\r\n\r\n        button.appendChild(resultText);\r\n\r\n        return false;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://my-webpack-project/./views/modules/booking.js?");

/***/ }),

/***/ "./views/modules/calendar.js":
/*!***********************************!*\
  !*** ./views/modules/calendar.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Calendar)\n/* harmony export */ });\n\r\nclass Calendar \r\n{\r\n    constructor(year, month)\r\n    {\r\n        this.year = year;\r\n        this.month = month;\r\n\r\n        this.days = this.getCalendarDays();\r\n    }\r\n\r\n    getCalendarDays()\r\n    {\r\n        let days = [];\r\n\r\n        let first = new Date(this.year, this.month);\r\n\r\n        this.firstDayOfMonth = first;\r\n        this.lastDayOfMonth = new Date(this.year, this.month + 1, 0);\r\n\r\n        let firstDay = first.getDay();\r\n\r\n        // first day of the week is monday.\r\n        let deltaFirstDay = firstDay == 0 ? 6 : firstDay - 1;\r\n        \r\n        // first day of the calendar\r\n        let start = new Date(this.year, this.month, -deltaFirstDay + 1);\r\n\r\n        for(let d = start, i = 0; i < 42; d.setDate(d.getDate() + 1), i++)\r\n        {\r\n            days.push(new Date(d.valueOf()));\r\n        }\r\n\r\n        console.log(\"Get calendar (\" + this.year + \" \" + this.month + \") data.\")\r\n        console.log(days);\r\n\r\n        return days;\r\n    }\r\n\r\n    static getCurrentMonth()\r\n    {\r\n        return new Date().getMonth();\r\n    }\r\n\r\n    static getCurrentYear()\r\n    {\r\n        return new Date().getFullYear();\r\n    }\r\n}\n\n//# sourceURL=webpack://my-webpack-project/./views/modules/calendar.js?");

/***/ }),

/***/ "./views/modules/requests.js":
/*!***********************************!*\
  !*** ./views/modules/requests.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GetBookedRequest\": () => (/* binding */ GetBookedRequest),\n/* harmony export */   \"SendBookedRequest\": () => (/* binding */ SendBookedRequest)\n/* harmony export */ });\nconst components_url = \"../components/\";\r\n\r\n\r\nfunction GetBookedRequest(booking, year, month)\r\n{\r\n  const component = \"getbooked.php\"\r\n\r\n  let reserved_json;\r\n\r\n  $.ajax(\r\n    { \r\n      method: 'POST',\r\n      url: components_url + component,\r\n      data: JSON.stringify({ Year: year, Month: month }),\r\n      contentType: \"application/json; charset=utf-8\",\r\n      dataType: \"json\",\r\n    })\r\n    .done(function (data) \r\n    {\r\n      AdoptBooked(booking, data);\r\n      booking.Render();\r\n    });\r\n}\r\n\r\nfunction AdoptBooked(booking, arr)\r\n{\r\n  console.log(\"Got booked arrays: \" + arr);\r\n\r\n  if(arr == null)\r\n  {\r\n    console.log(\"Theres no booked days.\");\r\n    return;\r\n  }\r\n    \r\n  for(let i = 0; i < arr.length; i++)\r\n    for(let j = 0; j < arr[i].length; j++)\r\n    {\r\n      booking.reserved.push(new Date(arr[i][j]));\r\n    }\r\n}\r\n\r\nfunction SendBookedRequest(booking, year, month, days)\r\n{\r\n  // If we have nothing selected\r\n  if(booking.selected.length === 0)\r\n    return false;\r\n\r\n  const component = \"book.php\";\r\n\r\n  console.log(\"SENDING: \" + JSON.stringify({ Year: year, Month: month, Days: days }));\r\n\r\n  $.ajax(\r\n    { method: 'POST',\r\n      url: components_url + component,\r\n      data: JSON.stringify({ Year: year, Month: month, Days: days }),\r\n      contentType: \"application/json; charset=utf-8\",\r\n      dataType: \"json\"\r\n  }).done(function (data) {\r\n    booking.ChangeResultField(true);\r\n  }).fail(function (data) {\r\n    booking.ChangeResultField(false);\r\n  });\r\n\r\n}\n\n//# sourceURL=webpack://my-webpack-project/./views/modules/requests.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./views/main.js");
/******/ 	
/******/ })()
;