// $lib/loadFrags.js
const modules = import.meta.glob('$lib/fragmentRoutes/**/*.svx');

export async function load({ route }) {
	const prefix = `fragmentRoutes${route.id}/`;
	const matches = Object.entries(modules).filter(([path]) => path.includes(prefix));

	if (matches.length === 0)
		return {
			fragRoute: prefix,
			fragments: []
		};

	return {
		fragments: await Promise.all(matches.map(([, resolve]) => resolve()))
	};
}
