import TeacherListArea from "./Layouts/TeacherListArea";
import DelegationSection from "./Layouts/DelegationSection";

const TeacherGroup = () => {
  return (
    <div className="flex h-full items-start gap-4 p-4 shadow-sm">
      <TeacherListArea />

      <DelegationSection />
    </div>
  );
};

export default TeacherGroup;
