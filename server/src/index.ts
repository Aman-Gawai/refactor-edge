import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import authRoutes from './routes/auth';
import courseRoutes from './routes/courses';
import { auth } from './middleware/auth';

const app = express();

// Environment variables
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/refactor-edge';

// Middleware
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true
}));
app.use(express.json());

// MongoDB connection with enhanced error handling and logging
const connectDB = async () => {
  let retries = 5;

  while (retries > 0) {
    try {
      if (!MONGODB_URI) {
        throw new Error('MongoDB connection string is not provided');
      }

      // Log connection attempt (without exposing credentials)
      const sanitizedUri = MONGODB_URI.replace(
        /(mongodb(\+srv)?:\/\/[^:]+):([^@]+)@/,
        '$1:[password]@'
      );
      console.log('Attempting to connect to MongoDB with URI:', sanitizedUri);

      console.log('Connecting to MongoDB...');
      await mongoose.connect(MONGODB_URI);
      console.log('✅ Connected to MongoDB successfully');
      return;
    } catch (error: any) {
      console.error('❌ MongoDB connection error:', error.message);
      retries--;
      if (retries === 0) {
        console.error('Maximum connection retries reached. Exiting...');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();

    // API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/courses', auth, courseRoutes);

    // Serve static files in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../../client/dist')));

      // Handle SPA routing - send all non-API requests to index.html
      app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
          res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
        }
      });
    } else {
      // Development - redirect all non-API requests to the dev server
      app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
          res.redirect('http://localhost:5173');
        }
      });
    }

    // Error handling middleware
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Something broke!' });
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Initialize server
startServer();