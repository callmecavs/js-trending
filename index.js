const micro = require('micro')
const xray = require('x-ray')()

function cleanup (error, result) {
  console.log(result)
}

async function scrape (req, res) {
  xray('https://github.com/trending/javascript', '.repo-list li', [{
    href: 'div:nth-child(1) a@href',
    desc: 'div:nth-child(3) p'
  }])(cleanup)
}

module.exports = scrape
