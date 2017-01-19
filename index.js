const xray = require('x-ray')()

const selectors = {
  full: 'div:nth-child(1) a',
  href: 'div:nth-child(1) a@href',
  desc: 'div:nth-child(3) p',
  stars: 'div:nth-child(4) [aria-label="Stargazers"]',
  forks: 'div:nth-child(4) [aria-label="Forks"]',
  today: 'div:nth-child(4) .float-right'
}

const cleanup = (error, result) => {

}

const scrape = async (req, res) => {
  xray('https://github.com/trending/javascript', '.repo-list li', [selectors])(cleanup)
}

module.exports = scrape
