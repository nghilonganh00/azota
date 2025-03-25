import { FileCheck, FileText, Inbox, Landmark, Newspaper, Share, Share2, ShieldCheck } from "lucide-react";

export enum NotificationTabs {
  ALL = "ALL",
  HOMEWORK = "HOMEWORK",
  EXAM = "EXAM",
  GRANT_ACCESS = "GRANT_ACCESS",
  VERITY_INFORMATION = "VERITY_INFORMATION",
  BANK_QUESTION = "BANK_QUESTION",
  OTHER = "OTHER",
}

export const NOTIFICATION_TABS = [
  {
    label: "Tất cả",
    key: NotificationTabs.ALL,
    icon: Inbox,
    link: "?tab=0",
  },
  {
    label: "Bài tập",
    key: NotificationTabs.HOMEWORK,
    icon: FileText,
    link: "?tab=1",
  },
  {
    label: "Đề thi",
    key: NotificationTabs.EXAM,
    icon: FileCheck,
    link: "?tab=2",
  },
  {
    label: "Phân quyền",
    key: NotificationTabs.GRANT_ACCESS,
    icon: Share2,
    link: "?tab=3",
  },
  {
    label: "Xác thực thông tin",
    key: NotificationTabs.VERITY_INFORMATION,
    icon: ShieldCheck,
    link: "?tab=4",
  },
  {
    label: "Ngân hàng câu hỏi",
    key: NotificationTabs.BANK_QUESTION,
    icon: Landmark,
    link: "?tab=4",
  },
  {
    label: "Khác",
    key: NotificationTabs.OTHER,
    icon: Newspaper,
    link: "?tab=4",
  },
];

export enum ExamNotificationType {
  NEW_EXAM = "NEW_EXAM",
}
