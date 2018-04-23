import {Item} from '../app/classes/pojo/item';
import {Page} from '../app/classes/search/page';
import {Pagination} from '../app/classes/search/pagination';
import {SearchResult} from '../app/classes/search/search-result';

export class ItemServiceMock {
  get(href) {
    return new Promise<Item>((resolve, reject) => {
      const item = new Item();
      item.name = 'ItemServiceMock.GET.name';
      item._href = 'ItemServiceMock.GET.href';
      resolve(item);
    });
  };

  search(page: Page, tradeMembershipHref: string): Promise<SearchResult<Item>> {
    return new Promise<SearchResult<Item>>((resolve, reject) => {
      const results = new Array<Item>();
      const totalOfItems = 5;
      for(let i=1; i<=totalOfItems; i++) {
        results.push(this.createItem(i));
      }
      const searchResult = new SearchResult<Item>(results, new Pagination(1, 10, totalOfItems));
      resolve(searchResult);
    });
  }

  private createItem(n: number): Item {
    const i = new Item();
    i.name = 'ItemServiceMock.SEARCH.name' + n;
    i.itemId = n;
    i._href = 'ItemServiceMock.SEARCH.href' + n;
    return i;
  }
  
  save(item: Item, tradeMembershipHref?: string): Promise<Item> {
    return new Promise<Item>((resolve, reject) => {
      let result: Item = Object.assign({}, item);
      result.itemId = 1;
      result._href = 'itemHrefMocked';
      resolve(result);
    });
  };
}
