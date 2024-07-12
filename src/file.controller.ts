// 文件上传
import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  // 上传
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => {
              return Math.round(Math.random() * 16).toString(16);
            })
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: any) {
    return { filename: file.filename };
  }

  // 下载
  async downloadFile(@Res() res: Response) {
    const filePath = 'public/9604a1bf58b1e9ae4c1077595874f3bf6.png'; // 文件路径
    const fileName = '9604a1bf58b1e9ae4c1077595874f3bf6.png'; // 文件名
    return res.download(filePath, fileName);
  }
}
