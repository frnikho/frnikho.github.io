import { describe, expect, it } from "vitest";
import { areaHome, siteArea } from "./nav";

describe("siteArea", () => {
	it("classe tout ce qui commence par /blog dans le Blog", () => {
		for (const path of [
			"/blog",
			"/blog/un-article",
			"/blog/categorie/ia",
			"/blog/page/2",
		]) {
			expect(siteArea(path), path).toBe("blog");
		}
	});

	it("classe le reste dans le Portfolio, accueil compris", () => {
		for (const path of [
			"/",
			"/services",
			"/services/kubernetes",
			"/souverainete",
			"/blogueur",
		]) {
			expect(siteArea(path), path).toBe("portfolio");
		}
	});

	it("ramène le logo à l'accueil de la partie courante", () => {
		expect(areaHome(siteArea("/blog/un-article"))).toBe("/blog");
		expect(areaHome(siteArea("/blog"))).toBe("/blog");
		expect(areaHome(siteArea("/services"))).toBe("/");
		expect(areaHome(siteArea("/"))).toBe("/");
	});
});
