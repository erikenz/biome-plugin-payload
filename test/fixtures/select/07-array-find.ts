export function arrayFind() {
	const payload = ["1", "2", "3"];
	const found = payload.find((id) => id === "2");
	return { found };
}
