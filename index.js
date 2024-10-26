const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Đảm bảo dotenv được nạp ở đầu file

const app = express();
// Cấu hình EJS làm template engine
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;

// Middleware để parse JSON request
app.use(express.json());

// Chuỗi kết nối MongoDB
const uri = process.env.MONGO_URL;

// Tạo client MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



// Cấu hình `multer` để lưu file vào thư mục `uploads`
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Lưu file vào thư mục "uploads"
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Đặt tên file độc đáo
    }
  });
  const upload = multer({ storage: storage });
  
  app.set('view engine', 'ejs'); 
  app.use(express.json());
  app.use(express.static('uploads')); // Phục vụ các file ảnh trong thư mục "uploads"
// Kết nối tới MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Đã kết nối tới MongoDB Atlas");
  } catch (err) {
    console.error("Kết nối thất bại", err);
    process.exit(1); // Thoát nếu không thể kết nối
  }
}

// Khởi động server và kết nối tới MongoDB
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
  });
});
app.get('/',(req,res)=>{
    res.render('home')
})
// Route để hiển thị trang đăng ký
app.get('/add-item', (req, res) => {
    res.render('add-item');
});
// app.post('/add-item', async (req, res) => {
//     const { img,name, price, discount } = req.body;
//     const imgPath = req.file ? req.file.filename : null; // Lấy tên file ảnh đã tải lên
//     try {
//       const db = client.db("GroupItem"); // Thay "your_database_name" bằng tên DB
//       const collection = db.collection("Items");
  
//       const result = await collection.insertOne({ img,name, price, discount });
//       res.json({ message: 'Sản phẩm đã được thêm thành công', id: result.insertedId });
//     } catch (err) {
//       console.error("Lỗi khi thêm sản phẩm:", err);
//       res.status(500).json({ message: 'Lỗi khi thêm sản phẩm' });
//     }
//   });
  // Route hiển thị tất cả sinh viên
// app.get('/all-item', async (req, res) => {
//   try {
//     const db = client.db("GroupItem"); // Thay "your_database_name" bằng tên DB của bạn
//     const collection = db.collection("Items");
//       const students = await collection.find().toArray();  // Truy vấn tất cả dữ liệu từ MongoDB
//       res.render('all-item', { students });  // Render trang hiển thị dữ liệu
//   } catch (error) {
//       res.status(500).send('Lỗi khi truy xuất dữ liệu');
//   }
// });
// Route để thêm sản phẩm
// app.post('/add-item', upload.single('img'), async (req, res) => {
//   const { name, price, discount } = req.body;
//   const imgPath = req.file ? req.file.filename : null;

//   try {
//     const newItem = new Item({ img: imgPath, name, price, discount });
//     await newItem.save(); // Lưu sản phẩm vào cơ sở dữ liệu
//     res.json({ message: 'Sản phẩm đã được thêm thành công', id: newItem._id });
//   } catch (err) {
//     console.error("Lỗi khi thêm sản phẩm:", err);
//     res.status(500).json({ message: 'Lỗi khi thêm sản phẩm' });
//   }
// });

// Route hiển thị tất cả sản phẩm
// app.get('/all-item', async (req, res) => {
//   try {
//     const items = await Item.find(); // Lấy tất cả sản phẩm từ cơ sở dữ liệu
//     res.render('all-item', { items });
//   } catch (error) {
//     res.status(500).send('Lỗi khi truy xuất dữ liệu');
//   }
// });

  
