import { CalendarOff, Plus, Upload, User } from "lucide-react";
import { Helmet } from "react-helmet";

const Homework = () => {
  return (
    <div className="px-4 pt-6">
      <Helmet>
        <title>Bài tập ngày 11/7</title>
      </Helmet>

      <div className="space-y-3 rounded-md bg-white p-3 shadow-sm">
        <div className="text-lg font-semibold">Bài tập toán ngày 11/7</div>
        <div className="space-y-2">
          <div className="flex items-center">
            <svg
              _ngcontent-ng-c931010807=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide mr-2 h-4 w-4"
            >
              <path _ngcontent-ng-c931010807="" d="M6 20h4"></path>
              <path _ngcontent-ng-c931010807="" d="M14 10h4"></path>
              <path _ngcontent-ng-c931010807="" d="M6 14h2v6"></path>
              <path _ngcontent-ng-c931010807="" d="M14 4h2v6"></path>
              <rect
                _ngcontent-ng-c931010807=""
                x="6"
                y="4"
                width="4"
                height="6"
              ></rect>
              <rect
                _ngcontent-ng-c931010807=""
                x="14"
                y="14"
                width="4"
                height="6"
              ></rect>
            </svg>
            <div className="mr-1 text-sm">Mã bài tập: </div>
            <div className="text-sm font-semibold">sdjfo03</div>
          </div>
          <div className="flex items-center">
            <svg
              _ngcontent-ng-c931010807=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide mr-2 h-4 w-4"
            >
              <rect
                _ngcontent-ng-c931010807=""
                x="3"
                y="3"
                width="7"
                height="7"
              ></rect>
              <rect
                _ngcontent-ng-c931010807=""
                x="14"
                y="3"
                width="7"
                height="7"
              ></rect>
              <rect
                _ngcontent-ng-c931010807=""
                x="14"
                y="14"
                width="7"
                height="7"
              ></rect>
              <rect
                _ngcontent-ng-c931010807=""
                x="3"
                y="14"
                width="7"
                height="7"
              ></rect>
            </svg>
            <div className="mr-1 text-sm">Lớp: </div>
            <div className="text-sm font-semibold">Lớp toán 12</div>
          </div>
          <div className="flex items-center">
            <User strokeWidth={1.5} className="mr-2 size-4" />
            <div className="mr-1 text-sm">Tên học sinh: </div>
            <div className="text-sm font-semibold">Nguyễn Tuấn Anh</div>
          </div>
          <div className="flex items-center">
            <CalendarOff strokeWidth={1.5} className="mr-2 size-4" />
            <div className="mr-1 text-sm">Hạn nộp: </div>
            <div className="text-sm font-semibold">Không giới hạn</div>
          </div>
        </div>
        <div className="space-y-4 border-y border-gray-200">
          <div className="pt-4 text-sm">Làm bài trang 86, 87, 88</div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <div className="flex items-center gap-2 rounded-md border border-gray-200 p-2">
                <div className="size-12 rounded-md bg-blue-400"></div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold">
                    Screenshot 2024-07-05 165244.jpg
                  </div>
                  <div className="text-xs text-gray-600">Hình ảnh</div>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex items-center gap-2 rounded-md border border-gray-200 p-2">
                <div className="size-12 rounded-md bg-blue-400"></div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold">
                    Screenshot 2024-07-05 165244.jpg
                  </div>
                  <div className="text-xs text-gray-600">Hình ảnh</div>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex items-center gap-2 rounded-md border border-gray-200 p-2">
                <div className="size-12 rounded-md bg-blue-400"></div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold">
                    Screenshot 2024-07-05 165244.jpg
                  </div>
                  <div className="text-xs text-gray-600">Hình ảnh</div>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex items-center gap-2 rounded-md border border-gray-200 p-2">
                <div className="size-12 rounded-md bg-blue-400"></div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold">
                    Screenshot 2024-07-05 165244.jpg
                  </div>
                  <div className="text-xs text-gray-600">Hình ảnh</div>
                </div>
              </div>
            </div>
          </div>
          <label className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 p-2 hover:cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 pt-28">
                <Upload strokeWidth={1.5} className="size-4" />
                <div className="text-sm text-blue-800">Tải file lên</div>
              </div>
              <div className="mt-1 pb-6 text-sm text-gray-700">
                (Hỗ trợ Ảnh, Video, Excel, PPT, Audio hoặc File PDF)
              </div>
            </div>
            <input type="file" className="hidden" />
          </label>
          <div className="text-center">
            <button className="rounded-md bg-blue-800 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:cursor-pointer">
              Nộp bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homework;
