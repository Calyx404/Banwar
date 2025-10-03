export class SearchController {
  constructor(repo) {
    this.repo = repo;
  }

  async search(query) {
    try {
      await this.repo.load();
      return this.repo.find(query);
    } catch (e) {
      console.error("SearchController.search error:", e);
      return [];
    }
  }
}
