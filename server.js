import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import customerRoutes from './routes/customer.routes.js';
import regionRoutes from './routes/region.routes.js';
import waterProductRoutes from './routes/waterProduct.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/customers', customerRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/water-products', waterProductRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
