import { Injectable } from '@angular/core';

import { HttpService } from '../services/http.service';
import { Item } from '../classes/pojo/item';
import { ItemTransformer } from '../classes/transformers/item-transformer';
import { Page } from '../classes/search/page';
import { SearchResult } from '../classes/search/search-result';
import { ServiceExceptionFactory, NotFoundException } from '../classes/exceptions/service-exceptions';

@Injectable()
export class ItemService {

  itemTransformer: ItemTransformer = new ItemTransformer();

  constructor(
    private httpService: HttpService
	) { }
	
	get(href: string): Promise<Item> {
    return new Promise<Item>( (resolve, reject) => {
      this.httpService
        .get(href)
        .then(v => resolve(this.itemTransformer.toPojo(v.json())))
        .catch(e => reject(e));
    });
  }  

  save(item: Item, tradeMembershipHref?: string): Promise<Item> {
		let result: Promise<Item>;
		if (item._href) {
			result = new Promise((resolve, reject) => {
				this.httpService.put(item._href, item)
					.then(v => resolve(this.itemTransformer.toPojo(v.json())))
					.catch(e => reject(e));
			});
		} else {
			result = new Promise((resolve, reject) => {
				this.httpService.post(tradeMembershipHref + '/items/', item)
					.then(v => resolve(this.itemTransformer.toPojo(v.json())))
					.catch(e => reject(e));
			});
		}
		return result;
  }

  search(page: Page, tradeMembershipHref: string): Promise<SearchResult<Item>> {
    return new Promise<SearchResult<Item>>((resolve, reject) => {
      this.httpService
        .get(tradeMembershipHref + '/items', true, page)
        .then(v => resolve(this.itemTransformer.toSearchResult(v, page)))
        .catch(e => reject( ServiceExceptionFactory.makeException(e) ));
    });
  }

}
