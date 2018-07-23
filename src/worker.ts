import WorkerDependency from './workerDependency';

const dependency = new WorkerDependency('value1');
console.log('INITIAL VALUE:', dependency.value);

addEventListener('message', ({ data: message }) => {
	console.log('GOTTA CHANGE VALUE TO: ', message);
	dependency.value = message;
	postMessage(`CHANGED VALUE TO: ${dependency.value}`);
})