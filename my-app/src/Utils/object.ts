const ObjectUtil = {
  getObjectDepth: (obj: Object) => {
    let maxDepth = 1;

    const findDepth = (currentObj: any, currentDepth: number) => {
      if (typeof currentObj === "object" && currentObj !== null) {
        currentDepth++;
        if (currentDepth > maxDepth) {
          maxDepth = currentDepth;
        }
        for (const key in currentObj) {
          if (currentObj.hasOwnProperty(key)) {
            findDepth(currentObj[key], currentDepth);
          }
        }
      }
    };

    findDepth(obj, 1);
    return maxDepth;
  },
};

export default ObjectUtil;
