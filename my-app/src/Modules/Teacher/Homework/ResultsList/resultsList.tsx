import { useEffect, useState } from "react";

import ConfigArea from "./Layout/configArea";
import SearchBar from "./Layout/searchbar";
import ListResultArea from "./Layout/listResultArea";
import ExamAPI from "../../../../API/examAPI";
import { useParams } from "react-router";
import { Homework, Student } from "./Interface/interface";
import { Class } from "../../../../Globals/Interfaces/interface";
import HomeworkAPI from "../../../../API/homeworkAPI";

interface ResultList {
  homeworkObj: Homework;
  classObj: Class;
  studentObj: Student[];
}

const ResultsList = () => {
  const { homeworkId, classId } = useParams();
  const [resultList, setResultList] = useState<ResultList>();
  const [homework, setHomework] = useState<Homework>({} as Homework);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        if (homeworkId && classId) {
          const data = await HomeworkAPI.getResultOfClass(homeworkId, classId);
          setResultList(data);
          setHomework(data["homeworkObj"]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHomework();
  }, []);

  console.log("homework: ", resultList);

  return (
    <div className="p-5">
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-3">
          {resultList && (
            <ConfigArea homework={homework} setHomework={setHomework} />
          )}
        </div>

        <div className="col-span-7 h-96">
          <SearchBar />

          {resultList?.classObj && resultList?.studentObj && (
            <ListResultArea
              classroom={resultList?.classObj}
              students={resultList.studentObj}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsList;
