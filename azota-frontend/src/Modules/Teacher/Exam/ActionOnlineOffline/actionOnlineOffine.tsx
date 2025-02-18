import { CircleAlert, Cog, FileText, Folder, PanelLeft, Printer } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ActionOnlineOffline = () => {
  const { hashId } = useParams();
  return (
    <div className="w-full py-4">
      <div className="mx-auto max-w-[1000px] space-y-4 text-sm">
        <div>
          <h3 className="mb-1 font-medium text-gray-900">Tạo đề thành công 👏</h3>
          <span className="text-gray-800">Vui lòng chọn các hình thức bên dưới</span>
        </div>

        <div className="space-y-1.5">
          <div className="font-medium uppercase text-gray-900">Online</div>
          <div className="">
            <span className="c-lucide">
              <CircleAlert strokeWidth={1.5} className="size-4 text-gray-800" />
            </span>
            <span className="text-gray-800">
              {
                "  Copy link gửi cho học sinh. Học sinh truy cập link để làm bài và nộp bài Online. Hỗ trợ cả trắc nghiệm và tự luận"
              }
            </span>
            <span className="font-medium text-blue-800"> Tìm hiểu thêm</span>
          </div>

          <div className="rounded-md bg-white px-5 py-5 shadow">
            <div>
              <Link
                to={`/teacher/exam/config-exam-online/${hashId}`}
                className="inline-flex items-center gap-2 rounded-md border border-blue-800 px-3 py-2 text-blue-900 hover:cursor-pointer hover:bg-slate-100"
              >
                <Cog strokeWidth={1.5} className="size-5" />
                <div className="font-medium">Cài đặt làm bài online</div>
              </Link>

              <div className="mt-2 text-xs text-gray-500">
                Thiết lập thời gian làm bài, giám sát tự động, tạo đề con, cho phép xem điểm… Xuất
                bản đề, tạo link gửi cho học sinh làm bài và nộp bài.{" "}
                <span className="font-medium text-blue-800">Tìm hiểu thêm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="font-medium uppercase text-gray-900">Offline</div>
          <div className="">
            <span className="c-lucide">
              <CircleAlert strokeWidth={1.5} className="size-4 text-gray-800" />
            </span>
            <span className="text-gray-800">
              {
                "  In đề cho học sinh làm trên giấy, scan hoặc chụp ảnh bài làm của học sinh và Upload lên Azota để chấm tự động. Học sinh cũng có thể tự chụp lại bài làm của mình và nộp trên Azota"
              }
            </span>
            <span className="font-medium text-blue-800"> Tìm hiểu thêm</span>
          </div>

          <div className="rounded-md bg-white px-5 py-5 shadow">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-blue-800 px-3 py-2 text-blue-900">
                <Printer strokeWidth={1.5} className="size-5" />
                <div className="font-medium">IN ĐỀ - Có phiếu trả lời riêng</div>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                Xuất file DOCX chứa các đề thi đã được đảo thứ tự câu hỏi và đáp án từ đề gốc, kèm
                theo một file PDF chứa mẫu phiếu trả lời trắc nghiệm theo mẫu tùy chọn.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="font-medium uppercase text-gray-900">Chèn vào Powerpoint</div>
          <div className="">
            <span className="c-lucide">
              <CircleAlert strokeWidth={1.5} className="size-4 text-gray-800" />
            </span>
            <span className="text-gray-800">
              {
                "  Chèn nội dung câu hỏi vào slide Powerpoint. Học sinh có thể tương tác trả lời câu hỏi, giáo viên có thể thống kê kết quả ngay lập tức mà không cần thoát khỏi màn hình trình chiếu."
              }
            </span>
            <span className="font-medium text-blue-800"> Xem hướng dẫn tại đây</span>
          </div>

          <div className="rounded-md bg-white px-5 py-5 shadow">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-blue-800 px-3 py-2 text-blue-900 hover:cursor-pointer hover:bg-slate-100">
                <PanelLeft strokeWidth={1.5} className="size-5" />
                <div className="font-medium">Chèn vào Powerpoint</div>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                Chọn các mẫu slide để nhúng vào Powerpoint. Chia sẻ mã vào lớp để học sinh có thể
                tương tác trức tiếp với slide.
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-blue-800 hover:cursor-pointer hover:bg-slate-300">
            <FileText strokeWidth={1.5} className="size-4" />
            <div className="text-sm font-semibold">Quản lý danh sách đã thi</div>
          </div>

          <div className="flex items-center gap-2 rounded-md px-3 py-2 text-blue-800 hover:cursor-pointer hover:bg-slate-300">
            <Folder strokeWidth={1.5} className="size-4" />
            <div className="text-sm font-semibold">Về trang quản lý file</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionOnlineOffline;
