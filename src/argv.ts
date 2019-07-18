
const ARGV_START_INDEX = 2;

const argv = process.argv.slice(ARGV_START_INDEX, process.argv.length);

export default argv;

export function setArguments(...newArguments) {
	argv.splice(0, argv.length);
	argv.push(...newArguments);
}
