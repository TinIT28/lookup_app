import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema } from './schema/post.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CommentModule } from '../comment/comment.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CloudinaryModule,
    CommentModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'Posts', schema: PostsSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule { }
