import { Injectable } from '@angular/core';
import { Data } from '@models/data.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }

  addNewData(data: Data): void
  {
    let currentHistory: any = window.localStorage.getItem('history');

    if (currentHistory === null) {
      currentHistory = {
        'history': []
      };
    } else {
      currentHistory = JSON.parse(currentHistory);
    }

    currentHistory.history.push({
      'symbol': data.symbol,
      'data': data.data,
      'date': data.date
    });

    window.localStorage.setItem('history', JSON.stringify(currentHistory));
  }

  loadCurrentHistory(offset: number, length: number): any {
    let currentHistory: any = window.localStorage.getItem('history');

    if (currentHistory === null) {
      currentHistory = {
        'history': []
      };
    } else {
      currentHistory = JSON.parse(currentHistory);
    }

    const selectedHistories: Data[] = [];
    const lastIndex = offset + length;

    for (var currentIndex = offset; currentIndex <= lastIndex; currentIndex++) {
      if (typeof currentHistory.history[currentIndex] !== 'undefined') {
        let history = currentHistory.history[currentIndex];

        history.date = new Date(history.date);
        history.date = history.date.getDate() + '-' + history.date.getMonth()
                       + '-' + history.date.getYear() + ' ' + history.date.getHours().toString().padStart(2, '0')
                       + ':' + history.date.getSeconds().toString().padStart(2, '0');

        selectedHistories.push(history);
      } else {
        break;
      }
    }

    return {
      histories: selectedHistories,
      total: currentHistory.history.length
    };
  }
}
