import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import mongoose = require('mongoose');

@Schema({
  timestamps: true,
})
export class Posts {
  @Prop()
  content: string;

  @Prop()
  images: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: any;

  @Prop({ type: [String], default: [] })
  likes: string[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: [],
    },
  ])
  comments: any[];
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
