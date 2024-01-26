const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // fs modülünü ekleyin

const app = express();
app.use(methodOverride('_method'));  // Bu satırı app'in tanımlandığı yerden önce ekleyin

mongoose.connect('mongodb://localhost:27017/formdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
db.once('open', () => {
  console.log('MongoDB bağlantısı başarılı!');
});

const formSchema = new mongoose.Schema({
  isim: String,
  soyisim: String,
  foto: String,
});

const Form = mongoose.model('Form', formSchema);

app.use(bodyParser.urlencoded({ extended: true }));

// Multer ayarları
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Ana sayfa
app.get('/', async (req, res) => {
  try {
    const forms = await Form.find({});
    res.render('index', { forms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }  
});

// Kullanıcı silme endpoint'i
app.delete('/delete-user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // MongoDB'den kullanıcıyı sil
    const result = await Form.findByIdAndDelete(userId);

    if (result) {
      // Fotoğraf dosyasını sil
      const fotoPath = path.join(__dirname, 'public', 'uploads', result.foto);
      fs.unlinkSync(fotoPath);

      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Kullanıcı eklemek için form sayfası
app.get('/form', (req, res) => {
  res.render('form');
});

// Form gönderme endpoint'i
app.post('/form', upload.single('foto'), async (req, res) => {
  const { isim, soyisim } = req.body;
  const foto = req.file.filename;

  const yeniForm = new Form({
    isim,
    soyisim,
    foto,
  });

  try {
    await yeniForm.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.set('view engine', 'ejs');
app.use(express.static('public', { 
  setHeaders: (res, path, stat) => {
    res.set('Content-Type', 'text/javascript'); // ya da application/javascript
  },
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
