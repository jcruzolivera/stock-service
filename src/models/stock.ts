import mongoose, { Document, Schema } from 'mongoose';

interface IStock extends Document {
  articleId: number;
  currentStock: number;
  minStock: number;
  repositionQty: number;
  movements: {
    date: Date;
    quantity: number;
    description: string;
  }[];
}

const StockSchema: Schema = new Schema({
  articleId: { type: Number, required: true },
  currentStock: { type: Number, required: true },
  minStock: { type: Number, required: true },
  repositionQty: { type: Number, required: true },
  movements: [
    {
      date: { type: Date, default: Date.now },
      quantity: { type: Number, required: true },
      description: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IStock>('Stock', StockSchema);
