import { writeFileSync, readFileSync, readdirSync } from 'fs';
import { pageRegex } from './regex';
import { format, resolveConfig } from 'prettier';

// this tool ensures all pages properly linked to neighbors and to the Table of Contents.
// edits to ToC will be reflected in the page files.
// pages will be added to ToC if they are not excluded and not already present.
// excluded pages keep their manual links to neighbors, but are not added to ToC.

interface FileInfo {
	filePath: string;
	URL: string;
	backLink?: string;
	nextLink?: string;
	title?: string;
	chapterNum?: string;
}

function pageLinker() {
	console.log('pageLinker called');

	const ToCorder = readLinkOrderFromToC();
	const ToCexcluded = readExcludedFromToC();
	//console.log('ToCorder', ToCorder);
	console.log('ToCexcluded', ToCexcluded);

	const fileInfos = buildFileLinks(getAllFiles('src/routes'));
	const routeOrders = readPartialLinkOrdersFromRoutes(fileInfos);
	//console.log('fileInfos', fileInfos);

	ensureFileFields(fileInfos);

	const cleanToCorder = ToCorder.filter((item) =>
		fileInfos.some((f) => f.URL === item.url)
	);
	//console.log('cleanToCorder', cleanToCorder);

	const ensuredOrders = routeOrders.flatMap((chain) =>
		breakOrderIfViolateToC(chain, cleanToCorder)
	);
	//console.log('ensuredOrders', ensuredOrders);

	const masterOrder = mergeOrdersByToC(ensuredOrders, cleanToCorder, ToCexcluded);
	console.log('masterOrder', masterOrder);

	forceToCchapterNames(ToCorder, fileInfos);
	chapterNumify(ToCorder, fileInfos, masterOrder);
	linkPages(masterOrder, fileInfos);

	rebuildToC(masterOrder, fileInfos, ToCexcluded);

	/*writeFileSync('src/routes/frontmatter/contents/+page.svelte', ToCfile, {
		flag: 'w'
	});*/
}

function ensureFileFields(fileInfos: FileInfo[]) {
	for (const fileInfo of fileInfos) {
		const isSvx = fileInfo.filePath.endsWith('.svx');
		if (!fileInfo.title) {
			fileInfo.title = ' ';
			replaceInFile(
				fileInfo.filePath,
				pageRegex.SvxAddPropertyAnchor,
				pageRegex.SvelteAddPropertyAnchor,
				isSvx
					? pageRegex.MakeTitleSvx(fileInfo.title)
					: pageRegex.MakeTitleSvelte(fileInfo.title)
			);
		}
		if (!fileInfo.chapterNum) {
			fileInfo.chapterNum = ' ';
			replaceInFile(
				fileInfo.filePath,
				pageRegex.SvxAddPropertyAnchor,
				pageRegex.SvelteAddPropertyAnchor,
				isSvx
					? pageRegex.MakeChapterNumSvx(fileInfo.chapterNum)
					: pageRegex.MakeChapterNumSvelte(fileInfo.chapterNum)
			);
		}
		if (!fileInfo.backLink) {
			fileInfo.backLink = ' ';
			replaceInFile(
				fileInfo.filePath,
				pageRegex.SvxAddPropertyAnchor,
				pageRegex.SvelteAddPropertyAnchor,
				isSvx
					? pageRegex.MakeBackLinkSvx(fileInfo.backLink)
					: pageRegex.MakeBackLinkSvelte(fileInfo.backLink)
			);
		}
		if (!fileInfo.nextLink) {
			fileInfo.nextLink = ' ';
			replaceInFile(
				fileInfo.filePath,
				pageRegex.SvxAddPropertyAnchor,
				pageRegex.SvelteAddPropertyAnchor,
				isSvx
					? pageRegex.MakeNextLinkSvx(fileInfo.nextLink)
					: pageRegex.MakeNextLinkSvelte(fileInfo.nextLink)
			);
		}
	}
}

function linkPages(masterOrder: string[], fileInfos: FileInfo[]) {
	for (let i = 0; i < masterOrder.length; i++) {
		const url = masterOrder[i];
		const fileInfo = fileInfos.find((f) => f.URL === url);
		if (!fileInfo) continue;

		if (i > 0 && fileInfo.backLink !== masterOrder[i - 1]) {
			replaceInFile(
				fileInfo.filePath,
				pageRegex.BackLinkSvx,
				pageRegex.BackLinkSvelte,
				masterOrder[i - 1]
			);
			fileInfo.backLink = masterOrder[i - 1];
		}
		if (i < masterOrder.length - 1 && fileInfo.nextLink !== masterOrder[i + 1]) {
			replaceInFile(
				fileInfo.filePath,
				pageRegex.NextLinkSvx,
				pageRegex.NextLinkSvelte,
				masterOrder[i + 1]
			);
			fileInfo.nextLink = masterOrder[i + 1];
		}
	}
}

