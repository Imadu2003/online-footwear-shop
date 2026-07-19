const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  // Men
  { name: "Aeromax Nova Runner", price: "35000", category: "Men", image: "/shoe1.png", description: "Futuristic premium running shoe with a sleek aerodynamic design." },
  { name: "Court Surge Pro", price: "38000", category: "Men", image: "/shoe3.png", description: "High-performance dynamic high-top basketball shoe." },
  { name: "Heritage Canvas '84", price: "22000", category: "Men", image: "/shoe4.png", description: "A classic retro vintage sneaker made with premium suede." },
  { name: "Nike Air Max 270", price: "25000", category: "Men", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop", description: "Classic everyday running shoe with maximum cushioning." },
  { name: "Rugged Trail Explorer", price: "45000", category: "Men", image: "/extra1.png", description: "Premium waterproof leather hiking boot with aggressive tread for the outdoors." },
  { name: "Executive Oxford Royale", price: "55000", category: "Men", image: "/extra2.png", description: "Elegant men's formal Oxford shoe in polished dark burgundy leather." },
  
  // Ladies
  { name: "Royale Minimalist Luxe", price: "42000", category: "Ladies", image: "/shoe2.png", description: "A luxury designer lifestyle sneaker crafted from premium soft white leather." },
  { name: "Pastel Chunky Retro", price: "28500", category: "Ladies", image: "/lady1.png", description: "Women's pastel pink and white chunky retro sneaker. Soft elegant styling." },
  { name: "Rose Gold Sleek Runner", price: "31000", category: "Ladies", image: "/lady2.png", description: "A sleek women's running shoe. Rose gold and black colorway, aerodynamic." },
  { name: "Nike Blazer Mid '77", price: "31000", category: "Ladies", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=600&auto=format&fit=crop", description: "Vintage hoops style with a minimalist look for women." },
  { name: "Crimson Stiletto Elegance", price: "60000", category: "Ladies", image: "/extra3.png", description: "Luxury women's red stiletto high heel shoe in glossy patent leather." },
  { name: "Summer Breeze Wedge", price: "20000", category: "Ladies", image: "/extra4.png", description: "Stylish women's summer wedge sandal with woven straw base." },

  // Kids
  { name: "Playful Primary Kicks", price: "18000", category: "Kids", image: "/kid1.png", description: "Playful kids sneaker with vibrant primary colors and velcro straps." },
  { name: "Mini High-Top Classic", price: "24000", category: "Kids", image: "/kid2.png", description: "Mini high-top sneaker for toddlers. Black, white, and bright red colors." },
  { name: "Puma Suede Classic", price: "15000", category: "Kids", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop", description: "Comfortable and durable suede for everyday play." },
  { name: "New Balance 574 Junior", price: "16500", category: "Kids", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=600&auto=format&fit=crop", description: "Supportive and stylish running shoe for active children." },
  { name: "Galaxy LED Light-ups", price: "22000", category: "Kids", image: "/extra5.png", description: "Futuristic kids sneaker with glowing LED soles and metallic finish." }
];

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("Connected to MongoDB for Seeding...");
    
    // Clear existing products to prevent duplicates
    await Product.deleteMany({});
    console.log("Old products cleared.");
    
    // Insert new products
    await Product.insertMany(products);
    console.log("Successfully added 12 new products across all categories!");
    
    mongoose.connection.close();
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
