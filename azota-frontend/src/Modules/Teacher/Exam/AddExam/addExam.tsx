import { CloudUpload, Landmark, Pointer, Square, SquarePen, WholeWord } from "lucide-react";
import { Link } from "react-router-dom";

const AddExam = () => {
  return (
    <div className="p-6">
      <div className="mb-6 text-lg font-medium">Tạo đề mới</div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 rounded-md bg-white py-48 shadow-md">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <CloudUpload className="size-16 text-blue-700" strokeWidth={1.5} />
            <div className="text-lg font-medium">Chọn File hoặc kéo thả File vào đây</div>
            <div className="text-sm text-gray-600">
              <div>Hỗ trợ các định dạng .pdf, .docx, .xlsx</div>
              <div>
                Có thể Upload File <span className="font-medium">Bài tập</span>,{" "}
                <span className="font-medium">Đề thi</span> Hoặc{" "}
                <span className="font-medium">Bảng đáp án</span> để chấm offline{" "}
                <span className="text-blue-800">Tìm hiểu thêm</span>
              </div>
            </div>
            <div className="flex items-center justify-center text-sm text-blue-800">
              <div>Đề mẫu Azota Pdf</div>
              <div className="px-2">|</div>
              <div>Đề mẫu Azota Pdf</div>
              <div className="px-2">|</div>
              <div>Đề mẫu Azota Pdf</div>
              <div className="px-2">|</div>
              <div>File Excel bảng đáp án đề Offline</div>
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-6">
          <div className="space-y-1">
            <Link
              to={"/teacher/exam/editor"}
              className="flex items-center gap-4 rounded-md bg-white p-5 shadow-sm"
            >
              <SquarePen className="size-8 text-orange-600" strokeWidth={1.5} />
              <div className="text-lg font-medium">Tự soạn Đề thi / Bài tập</div>
            </Link>
            <div className="text-xs text-gray-500">
              Sử dụng trình soạn thảo của Azota để tạo Bài tập/Đề thi. Chỉnh sửa từ các mẫu có sẵn
              hoặc Copy & Paste từ các nguồn khác nhau.{" "}
              <span className="text-blue-800">Tìm hiểu thêm</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-4 rounded-md bg-white p-5 shadow-sm">
              <Landmark className="size-8 text-lime-600" strokeWidth={1.5} />
              <div className="text-lg font-medium">Tạo đề từ Ma trận đề</div>
            </div>
            <div className="text-xs text-gray-500">
              Tạo ra nhiều đề kiểm tra với chất lượng tương đương từ bản thiết kế ma trận đề có sẵn
              của Azota, cung cấp các thông tin cấu trúc cơ bản của đề kiểm tra: thời gian, số câu
              hỏi, cấp độ và dạng thức câu hỏi. <span className="text-blue-800">Tìm hiểu thêm</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-4 rounded-md bg-white p-5 shadow-sm">
              <Pointer className="size-8 text-yellow-400" strokeWidth={1.5} />
              <div className="text-lg font-medium">Tạo đề offline thủ công</div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-4 rounded-md bg-white p-5 shadow-sm">
              <WholeWord className="size-8 text-gray-800" />
              <div className="text-lg font-medium">Tạo đề thi offline bằng Text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExam;
