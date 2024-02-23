import EventEmitter from 'events'; // node js support event

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // ulimit listener

export const emitter = _emitter;