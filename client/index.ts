import * as alt from 'alt-client';
import * as native from 'natives';

let interval: number;
let buttons: { text: string; input: string }[] = [];
let scaleform: number;

native.displayOnscreenKeyboard(0, 'FMMC_KEY_TIP8', '', '', '', '', '', 128);

function draw() {
    if (buttons.length <= 0) {
        return;
    }

    if (!scaleform) {
        return;
    }

    // Offset alt:V Logo
    native.drawScaleformMovie(scaleform, 0.4, 0.48, 1, 1, 255, 255, 255, 255, 0);
}

async function setFunc(_buttons: { text: string; input: string }[]) {
    buttons = _buttons;

    if (buttons.length <= 0) {
        return;
    }

    if (scaleform) {
        native.setScaleformMovieAsNoLongerNeeded(scaleform);
        scaleform = undefined;
    }

    scaleform = native.requestScaleformMovie('INSTRUCTIONAL_BUTTONS');

    await alt.Utils.waitFor(() => native.hasScaleformMovieLoaded(scaleform));

    native.beginScaleformMovieMethod(scaleform, 'CLEAR_ALL');
    native.endScaleformMovieMethod();

    for (let i = 0; i < buttons.length; i++) {
        native.beginScaleformMovieMethod(scaleform, 'SET_DATA_SLOT');
        native.scaleformMovieMethodAddParamInt(i);
        native.scaleformMovieMethodAddParamTextureNameString(buttons[i].input);
        native.scaleformMovieMethodAddParamTextureNameString(buttons[i].text);
        native.endScaleformMovieMethod();
    }

    native.beginScaleformMovieMethod(scaleform, 'DRAW_INSTRUCTIONAL_BUTTONS');
    native.endScaleformMovieMethod();

    if (interval) {
        return;
    }

    interval = alt.setInterval(draw, 0);
}

function clearFunc() {
    if (interval) {
        alt.clearInterval(interval);
        interval = undefined;
    }

    native.setScaleformMovieAsNoLongerNeeded(scaleform);
    scaleform = undefined;
    buttons = [];
}

function handleActions(options: { set?: Array<{ text: string; input: string }>; clear?: boolean }) {
    if (typeof options !== 'object') {
        return;
    }

    const { set, clear } = options;

    if (set) {
        setFunc(set);
    }

    if (clear) {
        clearFunc();
    }
}

// Used to define the cross-resoure event suggestions extension
// If it's too complex though, don't bother

// options: { set?: Array<{ text: string; input: string }> }
alt.emit('crc-instructional-buttons');
alt.on('crc-instructional-buttons', handleActions);
