# Website Quản lý phân phối hàng hóa thời trang

### Mục lục
- [Website Quản lý phân phối hàng hóa thời trang](#website-quản-lý-phân-phối-hàng-hóa-thời-trang)
    - [Mục lục](#mục-lục)
    - [Giới thiệu](#giới-thiệu)
    - [Công nghệ phát triển](#công-nghệ-phát-triển)
    - [Chức năng chính](#chức-năng-chính)
    - [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
    - [Các package cần cài đặt](#các-package-cần-cài-đặt)
    - [Cài đặt](#cài-đặt)
    - [Tính năng chi tiết](#tính-năng-chi-tiết)
    - [Cấu trúc dự án](#cấu-trúc-dự-án)

### Giới thiệu
- Tác giả: Nguyễn Nhật Tân
- Mô tả đề tài: Website giúp quản lý nhập xuất hàng hóa thời trang với các chức năng nhập hàng trong kho, xuất hàng theo đề xuất và trạng thái vận chuyển.

### Công nghệ phát triển
- Front-end: Html-css, javaScript, Bootstrap4...
- Back-end: NodeJS (ExpressJS)

### Chức năng chính
- Quản lý thông tin nhập hàng: Phiếu nhập, Nhà cung cấp.
- Quản lý thông tin xuất hàng: Đề xuất, Chi tiết đề xuất, Duyệt đề xuất, trạng thái vận chuyển.
- Quản lý thông tin sản phẩm trong kho.
- Tìm kiếm và lọc: Sản phẩm, Phiếu nhập, Đề xuất,... theo các điều kiện khác nhau.
- Đăng nhập, đăng xuất, phân quyền với JWT (JSON Web Token)

### Yêu cầu hệ thống
- Nodejs vesion 20.11.1 
- SQL Server 2016 trở lên
- Visual studio code hoặc bất kỳ IDE hỗ trợ Nodejs
- Trình duyệt web hiện đại (Chrome, Cốc cốc, Edge,)
### Các package cần cài đặt

Dưới đây là danh sách các gói thư viện cần cài cho dự án:
- "@babel/core": "7.15.4",
- "@babel/node": "7.15.4",
- "@babel/preset-env": "7.15.4",
- "bcrypt": "^5.1.1",
- "body-parser": "1.20.2",
- "cookie-parser": "^1.4.6",
- "cors": "^2.8.5",
- "dotenv": "10.0.0",
- "express": "4.19.2",
- "express-handlebars": "^7.1.3",
- "jsonwebtoken": "^9.0.2",
- "method-override": "^3.0.0",
- "morgan": "^1.10.0",
- "sequelize": "^6.37.3",
- "sequelize-auto": "^0.8.8",
- "sequelize-cli": "6.3.0",
- "tedious": "^18.2.1"

Các thư viện hỗ trợ lập trình khác:
- "nodemon": "^3.1.4",
- "sass": "^1.77.6",
- "script": "^0.1.4"

Để cài đặt các thư viện trên, bạn sử dụng câu lệnh sau trong terminal của thư mục chứa code của Visual studio code:
```bash
$ npm install express
$ npm install --save sequelize
$ npm install express-handlebars
...
```
### Cài đặt 
1. Clone repository:
```bash
git clone https://github.com/NHATTAN3043/QuanLyPhanPhoiThoiTrang.git
```
2. Khởi tạo môi trường nodejs 
```bash
$ npm init
```
3. Tạo cơ sở dữ liệu trong SQL SERVER
- Mở SQL SERVER click vào Databases và chọn "Import Data-tier Application"
- Chọn file QuanLyPhanPhoiThoiTrangDB.pacpac trong thư mục dự án 
- Nhấn next để hoàn thành
4. Cấu hình chuỗi kết nối tới SQL SERVER bằng cách tạo ra file .env trong thư mục dự án
```plaintext
DB_HOST=YourHost
DB_PORT=YourPort
DB_USER=UserName
DB_PASSWORD=YourPassword
DB_NAME=DatabaseName
JWT_ACCESS_KEY=YourAccessKey
JWT_REFRESH_KEY=YourRefreshKey
```
5. Chạy website với lệnh:
```bash
$ npm start
```
6. Mở trình duyệt và truy cập
```plaintext
http://localhost:your_port/taikhoan/view-login
```
7. Login với tài khoản test
- Email: admin@gmail.com
- Password: 123456

### Tính năng chi tiết

Phân quyền:
- Đăng nhập, đăng xuất (sử dụng JWT)
- Phân quyền truy cập theo chức vụ

Quản lý:
Có đầy đủ các chức năng CRUD và đánh số trang
- Quản lý tài khoản người dùng.
- CRUD theo nhà cung cấp.
- Tạo phiếu nhập hàng, thêm chi tiết sản phẩm nhập.
- Quản lý thông tin sản phẩm trong kho theo: size, màu, đối tượng, sản phẩm, loại...
- Tạo đề xuất nhập hàng về cửa hàng.
- Duyệt đề xuất, và duyệt theo từng sản phẩm đề xuất.
- Theo dõi trạng thái vận chuyển theo đơn duyệt.
- Phân trang
- Thùng rác: khôi phục hoặc xóa vĩnh viễn.
- Xóa và khôi phục với nhiều đối tượng.
Tìm kiếm và lọc:
- Tìm kiếm sản phẩm theo tên lọc theo trường
- Lọc phiếu nhập theo nhà cung cấp
- Tìm kiếm đề xuất và lọc theo cửa hàng và trạng thái
### Cấu trúc dự án

project-root/
├── src/
│   ├── server.js
│   ├── app/
│        ------├── controllers
│        ------└── models
│   ├── config/
│   ├── helpers/
│   ├── public/
│        ------├── assets
│        ------├── css
│        ------├── img
│        ------├── scripts
│        ------└── vendor
│   ├── resources/
│        ------├── scss
│        ------└── views
│   ├── routes/
│   ├── util/
├── .env
├── package.json
├── package-lockjson
├── .babelrc
└── README.md

- Controllers: Chứa các controller điều khiển luồng dữ liệu và xử lý yêu cầu từ người dùng.
- Models: Chứa các lớp mô hình đại diện cho dữ liệu của ứng dụng, được tạo từ cơ sở dữ liệu bằng cách sử dụng Database First.
- Views: Chứa các file giao diện (Razor Pages) để hiển thị dữ liệu cho người dùng.
- public: Chứa các file tĩnh như CSS, JavaScript và hình ảnh.