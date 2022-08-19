const dayjs = require("dayjs")
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

//console.log(dayjs().format('DD-MM-YYYY'))

//console.log(dayjs('11-07-1984'))

module.exports = {
  today: () => dayjs().format('DD-MM-YYYY')
}