function rebuildToC(masterOrder: string[], fileInfos: FileInfo[], excluded: string[]) {
	async function formatFile(filePath: string) {
		//courtesy of claude ai
		const config = await resolveConfig(filePath); // picks up your .prettierrc automatically
		const content = readFileSync(filePath, 'utf-8');
		const formatted = await format(content, { ...config, filepath: filePath });
		writeFileSync(filePath, formatted, { flag: 'w' });
	}

	const ToC: { url: string; title: string; chapterNum: string }[] = [];
	for (const url of masterOrder) {
		if (excluded.includes(url)) continue;

		const fileInfo = fileInfos.find((f) => f.URL === url);
		if (!fileInfo) continue;

		ToC.push({
			url,
			title: fileInfo.title || url.toUpperCase() + ' TEMP',
			chapterNum: fileInfo.chapterNum ?? 'XXXXX'
		});
	}

	//build replacement string
	const ToChtml = ToC.map(
		(item) =>
			`<li><a href="${item.url}">${item.title}</a><span class="chapterNum">${item.chapterNum}</span></li>`
	).join('\n');
	replaceInFile(
		'src/routes/frontmatter/contents/+page.svelte',
		pageRegex.FullToC,
		pageRegex.FullToC,
		ToChtml
	);
	formatFile('src/routes/frontmatter/contents/+page.svelte');
}

function chapterNumify(
	ToCorder: { url: string; chapterNum: string }[],
	fileInfos: FileInfo[],
	masterOrder: string[]
) {
	function numToRoman(num: number): string {
		//courtesy of claude ai
		const table: [number, string][] = [
			[1000, 'm'],
			[900, 'cm'],
			[500, 'd'],
			[400, 'cd'],
			[100, 'c'],
			[90, 'xc'],
			[50, 'l'],
			[40, 'xl'],
			[10, 'x'],
			[9, 'ix'],
			[5, 'v'],
			[4, 'iv'],
			[1, 'i']
		];
		let out = '';
		for (const [v, s] of table)
			while (num >= v) {
				out += s;
				num -= v;
			}
		return out;
	}
	let chapterNum = 0;
	let chapterNumRoman: string;
	for (const url of masterOrder) {
		if (ToCorder.some((item) => item.url === url)) {
			chapterNum++;
		}
		chapterNumRoman = numToRoman(chapterNum);

		const fileInfo = fileInfos.find((f) => f.URL === url);
		if (fileInfo) {
			if (fileInfo.chapterNum !== undefined && fileInfo.chapterNum !== chapterNumRoman) {
				replaceInFile(
					fileInfo.filePath,
					pageRegex.ChapterNumSvx,
					pageRegex.ChapterNumSvelte,
					chapterNumRoman
				);

				fileInfo.chapterNum = chapterNumRoman;
			}
		}
	}
}

function forceToCchapterNames(
	ToCorder: { url: string; title: string }[],
	fileInfos: FileInfo[]
) {
	for (const ToCitem of ToCorder) {
		const fileInfo = fileInfos.find((f) => f.URL === ToCitem.url);
		if (!fileInfo) {
			console.log(`File info not found for URL: ${ToCitem.url}`);
			continue;
		}
		if (fileInfo.title === ToCitem.title) {
			console.log(
				`Chapter title already matches for URL: ${ToCitem.url}, Title: ${ToCitem.title} / ${fileInfo.title}`
			);
			continue;
		}
		fileInfo.title = ToCitem.title;

		replaceInFile(
			fileInfo.filePath,
			pageRegex.TitleSvx,
			pageRegex.TitleSvelte,
			ToCitem.title
		);
	}
}

function replaceInFile(
	filePath: string,
	svxRegex: RegExp,
	svelteRegex: RegExp,
	replacement: string
) {
	const isSvx = filePath.endsWith('.svx');

	let fileContent = readFileSync(filePath, 'utf-8');
	fileContent = fileContent.replace(isSvx ? svxRegex : svelteRegex, replacement);
	writeFileSync(filePath, fileContent, { flag: 'w' });
}

function mergeOrdersByToC(
	orders: string[][],
	ToCorder: { url: string }[],
	excluded: string[]
) {
	const res: string[] = [];
	for (const ToCitem of ToCorder) {
		const order_i = orders.findIndex((order) => order.includes(ToCitem.url));
		if (order_i === -1) continue;

		res.push(...orders[order_i]);
		orders.splice(order_i, 1);
	}
	for (const order of orders) {
		for (const url of order) {
			if (!excluded.includes(url)) {
				res.push(...order);
				break;
			}
		}
	}
	return res;
}

