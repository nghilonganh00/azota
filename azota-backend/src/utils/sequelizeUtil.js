const sequelizeUtil = {
  convertObj: (sequelizeObj) => {
    const formatJSON = JSON.stringify(sequelizeObj);
    const formatObj = JSON.parse(formatJSON);

    return formatObj;
  },
};

export default sequelizeUtil;
