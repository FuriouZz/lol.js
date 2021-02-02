import { guid } from "../string/guid";
export class RAF {
    static get time() {
        return RAF._time;
    }
    static get deltaTime() {
        return RAF._deltaTime;
    }
    static getFramerate() {
        return (1 / RAF._framerate) * 1000;
    }
    static setFramerate(value) {
        RAF._framerate = (1 / value) * 1000;
    }
    static _update() {
        if (!RAF._running)
            return;
        RAF._time = performance.now();
        RAF._deltaTime = RAF._time - RAF._lt;
        RAF._elapsedInterval += RAF._deltaTime;
        if (RAF._elapsedInterval >= RAF._framerate) {
            RAF._elapsedInterval = 0;
            RAF._processUpdate();
        }
        RAF._lt = RAF._time;
        RAF._raf = window.requestAnimationFrame(RAF._update);
    }
    static _processUpdate() {
        for (const [_id, update] of RAF._listeners) {
            update(RAF._deltaTime, RAF._time);
        }
    }
    static add(listener, id) {
        if (!id)
            id = guid();
        this._listeners.push([id, listener]);
        return id;
    }
    static delete(listenerOrId) {
        const index = this._listeners.findIndex(([id, listener]) => {
            return listenerOrId === id || listenerOrId === listener;
        });
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    }
    static start() {
        if (RAF._running)
            return;
        RAF._running = true;
        RAF._raf = window.requestAnimationFrame(RAF._update);
    }
    static stop() {
        if (!RAF._running)
            return;
        RAF._running = false;
        window.cancelAnimationFrame(RAF._raf);
    }
}
RAF._listeners = [];
RAF._framerate = 16;
RAF._deltaTime = 0;
RAF._time = performance.now();
RAF._lt = performance.now();
RAF._elapsedInterval = 0;
RAF._raf = -1;
RAF._running = false;
