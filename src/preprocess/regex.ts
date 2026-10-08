export const pageRegex = {
	BackLinkSvelte: /(?<=prevURL=")[^"]*(?=")/,
	MakeBackLinkSvelte: (v: string) => `$1\n\tprevURL="${v}"$2`,
	NextLinkSvelte: /(?<=nextURL=")[^"]*(?=")/,
	MakeNextLinkSvelte: (v: string) => `$1\n\tnextURL="${v}"$2`,
	TitleSvelte: /(?<=chapterTitle=")[^"]*(?=")/,
	MakeTitleSvelte: (v: string) => `$1\n\tchapterTitle="${v}"$2`,
	ChapterNumSvelte: /(?<=chapterNum=")[^"]*(?=")/,
	MakeChapterNumSvelte: (v: string) => `$1\n\tchapterNum="${v}"$2`,
	SvelteAddPropertyAnchor: /(PerPage(?:\n\t\w+=.+)+)(\n\/>)/,

	BackLinkSvx: /(?<=prevURL: ).*/,
	MakeBackLinkSvx: (v: string) => `$1\nprevURL: ${v}$2`,
	NextLinkSvx: /(?<=nextURL: ).*/,
	MakeNextLinkSvx: (v: string) => `$1\nnextURL: ${v}$2`,
	TitleSvx: /(?<=chapterTitle: ).*/,
	MakeTitleSvx: (v: string) => `$1\nchapterTitle: ${v}$2`,
	ChapterNumSvx: /(?<=chapterNum: ).*/,
	MakeChapterNumSvx: (v: string) => `$1\nchapterNum: ${v}$2`,
	SvxAddPropertyAnchor: /(^---(?:\n\w+: .+)+)(\n---)/,

	ToCexcludedBase: /<!-- excluded: (.*?)-->/g,
	ToCexcludedEntry: /'(\/[^']*)',?/g,
	ToCentry: /<a href="(\S+?)">(.*?)<\/a><span class="chapterNum">(\w*?)<\/span>/g,
	FullToC: /(?<=<ol>)[\s\S]*?(?=<\/ol>)/
};
