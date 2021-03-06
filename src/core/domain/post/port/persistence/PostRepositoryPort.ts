import { Nullable, Optional } from '../../../../common/type/CommonTypes';
import { Post } from '../../entity/Post';
import { RepositoryFindOptions, RepositoryRemoveOptions, RepositoryUpdateManyOptions } from '../../../../common/persistence/RepositoryOptions';
import { PostStatus } from '../../../../common/enums/PostEnums';

export interface PostRepositoryPort {

  findPost(by: {id?: string}, options?: RepositoryFindOptions): Promise<Optional<Post>>;
  
  findPosts(by: {ownerId?: string, status?: PostStatus}, options?: RepositoryFindOptions): Promise<Post[]>;
  
  addPost(post: Post): Promise<{id: string}>;
  
  updatePost(post: Post): Promise<void>;
  
  updatePosts(values: {imageId?: Nullable<string>}, by: {imageId?: string}, options?: RepositoryUpdateManyOptions): Promise<void>;
  
  removePost(post: Post, options?: RepositoryRemoveOptions): Promise<void>;

}
