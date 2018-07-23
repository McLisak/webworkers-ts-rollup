class WorkerHandler {
	private worker: Worker;

	constructor() {
		this.worker = new Worker('worker.js');
		this.worker.addEventListener('message', ({ data: workerMsg }) => {
			console.log(workerMsg);
		})
		setTimeout(() => this.sendWorkerValue('value2'), 1000);
		setTimeout(() => this.sendWorkerValue('value3'), 2000);
		window.addEventListener('click', (e: MouseEvent) => {
			this.sendWorkerValue(`${e.type}:${e.clientX}x${e.clientY}`);
		})
	}

	public sendWorkerValue(value: string) {
		this.worker.postMessage(value);
	}
}
new WorkerHandler();