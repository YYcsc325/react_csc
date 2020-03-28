class Index {
    getIn(state, array, initial){
        let obj = Object.assign({}, state);

        for (let i = 0; i < array.length; i++) {
          // when is undefined  return init immediately
          if (typeof obj !== 'object' || obj === null) {
            return initial;
          }
      
          const prop = array[i];
      
          obj = obj[prop];
        }
      
        if (obj === undefined || obj === null) {
          return initial;
        }
      
        return obj;
    }
}
export default new Index();