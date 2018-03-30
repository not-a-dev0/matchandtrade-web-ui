import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Message } from '../message/message';
import { NavigationService } from '../../services/navigation.service';
import { Pagination } from '../../classes/search/pagination';
import { TradeService } from '../../services/trade.service';
import { Trade } from '../../classes/pojo/trade';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers: [TradeService]
})
export class TradeListComponent {
  message: Message = new Message();
  trades: Trade[];
  pagination: Pagination;
  loading: boolean = true;

  constructor(private router: Router, private navigationService: NavigationService, private tradeService: TradeService) {
    this.pagination = new Pagination(1, 10, 0);
    this.search();
  }

  createTrade() {
    this.navigationService.navigate('trades');
  }

  navigateToTrade(trade: Trade) {
    this.navigationService.navigate('trades', {tradeHref: trade._href});
  }

  nextPage() {
      this.pagination.page.number++;
      this.loading = true;
      this.search();
  }

  previousPage() {
      this.pagination.page.number--;
      this.loading = true;
      this.search();
  }

  search(): void {
    this.tradeService.search(this.pagination.page)
      .then((v) => {
        this.trades = v.results;
        this.pagination = v.pagination;
        this.loading = false;
      }).catch((e) => {
        this.loading = false;
        this.message.setErrorItems(e);
      });
  }

}
