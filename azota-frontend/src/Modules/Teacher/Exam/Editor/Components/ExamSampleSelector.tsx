import { EXAM_SAMPLES } from "../Utils/constant";

interface ExamSampleSelectorProps {
  handleSelectSample: (sampleContent: string) => void;
}

const ExamSampleSelector: React.FC<ExamSampleSelectorProps> = ({ handleSelectSample }) => {


  return (
    <div className="flex gap-1 py-2 text-sm">
      <div className="">Nội dung mẫu:</div>
      <div className="flex items-center gap-1 text-blue-900">
        {EXAM_SAMPLES.map((sample) => (
          <div key={sample.id} className="hover:cursor-pointer" onClick={() => handleSelectSample(sample.content)}>
            {sample.name} |
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamSampleSelector;
