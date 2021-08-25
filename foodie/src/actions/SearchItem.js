import {GET_SEARCH_ITEM} from '../constant/SearchItemsConstant'
import axios from 'axios'
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
let matches = []
export const getItem = (word ,id) => {
    const promise =  axios.get(`https://food-app-timesinternet.herokuapp.com/api/customer/restaurant/${id}/item`)
    .then(res => {
        const food = res.data
        const food_items = food.map((value) =>{return value.name})
        const escapeWord=escapeRegexCharacters(word.trim());
        matches = food_items.filter(itm => {
            const regex = new RegExp(`^${escapeWord}`,'gi');
            return itm.match(regex)
        })
        if(escapeWord === ""){
            matches= []
        }
    }).catch(err => {console.error(err)})
 
    return {
        type :GET_SEARCH_ITEM,
        payload: matches
    }
}