# Gitlab Calendar [![npm][npm-version-img]][npm-version-url] [![MIT license][license-img]][license-url] [![Twitter][twitter-img]][twitter-url] [![Analytics][analytics-img]][analytics-url]

> Embed your Gitlab Contributions Calendar anywhere

[![All issues on Github][github-issues-img]][github-issues-url]
[![Open issues on Github][github-open-issues-img]][github-open-issues-url]
[![Closed issues on Github][github-closed-issues-img]][github-closed-issues-url]
[![Latest Github gag][github-tag-img]][github-tag-url]
[![GitHub last commit][last-commit-img]][last-commit-url]

[![Weekly downloads on NPM][npm-downloads-weekly-img]][npm-url]
[![Monthly downloads on NPM][npm-downloads-monthly-img]][npm-url]
[![Yearly downloads on NPM][npm-downloads-yearly-img]][npm-url]
[![Total downloads on NPM][npm-downloads-total-img]][npm-url]

[![Githib build status][github-status-img]][github-status-url]
[![Combined Github checks][github-checks-img]][github-checks-url]
![Publish size][publish-size-img]
![Top language][github-top-language-img]
![Used languages count][github-languages-img]
[![Renovate App Status][renovateapp-img]][renovateapp-url]
[![Make A Pull Request][prs-welcome-img]][prs-welcome-url]

This package allows you to embed your Gitlab Contributions Calendar in any website.

