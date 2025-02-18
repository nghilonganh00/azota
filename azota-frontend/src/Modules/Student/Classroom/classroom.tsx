import { CalendarCheck, Ellipsis, Newspaper, Plus, Search } from "lucide-react";

const Classroom = () => {
  return (
    <div className="px-6 py-10">
      <div className="text-lg font-medium">Danh sách lớp</div>
      <div className="mt-6 flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            className="w-60 rounded-md px-2 py-2 text-sm"
            placeholder="Tìm kiếm theo tên lớp"
          />
          <Search className="absolute right-3 top-2.5 size-4 text-slate-600" />
        </div>

        <div className="flex items-center gap-2 rounded-md bg-blue-800 px-3 py-2 shadow-sm">
          <Plus className="size-4 text-white" />
          <div className="text-sm font-medium text-white">Tìm giáo viên</div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <div className="space-y-4 rounded-md bg-white p-4 pb-12 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    className="dark:border-darkmode-400 size-9 rounded-full border border-slate-200"
                    src="https://lh3.googleusercontent.com/a/ACg8ocJ_iFoqcbXAa93XLL5ekog96hEVyxgkeCD7oenQOr3efwaZiQ=s96-c"
                    aria-describedby="cdk-describedby-message-ng-1-28"
                    cdk-describedby-host="ng-1"
                  ></img>
                  <div className="">
                    <div className="text-sm font-semibold">Cô B21DCCN687 - Lê Văn Thiện</div>
                    <div className="text-xs font-semibold text-blue-800">Test 1</div>
                  </div>
                </div>

                <Ellipsis className="size-5 text-gray-900" strokeWidth={1.5} />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-700">
                <div>Sĩ số: 1</div>
                <div>Năm học: 2024 - 2025</div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-start gap-2">
                <CalendarCheck strokeWidth={1.5} className="size-4" />
                <div className="text-sm font-semibold">Bài tập, Đề thi chưa làm (5 đề thi)</div>
              </div>
              <div className="space-y-4 px-2 py-4">
                <div className="flex h-24 items-center justify-center">
                  <div className="flex h-full w-24 items-center justify-center rounded-l-md bg-slate-300 text-sm font-semibold shadow-sm">
                    Chưa nộp
                  </div>
                  <div className="flex h-full flex-col items-start justify-center space-y-1 rounded-r-md bg-slate-200 pl-4 pr-24 text-sm shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-semibold">Bài tập 2</div>

                      <img
                        className="size-6 rounded-full border border-slate-200"
                        src="https://lh3.googleusercontent.com/a/ACg8ocJ_iFoqcbXAa93XLL5ekog96hEVyxgkeCD7oenQOr3efwaZiQ=s96-c"
                        aria-describedby="cdk-describedby-message-ng-1-28"
                        cdk-describedby-host="ng-1"
                      ></img>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <div>Bắt đầu nộp:</div>
                      <div className="font-semibold">19/06/2024 23:59</div>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <div>Hạn cuối:</div>
                      <div className="font-semibold text-red-500">19/06/2024 23:59</div>
                    </div>
                  </div>
                </div>

                <div className="flex h-24 items-center justify-center">
                  <div className="flex h-full w-24 items-center justify-center rounded-l-md bg-slate-300 text-sm font-semibold shadow-sm">
                    Chưa nộp
                  </div>
                  <div className="flex h-full flex-col items-start justify-center space-y-1 rounded-r-md bg-slate-200 pl-4 pr-24 text-sm shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-semibold">Bài tập 2</div>

                      <img
                        className="size-6 rounded-full border border-slate-200"
                        src="https://lh3.googleusercontent.com/a/ACg8ocJ_iFoqcbXAa93XLL5ekog96hEVyxgkeCD7oenQOr3efwaZiQ=s96-c"
                        aria-describedby="cdk-describedby-message-ng-1-28"
                        cdk-describedby-host="ng-1"
                      ></img>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <div>Bắt đầu nộp:</div>
                      <div className="font-semibold">19/06/2024 23:59</div>
                    </div>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <div>Hạn cuối:</div>
                      <div className="font-semibold text-red-500">19/06/2024 23:59</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Plus className="size-3 text-blue-800" />
                  <div className="text-xs font-semibold text-blue-900">3 Xem thêm</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start gap-2">
              <Newspaper strokeWidth={1.5} className="size-4" />
              <div className="text-sm font-semibold">Bảng tin</div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="space-y-4 rounded-md bg-white p-4 pb-12 shadow-sm">
            <div className="flex items-center justify-start gap-2">
              <div className="text-sm font-semibold">Tự do</div>
            </div>
            <div className="text-xs text-gray-500">
              Hiển thị bài tập, đề thi đã làm nhưng không thuộc lớp nào
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
