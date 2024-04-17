export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
    const day  = date.getUTCDate()
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
	return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}