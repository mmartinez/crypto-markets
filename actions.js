import { FETCHING_COINS, FETCHING_COINS_SUCCESS, FETCHING_COINS_FAILURE, FETCHING_COIN_INFO_SUCCESS, FETCHING_COIN_HISTORY_SUCCESS, CHANGE_COIN_HISTORY_SUCCESS, ADD_COIN, REMOVE_COIN, VIEW_COIN, SEARCH_COIN, HOME, COIN } from './constants';
import Converter from './components/graphs/dateConverter';
import translate from './components/graphs/timelineConverter';


export function fetchInitialData(name, time) {
  return (dispatch) => {
    //dispatch(getCoins())
    //dispatch(fetchCoinListFromAPI());
    dispatch(fetchCoinInfoFromAPI(name, time))
    dispatch(fetchCoinListFromAPI())
   // console.log('indispatch')
    //fetch('https://api.coinmarketcap.com/v1/ticker/?limit=25')
  }
}


export function fetchCoinsFromAPI() {
  return (dispatch) => {
    dispatch(getCoins())
    newList = []
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=25')
    .then(data => data.json())
    //.then(data => console.log(data[0].name))
    .then(data => data.map((i, f) => {newList.push(i.name)}
      ))
    .then(() => console.log(newList))
    //.then(json => {
      //dispatch(getCoinsSuccess(json))
    //})
    .catch(err => dispatch(getCoinsFailure(err)))
  }
}
/*
export function fetchCoinsFromAPI() {
  return (dispatch) => {
    dispatch(getCoins())
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=25')
    .then(data => data.json())
    .then(data => console.log(data[0].name))
    //.then(json => {
      //dispatch(getCoinsSuccess(json))
    //})
    .catch(err => dispatch(getCoinsFailure(err)))
  }
}
*/


export function appendCoin(data){
  console.log(data);
  //list.push(info);
  //console.log(list)

}

export function fetchCoinListFromAPI() {
  return (dispatch) => {
    //dispatch(getCoins())

    list = ['bitcoin', 'litecoin', 'ethereum', 'monero'];
    console.log('what')
    var newMap = []
    list.map((i, f) => {
      fetch('https://api.coinmarketcap.com/v1/ticker/' + i)
      .then(data=> data.json())
      .then(data=>newMap.push(data[0]))
      .then( () => (newMap.length == list.length)? dispatch(getCoinsSuccess(newMap)):console.log("false" + i + f))
      //the error here is its doing all these at once
    })
    //console.log(newMap)
    //console.log(newList)
    //console.log("this is your input " + name)
    //dispatch(fetchCoinHistoryFromAPI(name.symbol, time))
    //dispatch(getCoins())
    //fetch('https://api.coinmarketcap.com/v1/ticker/' + name.name)
    //.then(data => data.json())
    //.then(json => {
    //  newList.push(json).
    //.catch(err => dispatch(getCoinsFailure(err)))
  }
}

export function fetchHomeView() {
  return {
    type: HOME
  }
}

export function fetchCoinView() {
  return {
    type: COIN
  }
}


export function getHomeView() {
  return {
    type: HOME
  }
}

export function getCoins() {
  return {
    type: FETCHING_COINS
  }
}

export function getCoinsSuccess(data) {
  console.log(data);
  return {
    type: FETCHING_COINS_SUCCESS,
    data,
  }
}

export function getCoinsFailure() {
  return {
    type: FETCHING_COINS_FAILURE
  }
}


export function fetchCoinInfoFromAPI(name, time) {
  return (dispatch) => {
    //console.log("this is your input " + name)
    //dispatch(fetchCoinHistoryFromAPI(name.symbol, time))
    dispatch(getCoins())
    //dispatch(fetchCoinListFromAPI())
    fetch('https://api.coinmarketcap.com/v1/ticker/' + name.name)
    .then(data => data.json())
    .then(json => {
      dispatch(getCoinInfoSuccess(json, name.name, name.symbol))
      dispatch(fetchCoinHistoryFromAPI(name.symbol, time))

    })
    .catch(err => dispatch(getCoinsFailure(err)))
  }
}

export function getCoinInfoSuccess(data, name, symbol) {
  return {
    type: FETCHING_COIN_INFO_SUCCESS,
    data,
    name,
    symbol
  }
}

export function fetchCoinHistoryFromAPI(name, time) {
  return (dispatch) => {
    var timeline = translate(time);
    fetch('https://min-api.cryptocompare.com/data/' + timeline.time + '?fsym=' + name + '&tsym=USD&limit=' + timeline.limit + '&aggregate='+ timeline.agg + '&e=CCCAGG')
    .then(data => data.json())
    .then(json => {
      var newData = Converter(json.Data);
      var change = newData.change;
      var timeseries = newData.data;
      dispatch(getCoinHistorySuccess(timeseries, time, change));
    })
    .catch(err => dispatch(getCoinsFailure(err)))
  }
}


export function getCoinHistorySuccess(Data, time, change) {
  return {
    type: FETCHING_COIN_HISTORY_SUCCESS,
    Data,
    time,
    change
  }
}


