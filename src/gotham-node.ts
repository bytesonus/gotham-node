import { Protocol } from "./protocol";
import { GothamConnection, SocketConnection } from './GothamConnection';
import { Dependency, FnArgs } from "./types/protocol";

export default class GothamModule {
	private protocol: Protocol;
	constructor(connection: GothamConnection) {
		this.protocol = new Protocol(connection);
	}

	async initialize(moduleId: string, version: string, deps: Dependency) {
		// Setup Connection only when initialize called?
		await this.protocol.connect();
		return await this.protocol.sendRequest(
			this.protocol.initialize(moduleId, version, deps),
		);
	}

	async declareFunction(fnName: string, fn: Function) {
		return await this.protocol.sendRequest(
			this.protocol.declareFunction(fnName, fn)
		);
	}

	async functionCall(fnNmame: string, args: FnArgs = {}) {
		return await this.protocol.sendRequest(
			this.protocol.callFunction(fnNmame, args)
		);
	}

	async registerHook(hook: string, cb: Function) {
		return await this.protocol.sendRequest(
			this.protocol.registerHook(hook, cb)
		);
	}

	async triggerHook(hook: string) {
		return await this.protocol.sendRequest(
			this.protocol.triggerHook(hook)
		);
	}

	async close() {
		return await this.protocol.close();
	}
}
