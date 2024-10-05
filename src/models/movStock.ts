import mongoose, { Document, Schema } from 'mongoose';

interface IMovStock extends Document {
  articleId: number;
  movType: 'INCR' | 'DECR'; // Incremento o Decremento
  quantity: number;
  description: string;
  creationDate: Date;
  creationUser: string;
}

const MovStockSchema: Schema = new Schema({
  articleId: { type: Number, required: true },
  movType: { type: String, enum: ['INCR', 'DECR'], required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  creationUser: { type: String, required: true }, // Puede ser el usuario o sistema que hizo el movimiento
});

export default mongoose.model<IMovStock>('MovStock', MovStockSchema);
