import moment from "moment";

export enum DateTimeFormat {
  FULL_DATE_FORMAT = "FULL_DATE_FORMAT", //thứ , ngày/dd/mm/yyy
  FULL_DATE_TIME_FORMAT = "FULL_DATE_TIME_FORMAT", //dd/mm/yyyy hh:mm
  TIME_FORMAT = "TIME_FORMAT", //hh:mm
}

const isoDateUtil = {
  /**
   * Chuyển đổi chuỗi ISO thành định dạng ngày và thời gian theo yêu cầu.
   * @param isoString Chuỗi ngày theo định dạng ISO 8601, ví dụ: "2025-01-22T14:30:00Z".
   * @param format (Tùy chọn) Định dạng ngày và thời gian cần chuyển đổi.
   * @returns Ngày và thời gian đã chuyển đổi theo định dạng yêu cầu.
   *
   * Các định dạng có sẵn:
   * - "FULL_DATE_FORMAT": chuyển đổi thành "Thứ 2, Ngày 22/01/2025"
   * - "FULL_DATE_TIME_FORMAT": chuyển đổi thành "22/01/2025 14:30"
   * - "TIME_FORMAT", chuyển đổi thành "14:30"
   */
  toDateAndTime: (isoString: string, format?: DateTimeFormat): string => {
    const date = new Date(isoString);

    const padZero = (num: number) => (num < 10 ? "0" : "") + num;

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    const daysOfWeek = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    switch (format) {
      case DateTimeFormat.FULL_DATE_FORMAT:
        return `${dayOfWeek}, Ngày ${day}/${month}/${year}`;
      case DateTimeFormat.FULL_DATE_TIME_FORMAT:
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      case DateTimeFormat.TIME_FORMAT:
        return `${hours}:${minutes}`;
      default:
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
  },

  toDateTime: (isoString: string): string => {
    return moment(isoString).format("DD-MM-YYYY HH:mm");
  },

  calculateDiffFromNow: (isoString: string): string => {
    const now = new Date();
    const startDate = new Date(isoString);

    const diffInMilliseconds = Math.abs(now.getTime() - startDate.getTime());
    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInWeeks = diffInDays / 7;
    const diffInMonths = diffInDays / 30;
    const diffInYears = diffInDays / 365;

    if (diffInSeconds < 60) {
      return `${Math.floor(diffInSeconds)} giây trước`;
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} phút trước`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} giờ trước`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} ngày trước`;
    } else if (diffInWeeks < 4) {
      return `${Math.floor(diffInWeeks)} tuần trước`;
    } else if (diffInMonths < 12) {
      return `${Math.floor(diffInMonths)} tháng trước`;
    } else {
      return `${Math.floor(diffInYears)} năm trước`;
    }
  },

  calculateDiff: (startISO: string, endISO: string) => {
    const startDate = new Date(startISO);
    const endDate = new Date(endISO);

    const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());

    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} phút ${diffInSeconds - diffInMinutes * 60} giây`;
  },
};

export { isoDateUtil };
