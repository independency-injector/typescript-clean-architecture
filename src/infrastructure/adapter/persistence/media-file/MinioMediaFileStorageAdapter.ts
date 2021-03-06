import { MediaFileStoragePort } from '../../../../core/domain/media/port/persistence/MediaFileStoragePort';
import * as Minio from 'minio';
import { BucketItemStat } from 'minio';
import { Readable } from 'stream';
import { MediaFileStorageOptions } from '../../../../core/common/persistence/MediaFileStorageOptions';
import { FileMetadata } from '../../../../core/domain/media/value-object/FileMetadata';
import { v4 } from 'uuid';
import { FileStorageConfig } from '../../../config/FileStorageConfig';
import { MediaType } from '../../../../core/common/enums/MediaEnums';
import { CoreAssert } from '../../../../core/common/util/assert/CoreAssert';

export class MinioMediaFileStorageAdapter implements MediaFileStoragePort {
  
  private client: Minio.Client = new Minio.Client({
    endPoint : CoreAssert.notEmpty(FileStorageConfig.ENDPOINT, new Error('Minio: port not set')),
    port     : FileStorageConfig.PORT,
    accessKey: FileStorageConfig.ACCESS_KEY,
    secretKey: FileStorageConfig.SECRET_KEY,
    useSSL   : FileStorageConfig.USE_SSL
  });
  
  public async upload(uploadFile: Buffer | Readable, options: MediaFileStorageOptions): Promise<FileMetadata> {
    const uploadDetails: FileUploadDetails = this.defineFileUploadDetails(options.type);
    
    const bucket: string = uploadDetails.bucket;
    const key: string    = `${v4()}.${uploadDetails.ext}`;
  
    await this.client.putObject(bucket, key, uploadFile, {'content-type': uploadDetails.mimitype});
    const fileStat: BucketItemStat = await this.client.statObject(bucket, key);
    
    const fileMetadata: FileMetadata = await FileMetadata.new({
      relativePath: `${bucket}/${key}`,
      size        : fileStat.size,
      mimetype    : fileStat.metaData['content-type'],
      ext         : uploadDetails.ext
    });
    
    return fileMetadata;
  }
  
  private defineFileUploadDetails(type: MediaType): FileUploadDetails {
    const detailsRecord: Record<MediaType, FileUploadDetails> = {
      [MediaType.IMAGE]: {bucket: FileStorageConfig.IMAGE_BUCKET, ext: FileStorageConfig.IMAGE_EXT, mimitype: FileStorageConfig.IMAGE_MIMETYPE}
    };
    
    return CoreAssert.notEmpty(detailsRecord[type], new Error('Minio: unknown media type'));
  }
  
}

type FileUploadDetails = {bucket: string, ext: string, mimitype: string};
