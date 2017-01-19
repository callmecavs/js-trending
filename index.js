const { send } = require('micro')
const xray = require('x-ray')()

const repo = {
  full: 'div:nth-child(1) a',
  href: 'div:nth-child(1) a@href',
  desc: 'div:nth-child(3) p',
  stars: 'div:nth-child(4) [aria-label="Stargazers"]',
  forks: 'div:nth-child(4) [aria-label="Forks"]',
  today: 'div:nth-child(4) .float-right'
}

const cleanup = res => (error, list) => {
  if (error) {
    send(res, 500, error)
  }

  const cleaned = list.map(item => {
    const parsed = {}

    // trimmed
    Object
      .keys(item)
      .map(key => {
        parsed[key] = item[key].trim()
      })

    // extract user and name from full
    const [
      user,
      name
    ] = parsed.full.split(' / ')

    parsed.user = user
    parsed.name = name

    // remove "stars today" from today
    parsed.today = parsed.today.split(' ')[0]

    return parsed
  })

  // send cleaned repos
  send(res, 200, cleaned)
}

const scrape = async (req, res) => {
  xray('https://github.com/trending/javascript', '.repo-list li', [repo])(cleanup(res))
}

module.exports = scrape
