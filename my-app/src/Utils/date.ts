import moment from "moment";

type format = "thứ d, ngày/dd/mm/yyyy" | "dd/mm/yyyy hh:mm";

const isoDateUtil = {
  toDateAndTime: (isoString: string, format?: format): string => {
    const date = new Date(isoString);

    const padZero = (num: number) => (num < 10 ? "0" : "") + num;

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    const daysOfWeek = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];

    switch (format?.toLocaleLowerCase()) {
      case "thứ d, ngày/dd/mm/yyyy":
        return `${dayOfWeek}, Ngày ${day}/${month}/${year}`;
      case "dd/mm/yyyy hh:mm":
        return `${day}/${month}/${year} ${hours}:${minutes}`;
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
    const diffInMonths = diffInDays / 30; // Approximation
    const diffInYears = diffInDays / 365; // Approximation

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

    const diffInMilliseconds = Math.abs(
      endDate.getTime() - startDate.getTime(),
    );

    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} phút ${diffInSeconds - diffInMinutes * 60} giây`;
  },
};

export { isoDateUtil };
