# Azota.vn Clone Project

## Giới thiệu
**Azota.vn Clone Project** là một ứng dụng web toàn diện được xây dựng theo kiến trúc tách biệt giữa Front-end và Back-end, mô phỏng giao diện và một số chức năng chính của trang [azota.vn](https://azota.vn/). Mục tiêu của dự án là tạo ra một nền tảng hỗ trợ giáo viên trong việc soạn đề, quản lý bài kiểm tra và theo dõi kết quả học tập của học sinh, đồng thời cung cấp trải nghiệm người dùng hiện đại và thân thiện.

## Tính năng chính
- **Đăng ký & Đăng nhập:**  
  Xác thực người dùng với bảo mật cao, hỗ trợ khôi phục mật khẩu.
  
- **Quản lý đề thi & bài kiểm tra:**  
  Giáo viên có thể tạo, chỉnh sửa và xóa đề thi, bài kiểm tra; lưu trữ và quản lý ngân hàng câu hỏi.

- **Thống kê & báo cáo:**  
  Cung cấp các biểu đồ, báo cáo kết quả thi và phân tích hiệu suất học tập của học sinh.

- **Tương tác & thông báo:**  
  Hệ thống thông báo thời gian thực giúp giáo viên và học sinh cập nhật nhanh chóng các hoạt động và thay đổi.

- **Quản lý nội dung học tập:**  
  Tích hợp chức năng lưu trữ tài liệu, bài giảng và các nội dung hỗ trợ học tập.

## Kiến trúc dự án
Dự án được chia thành 2 phần chính:

- **Front-end:**  
  - Xây dựng giao diện người dùng hiện đại, responsive với các framework như **React**, **Vue** hoặc **Angular**.
  - Sử dụng các thư viện CSS như **Bootstrap** hoặc **Tailwind CSS** để tối ưu hóa giao diện.

- **Back-end:**  
  - Phát triển API phục vụ cho việc xử lý logic nghiệp vụ bằng **Node.js** với framework **NestJS** hoặc **Express**.
  - Tích hợp các giải pháp xác thực (như JWT, OAuth2) và xử lý dữ liệu an toàn.

- **Cơ sở dữ liệu:**  
  - Sử dụng **MySQL**, **PostgreSQL** hoặc **MongoDB** để lưu trữ dữ liệu người dùng, đề thi, bài kiểm tra và các thông tin liên quan.

## Công nghệ sử dụng
- **Front-end:**
  - Ngôn ngữ: JavaScript/TypeScript
  - Framework: React / Vue / Angular
  - CSS Framework: Bootstrap / Tailwind CSS

- **Back-end:**
  - Node.js
  - Framework: NestJS hoặc Express
  - Authentication: JWT, OAuth2

- **Cơ sở dữ liệu:**  
  - MySQL / PostgreSQL / MongoDB

- **Quản lý phiên bản:**  
  - Git và GitHub

## Hướng dẫn cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (phiên bản 14 trở lên)
- NPM hoặc Yarn
- Cơ sở dữ liệu (MySQL, PostgreSQL hoặc MongoDB)

### Các bước cài đặt

1. **Clone repository:**
   ```bash
   git clone https://github.com/your_username/azota-vn-clone.git
   cd azota-vn-clone
