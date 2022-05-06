import { debounce as _debounce, once as _once } from 'lodash-es';

export interface Deferrable<T extends (...args: any[]) => any> {
	(...args: Parameters<T>): ReturnType<T> | undefined;
	cancel(): void;
	flush(): ReturnType<T> | undefined;
	pending?(): boolean;
}

export interface DebounceOptions {
	leading?: boolean;
	maxWait?: number;
	track?: boolean;
	trailing?: boolean;
}

export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	wait?: number,
	options?: DebounceOptions,
): Deferrable<T> {
	const { track, ...opts }: DebounceOptions = {
		track: false,
		...(options ?? {}),
	};

	if (track !== true) return _debounce(fn, wait, opts);

	let pending = false;

	const debounced = _debounce(
		function (this: any, ...args: any[]) {
			pending = false;
			return fn.apply(this, args);
		} as any as T,
		wait,
		options,
	);

	const tracked: Deferrable<T> = function (this: any, ...args: Parameters<T>) {
		pending = true;
		return debounced.apply(this, args);
	} as any;

	tracked.pending = function () {
		return pending;
	};
	tracked.cancel = function () {
		return debounced.cancel.apply(debounced);
	};
	tracked.flush = function () {
		return debounced.flush.apply(debounced);
	};

	return tracked;
}

export function once<T extends (...args: any[]) => any>(fn: T): T {
	return _once(fn);
}