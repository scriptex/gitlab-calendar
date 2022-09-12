import format from 'date-fns/format';
import { select, Selection } from 'd3-selection';

export type ActivityCalendarSVG = Selection<SVGSVGElement, unknown, null, undefined>;

export type ActivityCalendarMonth = {
	x: number;
	month: number;
};

export type ActivityCalendarGroup = {
	day: number;
	date: Date;
	count: number;
};

export type ActivityCalendarDay = {
	y: number;
	text: string;
};

export type ActivityCalendarWeekday = 'monday' | 'wednesday' | 'friday' | 'saturday' | 'sunday';

export type ActivityCalendarLegendValue = {
	min: number;
	title: string;
};

export type GitlabCalendarOptions = {
	daySize: number;
	hintText: string;
	daySpace: number;
	utcOffset: number;
	dayTitles: Record<ActivityCalendarWeekday, string>;
	monthsAgo: number;
	monthNames: string[];
	inputFormat: string;
	weekdayNames: string[];
	legendValues: ActivityCalendarLegendValue[];
	firstDayOfWeek: number;
	tooltipDateFormat: string;
	tooltipFormatter: (count: number, dayName: string, dateText: string) => string;
};

export class GitlabCalendar {
	private _daySizeWithSpace = 0;
	private _millisecondsPerDay = 1000 * 60 * 60 * 24;

	private _defaultOptions: GitlabCalendarOptions = {
		daySize: 15,
		hintText: 'Issues, merge requests, pushes, and comments.',
		daySpace: 1,
		utcOffset: 0,
		dayTitles: {
			monday: 'M',
			wednesday: 'W',
			friday: 'F',
			saturday: 'S',
			sunday: 'S'
		},
		monthsAgo: 12,
		monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		inputFormat: 'yyyy-MM-dd',
		weekdayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		legendValues: [
			{ title: 'No contributions', min: 0 },
			{ title: '1-9 contributions', min: 1 },
			{ title: '10-19 contributions', min: 10 },
			{ title: '20-29 contributions', min: 20 },
			{ title: '30+ contributions', min: 30 }
		],
		firstDayOfWeek: 0,
		tooltipDateFormat: 'MMM d, yyyy',
		tooltipFormatter: (count: number, dayName: string, dateText: string) => {
			let contribText = 'No contributions';

			if (count > 0) {
				contribText = count === 1 ? '1 contribution' : `${count} contributions`;
			}

			return `${contribText} on ${dayName} ${dateText}`;
		}
	};

	private svg: ActivityCalendarSVG;

	private months: ActivityCalendarMonth[] = [];
	private timestamps: Array<ActivityCalendarGroup[]> = [];

	public options: GitlabCalendarOptions = this._defaultOptions;

	constructor(container: HTMLElement, data: Record<string, number>, options: Partial<GitlabCalendarOptions>) {
		this.options = {
			...this._defaultOptions,
			...options
		};

		const group = this.buildArrays(data);

		this._daySizeWithSpace = this.options.daySize + this.options.daySpace * 2;

		this.svg = this.renderSvg(container, group);

		this.renderDays();
		this.renderMonths();
		this.renderDayTitles();
		this.renderKey();
		this.renderHint();
		this.addTitles();
	}

	private buildArrays(data: Record<string, number>): number {
		let group = 0;

		const today = this.getSystemDate(this.options.utcOffset);

		today.setHours(0, 0, 0, 0);

		const timeAgo = new Date(today);

		timeAgo.setMonth(today.getMonth() - this.options.monthsAgo);

		const days = this.getDayDifference(timeAgo, today);

		for (let i = 0; i <= days; i += 1) {
			const date = new Date(timeAgo);

			date.setDate(date.getDate() + i);

			const day = date.getDay();

			const count = data[format(date, this.options.inputFormat)] || 0;

			if ((day === this.options.firstDayOfWeek && i !== 0) || i === 0) {
				this.timestamps.push([]);
				group += 1;
			}

			const innerArray = this.timestamps[group - 1];

			innerArray.push({ count, date, day });
		}

		return group;
	}

	private getDayName = (date: Date): string => this.options.weekdayNames[date.getDay()];

	private getDayDifference = (a: Date, b: Date): number => {
		const date1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
		const date2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

		return Math.floor((date2 - date1) / this._millisecondsPerDay);
	};

	private getSystemDate = (systemUtcOffsetSeconds: number): Date => {
		const d = new Date();
		const localUtcOffsetMinutes = 0 - d.getTimezoneOffset();
		const systemUtcOffsetMinutes = systemUtcOffsetSeconds / 60;

		d.setMinutes(d.getMinutes() - localUtcOffsetMinutes + systemUtcOffsetMinutes);

		return d;
	};

	private formatTooltipText = ({ date, count }: { date: Date; count: number }): string => {
		const d = new Date(date);
		const dayName = this.getDayName(d);
		const dateText = format(d, this.options.tooltipDateFormat);

		return this.options.tooltipFormatter(count, dayName, dateText);
	};

	private getLevelFromContributions = (count: number) => {
		if (count <= 0) {
			return 0;
		}

		const nextLevel = this.options.legendValues.findIndex(({ min }) => count < min);

		return nextLevel >= 0 ? nextLevel - 1 : this.options.legendValues.length - 1;
	};

