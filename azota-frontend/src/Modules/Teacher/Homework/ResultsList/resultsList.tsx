import { useEffect, useState } from "react";

import ConfigArea from "./Layout/configArea";
import SearchBar from "./Layout/searchbar";
import { useParams } from "react-router";
import HomeworkAPI from "../../../../API/homeworkAPI";
import ListResultArea from "./Layout/listResultArea";
import { StudentClassroomAPI } from "../../../../API/studentClassAPI";
import { StudentClassWithSubmissions } from "./Interface/interface";
import { Homework } from "../../../../Globals/Interfaces/homework.interface";

const ResultsList = () => {
  const { homeworkId } = useParams();
  const [submissions, setSubmissions] = useState<StudentClassWithSubmissions[] | null>(null);
  const [search, setSearch] = useState<string>("");

  const [homework, setHomework] = useState<Homework>({} as Homework);

  const fetchHomework = async () => {
    if (!homeworkId) return;

    HomeworkAPI.getDetail(homeworkId).then((response) => {
      setHomework(response.data);
    });
  };

  const fetchSubmissions = async () => {
    if (!homeworkId) return;

    const response = await StudentClassroomAPI.getSubmissionsByHomeworkId(homeworkId);
    if (response?.status === 200) {
      setSubmissions(response.data);
    }
  };

  useEffect(() => {
    fetchHomework();
    fetchSubmissions();
  }, []);

  return (
    <div className="p-5">
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-3">{homework && <ConfigArea homework={homework} setHomework={setHomework} />}</div>

        <div className="col-span-7 h-96">
          <SearchBar search={search} setSearch={setSearch} />

          {submissions && <ListResultArea classroom={homework.classroom} students={submissions} search={search} />}
        </div>
      </div>
    </div>
  );
};

export default ResultsList;