The package does not handle network requests, this is left to the developer to decide and implement. Gitlab Calendar requires the data as it is provided by the `calendar` endpoint of the Gitlab API (https://gitlab.com/users/$USER/calendar.json).

**This project was inspired by [Github Calendar](https://github.com/Bloggify/github-calendar).**

## Live preview ([link](https://atanas.info/stats))

![Gitlab Calendar Screenshot](https://raw.githubusercontent.com/scriptex/gitlab-calendar/master/assets/gitlab-calendar.png)

## Installation

```sh
npm i gitlab-calendar

# or

yarn add gitlab-calendar
```

## Usage

```typescript
import GitlabCalendar from 'gitlab-calendar';

new GitlabActivityCalendar(document.getElementById('gitlab-calendar'), data, options);
```

## Data format

The data is obtained by fetching the `https://gitlab.com/users/$USER/calendar.json` endpoint.

This exercise is left to the developer implementing it.

`gitlab-calendar` requires the data in the following format:

```json
{
    "2020-12-07": 1,
    "2020-12-09": 2,
    "2020-12-10": 5,
    ...
}
```

## Options

| Name                | Type                                                           | Default value                                                                                                                                                                                                                                                                                              |
| ------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `daySize`           | `number`                                                       | 15                                                                                                                                                                                                                                                                                                         |
| `hintText`          | `string`                                                       | 'Issues, merge requests, pushes, and comments.'                                                                                                                                                                                                                                                            |
| `daySpace`          | `number`                                                       | 1                                                                                                                                                                                                                                                                                                          |
| `utcOffset`         | `number`                                                       | 0                                                                                                                                                                                                                                                                                                          |
| `dayTitles`         | `Record<ActivityCalendarWeekday, string>`                      | <pre lang="json">{ <br> monday: 'M', <br> wednesday: 'W', <br> friday: 'F', <br> saturday: 'S', <br> sunday: 'S' <br>}</pre>                                                                                                                                                                               |
| `monthsAgo`         | `number`                                                       | 12                                                                                                                                                                                                                                                                                                         |
| `monthNames`        | `string[]`                                                     | ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']                                                                                                                                                                                                                       |
| `inputFormat`       | `string`                                                       | 'yyyy-MM-dd'                                                                                                                                                                                                                                                                                               |
| `weekdayNames`      | `string[]`                                                     | ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']                                                                                                                                                                                                                             |
| `legendValues`      | `ActivityCalendarLegendValue[]`                                | <pre lang="json">[ <br> { title: 'No contributions', min: 0 }, <br> { title: '1-9 contributions', min: 1 }, <br> { title: '10-19 contributions', min: 10 }, <br> { title: '20-29 contributions', min: 20 }, <br> { title: '30+ contributions', min: 30 } <br>]</pre>                                       |
| `firstDayOfWeek`    | `number`                                                       | 0                                                                                                                                                                                                                                                                                                          |
| `tooltipDateFormat` | `string`                                                       | 'MMM d, yyyy'                                                                                                                                                                                                                                                                                              |
| `tooltipFormatter`  | `(count: number, dayName: string, dateText: string) => string` | <pre lang="json">(count: number, dayName: string, dateText: string) => { <br />let contribText = 'No contributions';<br /><br />if (count > 0) {<br />contribText = count === 1 ? '1 contribution' : `${count} contributions`;<br /><br />}return `${contribText} on ${dayName} ${dateText}`;<br />}</pre> |

## Support this project

[![Tweet][tweet-img]][tweet-url]
[![Donate on PayPal][paypal-img]][paypal-url]
[![Become a Patron][patreon-img]][patreon-url]
[![Buy Me A Coffee][ko-fi-img]][ko-fi-url]
[![Donate on Liberapay][liberapay-img]][liberapay-url]
[![Donate on Issuehunt][issuehunt-img]][issuehunt-url]

## LICENSE

[MIT][license-url]

[npm-version-img]: https://badgen.net/npm/v/gitlab-calendar?icon=npm
[npm-version-url]: https://www.npmjs.com/package/gitlab-calendar
[license-img]: https://badgen.net/npm/license/gitlab-calendar
[license-url]: https://github.com/scriptex/gitlab-calendar/blob/master/LICENSE
[twitter-url]: https://twitter.com/scriptexbg
[twitter-img]: https://badgen.net/twitter/follow/scriptexbg?icon=twitter&color=1da1f2&cache=300
[github-tag-img]: https://badgen.net/github/tag/scriptex/gitlab-calendar?icon=github
[github-tag-url]: https://github.com/scriptex/gitlab-calendar/releases/latest
[github-checks-img]: https://badgen.net/github/checks/scriptex/gitlab-calendar?icon=github
[github-checks-url]: https://github.com/scriptex/gitlab-calendar
[github-issues-img]: https://badgen.net/github/issues/scriptex/gitlab-calendar?icon=github
[github-issues-url]: https://github.com/scriptex/gitlab-calendar/issues
[github-open-issues-img]: https://badgen.net/github/open-issues/scriptex/gitlab-calendar?icon=github
[github-open-issues-url]: https://github.com/scriptex/gitlab-calendar/issues?q=is%3Aopen+is%3Aissue
[github-closed-issues-img]: https://badgen.net/github/closed-issues/scriptex/gitlab-calendar?icon=github
[github-closed-issues-url]: https://github.com/scriptex/gitlab-calendar/issues?q=is%3Aissue+is%3Aclosed
[last-commit-img]: https://badgen.net/github/last-commit/scriptex/gitlab-calendar?icon=github
[last-commit-url]: https://github.com/scriptex/gitlab-calendar/commits/master
[analytics-img]: https://ga-beacon.appspot.com/UA-83446952-1/github.com/scriptex/gitlab-calendar/README.md
[analytics-url]: https://github.com/scriptex/gitlab-calendar/
[npm-downloads-weekly-img]: https://badgen.net/npm/dw/gitlab-calendar?icon=npm
[npm-downloads-monthly-img]: https://badgen.net/npm/dm/gitlab-calendar?icon=npm
[npm-downloads-yearly-img]: https://badgen.net/npm/dy/gitlab-calendar?icon=npm
[npm-downloads-total-img]: https://badgen.net/npm/dt/gitlab-calendar?icon=npm
[npm-url]: https://www.npmjs.com/package/gitlab-calendar
[tweet-img]: https://img.shields.io/badge/Tweet-Share_this_repository-blue.svg?style=flat-square&logo=twitter&color=38A1F3
[tweet-url]: https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20software%20project%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex%2Fgitlab-calendar&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome
[paypal-img]: https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?style=flat-square&logo=paypal&color=222d65
[paypal-url]: https://www.paypal.me/scriptex
[patreon-img]: https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?style=flat-square&logo=patreon&color=e64413
[patreon-url]: https://www.patreon.com/atanas
[ko-fi-img]: https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-yellow.svg?logo=ko-fi
[ko-fi-url]: https://ko-fi.com/scriptex
[liberapay-img]: https://img.shields.io/liberapay/receives/scriptex.svg?logo=liberapay
[liberapay-url]: https://liberapay.com/scriptex
[issuehunt-img]: https://raw.githubusercontent.com/BoostIO/issuehunt-materials/master/v1/issuehunt-shield-v1.svg
[issuehunt-url]: https://issuehunt.io/r/scriptex/gitlab-calendar
[publish-size-img]: https://badgen.net/packagephobia/publish/gitlab-calendar
[renovateapp-img]: https://badgen.net/badge/renovate/enabled/green?cache=300
[renovateapp-url]: https://renovatebot.com
[prs-welcome-img]: https://badgen.net/badge/PRs/welcome/green?cache=300
[prs-welcome-url]: https://github.com/scriptex/gitlab-calendar/pulls
[github-status-img]: https://badgen.net/github/status/scriptex/gitlab-calendar?icon=github
[github-status-url]: https://github.com/scriptex/gitlab-calendar/actions/workflows/build.yml
[github-languages-img]: https://img.shields.io/github/languages/count/scriptex/gitlab-calendar
[github-top-language-img]: https://img.shields.io/github/languages/top/scriptex/gitlab-calendar