	private getExtraWidthPadding(group: number): number {
		let extraWidthPadding = 0;

		const lastColMonth = this.timestamps[group - 1][0].date.getMonth();
		const secondLastColMonth = this.timestamps[group - 2][0].date.getMonth();

		if (lastColMonth !== secondLastColMonth) {
			extraWidthPadding = 6;
		}

		return extraWidthPadding;
	}

	private renderSvg(container: HTMLElement, group: number): ActivityCalendarSVG {
		const width = (group + 1) * this._daySizeWithSpace + this.getExtraWidthPadding(group);

		return select(container).append('svg').attr('width', width).attr('height', 167);
	}

	private dayYPos(day: number): number {
		return this._daySizeWithSpace * ((day + 7 - this.options.firstDayOfWeek) % 7);
	}

	private renderDays(): void {
		this.svg
			.selectAll('g')
			.data(this.timestamps)
			.enter()
			.append('g')
			.attr('transform', (group: ActivityCalendarGroup[], i: number) => {
				group.forEach((stamp: ActivityCalendarGroup, a: number) => {
					if (a === 0 && stamp.day === this.options.firstDayOfWeek) {
						const month = stamp.date.getMonth();
						const x = this._daySizeWithSpace * i + 1 + this._daySizeWithSpace;
						const lastMonth = this.months[this.months.length - 1];

						if (
							lastMonth == null ||
							(month !== lastMonth.month && x - this._daySizeWithSpace !== lastMonth.x)
						) {
							this.months.push({ month, x });
						}
					}
				});

				return `translate(${this._daySizeWithSpace * i + 1 + this._daySizeWithSpace}, 18)`;
			})
			.selectAll('rect')
			.data((stamp: ActivityCalendarGroup[]) => stamp)
			.enter()
			.append('rect')
			.attr('x', '0')
			.attr('y', (stamp: ActivityCalendarGroup) => this.dayYPos(stamp.day))
			.attr('width', this.options.daySize)
			.attr('height', this.options.daySize)
			.attr('data-level', (stamp: ActivityCalendarGroup) => this.getLevelFromContributions(stamp.count))
			.attr('title', (stamp: ActivityCalendarGroup) => this.formatTooltipText(stamp));
	}

	private renderDayTitles(): void {
		const firstDayOfWeekChoices: Record<'sunday' | 'monday' | 'saturday', number> = {
			sunday: 0,
			monday: 1,
			saturday: 6
		};

		const days: ActivityCalendarDay[] = [
			{
				text: this.options.dayTitles.monday,
				y: 29 + this.dayYPos(1)
			},
			{
				text: this.options.dayTitles.wednesday,
				y: 29 + this.dayYPos(3)
			},
			{
				text: this.options.dayTitles.friday,
				y: 29 + this.dayYPos(5)
			}
		];

		if (this.options.firstDayOfWeek === firstDayOfWeekChoices.monday) {
			days.push({
				text: this.options.dayTitles.sunday,
				y: 29 + this.dayYPos(7)
			});
		} else if (this.options.firstDayOfWeek === firstDayOfWeekChoices.saturday) {
			days.push({
				text: this.options.dayTitles.saturday,
				y: 29 + this.dayYPos(6)
			});
		}

		this.svg
			.append('g')
			.selectAll('text')
			.data(days)
			.enter()
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('x', 8)
			.attr('y', (day: ActivityCalendarDay) => day.y)
			.text((day: ActivityCalendarDay) => day.text);
	}

	private renderMonths(): void {
		this.svg
			.append('g')
			.selectAll('text')
			.data(this.months)
			.enter()
			.append('text')
			.attr('x', (date: ActivityCalendarMonth) => date.x)
			.attr('y', 10)
			.text((date: ActivityCalendarMonth) => this.options.monthNames[date.month]);
	}

	private renderKey(): void {
		this.svg
			.append('g')
			.attr('transform', `translate(18, ${this._daySizeWithSpace * 8 + 16})`)
			.selectAll('rect')
			.data(this.options.legendValues)
			.enter()
			.append('rect')
			.attr('width', this.options.daySize)
			.attr('height', this.options.daySize)
			.attr('x', (_, i) => this._daySizeWithSpace * i)
			.attr('y', 0)
			.attr('data-level', (_, i) => i)
			.attr('title', x => x.title);
	}

	private renderHint(): void {
		this.svg
			.append('g')
			.attr(
				'transform',
				`translate(${this.svg.property('width').baseVal.value}, ${this._daySizeWithSpace * 8 + 25})`
			)
			.append('text')
			.attr('text-anchor', 'end')
			.text(this.options.hintText);
	}

	private addTitles(): void {
		this.svg.selectAll('rect').each(function () {
			const rect: SVGRectElement | null = this as SVGRectElement | null;

			if (!rect) {
				return;
			}

			const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			const titleString = rect.getAttribute('title') || '';
			const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');

			rect?.parentNode?.insertBefore(group, rect);

			titleElement.innerHTML = titleString;

			group.appendChild(titleElement);
			group.appendChild(rect);
		});
	}
}

export default GitlabCalendar;
