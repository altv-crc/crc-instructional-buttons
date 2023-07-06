/**
 * We have to mark everything as optional for intellisense some strange reason. :Sadge:
 *
 * @interface Options
 */
interface Options {
    /**
     * Set the buttons to show.
     *
     * `text` and `input` are required.
     *
     * @type {Array<Partial<{ text: string; input: string }>>}
     * @memberof Options
     */
    set?: Array<Partial<{ text: string; input: string }>>;

    /**
     * Clear the buttons that are shown
     *
     * @type {boolean}
     * @memberof Options
     */
    clear?: boolean;
}

declare module 'alt-client' {
    export function emit(eventName: 'crc-instructional-buttons', data: Partial<Options>);
}
