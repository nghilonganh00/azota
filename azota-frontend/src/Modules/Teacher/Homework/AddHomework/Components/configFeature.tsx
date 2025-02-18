import { NewHomework } from "../libs/interfaces";

interface ConfigFeatureProps {
  values: NewHomework;
  onChange: (name: string, newValue: string | boolean) => void;
}

const ConfigFeature: React.FC<ConfigFeatureProps> = (props) => {
  const { values, onChange } = props;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-12">
        <div className="col-span-5">
          <div className="text-sm font-semibold">Cho xem kết quả</div>
        </div>
        <div className="col-span-7">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <input
                id="hw_not_showAnswer"
                name="homework_isShowAnswer"
                value={"false"}
                checked={values.isShowResult === false}
                onChange={(e) => onChange("isShowResult", e.target.value)}
                type="radio"
              />
              <label htmlFor="hw_not_showAnswer">Không</label>
            </span>
            <span className="flex items-center gap-2">
              <input
                id="hw_showAnswer"
                name="homework_isShowAnswer"
                value={"true"}
                checked={values.isShowResult === false}
                onChange={(e) => onChange("homeworkShowResult", true)}
                type="radio"
              />
              <label htmlFor="hw_showAnswer">Có</label>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-5">
          <label className="text-sm font-semibold">Đăng nhập để nộp bài</label>
        </div>
        <div className="col-span-7">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <input
                id="hw_not_mustLogin"
                name="homework_mustLogin"
                value={"false"}
                checked={values.isMustLogin === false}
                onChange={(e) => onChange("isMustLogin", false)}
                type="radio"
              />
              <label htmlFor="hw_not_mustLogin">Không</label>
            </span>
            <span className="flex items-center gap-2">
              <input
                id="hw_mustLogin"
                name="homework_mustLogin"
                value={"true"}
                checked={values.isMustLogin === true}
                onChange={(e) => onChange("isMustLogin", true)}
                type="radio"
              />
              <label htmlFor="hw_mustLogin">Có</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigFeature;
