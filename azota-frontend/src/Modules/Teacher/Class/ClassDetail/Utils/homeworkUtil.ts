import { Homework } from "../Interface/interface";

const HomeworkUtils = {
  groupByCreatedAt: (listHomework: Homework[]) => {
    if (!listHomework) return {};

    return listHomework.reduce((groups: { [key: string]: Homework[] }, homework: Homework) => {
      const date = homework.createdAt;
      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(homework);
      return groups;
    }, {});
  },
};

export default HomeworkUtils;
