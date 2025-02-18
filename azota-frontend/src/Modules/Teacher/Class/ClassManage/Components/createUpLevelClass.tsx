import { Expand, Filter, PanelLeftClose, Plus, PlusIcon, Search, X } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import Popup from "../../../../../Globals/Components/popup";
import { useState } from "react";

const CreateUpLevelClass = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <div
        onClick={() => setOpen(true)}
        className="flex h-10 items-center gap-2 rounded-md bg-white px-2 text-sm font-semibold shadow-md hover:cursor-pointer hover:bg-slate-100"
      >
        <PlusIcon className="size-4 text-gray-600" />
        <span>Tạo lớp cho khóa mới</span>
      </div>

      <Popup isOpen={isOpen} setOpen={setOpen}>
        <form className="max-w-[80vw] rounded-md bg-white p-3 shadow">
          <div className="">
            <div className="font-semibold">Tạo lớp cho khóa mới</div>
            <div className="text-xs text-gray-600">
              Khi tạo lớp cho khóa mới hệ thống sẽ tự động tạo lớp mới và copy danh sách học sinh từ
              các lớp ở khóa cũ. Chọn các lớp bên dưới để thực hiện tạo lớp mới
            </div>
          </div>

          <div className="mt-4 grid grid-cols-12 gap-2">
            <div className="col-span-3">
              <div className="min-h-60 rounded-md border border-gray-300 shadow-sm">
                <div className="relative border-b border-gray-300 p-2">
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                    placeholder="Tìm kiếm theo tên lớp"
                  />
                  <Search className="absolute right-5 top-3.5 size-4 text-slate-600" />
                </div>

                <div className="p-2">
                  <div className="rounded-md bg-blue-900 p-2 text-sm font-semibold text-white">
                    Tất cả (0/2)
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-9">
              <div className="min-h-60 rounded-md border border-gray-300 shadow-sm">
                <div className="border-b border-gray-300 p-2">
                  <div className="flex items-center justify-between">
                    <div className="max-w-min rounded-md border border-slate-300 p-2 shadow-sm">
                      <PanelLeftClose className="size-4 text-slate-800" strokeWidth={1} />
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative border-gray-300">
                        <input
                          type="text"
                          className="w-56 rounded-md border border-gray-300 px-2 py-1 text-sm"
                          placeholder="Tìm kiếm lớp"
                        />
                        <Search className="absolute right-2 top-2 size-4 text-slate-600" />
                      </div>

                      <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1.5 text-sm font-semibold shadow-sm hover:cursor-pointer hover:bg-slate-100">
                        <Filter className="size-4 text-gray-500" />
                        <span className="text-xs font-semibold text-gray-600">Bộ lọc</span>
                      </div>

                      <Expand className="text-gray-500" />
                    </div>
                  </div>
                </div>

                <div>
                  {/* {classgroups.map((classgroup, key) => (
                    <ClassGroupBox
                      classgroup={classgroup}
                      key={key}
                      values={values}
                      onChange={onChange}
                    />
                  ))} */}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-md border border-gray-200">
            <div className="bg-slate-200 p-3 text-sm font-semibold">
              Các lớp tương ứng sẽ tạo (1 lớp)
            </div>

            <div className="grid grid-cols-12 gap-5 px-4 pb-10 pt-4">
              <div className="col-span-6">
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={"Lớp 12A1"}
                  />

                  <div className="rounded-md bg-gray-200 p-2 shadow-sm">
                    <X className="size-5 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="col-span-6">
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={"Lớp 12A1"}
                  />

                  <div className="rounded-md bg-gray-200 p-2 shadow-sm">
                    <X className="size-5 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 p-3">
            <div
              className="rounded-md bg-gray-200 px-8 py-2.5 hover:cursor-pointer hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <div className="text-sm font-semibold text-gray-500">Hủy</div>
            </div>

            <div className="rounded-md bg-blue-800 px-8 py-2.5">
              <div className="text-sm font-semibold text-white">Lưu</div>
            </div>
          </div>
        </form>
      </Popup>
    </Fragment>
  );
};

export default CreateUpLevelClass;
