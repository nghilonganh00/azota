import { LuSearch } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import RecommendHomeworks from "./Layout/recommendHomeworks";
import AllHomeworks from "./Layout/allHomeworks";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClassWithHomework } from "./Interface/interface";
import { Homework } from "../ResultsList/Interface/interface";
import HomeworkAPI from "../../../../API/homeworkAPI";

const HomeworkManage = () => {
  const [recommendHomework, setRecommendHomework] = useState<Homework[]>([]);
  const [classWithHomework, SetClassWithHomework] = useState<
    ClassWithHomework[]
  >([]);

  useEffect(() => {
    const fetchRecommendHomework = async () => {
      try {
        const data = await HomeworkAPI.getAll("updatedAt", "DESC", 4);
        setRecommendHomework(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchClassWithHomework = async () => {
      try {
        const data = await HomeworkAPI.getClassWithHomework();
        SetClassWithHomework(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendHomework();
    fetchClassWithHomework();
  }, []);
  return (
    <div className="w-full p-6 pt-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <input
              type="text"
              className="w-60 rounded-md px-2 py-2 text-sm"
              placeholder="Tìm kiếm theo tên lớp"
            />
            <LuSearch className="absolute right-3 top-2.5 text-slate-600" />
          </div>
          <Link
            to={"/teacher/homework/add-new-homework"}
            className="flex items-center gap-2 rounded-md bg-[#68cc00] px-3 py-2.5 hover:bg-lime-500"
          >
            <LuPlus className="text-white" />
            <span className="text-sm font-bold text-white">Tạo bài tập</span>
          </Link>
        </div>

        <RecommendHomeworks listHomework={recommendHomework} />
        <AllHomeworks data={classWithHomework} />
      </div>
    </div>
  );
};

export default HomeworkManage;
