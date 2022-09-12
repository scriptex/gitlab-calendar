[![Github Build](https://github.com/scriptex/gitlab-calendar/workflows/Build/badge.svg)](https://github.com/scriptex/gitlab-calendar/actions?query=workflow%3ABuild)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/34d3d75710534dc6a38c3584a1dcd068)](https://www.codacy.com/gh/scriptex/gitlab-calendar/dashboard?utm_source=github.com&utm_medium=referral&utm_content=scriptex/gitlab-calendar&utm_campaign=Badge_Grade)
[![Codebeat Badge](https://codebeat.co/badges/d765a4c8-2c0e-44f2-89c3-fa364fdc14e6)](https://codebeat.co/projects/github-com-scriptex-gitlab-calendar-master)
[![CodeFactor Badge](https://www.codefactor.io/repository/github/scriptex/gitlab-calendar/badge)](https://www.codefactor.io/repository/github/scriptex/gitlab-calendar)
[![DeepScan grade](https://deepscan.io/api/teams/3574/projects/5257/branches/40799/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3574&pid=5257&bid=40799)
[![Analytics](https://ga-beacon-361907.ew.r.appspot.com/UA-83446952-1/github.com/scriptex/gitlab-calendar/README.md?pixel)](https://github.com/scriptex/gitlab-calendar/)

# Gitlab Calendar

> Embed your Gitlab Contributions Calendar anywhere

This package allows you to embed your Gitlab Contributions Calendar in any website.

The package does not handle network requests, this is left to the developer to decide and implement. Gitlab Calendar requires the data as it is provided by the `calendar` endpoint of the Gitlab API (https://gitlab.com/users/$USER/calendar.json).

**This project was inspired by [Github Calendar](https://github.com/Bloggify/github-calendar).**

## Visitor stats

![GitHub stars](https://img.shields.io/github/stars/scriptex/gitlab-calendar?style=social)
![GitHub forks](https://img.shields.io/github/forks/scriptex/gitlab-calendar?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/scriptex/gitlab-calendar?style=social)
![GitHub followers](https://img.shields.io/github/followers/scriptex?style=social)

## Code stats

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/scriptex/gitlab-calendar)
![GitHub repo size](https://img.shields.io/github/repo-size/scriptex/gitlab-calendar?style=plastic)
![GitHub language count](https://img.shields.io/github/languages/count/scriptex/gitlab-calendar?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/scriptex/gitlab-calendar?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/gitlab-calendar?style=plastic)

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

new GitlabCalendar(document.getElementById('gitlab-calendar'), data, options);
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

## LICENSE

MIT

---

<div align="center">
    Connect with me:
</div>

<br />

<div align="center">
    <a href="https://atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/logo.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="mailto:hi@atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/email.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.linkedin.com/in/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linkedin.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://github.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/github.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://gitlab.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/gitlab.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://twitter.com/scriptexbg">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/twitter.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/~scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/npm.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.youtube.com/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/youtube.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://stackoverflow.com/users/4140082/atanas-atanasov">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/stackoverflow.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://codepen.io/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codepen.svg" width="20" alt="">
    </a>
    &nbsp;
    <a href="https://profile.codersrank.io/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codersrank.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://linktr.ee/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linktree.svg" height="20" alt="">
    </a>
</div>

---

<div align="center">
Support and sponsor my work:
<br />
<br />
<a href="https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20developer%20profile%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome" title="Tweet">
	<img src="https://img.shields.io/badge/Tweet-Share_my_profile-blue.svg?logo=twitter&color=38A1F3" />
</a>
<a href="https://paypal.me/scriptex" title="Donate on Paypal">
	<img src="https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?logo=paypal&color=222d65" />
</a>
<a href="https://revolut.me/scriptex" title="Donate on Revolut">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/revolut.json" />
</a>
<a href="https://patreon.com/atanas" title="Become a Patron">
	<img src="https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?logo=patreon&color=e64413" />
</a>
<a href="https://ko-fi.com/scriptex" title="Buy Me A Coffee">
	<img src="https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-yellow.svg?logo=ko-fi" />
</a>
<a href="https://liberapay.com/scriptex/donate" title="Donate on Liberapay">
	<img src="https://img.shields.io/liberapay/receives/scriptex?label=Donate%20on%20Liberapay&logo=liberapay" />
</a>

<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" title="Donate Bitcoin">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" title="Donate Etherium">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" title="Donate Shiba Inu">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" />
</a>
</div>
