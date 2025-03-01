import { ClipboardList, History, Lock, Ruler, User } from "lucide-react";

export enum AccountSettingTabs {
  GENERAL = "GENERAL",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  UNIT = "UNIT",
  TRANSACTION_HISTORY = "TRANSACTION_HISTORY",
  WIDTHDRAW_HISTORY = "WIDTHDRAW_HISTORY",
}

export const ACCOUNT_SETTINGS_TABS = [
  {
    label: "Chung",
    key: AccountSettingTabs.GENERAL,
    icon: User,
    link: '?tab=0'
  },
  {
    label: "Đổi mật khẩu",
    key: AccountSettingTabs.CHANGE_PASSWORD,
    icon: Lock,
    link: '?tab=1'
  },
  {
    label: "Đơn vị đo",
    key: AccountSettingTabs.UNIT,
    icon: Ruler,
    link: '?tab=2'
  },
  {
    label: "Lịch sử giao dịch",
    key: AccountSettingTabs.TRANSACTION_HISTORY,
    icon: ClipboardList,
    link: '?tab=3'
  },
  {
    label: "Lịch sử rút tiền",
    key: AccountSettingTabs.WIDTHDRAW_HISTORY,
    icon: History,
    link: '?tab=4'
  },
];
