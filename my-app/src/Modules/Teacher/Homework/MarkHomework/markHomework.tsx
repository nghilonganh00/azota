import React, { useEffect, useState } from "react";
import UserAvatar from "../../../../Globals/Components/userAvatar";
import { Editor } from "@tinymce/tinymce-react";
import {
  BringToFront,
  ChevronLeft,
  CircleCheck,
  History,
  Maximize,
  Menu,
  Redo,
  RotateCcw,
  Type,
  Undo,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const MarkHomework = () => {
  useEffect(() => {
    document.title = "Chấm điểm";
  }, []);

  return (
    <div className="p-3">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <div className="rounded-md shadow-sm">
            <div className="rounded-md bg-white">
              <div className="flex items-center gap-6 border-b border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <ChevronLeft strokeWidth={1.5} className="size-5" />
                  <div className="text-sm font-semibold">Quay lại</div>
                </div>
                <BringToFront strokeWidth={1.5} className="size-5" />
                <ZoomIn strokeWidth={1.5} className="size-5" />
                <ZoomOut strokeWidth={1.5} className="size-5" />
                <Undo strokeWidth={1.5} className="size-5" />
                <Redo strokeWidth={1.5} className="size-5" />
                <Menu strokeWidth={1.5} className="ml-auto size-5" />
                <History strokeWidth={1.5} className="size-5" />
                <Maximize strokeWidth={1.5} className="size-5" />
              </div>
              <div className="flex items-center gap-4 py-2">
                <div className="flex items-center gap-4 border-r border-gray-200 px-2 pr-4">
                  <div className="rounded-md bg-slate-200 px-2 py-1.5">
                    <Type strokeWidth={1.5} className="size-5" />
                  </div>
                  <CircleCheck strokeWidth={1.5} className="size-5" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold">Một chạm thêm chữ</div>
                  <input
                    type="text"
                    className="w-16 rounded-md border border-gray-300 py-1.5 text-center text-sm text-red-400 shadow-sm"
                    value={"d"}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold">Hai chạm thêm chữ</div>
                  <input
                    type="text"
                    className="w-16 rounded-md border border-gray-300 py-1.5 text-center text-sm text-red-400 shadow-sm"
                    value={"s"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="space-y-3 rounded-md bg-white p-2 shadow-sm">
            <div className="text-sm font-semibold">Bài tập toán ngày 4/7</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserAvatar fullname="Lê Văn Thiện" className={"size-9"} />
                <div>
                  <div className="text-sm">Lê Văn Thiện</div>
                  <div className="text-xs">Lớp toán 12</div>
                </div>
              </div>
              <input
                type="text"
                className="w-48 rounded-md border border-gray-200 p-2 text-sm font-semibold shadow-sm"
                placeholder="Nhập điểm"
              />
            </div>
            <div className="w-full bg-slate-200 py-2 text-center text-sm">
              Chưa có số câu đúng, câu sai
            </div>
            <div className="flex items-center justify-center gap-10">
              <div className="flex size-10 items-center justify-center rounded-full border border-gray-200 shadow-sm">
                <div className="text-sm font-semibold">Đ</div>
              </div>
              <div className="flex size-10 items-center justify-center rounded-full border border-gray-200 shadow-sm">
                <div className="text-sm font-semibold">CĐ</div>
              </div>
              <div className="flex size-10 items-center justify-center rounded-full border border-gray-200 shadow-sm">
                <div className="text-sm font-semibold">HT</div>
              </div>
              <div className="flex size-10 items-center justify-center rounded-full border border-gray-200 shadow-sm">
                <div className="text-sm font-semibold">CHT</div>
              </div>
              <div className="flex size-10 items-center justify-center rounded-full border border-gray-200 shadow-sm">
                <div className="text-sm font-semibold">HTT</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Nhận xét</div>
              <Editor
                apiKey="ur0vhjauqc7v03itiycm0yhxvtyspax1lvujfy0s1hv6d2t4"
                init={{
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                  toolbar:
                    "fontfamily fontsize | bold italic underline | align lineheight | emoticons charmap | removeformat",
                  toolbar_mode: "floating",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  ai_request: (request: any, respondWith: any) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant"),
                    ),
                }}
                initialValue=""
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" className="peer sr-only" />
                <div className="peer relative h-6 w-11 rounded-full border border-slate-400 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-slate-400 after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600"></div>
                <span className="ms-3 text-sm">Hiện thị điểm</span>
              </label>
              <div className="flex items-center justify-center rounded-md bg-orange-500 px-3 py-2 shadow-sm">
                <div className="text-sm font-semibold text-white">
                  Yêu cầu nộp lại
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <div className="rounded-md border border-gray-200 bg-gray-100 py-2.5 shadow-sm">
                  <div className="text-center text-sm font-semibold text-gray-500">
                    Quay lại
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="rounded-md border border-gray-200 bg-blue-800 py-2.5 shadow-sm">
                  <div className="text-center text-sm font-semibold text-white">
                    Lưu dữ liệu
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkHomework;