function breakOrderIfViolateToC(OGchain: string[], ToCorder: { url: string }[]) {
	let ToC_i = -1;
	let res_i = 0;
	let chain_i = -1; // incremented at loop start
	const res = [OGchain];
	while (true) {
		chain_i++;
		if (chain_i >= res[res_i].length) {
			chain_i = 0;
			res_i++;
			ToC_i = -1;
		}

		if (res_i >= res.length) break;

		const cur = res[res_i][chain_i];
		const test_ToC_i = ToCorder.findIndex((item) => item.url === cur);
		if (test_ToC_i === -1) continue;
		if (ToC_i === -1) {
			ToC_i = test_ToC_i;
			continue;
		}
		if (ToC_i + 1 === test_ToC_i) {
			ToC_i = test_ToC_i;
			continue;
		}

		res.push(res[res_i].splice(chain_i));
		//console.log(res);
	}

	return res;
}

function readLinkOrderFromToC() {
	let ToCfile = readFileSync('src/routes/frontmatter/contents/+page.svelte', 'utf-8');
	//ToCfile = ToCfile.replace(re, `${re.source} //test output`);

	ToCfile = ToCfile.replace(/\t/g, '').replace(/\n/g, '');
	//console.log(ToCfile);

	return [...ToCfile.matchAll(pageRegex.ToCentry)].map((m) => {
		return { url: m[1], title: m[2], chapterNum: m[3] };
	});
}

// expects ToC file to have a comment like <!-- excluded: 'url1', 'url2' -->
function readExcludedFromToC() {
	const ToCfile = readFileSync('src/routes/frontmatter/contents/+page.svelte', 'utf-8');
	const region = [...ToCfile.matchAll(pageRegex.ToCexcludedBase)][0];
	//console.log('ToC excluded region', region);
	if (!region) return [];
	const matches = [...region[1].matchAll(pageRegex.ToCexcludedEntry)].map((m) => m[1]);
	//console.log('ToC excluded matches', matches);

	const excluded: string[] = [];
	for (let i = 0; i < matches.length; i++) {
		if (matches[i]) {
			excluded.push(matches[i]);
		}
	}
	return excluded;
}

// courtesy of claude ai
function readPartialLinkOrdersFromRoutes(fileLinks: FileInfo[]) {
	const urls = new Set(fileLinks.map((f) => f.URL));
	const nextOf = new Map(fileLinks.map((f) => [f.URL, f.nextLink]));
	const heads = fileLinks.filter((f) => !f.backLink || !urls.has(f.backLink));

	const visited = new Set();
	const chains = [];

	for (const head of heads) {
		if (visited.has(head.URL)) continue;
		const chain = [head.URL];
		visited.add(head.URL);
		let cur = head.URL;
		while (
			nextOf.get(cur) &&
			urls.has(nextOf.get(cur)!) &&
			!visited.has(nextOf.get(cur))
		) {
			cur = nextOf.get(cur)!;
			chain.push(cur);
			visited.add(cur);
		}
		chains.push(chain);
	}

	// Orphans/cycles left over become singleton chains.
	for (const f of fileLinks) {
		if (!visited.has(f.URL)) chains.push([f.URL]);
	}

	return chains;
}

function getAllFiles(routesDir: string) {
	const dirContents = readdirSync(routesDir, { withFileTypes: true });
	const result: string[] = [];
	dirContents
		.filter((dirent) => dirent.isDirectory())
		.forEach((dirent) => result.push(...getAllFiles(`${routesDir}/${dirent.name}`)));

	result.push(
		...dirContents
			.filter(
				(dirent) => dirent.isFile() && ['+page.svelte', '+page.svx'].includes(dirent.name)
			)
			.map((dirent) => `${routesDir}/${dirent.name}`)
	);
	return result;
}

function buildFileLinks(filePaths: string[]) {
	const fileInfo: FileInfo[] = [];
	for (const filePath of filePaths) {
		const rawFile = readFileSync(filePath, 'utf-8');
		const isSvx = filePath.endsWith('.svx');
		const backLink = isSvx
			? rawFile.match(pageRegex.BackLinkSvx)?.[0]
			: rawFile.match(pageRegex.BackLinkSvelte)?.[0];
		let nextLink = isSvx
			? rawFile.match(pageRegex.NextLinkSvx)?.[0]
			: rawFile.match(pageRegex.NextLinkSvelte)?.[0];
		if (nextLink === '') {
			nextLink = ' '; //break falsy evaluation
		}
		const title = isSvx
			? rawFile.match(pageRegex.TitleSvx)?.[0]
			: rawFile.match(pageRegex.TitleSvelte)?.[0];
		const chapterNum = isSvx
			? rawFile.match(pageRegex.ChapterNumSvx)?.[0]
			: rawFile.match(pageRegex.ChapterNumSvelte)?.[0];
		let URL = filePath.replace('src/routes', '').replace(/\/\+page\.(svelte|svx)$/, '');
		if (URL.length === 0) URL = '/';

		fileInfo.push({ filePath, backLink, nextLink, title, chapterNum, URL });
	}
	return fileInfo;
}

const vitePageLinker = {
	name: 'page-linker',
	buildStart() {
		console.log('vitePageLinker buildStart called');
		pageLinker();
	}
};

export default vitePageLinker;
